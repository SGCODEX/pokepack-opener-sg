
import type { PokemonPack } from './types';
import { allCards } from './pokemon-data'; // Import allCards to reference in possibleCards

export const allPacks: PokemonPack[] = [
  {
    id: 'base-set-booster-001',
    name: 'Base Set Booster Pack',
    series: 'Base Set',
    image: 'https://loosepacks.com/cdn/shop/files/Myproject-1-2023-07-19T003944.506.png?v=1738292631',
    dataAiHint: 'Base Set booster pack charizard',
    cardsPerPack: 10,
    rarityDistribution: {
      common: 6, // Includes basic energies and common Pokemon/Trainers
      uncommon: 3, // Includes uncommon Pokemon/Trainers and Double Colorless Energy
      rareSlot: 1, // This slot can be a Rare (Pokemon/Trainer) or a Holo Rare Pokemon
    },
    possibleCards: allCards.map(card => card.id), // Reference allCards from pokemon-data
  },
  // Add other packs here in the future if needed
];

export const getPackById = (id: string): PokemonPack | undefined => {
  return allPacks.find(pack => pack.id === id);
};
