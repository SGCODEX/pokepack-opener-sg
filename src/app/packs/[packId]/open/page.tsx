
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPackById, allCards } from '@/lib/pokemon-data';
import type { PokemonPack, PokemonCard, CardRarity } from '@/lib/types';
import { CardComponent } from '@/components/card-component';
import { Button } from '@/components/ui/button';
import { usePokedex } from '@/hooks/use-pokedex';
import { CardDetailModal } from '@/components/card-detail-modal';
import { ArrowLeft, PackageOpen, Shuffle, Eye } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type PackOpeningStage = 'initial' | 'opening' | 'stack-reveal' | 'all-revealed';

const NUM_BURST_PARTICLES = 12;

export default function PackOpeningPage() {
  const router = useRouter();
  const params = useParams();
  const packId = params.packId as string;
  
  const [packData, setPackData] = useState<PokemonPack | null>(null);
  const [openedCards, setOpenedCards] = useState<PokemonCard[]>([]);
  const [stage, setStage] = useState<PackOpeningStage>('initial');
  
  const { addCardsToCollection, isLoaded: pokedexLoaded } = usePokedex();
  const [selectedCardForModal, setSelectedCardForModal] = useState<PokemonCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentStackIndex, setCurrentStackIndex] = useState(0);
  const [currentSwipingCard, setCurrentSwipingCard] = useState<{ id: string, direction: 'left' | 'right' } | null>(null);
  const [hasHolo, setHasHolo] = useState(false);
  const [hasRareNonHolo, setHasRareNonHolo] = useState(false);
  const [currentBurstRarity, setCurrentBurstRarity] = useState<CardRarity | null>(null);


  useEffect(() => {
    if (packId) {
      const pack = getPackById(packId);
      if (pack) {
        setPackData(pack);
      } else {
        router.push('/'); 
      }
    }
  }, [packId, router]);

  const openPack = useCallback(() => {
    if (!packData || !pokedexLoaded) return; 

    setStage('opening');
    setOpenedCards([]);
    setCurrentStackIndex(0);
    setCurrentSwipingCard(null);
    setHasHolo(false);
    setHasRareNonHolo(false);
    setCurrentBurstRarity(null);

    setTimeout(() => {
      const packCards: PokemonCard[] = [];
      const availableCardsInPack = allCards.filter(card => packData.possibleCards.includes(card.id));
      
      const pullCardByRarity = (rarity: CardRarity, excludeIds: Set<string>): PokemonCard | undefined => {
        const potentialCards = availableCardsInPack.filter(c => c.rarity === rarity && !excludeIds.has(c.id));
        if (potentialCards.length === 0) return undefined;
        return potentialCards[Math.floor(Math.random() * potentialCards.length)];
      };
      
      const pulledIds = new Set<string>();

      let rareSlotCard: PokemonCard | undefined;
      const isHoloAttempt = Math.random() < 0.30; 
      if (isHoloAttempt) {
        rareSlotCard = pullCardByRarity('Holo Rare', pulledIds);
      }
      if (!rareSlotCard) {
        rareSlotCard = pullCardByRarity('Rare', pulledIds);
      }
      if (!rareSlotCard) {
          rareSlotCard = availableCardsInPack.find(c => (c.rarity === 'Holo Rare' || c.rarity === 'Rare') && !pulledIds.has(c.id));
      }
      if (rareSlotCard) {
        packCards.push(rareSlotCard);
        pulledIds.add(rareSlotCard.id);
      }

      for (let i = 0; i < packData.rarityDistribution.uncommon; i++) {
        let card = pullCardByRarity('Uncommon', pulledIds);
        if (!card) card = availableCardsInPack.find(c => c.rarity === 'Uncommon' && !pulledIds.has(c.id));
        if (!card) card = availableCardsInPack.find(c => !pulledIds.has(c.id) && c.rarity !== 'Holo Rare' && c.rarity !== 'Rare'); 
        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }
      
      const commonsToPull = packData.cardsPerPack - packCards.length;
      for (let i = 0; i < commonsToPull; i++) {
        let card = pullCardByRarity('Common', pulledIds);
         if (!card) card = availableCardsInPack.find(c => c.rarity === 'Common' && !pulledIds.has(c.id));
         if (!card) card = availableCardsInPack.find(c => !pulledIds.has(c.id)); 
        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }
      
      let attempts = 0; 
      while(packCards.length < packData.cardsPerPack && pulledIds.size < availableCardsInPack.length && attempts < 20) {
        const remainingCardsForPool = availableCardsInPack.filter(c => !pulledIds.has(c.id));
        if(remainingCardsForPool.length === 0) break;
        let card = pullCardByRarity('Common', pulledIds) || pullCardByRarity('Uncommon', pulledIds) || remainingCardsForPool[Math.floor(Math.random() * remainingCardsForPool.length)];
        
        if (card) {
          packCards.push(card);
          pulledIds.add(card.id);
        }
        attempts++;
      }

      const isHoloPulled = packCards.some(card => card.rarity === 'Holo Rare');
      setHasHolo(isHoloPulled);
      if (!isHoloPulled) {
        const isRarePulled = packCards.some(card => card.rarity === 'Rare');
        setHasRareNonHolo(isRarePulled);
      }

      const raritySortOrder: Record<CardRarity, number> = {
        'Common': 0,
        'Uncommon': 1,
        'Rare': 2,
        'Holo Rare': 3,
      };
      packCards.sort((a, b) => raritySortOrder[a.rarity] - raritySortOrder[b.rarity]);

      setOpenedCards(packCards);
      addCardsToCollection(packCards.map(c => c.id)); 
      setStage('stack-reveal');
    }, 1000); 
  }, [packData, addCardsToCollection, pokedexLoaded]);

  const handleRevealNextCard = () => {
    if (stage !== 'stack-reveal' || currentStackIndex >= openedCards.length || currentSwipingCard || currentBurstRarity) return;

    const cardToSwipe = openedCards[currentStackIndex];
    
    if (cardToSwipe.rarity === 'Rare' || cardToSwipe.rarity === 'Holo Rare') {
      setCurrentBurstRarity(cardToSwipe.rarity);
      setTimeout(() => {
        setCurrentBurstRarity(null);
      }, 1000); // Duration of burst animation
    }

    const swipeDirection = Math.random() < 0.5 ? 'left' : 'right';
    setCurrentSwipingCard({ id: cardToSwipe.id, direction: swipeDirection });

    setTimeout(() => {
      const nextIndex = currentStackIndex + 1;
      setCurrentStackIndex(nextIndex);
      setCurrentSwipingCard(null);

      if (nextIndex >= openedCards.length) {
        setStage('all-revealed');
      }
    }, 500); 
  };

  const handleCardClickForModal = (card: PokemonCard) => {
    setSelectedCardForModal(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCardForModal(null);
  };
  
  const resetPackOpening = () => {
    setStage('initial');
    setOpenedCards([]);
    setCurrentStackIndex(0);
    setCurrentSwipingCard(null);
    setHasHolo(false);
    setHasRareNonHolo(false);
    setCurrentBurstRarity(null);
  }

  if (!pokedexLoaded || !packData) {
     return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lg dark:text-foreground">Loading Pack...</p>
      </div>
    );
  }
  
  const showHoloBackground = hasHolo && (stage === 'stack-reveal' || stage === 'all-revealed');
  const showRareBackground = !hasHolo && hasRareNonHolo && (stage === 'stack-reveal' || stage === 'all-revealed');

  return (
    <div className={cn(
        "transition-colors duration-1000 flex flex-col min-h-[calc(100vh-10rem)]", 
        showHoloBackground && "holo-blue-wave-background-active animate-holo-blue-wave-shimmer",
        showRareBackground && "rare-gold-holo-background-active animate-rare-gold-shimmer" 
      )}>
      <Button variant="outline" onClick={() => router.push('/')} className="absolute top-24 left-4 md:left-8 z-10">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Packs
      </Button>
      <header className="relative z-5 pt-8 pb-4 text-center">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground dark:text-foreground">{packData.name}</h1>
      </header>

      {stage === 'initial' && (
        <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
          <Image
            src={packData.image}
            alt={packData.name}
            width={250}
            height={350}
            className="object-cover rounded-lg shadow-xl border-4 border-primary hover:animate-pack-shake"
            data-ai-hint={packData.dataAiHint || packData.name}
            priority
          />
          <Button size="lg" onClick={openPack} className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
            <PackageOpen className="mr-2 h-6 w-6" /> Open This Pack!
          </Button>
        </div>
      )}

      {stage === 'opening' && (
         <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
          <Image
            src={packData.image}
            alt="Opening pack"
            width={250}
            height={350}
            className="object-cover rounded-lg shadow-xl border-4 border-accent animate-opening-pack-burst"
            data-ai-hint={packData.dataAiHint || packData.name}
            priority
          />
          <p className="text-2xl font-semibold text-primary-foreground dark:text-foreground animate-pulse">Opening Pack...</p>
        </div>
      )}
      
      {stage === 'stack-reveal' && openedCards.length > 0 && (
        <div className="flex flex-col items-center justify-center flex-grow relative"> 
          {currentBurstRarity && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="relative w-1 h-1">
                {Array.from({ length: NUM_BURST_PARTICLES }).map((_, i) => {
                  const angle = (i / NUM_BURST_PARTICLES) * 360;
                  const particleColor = currentBurstRarity === 'Holo Rare' 
                    ? ['bg-purple-400', 'bg-pink-400', 'bg-cyan-300', 'bg-yellow-300'][i % 4]
                    : ['bg-yellow-400', 'bg-orange-400'][i % 2];
                  return (
                    <div
                      key={`burst-${i}`}
                      className={cn(
                        "absolute w-4 h-4 rounded-full animate-star-fly-out",
                        particleColor
                      )}
                      style={{
                        transform: `rotate(${angle}deg) translateX(0px)`, 
                        animationDelay: `${Math.random() * 0.1}s`, 
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
          <div 
            className="relative w-[240px] h-[336px] mx-auto cursor-pointer select-none z-10" 
            onClick={!currentSwipingCard && !currentBurstRarity ? handleRevealNextCard : undefined}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if(e.key === 'Enter' || e.key === ' ') { if(!currentSwipingCard && !currentBurstRarity) handleRevealNextCard(); }}} 
            aria-label="Reveal next card"
          >
            {openedCards.map((card, index) => {
              if (index < currentStackIndex && (!currentSwipingCard || currentSwipingCard.id !== card.id)) return null;

              const isBeingSwiped = currentSwipingCard && currentSwipingCard.id === card.id;
              
              let cardTransform = 'none';
              let cardOpacity = 1;
              const cardZIndex = openedCards.length - index; 

              if (!isBeingSwiped && index > currentStackIndex) {
                const offset = (index - currentStackIndex) * 6; 
                const scale = 1 - (index - currentStackIndex) * 0.05;
                cardTransform = `translateY(${offset}px) translateX(${offset/2}px) scale(${scale})`;
                if (index > currentStackIndex + 3) { 
                    cardOpacity = Math.max(0, 1 - (index - (currentStackIndex + 3)) * 0.3);
                }
              }
              
              return (
                <div
                  key={card.id + '-stack-' + index}
                  className={cn(
                    "absolute top-0 left-0 w-[240px] h-[336px]", 
                    "transition-all duration-300 ease-in-out", 
                    isBeingSwiped && currentSwipingCard?.direction === 'left' ? 'animate-swipe-out-left' : '',
                    isBeingSwiped && currentSwipingCard?.direction === 'right' ? 'animate-swipe-out-right' : '',
                  )}
                  style={{
                    transform: cardTransform,
                    zIndex: isBeingSwiped ? openedCards.length + 1 : cardZIndex, 
                    opacity: isBeingSwiped ? 1 : cardOpacity, 
                  }}
                >
                  <CardComponent
                    card={card}
                    onClick={undefined} 
                    showDetails={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stage === 'all-revealed' && (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-headline font-semibold text-primary-foreground dark:text-foreground mb-4">Your Cards!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {openedCards.map((card, index) => (
              <CardComponent
                key={card.id + '-' + index + '-grid'}
                card={card}
                onClick={() => handleCardClickForModal(card)}
                showDetails={true}
              />
            ))}
          </div>
        </div>
      )}

      {(stage === 'all-revealed' || (stage === 'stack-reveal' && currentStackIndex >= openedCards.length)) && (
        <div className="mt-auto py-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-5">
          <Button size="lg" onClick={resetPackOpening} variant="outline">
            <Shuffle className="mr-2 h-5 w-5" /> Open Another {packData?.name}
          </Button>
          <Button size="lg" onClick={() => router.push('/pokedex')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Eye className="mr-2 h-5 w-5" /> View Pokedex
          </Button>
        </div>
      )}

      {selectedCardForModal && (
        <CardDetailModal
          card={selectedCardForModal}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
    
