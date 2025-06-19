
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPackById } from '@/lib/pack-data';
import { allCards } from '@/lib/pokemon-data'; 
import type { PokemonPack, PokemonCard, CardRarity } from '@/lib/types';
import { CardComponent } from '@/components/card-component';
import { Button } from '@/components/ui/button';
import { usePokedex } from '@/hooks/use-pokedex';
import { CardDetailModal } from '@/components/card-detail-modal';
import { ArrowLeft, PackageOpen, Eye, PackagePlus, Package, FastForward } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type PackOpeningStage = 'initial' | 'opening' | 'stack-reveal' | 'all-revealed' | 'transitioning';

const NUM_BURST_PARTICLES = 12;

export default function PackOpeningPage() {
  const router = useRouter();
  const params = useParams();
  const packId = params.packId as string;
  
  const [packData, setPackData] = useState<PokemonPack | null>(null);
  
  const [openedCards, setOpenedCards] = useState<PokemonCard[]>([]); 
  const [allOpenedCardsInSession, setAllOpenedCardsInSession] = useState<PokemonCard[]>([]);

  const [stage, setStage] = useState<PackOpeningStage>('initial');
  
  const { addCardsToCollection, isLoaded: pokedexLoaded, getCollectedCount } = usePokedex();
  const [selectedCardForModal, setSelectedCardForModal] = useState<PokemonCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentStackIndex, setCurrentStackIndex] = useState(0);
  const [currentSwipingCard, setCurrentSwipingCard] = useState<{ id: string, direction: 'left' | 'right' } | null>(null);
  
  const [hasHolo, setHasHolo] = useState(false); // Retained for general visual effect, might need specific logic for new rarities
  const [hasRareNonHolo, setHasRareNonHolo] = useState(false); // Retained, might need specific logic for new rarities
  const [currentBurstRarity, setCurrentBurstRarity] = useState<CardRarity | null>(null);

  const [isProcessingBulk, setIsProcessingBulk] = useState(false);
  const [currentPackInBulkLoop, setCurrentPackInBulkLoop] = useState(0); 
  const [totalPacksInBulkLoop, setTotalPacksInBulkLoop] = useState(0);
  const [displayPackCountText, setDisplayPackCountText] = useState("");
  
  const [isReadyToProcessLoop, setIsReadyToProcessLoop] = useState(false);
  const [isSkippingAnimations, setIsSkippingAnimations] = useState(false);


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

  const pullCardsForOnePack = useCallback((): PokemonCard[] => {
    if (!packData) return [];

    if (packData.id === 'destined-rivals-booster-001') {
      const packCards: PokemonCard[] = [];
      const pulledIds = new Set<string>();
      // Ensure we are only pulling from cards designated for this pack
      const availableCardsInSeries = allCards.filter(card => 
        packData.possibleCards.includes(card.id) && card.series === packData.series
      );

      const pullAndAddCardByRarity = (targetRarity: CardRarity, count: number): void => {
        for (let i = 0; i < count; i++) {
          if (packCards.length >= packData.cardsPerPack) break;
          const potentialCards = availableCardsInSeries.filter(c => c.rarity === targetRarity && !pulledIds.has(c.id));
          if (potentialCards.length > 0) {
            const card = potentialCards[Math.floor(Math.random() * potentialCards.length)];
            packCards.push(card);
            pulledIds.add(card.id);
          }
        }
      };

      // 1. Pull first 6 cards (3 Common, 2 Uncommon, 1 Rare)
      pullAndAddCardByRarity('Common', 3);
      pullAndAddCardByRarity('Uncommon', 2);
      pullAndAddCardByRarity('Rare', 1); // Basic 'Rare'

      // 2. Pull next 4 "hit" cards
      const hitRarityPool: { rarity: CardRarity; weight: number }[] = [
        { rarity: 'Hyper Rare', weight: 3 },
        { rarity: 'Special Illustration Rare', weight: 7 },
        { rarity: 'Illustration Rare', weight: 10 },
        { rarity: 'Ultra Rare', weight: 20 },
        { rarity: 'Double Rare', weight: 25 },
        { rarity: 'Rare', weight: 35 }, // Chance for an additional basic Rare
      ];
      const totalWeight = hitRarityPool.reduce((sum, item) => sum + item.weight, 0);
      
      const hitsToPull = packData.cardsPerPack - packCards.length;

      for (let i = 0; i < hitsToPull; i++) {
        if (packCards.length >= packData.cardsPerPack) break;

        let randomWeight = Math.random() * totalWeight;
        let chosenRarity: CardRarity | null = null;

        for (const item of hitRarityPool) {
          if (randomWeight < item.weight) {
            chosenRarity = item.rarity;
            break;
          }
          randomWeight -= item.weight;
        }
        if (!chosenRarity) chosenRarity = 'Rare'; // Fallback, though sum of weights should cover

        let pulledHitCard: PokemonCard | undefined;
        const potentialHitCards = availableCardsInSeries.filter(c => c.rarity === chosenRarity && !pulledIds.has(c.id));
        if (potentialHitCards.length > 0) {
          pulledHitCard = potentialHitCards[Math.floor(Math.random() * potentialHitCards.length)];
        }

        // Fallback for hit slot if specific chosenRarity not found or already depleted
        if (!pulledHitCard) {
          const fallbackRaritiesSequence: CardRarity[] = ['Ultra Rare', 'Double Rare', 'Rare', 'Uncommon', 'Common'];
          for (const fr of fallbackRaritiesSequence) {
            // Avoid re-trying chosenRarity if it was in this sequence
            if (fr === chosenRarity && potentialHitCards.length === 0) continue; 
            const potentialFallbackCards = availableCardsInSeries.filter(c => c.rarity === fr && !pulledIds.has(c.id));
            if (potentialFallbackCards.length > 0) {
              pulledHitCard = potentialFallbackCards[Math.floor(Math.random() * potentialFallbackCards.length)];
              break; 
            }
          }
        }
        
        if (pulledHitCard) {
          packCards.push(pulledHitCard);
          pulledIds.add(pulledHitCard.id);
        }
      }

      // 3. Final fill if pack is still not full
      let fillAttempts = 0;
      while (packCards.length < packData.cardsPerPack && fillAttempts < 20) {
        const remainingInSeries = availableCardsInSeries.filter(c => !pulledIds.has(c.id));
        if (remainingInSeries.length === 0) break;
        const fillCard = remainingInSeries[Math.floor(Math.random() * remainingInSeries.length)];
        packCards.push(fillCard);
        pulledIds.add(fillCard.id);
        fillAttempts++;
      }
      return packCards;

    } else {
      // Existing logic for other packs
      const packCards: PokemonCard[] = [];
      const availableCardsInPack = allCards.filter(card => packData.possibleCards.includes(card.id));
      
      const pullCardByRarity = (rarity: CardRarity, excludeIds: Set<string>): PokemonCard | undefined => {
        const potentialCards = availableCardsInPack.filter(c => c.rarity === rarity && !excludeIds.has(c.id));
        if (potentialCards.length === 0) return undefined;
        return potentialCards[Math.floor(Math.random() * potentialCards.length)];
      };
      
      const pulledIds = new Set<string>();

      let rareSlotCard: PokemonCard | undefined;
      // In old sets, "Holo Rare" was a distinct pull category. For newer sets with more granular rarities, this might need adjustment if not 'destined-rivals'.
      // For simplicity, we'll keep the 30% Holo Rare chance for non-DRI packs.
      const isHoloAttempt = Math.random() < 0.30; 
      if (isHoloAttempt) {
        rareSlotCard = pullCardByRarity('Holo Rare', pulledIds);
      }
      if (!rareSlotCard) { 
        rareSlotCard = pullCardByRarity('Rare', pulledIds);
      }
      // Broader fallback for rare slot if specific rarities not found
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
        // Prioritize common/uncommon for filling, then any card.
        let card = pullCardByRarity('Common', pulledIds) || pullCardByRarity('Uncommon', pulledIds) || remainingCardsForPool[Math.floor(Math.random() * remainingCardsForPool.length)];
        
        if (card) {
          packCards.push(card);
          pulledIds.add(card.id);
        }
        attempts++;
      }
      return packCards;
    }
  }, [packData]);


  const processPackLoopIteration = useCallback(async () => {
    if (isSkippingAnimations || !packData) return;

    if (currentPackInBulkLoop >= totalPacksInBulkLoop) {
        setOpenedCards(allOpenedCardsInSession); 
        
        // Update background based on all cards in session for bulk opening
        const finalHighestRarity = allOpenedCardsInSession.reduce((highest, card) => {
            const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];
            return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
        }, 'Common' as CardRarity);

        setHasHolo(finalHighestRarity === 'Hyper Rare' || finalHighestRarity === 'Special Illustration Rare' || finalHighestRarity === 'Illustration Rare' || finalHighestRarity === 'Ultra Rare');
        setHasRareNonHolo(finalHighestRarity === 'Double Rare' || (finalHighestRarity === 'Rare' && !hasHolo));


        setIsProcessingBulk(false);
        setStage('all-revealed');
        return;
    }

    setDisplayPackCountText(isProcessingBulk ? `Opening pack ${currentPackInBulkLoop + 1} of ${totalPacksInBulkLoop}...` : "Opening Pack...");
    setStage('opening'); 
    setCurrentStackIndex(0); 

    const currentSinglePackCards = pullCardsForOnePack();

    setAllOpenedCardsInSession(prev => [...prev, ...currentSinglePackCards]);
    if (pokedexLoaded) {
      addCardsToCollection(currentSinglePackCards.map(c => c.id));
    }
    
    // Determine background based on highest rarity in the *current single pack*
    const currentPackHighestRarity = currentSinglePackCards.reduce((highest, card) => {
        const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];
        return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
    }, 'Common' as CardRarity);
    
    setHasHolo(currentPackHighestRarity === 'Hyper Rare' || currentPackHighestRarity === 'Special Illustration Rare' || currentPackHighestRarity === 'Illustration Rare' || currentPackHighestRarity === 'Ultra Rare');
    setHasRareNonHolo(currentPackHighestRarity === 'Double Rare' || (currentPackHighestRarity === 'Rare' && !hasHolo));
    
    setOpenedCards(currentSinglePackCards); 

    await new Promise(resolve => setTimeout(resolve, 700)); 
    if (isSkippingAnimations) return; 
    
    setStage('stack-reveal'); 

  }, [
    currentPackInBulkLoop, 
    totalPacksInBulkLoop, 
    packData, 
    pullCardsForOnePack, 
    addCardsToCollection, 
    isProcessingBulk, 
    pokedexLoaded, 
    allOpenedCardsInSession,
    isSkippingAnimations,
    hasHolo // Include hasHolo to ensure background effect logic uses updated state
  ]);

  const initiateOpeningProcess = useCallback((numPacksToOpen: number) => {
    if (!packData || !pokedexLoaded || numPacksToOpen <= 0) {
        return;
    }
 
    setIsProcessingBulk(numPacksToOpen > 1);
    setTotalPacksInBulkLoop(numPacksToOpen);
    setCurrentPackInBulkLoop(0); 
    setAllOpenedCardsInSession([]); 
    setOpenedCards([]); 
    setCurrentStackIndex(0);
    setCurrentSwipingCard(null);
    setHasHolo(false);
    setHasRareNonHolo(false);
    setCurrentBurstRarity(null);
    setDisplayPackCountText("");
    setIsSkippingAnimations(false); 
    
    setIsReadyToProcessLoop(true); 

  }, [packData, pokedexLoaded]);

  useEffect(() => {
    if (isReadyToProcessLoop && !isSkippingAnimations) {
      const fn = async () => {
        await processPackLoopIteration();
      };
      fn();
      setIsReadyToProcessLoop(false); 
    }
  }, [isReadyToProcessLoop, processPackLoopIteration, isSkippingAnimations]);


  const handleRevealNextCard = () => {
    if (isSkippingAnimations) return;
    if (stage !== 'stack-reveal' || currentStackIndex >= openedCards.length || currentSwipingCard || currentBurstRarity) {
      if (stage === 'stack-reveal' && currentStackIndex >= openedCards.length && openedCards.length === 0 && !isProcessingBulk && !currentSwipingCard && !currentBurstRarity) {
          setIsProcessingBulk(false); 
          setStage('all-revealed');
          return;
      }
      return;
    }

    const cardToSwipe = openedCards[currentStackIndex];
    
    // Check for high-tier rarities for burst effect
    const highTierRaritiesForBurst: CardRarity[] = ['Hyper Rare', 'Special Illustration Rare', 'Illustration Rare', 'Ultra Rare', 'Double Rare'];
    if (highTierRaritiesForBurst.includes(cardToSwipe.rarity) || (cardToSwipe.rarity === 'Rare' && packData?.id === 'base-set-booster-001')) { // Base set Rare can be Holo
      setCurrentBurstRarity(cardToSwipe.rarity);
      setTimeout(() => {
        setCurrentBurstRarity(null);
      }, 1000); 
    }

    const swipeDirection = Math.random() < 0.5 ? 'left' : 'right';
    setCurrentSwipingCard({ id: cardToSwipe.id, direction: swipeDirection });

    setTimeout(() => {
      if (isSkippingAnimations) return; 
      const nextIndex = currentStackIndex + 1;
      setCurrentStackIndex(nextIndex);
      setCurrentSwipingCard(null); 

      if (nextIndex >= openedCards.length) { 
        if (isProcessingBulk) {
            setHasHolo(false); 
            setHasRareNonHolo(false);
            setStage('transitioning'); 
            setTimeout(() => {
                if (isSkippingAnimations) return; 
                setCurrentPackInBulkLoop(prev => prev + 1); 
                setIsReadyToProcessLoop(true); 
            }, 2000); 
        } else { 
            setIsProcessingBulk(false); 
            setStage('all-revealed'); 
        }
      }
    }, 500); 
  };

  const handleSkipToResults = () => {
    if (!packData || isSkippingAnimations) return;
  
    setIsSkippingAnimations(true);
  
    let skippedCardsAccumulator = [...allOpenedCardsInSession];
    // If cards for current pack iteration were already pulled but not added to allOpenedCardsInSession yet, add them.
    // This depends on whether `openedCards` (current single pack) is already populated before skip.
    // Assuming `openedCards` would have been the current pack's cards if not skipped:
    if (stage === 'opening' || stage === 'stack-reveal') {
       if (openedCards.length > 0 && currentPackInBulkLoop < totalPacksInBulkLoop) {
           // check if these cards are already in allOpenedCardsInSession to avoid duplicates
           const currentPackCardIds = new Set(openedCards.map(c => c.id));
           const sessionCardIds = new Set(allOpenedCardsInSession.map(c => c.id));
           let newCardsForSession = openedCards.filter(c => !sessionCardIds.has(c.id));

            // A more robust check might be needed if `allOpenedCardsInSession` is updated immediately in `processPackLoopIteration`.
            // For simplicity here, assume if `openedCards` are for the current loop, they should be added if not already part of the session history.
           if (newCardsForSession.length > 0) { // Add only if not already part of bulk history
                skippedCardsAccumulator.push(...newCardsForSession);
                if (pokedexLoaded) {
                    addCardsToCollection(newCardsForSession.map(c => c.id));
                }
           }
       }
    }
  
    const additionalPacksToSimulate = Math.max(0, totalPacksInBulkLoop - (currentPackInBulkLoop + (stage === 'initial' ? 0 : 1) ));
  
    for (let i = 0; i < additionalPacksToSimulate; i++) {
      const cardsFromSkippedPack = pullCardsForOnePack();
      skippedCardsAccumulator.push(...cardsFromSkippedPack);
      if (pokedexLoaded) {
        addCardsToCollection(cardsFromSkippedPack.map(c => c.id));
      }
    }
  
    setAllOpenedCardsInSession(skippedCardsAccumulator);
    setOpenedCards(skippedCardsAccumulator); 
  
    const finalHighestRarity = skippedCardsAccumulator.reduce((highest, card) => {
        const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];
        return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
    }, 'Common' as CardRarity);

    setHasHolo(finalHighestRarity === 'Hyper Rare' || finalHighestRarity === 'Special Illustration Rare' || finalHighestRarity === 'Illustration Rare' || finalHighestRarity === 'Ultra Rare');
    setHasRareNonHolo(finalHighestRarity === 'Double Rare' || (finalHighestRarity === 'Rare' && !hasHolo));
  
    setStage('all-revealed');
    setIsProcessingBulk(false);
    setCurrentPackInBulkLoop(totalPacksInBulkLoop); 
    setIsSkippingAnimations(false); 
  };


  const handleCardClickForModal = (card: PokemonCard) => {
    setSelectedCardForModal(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCardForModal(null);
  };
  
  const resetPackOpening = (numPacks: number = 1) => {
    setStage('initial');
    setOpenedCards([]);
    setAllOpenedCardsInSession([]);
    setCurrentStackIndex(0);
    setCurrentSwipingCard(null);
    setHasHolo(false);
    setHasRareNonHolo(false);
    setCurrentBurstRarity(null);
    
    setIsProcessingBulk(false);
    setCurrentPackInBulkLoop(0);
    setTotalPacksInBulkLoop(0);
    setDisplayPackCountText("");
    setIsReadyToProcessLoop(false);
    setIsSkippingAnimations(false);

    if (numPacks > 0) {
      setTimeout(() => initiateOpeningProcess(numPacks), 100);
    }
  }

  if (!pokedexLoaded || !packData) {
     return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lg dark:text-foreground">Loading Pack Data...</p>
      </div>
    );
  }
  
  // Determine background based on highest rarity in current view (single pack or bulk results)
  const cardsForBackgroundEffect = (stage === 'all-revealed' && allOpenedCardsInSession.length > 0) ? allOpenedCardsInSession : openedCards;
  const highestRarityForEffect = cardsForBackgroundEffect.reduce((highest, card) => {
      const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];
      return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
  }, 'Common' as CardRarity);

  const showHoloVisualEffect = highestRarityForEffect === 'Hyper Rare' || highestRarityForEffect === 'Special Illustration Rare' || highestRarityForEffect === 'Illustration Rare' || highestRarityForEffect === 'Ultra Rare';
  const showRareVisualEffect = !showHoloVisualEffect && (highestRarityForEffect === 'Double Rare' || highestRarityForEffect === 'Rare');


  let backButtonText = "Back to Packs";
  if (isProcessingBulk && stage !== 'initial' && stage !== 'all-revealed') {
    backButtonText = "Back & Stop Opening";
  }


  return (
    <div className={cn(
        "transition-colors duration-1000 flex flex-col min-h-[calc(100vh-10rem)]", 
        (showHoloVisualEffect && (stage === 'opening' || stage === 'stack-reveal' || stage === 'all-revealed') && stage !== 'transitioning') && "holo-blue-wave-background-active animate-holo-blue-wave-shimmer",
        (showRareVisualEffect && (stage === 'opening' || stage === 'stack-reveal' || stage === 'all-revealed') && stage !== 'transitioning') && "rare-gold-holo-background-active animate-rare-gold-shimmer",
        (stage === 'transitioning') && "bg-background" 
      )}>
      <Button variant="outline" onClick={() => router.push('/')} className="absolute top-24 left-4 md:left-8 z-10">
        <ArrowLeft className="mr-2 h-4 w-4" /> {backButtonText}
      </Button>
      {isProcessingBulk && (stage === 'opening' || stage === 'stack-reveal' || stage === 'transitioning') && !isSkippingAnimations && (
        <Button
          variant="outline"
          onClick={handleSkipToResults}
          className="absolute top-24 right-4 md:right-8 z-10"
        >
          <FastForward className="mr-2 h-4 w-4" /> Skip to Results
        </Button>
      )}
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
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              onClick={() => setTimeout(() => initiateOpeningProcess(1), 50)} 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
              disabled={!pokedexLoaded || !packData}
            >
              <Package className="mr-2 h-6 w-6" /> Open 1 Booster Pack
            </Button>
            <Button 
              size="lg" 
              onClick={() => setTimeout(() => initiateOpeningProcess(10), 50)} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
              disabled={!pokedexLoaded || !packData}
            >
              <PackagePlus className="mr-2 h-6 w-6" /> Open 10 Booster Packs
            </Button>
          </div>
        </div>
      )}

      {stage === 'opening' && (
         <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
          {!isProcessingBulk && packData && ( 
            <>
              <Image
                src={packData.image}
                alt="Opening pack"
                width={250}
                height={350}
                className="object-cover rounded-lg shadow-xl border-4 border-accent animate-opening-pack-burst"
                data-ai-hint={packData.dataAiHint || packData.name}
                priority
              />
            </>
          )}
           <p className="text-2xl font-semibold text-primary-foreground dark:text-foreground animate-pulse">
                {displayPackCountText}
            </p>
        </div>
      )}
      
      {stage === 'transitioning' && isProcessingBulk && (
        <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
            <p className="text-2xl font-semibold text-primary-foreground dark:text-foreground animate-pulse">
                Gotta Catch 'em all!
            </p>
        </div>
      )}
      
      {stage === 'stack-reveal' && (
        <div className="flex flex-col items-center justify-center flex-grow relative"> 
          {isProcessingBulk && (
            <p className="text-xl font-semibold text-primary-foreground dark:text-foreground mb-4">
              {`Pack ${currentPackInBulkLoop + 1} of ${totalPacksInBulkLoop}`}
            </p>
          )}
          {currentBurstRarity && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <div className="relative w-1 h-1">
                {Array.from({ length: NUM_BURST_PARTICLES }).map((_, i) => {
                  const angle = (i / NUM_BURST_PARTICLES) * 360;
                  // More dynamic particle coloring based on a broader range of high rarities
                  const isVeryHighTier = ['Hyper Rare', 'Special Illustration Rare'].includes(currentBurstRarity!);
                  const isHighTier = ['Illustration Rare', 'Ultra Rare'].includes(currentBurstRarity!);
                  
                  let particleColor = 'bg-yellow-400'; // Default for Rare/Double Rare
                  if (isVeryHighTier) {
                     particleColor = ['bg-purple-400', 'bg-pink-400', 'bg-cyan-300', 'bg-yellow-200'][i % 4];
                  } else if (isHighTier) {
                     particleColor = ['bg-teal-300', 'bg-sky-300', 'bg-indigo-300'][i % 3];
                  } else if (currentBurstRarity === 'Double Rare') {
                     particleColor = ['bg-blue-400', 'bg-slate-300'][i % 2];
                  }

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
          {openedCards.length > 0 ? (
            <div 
              className="relative w-[240px] h-[336px] mx-auto cursor-pointer select-none z-10 animate-stack-arrive" 
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
                    key={card.id + '-stack-' + index + '-' + Math.random()}
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
          ) : (
            <div 
              className="relative w-[240px] h-[336px] mx-auto cursor-pointer select-none z-10 flex items-center justify-center text-muted-foreground animate-stack-arrive" 
              onClick={!currentSwipingCard && !currentBurstRarity ? handleRevealNextCard : undefined}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if(e.key === 'Enter' || e.key === ' ') { if(!currentSwipingCard && !currentBurstRarity) handleRevealNextCard(); }}} 
              aria-label="Advance from empty pack"
            >
              (Empty pack)
            </div>
          )}
        </div>
      )}

      {stage === 'all-revealed' && (
        <div className="flex-grow flex flex-col items-center justify-center">
          {allOpenedCardsInSession.length > 0 && (
            <>
              <h2 className="text-2xl font-headline font-semibold text-primary-foreground dark:text-foreground mb-4">
                {totalPacksInBulkLoop > 1 ? `Your ${totalPacksInBulkLoop} Packs Yielded` : 'Your Cards!'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 justify-items-center">
                {allOpenedCardsInSession.map((card, index) => (
                  <CardComponent
                    key={card.id + '-' + index + '-grid'} 
                    card={card}
                    onClick={() => handleCardClickForModal(card)}
                    showDetails={true}
                    collectedCount={getCollectedCount(card.id)} 
                  />
                ))}
              </div>
            </>
           )}
        </div>
      )}

      {(stage === 'all-revealed' || (stage === 'stack-reveal' && currentStackIndex >= openedCards.length && openedCards.length === 0 && !isProcessingBulk )) && (
        <div className="mt-auto py-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-5">
          <Button size="lg" onClick={() => resetPackOpening(1)} variant="outline">
            <Package className="mr-2 h-5 w-5" /> Open Another Pack
          </Button>
          {packData && packData.possibleCards.length >= 10 && ( 
             <Button size="lg" onClick={() => resetPackOpening(10)} variant="outline">
                <PackagePlus className="mr-2 h-5 w-5" /> Open 10 More Packs
            </Button>
          )}
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
    

  

    

    

