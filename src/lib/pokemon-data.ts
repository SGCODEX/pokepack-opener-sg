
import type { PokemonCard, PokemonPack, PokemonType, CardRarity } from './types';

export const allCards: PokemonCard[] = [
  // Commons from Base Set
  {
    id: 'base-pika-001',
    name: 'Pikachu',
    image: 'https://images.pokellector.com/cards/108/Pikachu.BS.58.png',
    dataAiHint: 'Pikachu electric pokemon',
    rarity: 'Common',
    type: 'Lightning',
    hp: 40,
    attacks: [
      { name: 'Gnaw', damage: '10', description: '' },
      { name: 'Thunder Jolt', damage: '30', description: 'Flip a coin. If tails, Pikachu does 10 damage to itself.' }
    ],
    weaknesses: [{ type: 'Fighting', value: 'x2' }],
    retreatCost: 1,
    description: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.',
    series: 'Base Set',
  },
  {
    id: 'base-bulb-001',
    name: 'Bulbasaur',
    image: 'https://images.pokellector.com/cards/108/Bulbasaur.BS.44.png',
    dataAiHint: 'Bulbasaur seed pokemon',
    rarity: 'Common',
    type: 'Grass',
    hp: 40,
    attacks: [
      { name: 'Leech Seed', damage: '20', description: 'Unless all damage from this attack is prevented, you may remove 1 damage counter from Bulbasaur.' }
    ],
    weaknesses: [{ type: 'Fire', value: 'x2' }],
    retreatCost: 1,
    description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
    series: 'Base Set',
  },
  {
    id: 'base-char-001',
    name: 'Charmander',
    image: 'https://images.pokellector.com/cards/108/Charmander.BS.46.png',
    dataAiHint: 'Charmander flame pokemon',
    rarity: 'Common',
    type: 'Fire',
    hp: 50,
    attacks: [
      { name: 'Scratch', damage: '10', description: '' },
      { name: 'Ember', damage: '30', description: 'Discard 1 Fire Energy card attached to Charmander in order to use this attack.' }
    ],
    weaknesses: [{ type: 'Water', value: 'x2' }],
    retreatCost: 1,
    description: 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
    series: 'Base Set',
  },
  {
    id: 'base-squi-001',
    name: 'Squirtle',
    image: 'https://images.pokellector.com/cards/108/Squirtle.BS.63.png',
    dataAiHint: 'Squirtle shell pokemon',
    rarity: 'Common',
    type: 'Water',
    hp: 40,
    attacks: [
      { name: 'Bubble', damage: '10', description: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.' },
      { name: 'Withdraw', damage: '', description: 'Flip a coin. If heads, prevent all damage done to Squirtle during your opponent\'s next turn.' }
    ],
    weaknesses: [{ type: 'Lightning', value: 'x2' }],
    retreatCost: 1,
    description: 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.',
    series: 'Base Set',
  },

  // Uncommons from Base Set
  {
    id: 'base-ivy-001',
    name: 'Ivysaur',
    image: 'https://images.pokellector.com/cards/108/Ivysaur.BS.30.png',
    dataAiHint: 'Ivysaur bud pokemon',
    rarity: 'Uncommon',
    type: 'Grass',
    hp: 60,
    attacks: [
      { name: 'Vine Whip', damage: '30', description: '' },
      { name: 'Poison Powder', damage: '20', description: 'The Defending Pokémon is now Poisoned.' }
    ],
    weaknesses: [{ type: 'Fire', value: 'x2' }],
    retreatCost: 1,
    description: 'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
    series: 'Base Set',
  },
  {
    id: 'base-charmeleon-001',
    name: 'Charmeleon',
    image: 'https://images.pokellector.com/cards/108/Charmeleon.BS.24.png',
    dataAiHint: 'Charmeleon fire pokemon',
    rarity: 'Uncommon',
    type: 'Fire',
    hp: 80,
    attacks: [
      { name: 'Slash', damage: '30', description: '' },
      { name: 'Flamethrower', damage: '50', description: 'Discard 1 Fire Energy card attached to Charmeleon in order to use this attack.' }
    ],
    weaknesses: [{ type: 'Water', value: 'x2' }],
    retreatCost: 1,
    description: 'When it swings its burning tail, it elevates the temperature to unbearably high levels.',
    series: 'Base Set',
  },

  // Holo Rare from Base Set
  {
    id: 'base-venu-001',
    name: 'Venusaur',
    image: 'https://images.pokellector.com/cards/108/Venusaur.BS.15.png',
    dataAiHint: 'Venusaur flower pokemon',
    rarity: 'Holo Rare', // Corrected from Rare
    type: 'Grass',
    hp: 100,
    attacks: [
      { name: 'Solarbeam', damage: '60', description: '' }
    ],
    weaknesses: [{ type: 'Fire', value: 'x2' }],
    retreatCost: 2,
    description: 'This plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
    series: 'Base Set',
  },
  {
    id: 'base-charizard-001',
    name: 'Charizard',
    image: 'https://images.pokellector.com/cards/108/Charizard.BS.4.png',
    dataAiHint: 'Charizard flying fire pokemon',
    rarity: 'Holo Rare',
    type: 'Fire',
    hp: 120,
    attacks: [
      { name: 'Fire Spin', damage: '100', description: 'Discard 2 Energy cards attached to Charizard in order to use this attack.' }
    ],
    weaknesses: [{ type: 'Water', value: 'x2' }],
    resistances: [{ type: 'Fighting', value: '-30' }],
    retreatCost: 3,
    description: 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.',
    series: 'Base Set',
  },
];

export const allPacks: PokemonPack[] = [
  {
    id: 'base-set-booster-001',
    name: 'Base Set Booster Pack',
    series: 'Base Set',
    image: 'https://product-images.tcgplayer.com/22754.jpg', // Charizard artwork pack
    dataAiHint: 'Base Set booster pack charizard',
    cardsPerPack: 7, 
    rarityDistribution: {
      common: 4,
      uncommon: 2,
      rareSlot: 1, 
    },
    possibleCards: allCards.filter(card => card.series === 'Base Set').map(card => card.id),
  },
];

export const getCardById = (id: string): PokemonCard | undefined => {
  return allCards.find(card => card.id === id);
};

export const getPackById = (id: string): PokemonPack | undefined => {
  return allPacks.find(pack => pack.id === id);
};
