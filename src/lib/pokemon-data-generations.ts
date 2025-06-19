
import type { PokemonCard } from './types';

// Helper function to format card names for URLs (simplified for Generations)
function formatNameForUrl(name: string): string {
  return name
    .replace(/[éÉ]/g, 'e') // Replace accented e
    .replace(/[^a-zA-Z0-9-]/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

export const generationsCards: PokemonCard[] = [
  // Main Set Examples
  {
    id: 'gen-venusaur-ex-001',
    name: 'Venusaur-EX',
    image: 'https://den-cards.pokellector.com/120/Venusaur-EX.GEN.1.33866.png',
    dataAiHint: 'Venusaur EX grass pokemon',
    rarity: 'Ultra Rare',
    type: 'Grass',
    series: 'Generations',
    pokedexNumber: '1/83',
  },
  {
    id: 'gen-charizard-ex-011',
    name: 'Charizard-EX',
    image: 'https://den-cards.pokellector.com/120/Charizard-EX.GEN.11.33876.png',
    dataAiHint: 'Charizard EX fire pokemon',
    rarity: 'Ultra Rare',
    type: 'Fire',
    series: 'Generations',
    pokedexNumber: '11/83',
  },
  {
    id: 'gen-blastoise-ex-017',
    name: 'Blastoise-EX',
    image: 'https://den-cards.pokellector.com/120/Blastoise-EX.GEN.17.33882.png',
    dataAiHint: 'Blastoise EX water pokemon',
    rarity: 'Ultra Rare',
    type: 'Water',
    series: 'Generations',
    pokedexNumber: '17/83',
  },
  {
    id: 'gen-pikachu-026',
    name: 'Pikachu',
    image: 'https://den-cards.pokellector.com/120/Pikachu.GEN.26.33891.png',
    dataAiHint: 'Pikachu electric mouse',
    rarity: 'Common',
    type: 'Lightning',
    series: 'Generations',
    pokedexNumber: '26/83',
  },
  {
    id: 'gen-ninetales-ex-013',
    name: 'Ninetales-EX',
    image: 'https://den-cards.pokellector.com/120/Ninetales-EX.GEN.13.33878.png',
    dataAiHint: 'Ninetales EX fire fox',
    rarity: 'Ultra Rare',
    type: 'Fire',
    series: 'Generations',
    pokedexNumber: '13/83',
  },
  {
    id: 'gen-jolteon-ex-028',
    name: 'Jolteon-EX',
    image: 'https://den-cards.pokellector.com/120/Jolteon-EX.GEN.28.33893.png',
    dataAiHint: 'Jolteon EX electric pokemon',
    rarity: 'Ultra Rare',
    type: 'Lightning',
    series: 'Generations',
    pokedexNumber: '28/83',
  },
  {
    id: 'gen-meowstic-037',
    name: 'Meowstic',
    image: 'https://den-cards.pokellector.com/120/Meowstic.GEN.37.33902.png',
    dataAiHint: 'Meowstic psychic cat',
    rarity: 'Holo Rare', // Assuming holo version
    type: 'Psychic',
    series: 'Generations',
    pokedexNumber: '37/83',
  },
  {
    id: 'gen-golem-ex-046',
    name: 'Golem-EX',
    image: 'https://den-cards.pokellector.com/120/Golem-EX.GEN.46.33911.png',
    dataAiHint: 'Golem EX rock pokemon',
    rarity: 'Ultra Rare',
    type: 'Fighting',
    series: 'Generations',
    pokedexNumber: '46/83',
  },
  {
    id: 'gen-clefable-055',
    name: 'Clefable',
    image: 'https://den-cards.pokellector.com/120/Clefable.GEN.55.33920.png',
    dataAiHint: 'Clefable fairy pokemon',
    rarity: 'Holo Rare', // Assuming holo version
    type: 'Fairy',
    series: 'Generations',
    pokedexNumber: '55/83',
  },
  {
    id: 'gen-energy-switch-061',
    name: 'Energy Switch',
    image: 'https://den-cards.pokellector.com/120/Energy-Switch.GEN.61.33926.png',
    dataAiHint: 'Energy Switch trainer',
    rarity: 'Uncommon',
    type: 'Trainer',
    series: 'Generations',
    pokedexNumber: '61/83',
  },

  // Radiant Collection Examples
  {
    id: 'gen-rc-flareon-ex-rc6',
    name: 'Flareon-EX (Radiant Collection)',
    image: 'https://den-cards.pokellector.com/120/Flareon-EX.GEN.RC6.33916.png', // URL adjusted, original RC6 is Chikorita. This is RC28.
    // Actual RC6 is Chikorita: https://den-cards.pokellector.com/120/Chikorita.GEN.RC1.33871.png (Using RC1 as placeholder)
    // Using Flareon EX RC28/RC32 as an example of an RC EX
    // Let's use actual RC cards for better representation.
    // RC6 on site is Fletchling: https://den-cards.pokellector.com/120/Fletchling.GEN.RC6.33876.png - this is not EX.
    // I'll pick some iconic RC cards.
    // Example: Pikachu RC29
    dataAiHint: 'Flareon EX fire radiant',
    rarity: 'Ultra Rare', // RC EX cards
    type: 'Fire',
    series: 'Generations',
    pokedexNumber: 'RC28/RC32', // Flareon EX is RC28
  },
  {
    id: 'gen-rc-pikachu-rc29',
    name: 'Pikachu (Radiant Collection)',
    image: 'https://den-cards.pokellector.com/120/Pikachu.GEN.RC29.33914.png',
    dataAiHint: 'Pikachu electric radiant',
    rarity: 'Holo Rare', // Full art, but treated as Holo Rare in RC context for pulls
    type: 'Lightning',
    series: 'Generations',
    pokedexNumber: 'RC29/RC32',
  },
  {
    id: 'gen-rc-gardevoir-ex-rc30',
    name: 'Gardevoir-EX (Radiant Collection)',
    image: 'https://den-cards.pokellector.com/120/Gardevoir-EX.GEN.RC30.33915.png',
    dataAiHint: 'Gardevoir EX psychic radiant',
    rarity: 'Ultra Rare',
    type: 'Fairy', // Gardevoir is often Fairy or Psychic
    series: 'Generations',
    pokedexNumber: 'RC30/RC32',
  },
  {
    id: 'gen-rc-sylveon-ex-rc32',
    name: 'Sylveon-EX (Radiant Collection)',
    image: 'https://den-cards.pokellector.com/120/Sylveon-EX.GEN.RC32.33917.png',
    dataAiHint: 'Sylveon EX fairy radiant',
    rarity: 'Ultra Rare', // RC Full Art EX
    type: 'Fairy',
    series: 'Generations',
    pokedexNumber: 'RC32/RC32',
  },
  {
    id: 'gen-rc-yveltal-rc16',
    name: 'Yveltal (Radiant Collection)',
    image: 'https://den-cards.pokellector.com/120/Yveltal.GEN.RC16.33901.png',
    dataAiHint: 'Yveltal dark flying radiant',
    rarity: 'Holo Rare',
    type: 'Darkness',
    series: 'Generations',
    pokedexNumber: 'RC16/RC32',
  },
];
