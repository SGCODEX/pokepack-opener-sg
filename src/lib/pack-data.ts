
import type { PokemonPack } from './types';
import { allCards } from './pokemon-data'; // Import allCards to reference in possibleCards

export const allPacks: PokemonPack[] = [
  {
    id: 'base-set-booster-001',
    name: 'Base Set Booster Pack',
    series: 'Base Set',
    image: 'https://img.tradera.net/large-fit/742/561209742_da1a2bc3-0d7e-489e-80e8-8ad8bda9d671.jpg',
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

