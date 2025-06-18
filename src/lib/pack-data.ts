
import type { PokemonPack } from './types';
import { allCards } from './pokemon-data';

const baseSetPackCards = allCards.filter(card => card.series === 'Base Set').map(card => card.id);
const mcDonaldsCollection2024Cards = allCards.filter(card => card.series === "McDonald's Collection 2024").map(card => card.id);

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
    id: 'mcdonalds-collection-2024-001',
    name: "McDonald's Collection 2024 Pack",
    series: "McDonald's Collection 2024",
    image: 'https://i.ebayimg.com/images/g/u-YAAOSwUQRnkFn6/s-l1200.jpg',
    dataAiHint: 'McDonalds promo Sprigatito Pikachu',
    cardsPerPack: 4, // McDonald's promo packs are smaller
    rarityDistribution: { // 6 Holos, 9 Commons in this 15-card set
      common: 3,      // Will pull from non-holo pool (9 cards)
      uncommon: 0,    // No uncommons defined for this set structure
      rareSlot: 1,    // This slot will aim for a 'Holo Rare' (6 cards)
    },
    possibleCards: mcDonaldsCollection2024Cards,
  },
];

export const getPackById = (id: string): PokemonPack | undefined => {
  return allPacks.find(pack => pack.id === id);
};
