
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPackById, allCards } from '@/lib/pokemon-data'; // getCardById not used here
import type { PokemonPack, PokemonCard, CardRarity } from '@/lib/types';
import { CardComponent } from '@/components/card-component';
import { Button } from '@/components/ui/button';
import { usePokedex } from '@/hooks/use-pokedex';
import { CardDetailModal } from '@/components/card-detail-modal';
import { ArrowLeft, PackageOpen, Shuffle, Eye } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

type PackOpeningStage = 'initial' | 'opening' | 'revealing' | 'revealed';

export default function PackOpeningPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const packId = params.packId as string;
  
  const [packData, setPackData] = useState<PokemonPack | null>(null);
  const [openedCards, setOpenedCards] = useState<PokemonCard[]>([]);
  const [stage, setStage] = useState<PackOpeningStage>('initial');
  const [revealedCount, setRevealedCount] = useState(0);
  
  const { addCardsToCollection, isLoaded: pokedexLoaded } = usePokedex();
  const [selectedCardForModal, setSelectedCardForModal] = useState<PokemonCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

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
    if (!packData || !pokedexLoaded) return; // Ensure pokedex is loaded to avoid race conditions with collection update

    setStage('opening');
    setOpenedCards([]);
    setRevealedCount(0);

    setTimeout(() => {
      const packCards: PokemonCard[] = [];
      const availableCardsInPack = allCards.filter(card => packData.possibleCards.includes(card.id));
      
      const pullCardByRarity = (rarity: CardRarity, excludeIds: Set<string>): PokemonCard | undefined => {
        const potentialCards = availableCardsInPack.filter(c => c.rarity === rarity && !excludeIds.has(c.id));
        if (potentialCards.length === 0) return undefined;
        return potentialCards[Math.floor(Math.random() * potentialCards.length)];
      };
      
      const pulledIds = new Set<string>();

      // Pull rare/holo rare for the rare slot
      for (let i = 0; i < packData.rarityDistribution.rareSlot; i++) {
        // ~1 in 3 chance for a Holo Rare from Base Set in the rare slot based on typical pull rates
        // Wizards of the Coast era packs had roughly 1 holo per 3 packs.
        // So, a rare slot has about a 1/3 chance of being holo if there are 16 holos and 16 non-holo rares.
        // Actual odds are more complex based on print runs. Let's use a simpler 30% chance for holo.
        const isHolo = Math.random() < 0.30; 
        let card = pullCardByRarity(isHolo ? 'Holo Rare' : 'Rare', pulledIds);
        if (!card) card = pullCardByRarity(isHolo ? 'Rare' : 'Holo Rare', pulledIds); // Try other if first fails
        // Fallback to any rare type if specific is exhausted
        if (!card) card = availableCardsInPack.find(c => (c.rarity === 'Rare' || c.rarity === 'Holo Rare') && !pulledIds.has(c.id));
        // Final fallback to any card if still no rare found (shouldn't happen with enough cards)
        if (!card) card = availableCardsInPack.find(c => !pulledIds.has(c.id));


        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }

      // Pull uncommons
      for (let i = 0; i < packData.rarityDistribution.uncommon; i++) {
        let card = pullCardByRarity('Uncommon', pulledIds);
        if (!card) card = availableCardsInPack.find(c => c.rarity === 'Uncommon' && !pulledIds.has(c.id)); // Fallback if random fails
        if (!card) card = availableCardsInPack.find(c => !pulledIds.has(c.id) && c.rarity !== 'Holo Rare' && c.rarity !== 'Rare'); // Broader fallback

        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }
      
      // Pull commons (including basic energies/trainers which are common)
      for (let i = 0; i < packData.rarityDistribution.common; i++) {
        let card = pullCardByRarity('Common', pulledIds);
         if (!card) card = availableCardsInPack.find(c => c.rarity === 'Common' && !pulledIds.has(c.id)); // Fallback
         if (!card) card = availableCardsInPack.find(c => !pulledIds.has(c.id)); // Broadest fallback

        if (card) { packCards.push(card); pulledIds.add(card.id); }
      }
      
      // Fill remaining slots if any, ensuring total cardsPerPack, respecting rarity if possible
      let attempts = 0; // safety break for infinite loop
      while(packCards.length < packData.cardsPerPack && pulledIds.size < availableCardsInPack.length && attempts < 20) {
        const remainingCardsForPool = availableCardsInPack.filter(c => !pulledIds.has(c.id));
        if(remainingCardsForPool.length === 0) break;
        // Try to pull commons first for remaining slots
        let card = pullCardByRarity('Common', pulledIds) || pullCardByRarity('Uncommon', pulledIds) || remainingCardsForPool[Math.floor(Math.random() * remainingCardsForPool.length)];
        
        if (card) {
          packCards.push(card);
          pulledIds.add(card.id);
        }
        attempts++;
      }

      // Shuffle for reveal order
      for (let i = packCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [packCards[i], packCards[j]] = [packCards[j], packCards[i]];
      }

      setOpenedCards(packCards);
      addCardsToCollection(packCards.map(c => c.id)); // This is now async
      setStage('revealing');
    }, 1000);
  }, [packData, addCardsToCollection, pokedexLoaded, allCards]);

  useEffect(() => {
    if (stage === 'revealing' && openedCards.length > 0 && revealedCount < openedCards.length) {
      const timer = setTimeout(() => {
        setRevealedCount(prev => prev + 1);
      }, 600);
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

  if (authLoading || !pokedexLoaded || !packData) {
     return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lg">Loading Pack...</p>
      </div>
    );
  }

  if (!user) return null; // Should be redirected

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
      
      {(stage === 'revealing' || stage === 'revealed') && openedCards.length > 0 && (
        <>
          <h2 className="text-2xl font-headline font-semibold text-primary-foreground">Your Cards!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {openedCards.map((card, index) => (
              <CardComponent
                key={card.id + '-' + index}
                card={card}
                onClick={() => handleCardClick(card)}
                className={cn(index < revealedCount ? "opacity-100" : "opacity-0")}
                isRevealing={index >= revealedCount -1 && stage==='revealing'}
                animationDelay={`${0}s`}
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
