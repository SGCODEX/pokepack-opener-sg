
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

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

  const [hasHolo, setHasHolo] = useState(false);
  const [hasRareNonHolo, setHasRareNonHolo] = useState(false);

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
  
    const packCards: PokemonCard[] = [];
    const availableCardsInSeries = allCards.filter(card =>
      packData.possibleCards.includes(card.id) &&
      (packData.series === "Any" || card.series === packData.series)
    );
  
    // Helper to pull random cards from a pool without replacement for this specific pull
    const pullRandomFrom = (pool: PokemonCard[], count: number): PokemonCard[] => {
      const mutablePool = [...pool]; // Create a mutable copy to splice from
      const pulled: PokemonCard[] = [];
      for (let i = 0; i < count; i++) {
        if (mutablePool.length === 0) break;
        const randomIndex = Math.floor(Math.random() * mutablePool.length);
        // Splice returns an array, so we take the first element
        const card = mutablePool.splice(randomIndex, 1)[0];
        if (card) pulled.push(card);
      }
      return pulled;
    };
  
    if (packData.id === 'destined-rivals-booster-001') {
      const commonPool = availableCardsInSeries.filter(c => c.rarity === 'Common');
      const uncommonPool = availableCardsInSeries.filter(c => c.rarity === 'Uncommon');
      const rarePool = availableCardsInSeries.filter(c => c.rarity === 'Rare');
      
      packCards.push(...pullRandomFrom(commonPool, 4));
      packCards.push(...pullRandomFrom(uncommonPool, 2));
      packCards.push(...pullRandomFrom(rarePool, 1));
      
      const hitRarityPool: { rarity: CardRarity; weight: number }[] = [
        { rarity: 'Hyper Rare', weight: 6 },
        { rarity: 'Special Illustration Rare', weight: 12 },
        { rarity: 'Illustration Rare', weight: 10 },
        { rarity: 'Ultra Rare', weight: 15 },
        { rarity: 'Double Rare', weight: 25 },
        { rarity: 'Rare', weight: 30 },
      ];
      const totalWeight = hitRarityPool.reduce((sum, item) => sum + item.weight, 0);
  
      const numberOfHitSlots = 3;
      for (let i = 0; i < numberOfHitSlots; i++) {
        if (packCards.length >= packData.cardsPerPack) break;
  
        let randomWeight = Math.random() * totalWeight;
        let chosenRarity: CardRarity = 'Rare';
        for (const item of hitRarityPool) {
          if (randomWeight < item.weight) {
            chosenRarity = item.rarity;
            break;
          }
          randomWeight -= item.weight;
        }
  
        let potentialHitCards = availableCardsInSeries.filter(c => c.rarity === chosenRarity && !packCards.some(pc => pc.id === c.id));
        let pulledHitCard = pullRandomFrom(potentialHitCards, 1)[0];
  
        if (!pulledHitCard) {
          const fallbackRaritiesSequence: CardRarity[] = ['Ultra Rare', 'Double Rare', 'Rare', 'Uncommon', 'Common'];
          for (const fr of fallbackRaritiesSequence) {
            potentialHitCards = availableCardsInSeries.filter(c => c.rarity === fr && !packCards.some(pc => pc.id === c.id));
            if (potentialHitCards.length > 0) {
              pulledHitCard = pullRandomFrom(potentialHitCards, 1)[0];
              if (pulledHitCard) break;
            }
          }
        }
  
        if (pulledHitCard) {
          packCards.push(pulledHitCard);
        } else {
          const fallbackPool = availableCardsInSeries.filter(c => !packCards.some(pc => pc.id === c.id));
          const finalFallback = pullRandomFrom(fallbackPool, 1)[0];
          if(finalFallback) packCards.push(finalFallback);
        }
      }
  
    } else { // Correctly handles Base Set, Generations, and other generic packs
      const commonPool = availableCardsInSeries.filter(c => c.rarity === 'Common');
      const uncommonPool = availableCardsInSeries.filter(c => c.rarity === 'Uncommon');
      const rarePool = availableCardsInSeries.filter(c => c.rarity === 'Rare');
      const holoRarePool = availableCardsInSeries.filter(c => c.rarity === 'Holo Rare');
      const ultraRarePool = availableCardsInSeries.filter(c => c.rarity === 'Ultra Rare');
  
      // Pull commons and uncommons randomly
      packCards.push(...pullRandomFrom(commonPool, packData.rarityDistribution.common));
      packCards.push(...pullRandomFrom(uncommonPool, packData.rarityDistribution.uncommon));
  
      // Handle the rare slot
      if (packData.rarityDistribution.rareSlot > 0) {
        let rareSlotCard: PokemonCard | undefined;
        const rareSlotRoll = Math.random();
  
        // Determine the rarity to pull
        if (ultraRarePool.length > 0 && rareSlotRoll < 0.10) { // 10% chance for Ultra Rare
            rareSlotCard = pullRandomFrom(ultraRarePool, 1)[0];
        } else if (holoRarePool.length > 0 && rareSlotRoll < 0.35) { // 25% chance for Holo Rare (total 35%)
            rareSlotCard = pullRandomFrom(holoRarePool, 1)[0];
        } 
        
        // If the chosen rarity pool was empty, or it's a regular rare roll, pull from the rare pool
        if (!rareSlotCard) {
            rareSlotCard = pullRandomFrom(rarePool, 1)[0];
        }
  
        // Final fallback chain if a specific pool was empty but we still need a card
        if (!rareSlotCard) {
            rareSlotCard = pullRandomFrom(holoRarePool, 1)[0] ?? pullRandomFrom(ultraRarePool, 1)[0] ?? pullRandomFrom(rarePool, 1)[0];
        }
  
        if (rareSlotCard) {
          packCards.push(rareSlotCard);
        }
      }
    }
  
    // Final check to fill the pack if any pools were smaller than the required pull count
    let fillAttempts = 0;
    while (packCards.length < packData.cardsPerPack && fillAttempts < 10) {
      const remainingPool = availableCardsInSeries.filter(c => !packCards.some(pc => pc.id === c.id));
      if (remainingPool.length === 0) break;
      const fillCard = pullRandomFrom(remainingPool, 1)[0];
      if (fillCard) {
        packCards.push(fillCard);
      } else {
        break; // Stop if no more cards to fill with
      }
      fillAttempts++;
    }
  
    // Return the pack with its natural pull order, without shuffling.
    return packCards;
  }, [packData]);


  const processPackLoopIteration = useCallback(async () => {
    if (isSkippingAnimations || !packData) return;

    if (currentPackInBulkLoop >= totalPacksInBulkLoop) {
        setOpenedCards(allOpenedCardsInSession);

        const finalOverallHighestRarity = allOpenedCardsInSession.reduce((highest, card) => {
            const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Holo Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];
            return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
        }, 'Common' as CardRarity);

        let finalOverallHasHolo: boolean;
        let finalOverallHasRareNonHolo: boolean;

        const modernSetHoloRarities: CardRarity[] = ['Ultra Rare', 'Hyper Rare', 'Special Illustration Rare', 'Illustration Rare', 'Holo Rare'];
        const modernSetHighTierNonHolo: CardRarity[] = ['Double Rare', 'Rare'];
        
        const oldSetHoloRarities: CardRarity[] = ['Holo Rare', 'Ultra Rare']; // For Base/Generations like packs with new logic
        const oldSetHighTierNonHolo: CardRarity[] = ['Rare'];


        if (packData.id === 'destined-rivals-booster-001') {
            finalOverallHasHolo = allOpenedCardsInSession.some(c => modernSetHoloRarities.includes(c.rarity) && c.rarity !== 'Rare' && c.rarity !== 'Double Rare');
            finalOverallHasRareNonHolo = !finalOverallHasHolo && allOpenedCardsInSession.some(c => modernSetHighTierNonHolo.includes(c.rarity));
        } else {
            finalOverallHasHolo = allOpenedCardsInSession.some(c => oldSetHoloRarities.includes(c.rarity));
            finalOverallHasRareNonHolo = !finalOverallHasHolo && allOpenedCardsInSession.some(c => oldSetHighTierNonHolo.includes(c.rarity) && !oldSetHoloRarities.includes(c.rarity));
        }
        setHasHolo(finalOverallHasHolo);
        setHasRareNonHolo(finalOverallHasRareNonHolo);

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

    const currentPackHighestRarity = currentSinglePackCards.reduce((highest, card) => {
        const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Holo Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];
        return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
    }, 'Common' as CardRarity);

    let packSpecificHasHolo: boolean;
    let packSpecificHasRareNonHolo: boolean;

    const modernSetHoloRarities: CardRarity[] = ['Ultra Rare', 'Hyper Rare', 'Special Illustration Rare', 'Illustration Rare', 'Holo Rare'];
    const modernSetHighTierNonHolo: CardRarity[] = ['Double Rare', 'Rare'];
    
    const oldSetHoloRarities: CardRarity[] = ['Holo Rare', 'Ultra Rare'];
    const oldSetHighTierNonHolo: CardRarity[] = ['Rare'];

    if (packData.id === 'destined-rivals-booster-001') {
        packSpecificHasHolo = currentSinglePackCards.some(c => modernSetHoloRarities.includes(c.rarity) && c.rarity !== 'Rare' && c.rarity !== 'Double Rare');
        packSpecificHasRareNonHolo = !packSpecificHasHolo && currentSinglePackCards.some(c => modernSetHighTierNonHolo.includes(c.rarity));
    } else {
        packSpecificHasHolo = currentSinglePackCards.some(c => oldSetHoloRarities.includes(c.rarity));
        packSpecificHasRareNonHolo = !packSpecificHasHolo && currentSinglePackCards.some(c => oldSetHighTierNonHolo.includes(c.rarity) && !oldSetHoloRarities.includes(c.rarity));
    }

    setHasHolo(packSpecificHasHolo);
    setHasRareNonHolo(packSpecificHasRareNonHolo);

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
     if (stage !== 'stack-reveal' || currentStackIndex >= openedCards.length || currentSwipingCard) {
      if (stage === 'stack-reveal' && currentStackIndex >= openedCards.length && openedCards.length === 0 && !isProcessingBulk && !currentSwipingCard) {
          setIsProcessingBulk(false);
          setStage('all-revealed');
          return;
      }
      return;
    }

    const cardToSwipe = openedCards[currentStackIndex];
    const swipeDirection = Math.random() < 0.5 ? 'left' : 'right';
    setCurrentSwipingCard({ id: `${cardToSwipe.id}-stack-${currentStackIndex}`, direction: swipeDirection });


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

    if (stage === 'opening' || stage === 'stack-reveal') {
       if (openedCards.length > 0 && currentPackInBulkLoop < totalPacksInBulkLoop) {
            const currentPackCardIdsAndIndicesInSession = new Set(
                allOpenedCardsInSession.slice(allOpenedCardsInSession.length - openedCards.length)
                                     .map((c, idx) => c.id + '-' + (allOpenedCardsInSession.length - openedCards.length + idx))
            );

            let newCardsForSession = openedCards.filter((c, idx) => {
                const uniqueKey = c.id + '-' + (allOpenedCardsInSession.length - openedCards.length + idx);
                return !currentPackCardIdsAndIndicesInSession.has(uniqueKey);
            });

            if (newCardsForSession.length > 0) {
                skippedCardsAccumulator.push(...newCardsForSession);
                if (pokedexLoaded) {
                    addCardsToCollection(newCardsForSession.map(c => c.id));
                }
            } else if (openedCards.length > 0 && skippedCardsAccumulator.length === 0) {
                 if (totalPacksInBulkLoop > 0) {
                    const cardsFromInitialPack = pullCardsForOnePack();
                    skippedCardsAccumulator.push(...cardsFromInitialPack);
                    if (pokedexLoaded) {
                        addCardsToCollection(cardsFromInitialPack.map(c => c.id));
                    }
                }
            }
       } else if ((stage === 'opening' || stage === 'initial') && totalPacksInBulkLoop > 0) {
           const cardsFromFirstPack = pullCardsForOnePack();
           skippedCardsAccumulator.push(...cardsFromFirstPack);
           if (pokedexLoaded) {
               addCardsToCollection(cardsFromFirstPack.map(c => c.id));
           }
       }
    }

    let packsAlreadyAccountedFor = 0;
    if (stage !== 'initial' && currentPackInBulkLoop < totalPacksInBulkLoop) {
        packsAlreadyAccountedFor = currentPackInBulkLoop + 1;
    } else if ((stage === 'opening' || stage === 'initial') && totalPacksInBulkLoop > 0 && skippedCardsAccumulator.length >= packData.cardsPerPack) {
        packsAlreadyAccountedFor = 1;
    } else if (stage === 'opening' || stage === 'initial') {
        packsAlreadyAccountedFor = 0;
    } else {
        packsAlreadyAccountedFor = totalPacksInBulkLoop;
    }

    const additionalPacksToSimulate = Math.max(0, totalPacksInBulkLoop - packsAlreadyAccountedFor);

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
        const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Holo Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare'];
        return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
    }, 'Common' as CardRarity);

    let finalOverallHasHolo: boolean;
    let finalOverallHasRareNonHolo: boolean;

    const modernSetHoloRarities: CardRarity[] = ['Ultra Rare', 'Hyper Rare', 'Special Illustration Rare', 'Illustration Rare', 'Holo Rare'];
    const modernSetHighTierNonHolo: CardRarity[] = ['Double Rare', 'Rare'];
    
    const oldSetHoloRarities: CardRarity[] = ['Holo Rare', 'Ultra Rare'];
    const oldSetHighTierNonHolo: CardRarity[] = ['Rare'];


    if (packData.id === 'destined-rivals-booster-001') {
        finalOverallHasHolo = skippedCardsAccumulator.some(c => modernSetHoloRarities.includes(c.rarity) && c.rarity !== 'Rare' && c.rarity !== 'Double Rare');
        finalOverallHasRareNonHolo = !finalOverallHasHolo && skippedCardsAccumulator.some(c => modernSetHighTierNonHolo.includes(c.rarity));
    } else {
        finalOverallHasHolo = skippedCardsAccumulator.some(c => oldSetHoloRarities.includes(c.rarity));
        finalOverallHasRareNonHolo = !finalOverallHasHolo && skippedCardsAccumulator.some(c => oldSetHighTierNonHolo.includes(c.rarity) && !oldSetHoloRarities.includes(c.rarity));
    }

    setHasHolo(finalOverallHasHolo);
    setHasRareNonHolo(finalOverallHasRareNonHolo);

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)]"></div>
        <p className="ml-4 text-lg dark:text-foreground">Loading Pack Data...</p>
      </div>
    );
  }

  let backButtonText = "Back to Packs";
  if (isProcessingBulk && stage !== 'initial' && stage !== 'all-revealed') {
    backButtonText = "Back & Stop Opening";
  }

  const activeOpeningStages = ['opening', 'stack-reveal', 'transitioning'];


  return (
    <div className={cn(
        "relative transition-colors duration-1000 flex flex-col flex-grow",
        stage === 'all-revealed' ? 'bg-white text-black' :
        (hasHolo && (stage === 'opening' || stage === 'stack-reveal') && stage !== 'transitioning') ? 'holo-blue-wave-background-active animate-holo-blue-wave-shimmer text-white dark:text-white' :
        (hasRareNonHolo && (stage === 'opening' || stage === 'stack-reveal') && stage !== 'transitioning') ? 'rare-gold-holo-background-active animate-rare-gold-shimmer text-black dark:text-black' :
        'bg-background text-foreground'
      )}>
      <Button
        variant="outline"
        onClick={() => router.push('/pack-selection')}
        className={cn(
            "absolute top-4 left-4 z-20",
            "hover:bg-[hsl(217,91%,60%)] hover:text-white hover:border-[hsl(217,91%,60%)]",
            stage === 'all-revealed'
                ? "text-black border-black dark:text-black dark:border-black"
                : activeOpeningStages.includes(stage)
                    ? "text-white border-white" 
                    : "text-foreground border-foreground dark:border-[hsl(var(--border))]" 
        )}
      >
        <ArrowLeft className="h-4 w-4 sm:mr-2" />
        <span className="hidden sm:inline">{backButtonText}</span>
      </Button>
      {!isSkippingAnimations &&
        (stage === 'opening' || stage === 'stack-reveal' || (isProcessingBulk && stage === 'transitioning')) && stage !== 'initial' && (
        <Button
          variant="outline"
          onClick={handleSkipToResults}
          className={cn(
            "absolute top-4 right-4 z-20",
            "hover:bg-[hsl(217,91%,60%)] hover:text-white hover:border-[hsl(217,91%,60%)]",
             stage === 'all-revealed'
                ? "text-black border-black dark:text-black dark:border-black"
                : activeOpeningStages.includes(stage)
                    ? "text-white border-white" 
                    : "text-foreground border-foreground dark:border-[hsl(var(--border))]" 
          )}
          disabled={!packData}
        >
          <FastForward className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Skip to Results</span>
        </Button>
      )}
      <header className="relative z-10 pt-20 pb-2 text-center">
        <h1 className={cn(
          "text-3xl font-headline font-bold",
           stage === 'all-revealed' ? 'text-black' :
           (hasHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-white' :
           (hasRareNonHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-black' :
           'text-primary-foreground dark:text-foreground'
           )}>Pack Opening: {packData.name}</h1>
      </header>

      {stage === 'initial' && (
        <div className="flex flex-col items-center space-y-4 flex-grow justify-center">
          <Image
            src={packData.image}
            alt={packData.name}
            width={200}
            height={280}
            className="object-cover rounded-lg shadow-xl border-4 border-primary hover:animate-pack-shake"
            data-ai-hint={packData.dataAiHint || packData.name}
            priority
          />
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={() => setTimeout(() => initiateOpeningProcess(1), 50)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={!pokedexLoaded || !packData}
            >
              <Package className="mr-2 h-5 w-5" /> Open 1 Booster Pack
            </Button>
            <Button
              onClick={() => setTimeout(() => initiateOpeningProcess(10), 50)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!pokedexLoaded || !packData || packData.possibleCards.length < packData.cardsPerPack * 10 }
            >
              <PackagePlus className="mr-2 h-5 w-5" /> Open 10 Booster Packs
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
                width={200}
                height={280}
                className="object-cover rounded-lg shadow-xl border-4 border-accent animate-opening-pack-burst"
                data-ai-hint={packData.dataAiHint || packData.name}
                priority
              />
            </>
          )}
           <p className={cn(
            "text-2xl font-semibold animate-pulse",
            (hasHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-white' :
            (hasRareNonHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-black' :
            'text-primary-foreground dark:text-foreground'
            )}>
                {displayPackCountText}
            </p>
        </div>
      )}

      {stage === 'transitioning' && isProcessingBulk && (
        <div className="flex flex-col items-center space-y-6 flex-grow justify-center">
            <p className={cn(
              "text-2xl font-semibold animate-pulse",
              (hasHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-white' :
              (hasRareNonHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-black' :
              'text-primary-foreground dark:text-foreground'
            )}>
                Gotta Catch 'em all!
            </p>
        </div>
      )}

      {stage === 'stack-reveal' && (
        <div className="flex flex-col items-center justify-center flex-grow relative">
          {isProcessingBulk && (
            <p className={cn(
              "text-xl font-semibold mb-4",
              (hasHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-white' :
              (hasRareNonHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-black' :
              'text-primary-foreground dark:text-foreground'
            )}>
              {`Pack ${currentPackInBulkLoop + 1} of ${totalPacksInBulkLoop}`}
            </p>
          )}
          {openedCards.length > 0 ? (
            <div
              className="relative w-[200px] h-[280px] mx-auto cursor-pointer select-none z-10 animate-stack-arrive"
              onClick={!currentSwipingCard ? handleRevealNextCard : undefined}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if(e.key === 'Enter' || e.key === ' ') { if(!currentSwipingCard) handleRevealNextCard(); }}}
              aria-label="Reveal next card"
            >
              {openedCards.map((card, index) => {
                const uniqueCardKey = `${card.id}-stack-${index}`;
                if (index < currentStackIndex && (!currentSwipingCard || currentSwipingCard.id !== uniqueCardKey)) return null;

                const isBeingSwiped = currentSwipingCard && currentSwipingCard.id === uniqueCardKey;

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
                    key={uniqueCardKey}
                    className={cn(
                      "absolute top-0 left-0 w-full h-full",
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
                      className="w-full h-full"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={cn(
                "relative w-[200px] h-[280px] mx-auto cursor-pointer select-none z-10 flex items-center justify-center animate-stack-arrive",
                (hasHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-white/70' :
                (hasRareNonHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-black/70' :
                'text-muted-foreground'
              )}
              onClick={!currentSwipingCard ? handleRevealNextCard : undefined}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if(e.key === 'Enter' || e.key === ' ') { if(!currentSwipingCard) handleRevealNextCard(); }}}
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
              <h2 className="text-xl font-headline font-semibold text-black mb-4">
                {totalPacksInBulkLoop > 1 ? `Your ${totalPacksInBulkLoop} Packs Yielded` : 'Your Cards!'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 justify-items-center">
                {allOpenedCardsInSession.map((card, index) => (
                  <CardComponent
                    key={`${card.id}-grid-${index}`}
                    card={card}
                    onClick={() => handleCardClickForModal(card)}
                    showDetails={true}
                    collectedCount={getCollectedCount(card.id)}
                    className="w-36"
                  />
                ))}
              </div>
            </>
           )}
        </div>
      )}

      {(stage === 'all-revealed' || (stage === 'stack-reveal' && currentStackIndex >= openedCards.length && openedCards.length === 0 && !isProcessingBulk )) && (
        <div className="mt-auto py-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-5">
          <Button
            onClick={() => resetPackOpening(1)}
            variant="outline"
            className={cn(
              "hover:bg-[hsl(217,91%,60%)] hover:text-white hover:border-[hsl(217,91%,60%)]",
              stage === 'all-revealed' 
                ? "text-black border-black dark:text-black dark:border-black"
                : activeOpeningStages.includes(stage) && (hasHolo || hasRareNonHolo)
                    ? "text-white border-white" 
                    : "text-foreground border-foreground" 
            )}
          >
            <Package className="mr-2 h-5 w-5" /> Open Another Pack
          </Button>
          {packData && packData.possibleCards.length >= packData.cardsPerPack * 10 && (
             <Button
                onClick={() => resetPackOpening(10)}
                variant="outline"
                className={cn(
                  "hover:bg-[hsl(217,91%,60%)] hover:text-white hover:border-[hsl(217,91%,60%)]",
                  stage === 'all-revealed' 
                    ? "text-black border-black dark:text-black dark:border-black"
                    : activeOpeningStages.includes(stage) && (hasHolo || hasRareNonHolo)
                        ? "text-white border-white" 
                        : "text-foreground border-foreground" 
                )}
              >
                <PackagePlus className="mr-2 h-5 w-5" /> Open 10 More Packs
            </Button>
          )}
          <Button
            onClick={() => router.push('/pack-selection')}
            className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white"
          >
            <Package className="mr-2 h-5 w-5" /> Back to Packs
          </Button>
          <Button
            onClick={() => router.push('/pokedex')}
            className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white"
          >
            <Eye className="mr-2 h-5 w-5" /> View Pokedex
          </Button>
        </div>
      )}

      {selectedCardForModal && (
        <CardDetailModal
          card={selectedCardForModal}
          isOpen={isModalOpen}
          onClose={closeModal}
          collectedCount={getCollectedCount(selectedCardForModal.id)}
        />
      )}
    </div>
  );
}

    

    