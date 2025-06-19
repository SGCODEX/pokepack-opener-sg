
import type { PokemonPack } from './types';
import { allCards } from './pokemon-data';

const baseSetPackCards = allCards.filter(card => card.series === 'Base Set').map(card => card.id);
const destinedRivalsPackCards = allCards.filter(card => card.series === 'Destined Rivals').map(card => card.id);

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
      rareSlot: 1, 
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
    rarityDistribution: { 
      common: 3,      
      uncommon: 2,    
      rareSlot: 1, // Represents the guaranteed basic 'Rare'. 4 additional slots are dynamic "hits".
    },
    possibleCards: destinedRivalsPackCards,
  },
];

export const getPackById = (id: string): PokemonPack | undefined => {
  return allPacks.find(pack => pack.id === id);
};

