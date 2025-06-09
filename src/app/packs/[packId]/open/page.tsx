
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

    setTimeout(() => {
      const packCards: PokemonCard[] = [];
      const availableCardsInPack = allCards.filter(card => packData.possibleCards.includes(card.id));
      
      const pullCardByRarity = (rarity: CardRarity, excludeIds: Set<string>): PokemonCard | undefined => {
        const potentialCards = availableCardsInPack.filter(c => c.rarity === rarity && !excludeIds.has(c.id));
        if (potentialCards.length === 0) return undefined;
        return potentialCards[Math.floor(Math.random() * potentialCards.length)];
      };
      
      const pulledIds = new Set<string>();

      for (let i = 0; i < packData.rarityDistribution.rareSlot; i++) {
        const isHolo = Math.random() < 0.30; 
        let card = pullCardByRarity(isHolo ? 'Holo Rare' : 'Rare', pulledIds);
        if (!card) card = pullCardByRarity(isHolo ? 'Rare' : 'Holo Rare', pulledIds); // Try other if specific holo/non-holo rare not found
        if (!card) card = availableCardsInPack.find(c => (c.rarity === 'Rare' || c.rarity === 'Holo Rare') && !pulledIds.has(c.id)); // Fallback to any rare
        if (!card) card = availableCardsInPack.find(c => !pulledIds.has(c.id)); // Fallback to any card if still no rare

        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }

      for (let i = 0; i < packData.rarityDistribution.uncommon; i++) {
        let card = pullCardByRarity('Uncommon', pulledIds);
        if (!card) card = availableCardsInPack.find(c => c.rarity === 'Uncommon' && !pulledIds.has(c.id));
        if (!card) card = availableCardsInPack.find(c => !pulledIds.has(c.id) && c.rarity !== 'Holo Rare' && c.rarity !== 'Rare'); 

        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }
      
      for (let i = 0; i < packData.rarityDistribution.common; i++) {
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

      for (let i = packCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [packCards[i], packCards[j]] = [packCards[j], packCards[i]];
      }

      setOpenedCards(packCards);
      addCardsToCollection(packCards.map(c => c.id)); 
      setStage('stack-reveal');
    }, 1000);
  }, [packData, addCardsToCollection, pokedexLoaded, allCards]);

  const handleRevealNextCard = () => {
    if (stage !== 'stack-reveal' || currentStackIndex >= openedCards.length || currentSwipingCard) return;

    const cardToSwipe = openedCards[currentStackIndex];
    const swipeDirection = Math.random() < 0.5 ? 'left' : 'right';
    setCurrentSwipingCard({ id: cardToSwipe.id, direction: swipeDirection });

    setTimeout(() => {
      const nextIndex = currentStackIndex + 1;
      setCurrentStackIndex(nextIndex);
      setCurrentSwipingCard(null);

      if (nextIndex >= openedCards.length) {
        setStage('all-revealed');
      }
    }, 500); // Match animation duration (0.5s)
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
  }

  if (!pokedexLoaded || !packData) {
     return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lg">Loading Pack...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-center">
      <Button variant="outline" onClick={() => router.push('/')} className="absolute top-24 left-4 md:left-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Packs
      </Button>
      <header>
        <h1 className="text-4xl font-headline font-bold text-primary-foreground mb-2">Opening: {packData.name}</h1>
        <p className="text-lg text-muted-foreground">{packData.series}</p>
      </header>

      {stage === 'initial' && (
        <div className="flex flex-col items-center space-y-6">
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
         <div className="flex flex-col items-center space-y-6 py-10">
          <Image
            src={packData.image}
            alt="Opening pack"
            width={250}
            height={350}
            className="object-cover rounded-lg shadow-xl border-4 border-accent animate-pack-shake"
            data-ai-hint={packData.dataAiHint || packData.name}
            priority
          />
          <p className="text-2xl font-semibold text-primary-foreground animate-pulse">Opening Pack...</p>
        </div>
      )}
      
      {stage === 'stack-reveal' && openedCards.length > 0 && (
        <div className="flex flex-col items-center space-y-6 py-6">
          <h2 className="text-2xl font-headline font-semibold text-primary-foreground mb-4">Click the card to reveal the next one!</h2>
          <div 
            className="relative w-[240px] h-[336px] mx-auto cursor-pointer select-none" // Added select-none
            onClick={!currentSwipingCard ? handleRevealNextCard : undefined}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if(e.key === 'Enter' || e.key === ' ') { if(!currentSwipingCard) handleRevealNextCard(); }}} // Accessibility
            aria-label="Reveal next card"
          >
            {openedCards.map((card, index) => {
              if (index < currentStackIndex && (!currentSwipingCard || currentSwipingCard.id !== card.id)) return null;

              const isTopCardForInteraction = index === currentStackIndex && !currentSwipingCard;
              const isBeingSwiped = currentSwipingCard && currentSwipingCard.id === card.id;
              
              let cardTransform = 'none';
              let cardOpacity = 1;
              const cardZIndex = openedCards.length - index; // Base z-index

              if (!isBeingSwiped && index > currentStackIndex) {
                const offset = (index - currentStackIndex) * 6; // px offset for cards underneath
                const scale = 1 - (index - currentStackIndex) * 0.05;
                cardTransform = `translateY(${offset}px) translateX(${offset/2}px) scale(${scale})`;
                if (index > currentStackIndex + 3) { // Only show a few cards in stack, fade out deeper ones
                    cardOpacity = Math.max(0, 1 - (index - (currentStackIndex + 3)) * 0.3);
                }
              }
              
              return (
                <div
                  key={card.id + '-stack-' + index}
                  className={cn(
                    "absolute top-0 left-0 w-[240px] h-[336px]", // Ensure div matches card dimensions
                    "transition-all duration-300 ease-in-out", // Smooth transitions for stacking
                    isBeingSwiped && currentSwipingCard?.direction === 'left' ? 'animate-swipe-out-left' : '',
                    isBeingSwiped && currentSwipingCard?.direction === 'right' ? 'animate-swipe-out-right' : '',
                  )}
                  style={{
                    transform: cardTransform,
                    zIndex: isBeingSwiped ? openedCards.length + 1 : cardZIndex, // Swiping card on very top
                    opacity: isBeingSwiped ? 1 : cardOpacity, // Swiping card is fully opaque
                  }}
                >
                  <CardComponent
                    card={card}
                    // Prevent CardComponent's own onClick if it's not the top interactive card
                    onClick={undefined} 
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stage === 'all-revealed' && (
        <>
          <h2 className="text-2xl font-headline font-semibold text-primary-foreground">Your Cards!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {openedCards.map((card, index) => (
              <CardComponent
                key={card.id + '-' + index + '-grid'}
                card={card}
                onClick={() => handleCardClickForModal(card)}
                className="opacity-100" 
              />
            ))}
          </div>
        </>
      )}

      {(stage === 'all-revealed' || stage === 'stack-reveal' && currentStackIndex >= openedCards.length) && ( // Show buttons once all cards are revealed or stack done
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
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
