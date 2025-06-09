"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPackById, getCardById, allCards } from '@/lib/pokemon-data';
import type { PokemonPack, PokemonCard, CardRarity } from '@/lib/types';
import { CardComponent } from '@/components/card-component';
import { Button } from '@/components/ui/button';
import { usePokedex } from '@/hooks/use-pokedex';
import { CardDetailModal } from '@/components/card-detail-modal';
import { ArrowLeft, PackageOpen, Shuffle, Eye } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type PackOpeningStage = 'initial' | 'opening' | 'revealing' | 'revealed';

export default function PackOpeningPage() {
  const router = useRouter();
  const params = useParams();
  const packId = params.packId as string;
  
  const [packData, setPackData] = useState<PokemonPack | null>(null);
  const [openedCards, setOpenedCards] = useState<PokemonCard[]>([]);
  const [stage, setStage] = useState<PackOpeningStage>('initial');
  const [revealedCount, setRevealedCount] = useState(0);
  
  const { addCardsToCollection } = usePokedex();
  const [selectedCardForModal, setSelectedCardForModal] = useState<PokemonCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (packId) {
      const pack = getPackById(packId);
      if (pack) {
        setPackData(pack);
      } else {
        router.push('/'); // Redirect if pack not found
      }
    }
  }, [packId, router]);

  const openPack = useCallback(() => {
    if (!packData) return;

    setStage('opening');
    setOpenedCards([]);
    setRevealedCount(0);

    // Simulate pack opening animation delay
    setTimeout(() => {
      const packCards: PokemonCard[] = [];
      const availableCardsInPack = allCards.filter(card => packData.possibleCards.includes(card.id));
      
      const pullCardByRarity = (rarity: CardRarity, excludeIds: Set<string>): PokemonCard | undefined => {
        const potentialCards = availableCardsInPack.filter(c => c.rarity === rarity && !excludeIds.has(c.id));
        if (potentialCards.length === 0) return undefined; // or pull any if specific rarity exhausted
        return potentialCards[Math.floor(Math.random() * potentialCards.length)];
      };
      
      const pulledIds = new Set<string>();

      // Pull commons
      for (let i = 0; i < packData.rarityDistribution.common; i++) {
        const card = pullCardByRarity('Common', pulledIds) || availableCardsInPack.filter(c => !pulledIds.has(c.id))[0]; // fallback
        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }
      // Pull uncommons
      for (let i = 0; i < packData.rarityDistribution.uncommon; i++) {
        const card = pullCardByRarity('Uncommon', pulledIds) || availableCardsInPack.filter(c => !pulledIds.has(c.id) && c.rarity !== 'Common')[0]; // fallback
        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }
      // Pull rare/holo rare
      for (let i = 0; i < packData.rarityDistribution.rareSlot; i++) {
        const isHolo = Math.random() < 0.2; // 20% chance for Holo Rare in rare slot
        const card = pullCardByRarity(isHolo ? 'Holo Rare' : 'Rare', pulledIds) 
                     || pullCardByRarity(isHolo ? 'Rare' : 'Holo Rare', pulledIds) // try other rare type
                     || availableCardsInPack.filter(c => !pulledIds.has(c.id) && (c.rarity === 'Rare' || c.rarity === 'Holo Rare'))[0]; // fallback
        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }
      
      // Fill remaining slots if any, ensuring total cardsPerPack
      while(packCards.length < packData.cardsPerPack && pulledIds.size < availableCardsInPack.length) {
        const remainingCards = availableCardsInPack.filter(c => !pulledIds.has(c.id));
        if(remainingCards.length === 0) break;
        const card = remainingCards[Math.floor(Math.random() * remainingCards.length)];
        packCards.push(card);
        pulledIds.add(card.id);
      }

      // Shuffle for reveal order
      for (let i = packCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [packCards[i], packCards[j]] = [packCards[j], packCards[i]];
      }

      setOpenedCards(packCards);
      addCardsToCollection(packCards.map(c => c.id));
      setStage('revealing');
    }, 1000); // 1 sec delay for "opening" animation
  }, [packData, addCardsToCollection]);

  useEffect(() => {
    if (stage === 'revealing' && openedCards.length > 0 && revealedCount < openedCards.length) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 600); // Stagger card reveal
      return () => clearTimeout(timer);
    } else if (stage === 'revealing' && revealedCount === openedCards.length && openedCards.length > 0) {
      setStage('revealed');
    }
  }, [stage, openedCards, revealedCount]);

  const handleCardClick = (card: PokemonCard) => {
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
    setRevealedCount(0);
  }

  if (!packData) {
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
          />
          <p className="text-2xl font-semibold text-primary-foreground animate-pulse">Opening Pack...</p>
        </div>
      )}
      
      {(stage === 'revealing' || stage === 'revealed') && openedCards.length > 0 && (
        <>
          <h2 className="text-2xl font-headline font-semibold text-primary-foreground">Your Cards!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {openedCards.map((card, index) => (
              <CardComponent
                key={card.id + '-' + index} // Ensure unique key if cards can repeat
                card={card}
                onClick={() => handleCardClick(card)}
                className={cn(index < revealedCount ? "opacity-100" : "opacity-0")}
                isRevealing={index >= revealedCount -1 && stage==='revealing'} // Animate only the card currently being revealed
                animationDelay={`${0}s`} // Cards reveal one by one based on revealedCount update
              />
            ))}
          </div>
        </>
      )}

      {stage === 'revealed' && (
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" onClick={resetPackOpening} variant="outline">
            <Shuffle className="mr-2 h-5 w-5" /> Open Another {packData.name}
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
