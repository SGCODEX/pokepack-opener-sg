
import type { PokemonPack } from './types';
import { allCards } from './pokemon-data'; // Import allCards to reference in possibleCards

const baseSetPackCards = allCards.filter(card => card.series === 'Base Set').map(card => card.id);
const mcDonaldsDragonDiscoveryPackCards = allCards.filter(card => card.series === "McDonald's Dragon Discovery").map(card => card.id);

export const allPacks: PokemonPack[] = [
  {
    id: 'base-set-booster-001',
    name: 'Base Set Booster Pack',
    series: 'Base Set',
    image: 'https://img.tradera.net/large-fit/742/561209742_da1a2bc3-0d7e-489e-80e8-8ad8bda9d671.jpg',
    dataAiHint: 'Base Set booster pack charizard',
    cardsPerPack: 10,
    rarityDistribution: {
      common: 6, 
      uncommon: 3, 
      rareSlot: 1, // Can be Rare or Holo Rare
    },
    possibleCards: baseSetPackCards, 
  },
  {
    id: 'mcdonalds-dragon-discovery-001',
    name: "McDonald's Dragon Discovery Pack",
    series: "McDonald's Dragon Discovery",
    image: 'https://i.ebayimg.com/images/g/u-YAAOSwUQRnkFn6/s-l1200.jpg',
    dataAiHint: 'McDonalds promo dragon pack',
    cardsPerPack: 4, // Promo packs are smaller
    rarityDistribution: {
      common: 3,
      uncommon: 1, // For Latios/Latias
      rareSlot: 0, // No Rares or Holo Rares in this promo pack logic
    },
    possibleCards: mcDonaldsDragonDiscoveryPackCards,
  },
];

export const getPackById = (id: string): PokemonPack | undefined => {
  return allPacks.find(pack => pack.id === id);
};
