
import type { PokemonPack } from './types';
import { allCards } from './pokemon-data';

const baseSetPackCards = allCards.filter(card => card.series === 'Base Set').map(card => card.id);
const destinedRivalsPackCards = allCards.filter(card => card.series === 'Destined Rivals').map(card => card.id);
const generationsPackCards = allCards.filter(card => card.series === 'Generations').map(card => card.id);

export const allPacks: PokemonPack[] = [
  {
    id: 'base-set-booster-001',
    name: 'Base Set Booster Pack',
    series: 'Base Set',
    image: 'https://img.tradera.net/large-fit/742/561209742_da1a2bc3-0d7e-489e-80e8-8ad8bda9d671.jpg',
    dataAiHint: 'Base Set booster pack charizard',
    cardsPerPack: 10, // Base set had 11, but 1 was an energy. We simulate 10 non-basic energy pulls.
    rarityDistribution: {
      common: 6,
      uncommon: 3,
      rareSlot: 1, // This slot can be Rare or Holo Rare
    },
    possibleCards: baseSetPackCards,
  },
  {
    id: 'destined-rivals-booster-001',
    name: 'Destined Rivals Booster Pack',
    series: 'Destined Rivals',
    image: 'https://pbs.twimg.com/media/Gmzw5Z9XgAAc9fc?format=jpg&name=large',
    dataAiHint: 'Destined Rivals pack Iron Thorns Armarouge',
    cardsPerPack: 10,
    rarityDistribution: { // Placeholder, actual logic is more complex in open/page.tsx
      common: 3,      // Example: 4 common, 2 uncommon, 1 base rare, 3 "hit" slots from a pool
      uncommon: 2,
      rareSlot: 1, // This is a simplification; Destined Rivals has more complex hit slots.
    },
    possibleCards: destinedRivalsPackCards,
  },
  {
    id: 'generations-booster-001',
    name: 'Generations Booster Pack',
    series: 'Generations',
    image: 'https://bananagames.ca/cdn/shop/files/187238_in_1000x1000_db43e300-d14a-4678-b114-b398af9727b7.jpg?v=1729205256',
    dataAiHint: 'Generations booster pack charizard pikachu',
    cardsPerPack: 10, // Generations packs often had 10 cards + a code card
    rarityDistribution: {
      common: 6,       // Approximation, can include RC commons/uncommons
      uncommon: 3,     // Approximation, can include RC commons/uncommons
      rareSlot: 1,     // Guaranteed Rare, Holo Rare, or Ultra Rare (EX, M EX, Full Art from main set or RC)
    },
    possibleCards: generationsPackCards,
  },
];

export const getPackById = (id: string): PokemonPack | undefined => {
  return allPacks.find(pack => pack.id === id);
};

