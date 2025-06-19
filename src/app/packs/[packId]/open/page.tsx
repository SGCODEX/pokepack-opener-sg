
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
import { ArrowLeft, PackageOpen, Eye, PackagePlus, Package, FastForward, Home } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type PackOpeningStage = 'initial' | 'opening' | 'stack-reveal' | 'all-revealed' | 'transitioning';

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

    if (packData.id === 'destined-rivals-booster-001') {
      const pullAndAddCardByRarity = (targetRarity: CardRarity, count: number): void => {
        for (let i = 0; i < count; i++) {
          if (packCards.length >= packData.cardsPerPack) break;
          const potentialCards = availableCardsInSeries.filter(c => c.rarity === targetRarity);
          if (potentialCards.length > 0) {
            const card = potentialCards[Math.floor(Math.random() * potentialCards.length)];
            packCards.push(card);
          } else {
            const fallbackRarities: CardRarity[] = ['Rare', 'Uncommon', 'Common'];
            let foundFallback = false;
            for (const fr of fallbackRarities) {
                const fallbackPotential = availableCardsInSeries.filter(c => c.rarity === fr);
                if (fallbackPotential.length > 0) {
                    packCards.push(fallbackPotential[Math.floor(Math.random() * fallbackPotential.length)]);
                    foundFallback = true;
                    break;
                }
            }
            if(!foundFallback && availableCardsInSeries.length > 0) {
                packCards.push(availableCardsInSeries[Math.floor(Math.random() * availableCardsInSeries.length)]);
            }
          }
        }
      };

      // Pull base cards: 4 Common, 2 Uncommon, 1 Rare
      pullAndAddCardByRarity('Common', 4);
      pullAndAddCardByRarity('Uncommon', 2);
      pullAndAddCardByRarity('Rare', 1);

      const hitRarityPool: { rarity: CardRarity; weight: number }[] = [
        { rarity: 'Hyper Rare', weight: 6 },
        { rarity: 'Special Illustration Rare', weight: 12 },
        { rarity: 'Illustration Rare', weight: 10 },
        { rarity: 'Ultra Rare', weight: 15 }, // Reduced from 22
        { rarity: 'Double Rare', weight: 25 },
        { rarity: 'Rare', weight: 30 },
      ];
      const totalWeight = hitRarityPool.reduce((sum, item) => sum + item.weight, 0);

      const numberOfHitSlots = 3;

      for (let i = 0; i < numberOfHitSlots; i++) {
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
        if (!chosenRarity) chosenRarity = 'Rare';

        let pulledHitCard: PokemonCard | undefined;
        const potentialHitCards = availableCardsInSeries.filter(c => c.rarity === chosenRarity);
        if (potentialHitCards.length > 0) {
          pulledHitCard = potentialHitCards[Math.floor(Math.random() * potentialHitCards.length)];
        }

        if (!pulledHitCard) {
          const fallbackRaritiesSequence: CardRarity[] = ['Ultra Rare', 'Double Rare', 'Rare', 'Uncommon', 'Common'];
          for (const fr of fallbackRaritiesSequence) {
            if (fr === chosenRarity && potentialHitCards.length === 0) continue;
            const potentialFallbackCards = availableCardsInSeries.filter(c => c.rarity === fr);
            if (potentialFallbackCards.length > 0) {
              pulledHitCard = potentialFallbackCards[Math.floor(Math.random() * potentialFallbackCards.length)];
              break;
            }
          }
        }

        if (pulledHitCard) {
          packCards.push(pulledHitCard);
        } else if (availableCardsInSeries.length > 0) {
            packCards.push(availableCardsInSeries[Math.floor(Math.random() * availableCardsInSeries.length)]);
        }
      }
      return packCards;

    } else { // Handles Base Set and other generic packs
      const availableCardsInPack = allCards.filter(card => packData.possibleCards.includes(card.id));
      if (availableCardsInPack.length === 0) return [];

      let rareSlotCard: PokemonCard | undefined;

      // 1. Pull Commons
      for (let i = 0; i < packData.rarityDistribution.common; i++) {
        if (packCards.length >= packData.cardsPerPack -1) break; // Leave space for rare slot
        let card = availableCardsInPack.find(c => c.rarity === 'Common' && !packCards.some(pc => pc.id === c.id));
        if (!card) { // Fallback if unique commons run out or not found
            const commonPool = availableCardsInPack.filter(c => c.rarity === 'Common');
            if(commonPool.length > 0) card = commonPool[Math.floor(Math.random() * commonPool.length)];
            else { // Broader fallback
                const nonRarePool = availableCardsInPack.filter(c => c.rarity !== 'Rare' && c.rarity !== 'Holo Rare');
                if (nonRarePool.length > 0) card = nonRarePool[Math.floor(Math.random() * nonRarePool.length)];
                else if (availableCardsInPack.length > 0) card = availableCardsInPack[Math.floor(Math.random() * availableCardsInPack.length)];
            }
        }
        if (card) packCards.push(card);
      }

      // 2. Pull Uncommons
      for (let i = 0; i < packData.rarityDistribution.uncommon; i++) {
        if (packCards.length >= packData.cardsPerPack -1) break; // Leave space for rare slot
        let card = availableCardsInPack.find(c => c.rarity === 'Uncommon' && !packCards.some(pc => pc.id === c.id));
        if (!card) { // Fallback
            const uncommonPool = availableCardsInPack.filter(c => c.rarity === 'Uncommon');
             if(uncommonPool.length > 0) card = uncommonPool[Math.floor(Math.random() * uncommonPool.length)];
             else { // Broader fallback
                const nonRarePool = availableCardsInPack.filter(c => c.rarity !== 'Rare' && c.rarity !== 'Holo Rare' && !packCards.some(pc => pc.id === c.id));
                if (nonRarePool.length > 0) card = nonRarePool[Math.floor(Math.random() * nonRarePool.length)];
                else if (availableCardsInPack.length > 0) card = availableCardsInPack[Math.floor(Math.random() * availableCardsInPack.length)];
            }
        }
        if (card) packCards.push(card);
      }

      // 3. Determine Rare Slot card (Holo Rare or Rare for Base Set)
      if (packData.rarityDistribution.rareSlot > 0) {
          const isHoloAttempt = Math.random() < 0.30;

          if (isHoloAttempt) {
            const potentialHoloRares = availableCardsInPack.filter(c => c.rarity === 'Holo Rare');
            if (potentialHoloRares.length > 0) {
              rareSlotCard = potentialHoloRares[Math.floor(Math.random() * potentialHoloRares.length)];
            }
          }

          if (!rareSlotCard) {
            const potentialRares = availableCardsInPack.filter(c => c.rarity === 'Rare');
            if (potentialRares.length > 0) {
              rareSlotCard = potentialRares[Math.floor(Math.random() * potentialRares.length)];
            }
          }

          if (!rareSlotCard) { // Fallback if specific rare/holo not found
            const potentialAnyRareSlot = availableCardsInPack.filter(c => c.rarity === 'Holo Rare' || c.rarity === 'Rare');
            if (potentialAnyRareSlot.length > 0) {
              rareSlotCard = potentialAnyRareSlot[Math.floor(Math.random() * potentialAnyRareSlot.length)];
            } else if (availableCardsInPack.length > 0) {
              rareSlotCard = availableCardsInPack[Math.floor(Math.random() * availableCardsInPack.length)];
            }
          }
      }

      // 4. Fill pack if still not full (e.g. distribution doesn't sum to cardsPerPack)
      // This fills up to cardsPerPack -1, to leave space for the rareSlotCard if it exists
      let fillAttempts = 0;
      while(packCards.length < (packData.cardsPerPack - (rareSlotCard ? 1:0) ) && availableCardsInPack.length > 0 && fillAttempts < 20) {
        let cardToFill = availableCardsInPack.find(c => c.rarity === 'Common' && !packCards.some(pc => pc.id === c.id));
        if (!cardToFill) cardToFill = availableCardsInPack.find(c => c.rarity === 'Uncommon' && !packCards.some(pc => pc.id === c.id));
        if (!cardToFill) { // Broader fallback if unique commons/uncommons are exhausted
            cardToFill = availableCardsInPack.filter(c => c.rarity !== 'Rare' && c.rarity !== 'Holo Rare' && !packCards.some(pc => pc.id === c.id))[0];
            if (!cardToFill) cardToFill = availableCardsInPack.filter(c => !packCards.some(pc => pc.id === c.id))[0];
        }
        if (!cardToFill && availableCardsInPack.length > 0) { // Absolute fallback to any random non-duplicate card
            cardToFill = availableCardsInPack.filter(c => !packCards.some(pc => pc.id === c.id))[Math.floor(Math.random() * availableCardsInPack.filter(c => !packCards.some(pc => pc.id === c.id)).length)];
        }
        if(cardToFill) packCards.push(cardToFill); else break; // Break if no card can be found
        fillAttempts++;
      }

      // 5. Add the Rare/Holo Rare card last if it was pulled
      if (rareSlotCard) {
        packCards.push(rareSlotCard);
      }

      // Final fill to ensure pack size if anything is missing after specific pulls
      fillAttempts = 0;
      while(packCards.length < packData.cardsPerPack && availableCardsInPack.length > 0 && fillAttempts < 10) {
        let finalFillCard = availableCardsInPack.filter(c => !packCards.some(pc => pc.id === c.id))[0];
        if (!finalFillCard && availableCardsInPack.length > 0) { // Fallback to any card if no non-duplicates left
            finalFillCard = availableCardsInPack[Math.floor(Math.random() * availableCardsInPack.length)];
        }
        if (finalFillCard) packCards.push(finalFillCard); else break;
        fillAttempts++;
      }
      return packCards;
    }
  }, [packData]);


  const processPackLoopIteration = useCallback(async () => {
    if (isSkippingAnimations || !packData) return;

    if (currentPackInBulkLoop >= totalPacksInBulkLoop) {
        setOpenedCards(allOpenedCardsInSession);

        const finalOverallHighestRarity = allOpenedCardsInSession.reduce((highest, card) => {
            const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare', 'Holo Rare'];
            return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
        }, 'Common' as CardRarity);

        let finalOverallHasHolo: boolean;
        let finalOverallHasRareNonHolo: boolean;

        if (packData.id === 'destined-rivals-booster-001') {
            finalOverallHasHolo = ['Ultra Rare', 'Hyper Rare', 'Special Illustration Rare', 'Illustration Rare'].includes(finalOverallHighestRarity);
            finalOverallHasRareNonHolo = !finalOverallHasHolo && ['Double Rare', 'Rare'].includes(finalOverallHighestRarity);
        } else {
            const oldSetHoloRarities: CardRarity[] = ['Holo Rare'];
            const oldSetHighTierNonHolo: CardRarity[] = ['Rare'];

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
        const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare', 'Holo Rare'];
        return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
    }, 'Common' as CardRarity);

    let packSpecificHasHolo: boolean;
    let packSpecificHasRareNonHolo: boolean;

    if (packData.id === 'destined-rivals-booster-001') {
        packSpecificHasHolo = ['Ultra Rare', 'Hyper Rare', 'Special Illustration Rare', 'Illustration Rare'].includes(currentPackHighestRarity);
        packSpecificHasRareNonHolo = !packSpecificHasHolo && ['Double Rare', 'Rare'].includes(currentPackHighestRarity);
    } else {
        const oldSetHoloRarities: CardRarity[] = ['Holo Rare'];
        const oldSetHighTierNonHolo: CardRarity[] = ['Rare'];

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
        const rarityOrder: CardRarity[] = ['Common', 'Uncommon', 'Rare', 'Double Rare', 'Ultra Rare', 'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare', 'Holo Rare'];
        return rarityOrder.indexOf(card.rarity) > rarityOrder.indexOf(highest) ? card.rarity : highest;
    }, 'Common' as CardRarity);

    let finalOverallHasHolo: boolean;
    let finalOverallHasRareNonHolo: boolean;

    if (packData.id === 'destined-rivals-booster-001') {
        finalOverallHasHolo = ['Ultra Rare', 'Hyper Rare', 'Special Illustration Rare', 'Illustration Rare'].includes(finalHighestRarity);
        finalOverallHasRareNonHolo = !finalOverallHasHolo && ['Double Rare', 'Rare'].includes(finalHighestRarity);
    } else {
        const oldSetHoloRarities: CardRarity[] = ['Holo Rare'];
        const oldSetHighTierNonHolo: CardRarity[] = ['Rare'];

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
        "transition-colors duration-1000 flex flex-col min-h-[calc(100vh-10rem)]",
        stage === 'all-revealed' ? 'bg-white text-black' :
        (hasHolo && (stage === 'opening' || stage === 'stack-reveal') && stage !== 'transitioning') ? 'holo-blue-wave-background-active animate-holo-blue-wave-shimmer text-white dark:text-white' :
        (hasRareNonHolo && (stage === 'opening' || stage === 'stack-reveal') && stage !== 'transitioning') ? 'rare-gold-holo-background-active animate-rare-gold-shimmer text-black dark:text-black' :
        'bg-background text-foreground'
      )}>
      <Button
        variant="outline"
        onClick={() => router.push('/')}
        className={cn(
            "absolute top-24 left-4 md:left-8 z-10",
            "hover:bg-[hsl(217,91%,60%)] hover:text-white hover:border-[hsl(217,91%,60%)]",
            stage === 'all-revealed'
                ? "text-black border-black dark:text-black dark:border-black"
                : activeOpeningStages.includes(stage)
                    ? "text-white border-white" // White outline for active opening on any background
                    : "text-foreground border-foreground dark:border-[hsl(var(--border))]" // Default theme-aware for initial
        )}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> {backButtonText}
      </Button>
      {!isSkippingAnimations &&
        (stage === 'opening' || stage === 'stack-reveal' || (isProcessingBulk && stage === 'transitioning')) && stage !== 'initial' && (
        <Button
          variant="outline"
          onClick={handleSkipToResults}
          className={cn(
            "absolute top-24 right-4 md:right-8 z-10",
            "hover:bg-[hsl(217,91%,60%)] hover:text-white hover:border-[hsl(217,91%,60%)]",
             stage === 'all-revealed'
                ? "text-black border-black dark:text-black dark:border-black"
                : activeOpeningStages.includes(stage)
                    ? "text-white border-white" // White outline for active opening on any background
                    : "text-foreground border-foreground dark:border-[hsl(var(--border))]" // Default theme-aware
          )}
          disabled={!packData}
        >
          <FastForward className="mr-2 h-4 w-4" /> Skip to Results
        </Button>
      )}
      <header className="relative z-5 pt-8 pb-4 text-center">
        <h1 className={cn(
          "text-4xl font-headline font-bold",
           stage === 'all-revealed' ? 'text-black' :
           (hasHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-white' :
           (hasRareNonHolo && activeOpeningStages.includes(stage) && stage !== 'transitioning') ? 'text-black' :
           'text-primary-foreground dark:text-foreground'
           )}>Pack Opening: {packData.name}</h1>
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
              disabled={!pokedexLoaded || !packData || packData.possibleCards.length < packData.cardsPerPack * 10 }
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
              className="relative w-[240px] h-[336px] mx-auto cursor-pointer select-none z-10 animate-stack-arrive"
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
                "relative w-[240px] h-[336px] mx-auto cursor-pointer select-none z-10 flex items-center justify-center animate-stack-arrive",
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
              <h2 className="text-2xl font-headline font-semibold text-black mb-4">
                {totalPacksInBulkLoop > 1 ? `Your ${totalPacksInBulkLoop} Packs Yielded` : 'Your Cards!'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                {allOpenedCardsInSession.map((card, index) => (
                  <CardComponent
                    key={`${card.id}-grid-${index}`}
                    card={card}
                    onClick={() => handleCardClickForModal(card)}
                    showDetails={true}
                    collectedCount={getCollectedCount(card.id)}
                    className="w-40"
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
            size="lg"
            onClick={() => resetPackOpening(1)}
            variant="outline"
            className={cn(
              "hover:bg-[hsl(217,91%,60%)] hover:text-white hover:border-[hsl(217,91%,60%)]",
              stage === 'all-revealed' 
                ? "text-black border-black dark:text-black dark:border-black"
                : activeOpeningStages.includes(stage) && (hasHolo || hasRareNonHolo)
                    ? "text-white border-white" // White for special backgrounds during active opening
                    : "text-foreground border-foreground" // Default for stack-reveal on normal background
            )}
          >
            <Package className="mr-2 h-5 w-5" /> Open Another Pack
          </Button>
          {packData && packData.possibleCards.length >= packData.cardsPerPack * 10 && (
             <Button
                size="lg"
                onClick={() => resetPackOpening(10)}
                variant="outline"
                className={cn(
                  "hover:bg-[hsl(217,91%,60%)] hover:text-white hover:border-[hsl(217,91%,60%)]",
                  stage === 'all-revealed' 
                    ? "text-black border-black dark:text-black dark:border-black"
                    : activeOpeningStages.includes(stage) && (hasHolo || hasRareNonHolo)
                        ? "text-white border-white" // White for special backgrounds
                        : "text-foreground border-foreground" // Default for stack-reveal on normal
                )}
              >
                <PackagePlus className="mr-2 h-5 w-5" /> Open 10 More Packs
            </Button>
          )}
          <Button
            size="lg"
            onClick={() => router.push('/')}
            className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white"
          >
            <Home className="mr-2 h-5 w-5" /> Back to Home
          </Button>
          <Button
            size="lg"
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
        />
      )}
    </div>
  );
}

