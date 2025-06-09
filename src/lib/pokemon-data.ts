
import type { PokemonCard, PokemonPack } from './types';

// Base Set Card List - aiming for completeness.
// Card images will use https://den-cards.pokellector.com/119/{CardName}.BS.{CardNumber}.png format where possible or specific IDs.
// Pokedex number will be the card number in the set, e.g., 1/102.

export const allCards: PokemonCard[] = [
  // Holo Rares (1/102 to 16/102)
  {
    id: 'base-alakazam-001',
    name: 'Alakazam',
    image: 'https://den-cards.pokellector.com/119/Alakazam.BS.1.png',
    dataAiHint: 'Alakazam psychic pokemon',
    rarity: 'Holo Rare',
    type: 'Psychic',
    series: 'Base Set',
    pokedexNumber: '1/102',
  },
  {
    id: 'base-blastoise-002',
    name: 'Blastoise',
    image: 'https://den-cards.pokellector.com/119/Blastoise.BS.2.png',
    dataAiHint: 'Blastoise water turtle pokemon',
    rarity: 'Holo Rare',
    type: 'Water',
    series: 'Base Set',
    pokedexNumber: '2/102',
  },
  {
    id: 'base-chansey-003',
    name: 'Chansey',
    image: 'https://den-cards.pokellector.com/119/Chansey.BS.3.png',
    dataAiHint: 'Chansey egg pokemon',
    rarity: 'Holo Rare',
    type: 'Colorless',
    series: 'Base Set',
    pokedexNumber: '3/102',
  },
  {
    id: 'base-charizard-004',
    name: 'Charizard',
    image: 'https://den-cards.pokellector.com/119/Charizard.BS.4.png',
    dataAiHint: 'Charizard flying fire pokemon',
    rarity: 'Holo Rare',
    type: 'Fire',
    series: 'Base Set',
    pokedexNumber: '4/102',
  },
  {
    id: 'base-clefairy-005',
    name: 'Clefairy',
    image: 'https://den-cards.pokellector.com/119/Clefairy.BS.5.png',
    dataAiHint: 'Clefairy fairy pokemon',
    rarity: 'Holo Rare',
    type: 'Colorless',
    series: 'Base Set',
    pokedexNumber: '5/102',
  },
  {
    id: 'base-gyarados-006',
    name: 'Gyarados',
    image: 'https://den-cards.pokellector.com/119/Gyarados.BS.6.png',
    dataAiHint: 'Gyarados water flying pokemon',
    rarity: 'Holo Rare',
    type: 'Water',
    series: 'Base Set',
    pokedexNumber: '6/102',
  },
  {
    id: 'base-hitmonchan-007',
    name: 'Hitmonchan',
    image: 'https://den-cards.pokellector.com/119/Hitmonchan.BS.7.png',
    dataAiHint: 'Hitmonchan fighting pokemon',
    rarity: 'Holo Rare',
    type: 'Fighting',
    series: 'Base Set',
    pokedexNumber: '7/102',
  },
  {
    id: 'base-machamp-008', // Note: Often from 2-player starter, but is #8
    name: 'Machamp',
    image: 'https://den-cards.pokellector.com/119/Machamp.BS.8.png',
    dataAiHint: 'Machamp fighting pokemon',
    rarity: 'Holo Rare',
    type: 'Fighting',
    series: 'Base Set',
    pokedexNumber: '8/102',
  },
  {
    id: 'base-magneton-009',
    name: 'Magneton',
    image: 'https://den-cards.pokellector.com/119/Magneton.BS.9.png', // This is the Holo version
    dataAiHint: 'Magneton electric steel pokemon',
    rarity: 'Holo Rare', // Corrected based on standard Base Set lists for card #9
    type: 'Lightning',
    series: 'Base Set',
    pokedexNumber: '9/102',
  },
  {
    id: 'base-mewtwo-010',
    name: 'Mewtwo',
    image: 'https://den-cards.pokellector.com/119/Mewtwo.BS.10.png',
    dataAiHint: 'Mewtwo legendary psychic pokemon',
    rarity: 'Holo Rare',
    type: 'Psychic',
    series: 'Base Set',
    pokedexNumber: '10/102',
  },
  {
    id: 'base-nidoking-011',
    name: 'Nidoking',
    image: 'https://den-cards.pokellector.com/119/Nidoking.BS.11.png',
    dataAiHint: 'Nidoking poison ground pokemon',
    rarity: 'Holo Rare',
    type: 'Grass',
    series: 'Base Set',
    pokedexNumber: '11/102',
  },
  {
    id: 'base-ninetales-012',
    name: 'Ninetales',
    image: 'https://den-cards.pokellector.com/119/Ninetales.BS.12.png',
    dataAiHint: 'Ninetales fire fox pokemon',
    rarity: 'Holo Rare',
    type: 'Fire',
    series: 'Base Set',
    pokedexNumber: '12/102',
  },
  {
    id: 'base-poliwrath-013',
    name: 'Poliwrath',
    image: 'https://den-cards.pokellector.com/119/Poliwrath.BS.13.png',
    dataAiHint: 'Poliwrath water fighting pokemon',
    rarity: 'Holo Rare',
    type: 'Water',
    series: 'Base Set',
    pokedexNumber: '13/102',
  },
  {
    id: 'base-raichu-014',
    name: 'Raichu',
    image: 'https://den-cards.pokellector.com/119/Raichu.BS.14.png',
    dataAiHint: 'Raichu electric mouse pokemon',
    rarity: 'Holo Rare',
    type: 'Lightning',
    series: 'Base Set',
    pokedexNumber: '14/102',
  },
  {
    id: 'base-venusaur-015',
    name: 'Venusaur',
    image: 'https://den-cards.pokellector.com/119/Venusaur.BS.15.png',
    dataAiHint: 'Venusaur flower pokemon',
    rarity: 'Holo Rare',
    type: 'Grass',
    series: 'Base Set',
    pokedexNumber: '15/102',
  },
  {
    id: 'base-zapdos-016',
    name: 'Zapdos',
    image: 'https://den-cards.pokellector.com/119/Zapdos.BS.16.png',
    dataAiHint: 'Zapdos legendary electric bird',
    rarity: 'Holo Rare',
    type: 'Lightning',
    series: 'Base Set',
    pokedexNumber: '16/102',
  },

  // Rares (Non-Holo)
  {
    id: 'base-beedrill-017',
    name: 'Beedrill',
    image: 'https://den-cards.pokellector.com/119/Beedrill.BS.17.png',
    dataAiHint: 'Beedrill poison bee pokemon',
    rarity: 'Rare',
    type: 'Grass',
    series: 'Base Set',
    pokedexNumber: '17/102',
  },
  {
    id: 'base-dragonair-018',
    name: 'Dragonair',
    image: 'https://den-cards.pokellector.com/119/Dragonair.BS.18.png',
    dataAiHint: 'Dragonair dragon pokemon',
    rarity: 'Rare',
    type: 'Colorless',
    series: 'Base Set',
    pokedexNumber: '18/102',
  },
  {
    id: 'base-dugtrio-019',
    name: 'Dugtrio',
    image: 'https://den-cards.pokellector.com/119/Dugtrio.BS.19.png',
    dataAiHint: 'Dugtrio ground pokemon',
    rarity: 'Rare',
    type: 'Fighting',
    series: 'Base Set',
    pokedexNumber: '19/102',
  },
  {
    id: 'base-electabuzz-020',
    name: 'Electabuzz',
    image: 'https://den-cards.pokellector.com/119/Electabuzz.BS.20.png',
    dataAiHint: 'Electabuzz electric pokemon',
    rarity: 'Rare',
    type: 'Lightning',
    series: 'Base Set',
    pokedexNumber: '20/102',
  },
  {
    id: 'base-electrode-021', // Assuming this is a non-holo rare
    name: 'Electrode',
    image: 'https://den-cards.pokellector.com/119/Electrode.BS.21.png',
    dataAiHint: 'Electrode ball pokemon',
    rarity: 'Rare',
    type: 'Lightning',
    series: 'Base Set',
    pokedexNumber: '21/102',
  },
  {
    id: 'base-pidgeotto-022',
    name: 'Pidgeotto',
    image: 'https://den-cards.pokellector.com/119/Pidgeotto.BS.22.png',
    dataAiHint: 'Pidgeotto bird pokemon',
    rarity: 'Rare',
    type: 'Colorless',
    series: 'Base Set',
    pokedexNumber: '22/102',
  },
  // ... More Rares, Uncommons, Commons will be added programmatically if possible or truncated for this example length
  // For now, let's add a few more representative cards from other rarities.

  // Uncommons
  {
    id: 'base-arcanine-023',
    name: 'Arcanine',
    image: 'https://den-cards.pokellector.com/119/Arcanine.BS.23.png',
    dataAiHint: 'Arcanine legendary fire dog',
    rarity: 'Uncommon',
    type: 'Fire',
    series: 'Base Set',
    pokedexNumber: '23/102',
  },
  {
    id: 'base-charmeleon-024',
    name: 'Charmeleon',
    image: 'https://den-cards.pokellector.com/119/Charmeleon.BS.24.png',
    dataAiHint: 'Charmeleon fire pokemon',
    rarity: 'Uncommon',
    type: 'Fire',
    series: 'Base Set',
    pokedexNumber: '24/102',
  },
  {
    id: 'base-dewgong-025',
    name: 'Dewgong',
    image: 'https://den-cards.pokellector.com/119/Dewgong.BS.25.png',
    dataAiHint: 'Dewgong water ice sea lion',
    rarity: 'Uncommon',
    type: 'Water',
    series: 'Base Set',
    pokedexNumber: '25/102',
  },
  {
    id: 'base-ivysaur-030',
    name: 'Ivysaur',
    image: 'https://den-cards.pokellector.com/119/Ivysaur.BS.30.png',
    dataAiHint: 'Ivysaur bud pokemon',
    rarity: 'Uncommon',
    type: 'Grass',
    series: 'Base Set',
    pokedexNumber: '30/102',
  },
  {
    id: 'base-kakuna-033',
    name: 'Kakuna',
    image: 'https://den-cards.pokellector.com/119/Kakuna.BS.33.png',
    dataAiHint: 'Kakuna cocoon pokemon',
    rarity: 'Uncommon',
    type: 'Grass',
    series: 'Base Set',
    pokedexNumber: '33/102',
  },
  {
    id: 'base-wartortle-042',
    name: 'Wartortle',
    image: 'https://den-cards.pokellector.com/119/Wartortle.BS.42.png',
    dataAiHint: 'Wartortle turtle pokemon',
    rarity: 'Uncommon',
    type: 'Water',
    series: 'Base Set',
    pokedexNumber: '42/102',
  },

  // Commons
  {
    id: 'base-abra-043',
    name: 'Abra',
    image: 'https://den-cards.pokellector.com/119/Abra.BS.43.png',
    dataAiHint: 'Abra psychic pokemon',
    rarity: 'Common',
    type: 'Psychic',
    series: 'Base Set',
    pokedexNumber: '43/102',
  },
  {
    id: 'base-bulbasaur-044',
    name: 'Bulbasaur',
    image: 'https://den-cards.pokellector.com/119/Bulbasaur.BS.44.png',
    dataAiHint: 'Bulbasaur seed pokemon',
    rarity: 'Common',
    type: 'Grass',
    series: 'Base Set',
    pokedexNumber: '44/102',
  },
  {
    id: 'base-caterpie-045',
    name: 'Caterpie',
    image: 'https://den-cards.pokellector.com/119/Caterpie.BS.45.png',
    dataAiHint: 'Caterpie worm pokemon',
    rarity: 'Common',
    type: 'Grass',
    series: 'Base Set',
    pokedexNumber: '45/102',
  },
  {
    id: 'base-charmander-046',
    name: 'Charmander',
    image: 'https://den-cards.pokellector.com/119/Charmander.BS.46.png',
    dataAiHint: 'Charmander flame pokemon',
    rarity: 'Common',
    type: 'Fire',
    series: 'Base Set',
    pokedexNumber: '46/102',
  },
  {
    id: 'base-diglett-047',
    name: 'Diglett',
    image: 'https://den-cards.pokellector.com/119/Diglett.BS.47.png',
    dataAiHint: 'Diglett mole pokemon',
    rarity: 'Common',
    type: 'Fighting',
    series: 'Base Set',
    pokedexNumber: '47/102',
  },
  {
    id: 'base-drowzee-049',
    name: 'Drowzee',
    image: 'https://den-cards.pokellector.com/119/Drowzee.BS.49.png',
    dataAiHint: 'Drowzee hypnosis pokemon',
    rarity: 'Common',
    type: 'Psychic',
    series: 'Base Set',
    pokedexNumber: '49/102',
  },
  {
    id: 'base-gastly-050',
    name: 'Gastly',
    image: 'https://den-cards.pokellector.com/119/Gastly.BS.50.png',
    dataAiHint: 'Gastly gas pokemon',
    rarity: 'Common',
    type: 'Psychic',
    series: 'Base Set',
    pokedexNumber: '50/102',
  },
  {
    id: 'base-pidgey-057',
    name: 'Pidgey',
    image: 'https://den-cards.pokellector.com/119/Pidgey.BS.57.png',
    dataAiHint: 'Pidgey tiny bird pokemon',
    rarity: 'Common',
    type: 'Colorless',
    series: 'Base Set',
    pokedexNumber: '57/102',
  },
  {
    id: 'base-pikachu-058', // Yellow Cheeks Pikachu
    name: 'Pikachu',
    image: 'https://den-cards.pokellector.com/119/Pikachu.BS.58.png',
    dataAiHint: 'Pikachu electric pokemon',
    rarity: 'Common',
    type: 'Lightning',
    series: 'Base Set',
    pokedexNumber: '58/102',
  },
  {
    id: 'base-rattata-061',
    name: 'Rattata',
    image: 'https://den-cards.pokellector.com/119/Rattata.BS.61.png',
    dataAiHint: 'Rattata mouse pokemon',
    rarity: 'Common',
    type: 'Colorless',
    series: 'Base Set',
    pokedexNumber: '61/102',
  },
  {
    id: 'base-squirtle-063',
    name: 'Squirtle',
    image: 'https://den-cards.pokellector.com/119/Squirtle.BS.63.png',
    dataAiHint: 'Squirtle shell pokemon',
    rarity: 'Common',
    type: 'Water',
    series: 'Base Set',
    pokedexNumber: '63/102',
  },
  {
    id: 'base-weedle-069',
    name: 'Weedle',
    image: 'https://den-cards.pokellector.com/119/Weedle.BS.69.png',
    dataAiHint: 'Weedle hairy bug pokemon',
    rarity: 'Common',
    type: 'Grass',
    series: 'Base Set',
    pokedexNumber: '69/102',
  },
  // Trainer Cards (Example, more would be needed)
  {
    id: 'base-bill-091',
    name: 'Bill',
    image: 'https://den-cards.pokellector.com/119/Bill.BS.91.png',
    dataAiHint: 'Bill pokemon trainer',
    rarity: 'Common', // Bill is a Common Trainer
    type: 'Trainer',
    series: 'Base Set',
    pokedexNumber: '91/102',
  },
  {
    id: 'base-potion-094',
    name: 'Potion',
    image: 'https://den-cards.pokellector.com/119/Potion.BS.94.png',
    dataAiHint: 'Potion pokemon item',
    rarity: 'Common',
    type: 'Trainer',
    series: 'Base Set',
    pokedexNumber: '94/102',
  },
  {
    id: 'base-professor-oak-088',
    name: 'Professor Oak',
    image: 'https://den-cards.pokellector.com/119/Professor-Oak.BS.88.png',
    dataAiHint: 'Professor Oak pokemon trainer',
    rarity: 'Uncommon', // Professor Oak is Uncommon
    type: 'Trainer',
    series: 'Base Set',
    pokedexNumber: '88/102',
  },
   // Example of a Rare Trainer
  {
    id: 'base-lass-075',
    name: 'Lass',
    image: 'https://den-cards.pokellector.com/119/Lass.BS.75.png',
    dataAiHint: 'Lass pokemon trainer',
    rarity: 'Rare',
    type: 'Trainer',
    series: 'Base Set',
    pokedexNumber: '75/102',
  },
  // Energy Cards (Example, more would be needed)
  // For simplicity, not adding all energy card images, using a generic placeholder for now or finding one if available.
  // Actual Base Set has specific energy card images.
  {
    id: 'base-fire-energy-098',
    name: 'Fire Energy',
    image: 'https://den-cards.pokellector.com/119/Fire-Energy.BS.98.png', // Actual Fire Energy image
    dataAiHint: 'Fire energy symbol',
    rarity: 'Common', // Energy cards are typically common slot fillers
    type: 'Energy',
    series: 'Base Set',
    pokedexNumber: '98/102', // Example, actual numbering varies
  },
];

// Sort cards by their set number (pokedexNumber) for consistent display
// This requires parsing the "X/102" string.
allCards.sort((a, b) => {
  const numA = parseInt(String(a.pokedexNumber).split('/')[0]);
  const numB = parseInt(String(b.pokedexNumber).split('/')[0]);
  return numA - numB;
});


export const allPacks: PokemonPack[] = [
  {
    id: 'base-set-booster-001',
    name: 'Base Set Booster Pack',
    series: 'Base Set',
    image: 'https://product-images.tcgplayer.com/22754.jpg',
    dataAiHint: 'Base Set booster pack charizard',
    cardsPerPack: 10, // Usually 1 rare/holo, 3 uncommons, 6 commons (excluding energy)
    rarityDistribution: {
      common: 6,
      uncommon: 3,
      rareSlot: 1, // This slot can be a Rare or a Holo Rare
    },
    // Include all cards from 'Base Set' in possibleCards
    possibleCards: allCards.filter(card => card.series === 'Base Set' && card.type !== 'Energy').map(card => card.id),
    // Note: Real packs might have a dedicated energy slot, this simplifies it for now.
  },
];

export const getCardById = (id: string): PokemonCard | undefined => {
  return allCards.find(card => card.id === id);
};

export const getPackById = (id: string): PokemonPack | undefined => {
  return allPacks.find(pack => pack.id === id);
};
