
import type { PokemonCard, PokemonPack } from './types';

export const allCards: PokemonCard[] = [
  // Holo Rares from Base Set
  {
    id: 'base-alakazam-001',
    name: 'Alakazam',
    image: 'https://images.pokellector.com/cards/108/Alakazam.BS.1.png',
    dataAiHint: 'Alakazam psychic pokemon',
    rarity: 'Holo Rare',
    type: 'Psychic',
    hp: 80,
    attacks: [
      { name: 'Confuse Ray', damage: '30', description: 'Flip a coin. If heads, the Defending Pokémon is now Confused.' }
    ],
    weaknesses: [{ type: 'Psychic', value: 'x2' }],
    retreatCost: 3,
    description: 'Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5,000.',
    series: 'Base Set',
  },
  {
    id: 'base-blastoise-002',
    name: 'Blastoise',
    image: 'https://images.pokellector.com/cards/108/Blastoise.BS.2.png',
    dataAiHint: 'Blastoise water turtle pokemon',
    rarity: 'Holo Rare',
    type: 'Water',
    hp: 100,
    attacks: [
      { name: 'Hydro Pump', damage: '40+', description: 'Does 40 damage plus 10 more damage for each Water Energy attached to Blastoise but not used to pay for this attack\'s Energy cost. Extra Water Energy after the 2nd doesn\'t count.' }
    ],
    weaknesses: [{ type: 'Lightning', value: 'x2' }],
    resistances: [],
    retreatCost: 3,
    description: 'A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles.',
    series: 'Base Set',
  },
  {
    id: 'base-chansey-003',
    name: 'Chansey',
    image: 'https://images.pokellector.com/cards/108/Chansey.BS.3.png',
    dataAiHint: 'Chansey egg pokemon',
    rarity: 'Holo Rare',
    type: 'Colorless',
    hp: 120,
    attacks: [
      { name: 'Scrunch', damage: '', description: 'Flip a coin. If heads, prevent all damage done to Chansey during your opponent\'s next turn.' },
      { name: 'Double-edge', damage: '80', description: 'Chansey does 80 damage to itself.' }
    ],
    weaknesses: [{ type: 'Fighting', value: 'x2' }],
    resistances: [{ type: 'Psychic', value: '-30' }],
    retreatCost: 1,
    description: 'A rare and elusive Pokémon that is said to bring happiness to those who manage to get it.',
    series: 'Base Set',
  },
  {
    id: 'base-charizard-004',
    name: 'Charizard',
    image: 'https://images.pokellector.com/cards/108/Charizard.BS.4.png',
    dataAiHint: 'Charizard flying fire pokemon',
    rarity: 'Holo Rare',
    type: 'Fire',
    hp: 120,
    attacks: [
      { name: 'Energy Burn', damage: '', description: 'As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn. This power can\'t be used if Charizard is Asleep, Confused, or Paralyzed.' },
      { name: 'Fire Spin', damage: '100', description: 'Discard 2 Energy cards attached to Charizard in order to use this attack.' }
    ],
    weaknesses: [{ type: 'Water', value: 'x2' }],
    resistances: [{ type: 'Fighting', value: '-30' }],
    retreatCost: 3,
    description: 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.',
    series: 'Base Set',
  },
  {
    id: 'base-clefairy-005',
    name: 'Clefairy',
    image: 'https://images.pokellector.com/cards/108/Clefairy.BS.5.png',
    dataAiHint: 'Clefairy fairy pokemon',
    rarity: 'Holo Rare',
    type: 'Colorless', // Base set Clefairy was Colorless, Fairy type came later
    hp: 40,
    attacks: [
      { name: 'Sing', damage: '', description: 'Flip a coin. If heads, the Defending Pokémon is now Asleep.' },
      { name: 'Metronome', damage: '', description: 'Choose 1 of the Defending Pokémon\'s attacks. Metronome copies that attack except for its Energy cost and anything else required in order to use that attack, such as discarding Energy cards. (No matter what type the Defending Pokémon is, Clefairy\'s type is still Colorless.)' }
    ],
    weaknesses: [{ type: 'Fighting', value: 'x2' }],
    resistances: [{ type: 'Psychic', value: '-30' }],
    retreatCost: 1,
    description: 'Its magical and cute appeal has many admirers. It is rare and found only in certain areas.',
    series: 'Base Set',
  },
  {
    id: 'base-gyarados-006',
    name: 'Gyarados',
    image: 'https://images.pokellector.com/cards/108/Gyarados.BS.6.png',
    dataAiHint: 'Gyarados water flying pokemon',
    rarity: 'Holo Rare',
    type: 'Water',
    hp: 100,
    attacks: [
      { name: 'Dragon Rage', damage: '50', description: '' },
      { name: 'Bubblebeam', damage: '40', description: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.' }
    ],
    weaknesses: [{ type: 'Grass', value: 'x2' }], // Note: Base Set Gyarados weak to Grass, not Lightning
    resistances: [{ type: 'Fighting', value: '-30' }],
    retreatCost: 3,
    description: 'Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage.',
    series: 'Base Set',
  },
  {
    id: 'base-hitmonchan-007',
    name: 'Hitmonchan',
    image: 'https://images.pokellector.com/cards/108/Hitmonchan.BS.7.png',
    dataAiHint: 'Hitmonchan fighting pokemon',
    rarity: 'Holo Rare',
    type: 'Fighting',
    hp: 70,
    attacks: [
      { name: 'Jab', damage: '20', description: '' },
      { name: 'Special Punch', damage: '40', description: '' }
    ],
    weaknesses: [{ type: 'Psychic', value: 'x2' }],
    retreatCost: 2,
    description: 'While apparently doing nothing, it fires punches in lightning fast volleys that are impossible to see.',
    series: 'Base Set',
  },
  {
    id: 'base-magneton-009',
    name: 'Magneton',
    image: 'https://images.pokellector.com/cards/108/Magneton.BS.9.png',
    dataAiHint: 'Magneton electric steel pokemon',
    rarity: 'Holo Rare',
    type: 'Lightning', // Base set Magneton was pure Lightning
    hp: 60, // Base set HP was 60, not 80
    attacks: [
      { name: 'Thunder Wave', damage: '30', description: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.' },
      { name: 'Selfdestruct', damage: '100', description: 'Does 20 damage to each Pokémon on each player\'s Bench. (Don\'t apply Weakness and Resistance for Benched Pokémon.) Magneton does 100 damage to itself.' }
    ],
    weaknesses: [{ type: 'Fighting', value: 'x2' }],
    retreatCost: 1, // Base set retreat was 1
    description: 'Formed by several Magnemites linked together. They frequently appear when sunspots flare up.',
    series: 'Base Set',
  },
  {
    id: 'base-mewtwo-010',
    name: 'Mewtwo',
    image: 'https://images.pokellector.com/cards/108/Mewtwo.BS.10.png',
    dataAiHint: 'Mewtwo legendary psychic pokemon',
    rarity: 'Holo Rare',
    type: 'Psychic',
    hp: 60,
    attacks: [
      { name: 'Psychic', damage: '10+', description: 'Does 10 damage plus 10 more damage for each Energy card attached to the Defending Pokémon.' },
      { name: 'Barrier', damage: '', description: 'Discard 1 Psychic Energy card attached to Mewtwo in order to use this attack. During your opponent\'s next turn, prevent all effects of attacks, including damage, done to Mewtwo.' }
    ],
    weaknesses: [{ type: 'Psychic', value: 'x2' }],
    retreatCost: 2,
    description: 'It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.',
    series: 'Base Set',
  },
  {
    id: 'base-nidoking-011',
    name: 'Nidoking',
    image: 'https://images.pokellector.com/cards/108/Nidoking.BS.11.png',
    dataAiHint: 'Nidoking poison ground pokemon',
    rarity: 'Holo Rare',
    type: 'Grass', // Base set Nidoking was Grass type due to Poison typing convention
    hp: 90,
    attacks: [
      { name: 'Thrash', damage: '30+', description: 'Flip a coin. If heads, this attack does 30 damage plus 10 more damage; if tails, this attack does 30 damage and Nidoking does 10 damage to itself.' },
      { name: 'Toxic', damage: '20', description: 'The Defending Pokémon is now Poisoned. It now takes 20 Poison damage instead of 10 after each player\'s turn (even if it was already Poisoned).' }
    ],
    weaknesses: [{ type: 'Psychic', value: 'x2' }],
    retreatCost: 3,
    description: 'It uses its powerful tail in battle to smash, constrict, then break the prey\'s bones.',
    series: 'Base Set',
  },
  {
    id: 'base-ninetales-012',
    name: 'Ninetales',
    image: 'https://images.pokellector.com/cards/108/Ninetales.BS.12.png',
    dataAiHint: 'Ninetales fire fox pokemon',
    rarity: 'Holo Rare',
    type: 'Fire',
    hp: 80,
    attacks: [
      { name: 'Lure', damage: '', description: 'If your opponent has any Benched Pokémon, choose 1 of them and switch it with the Defending Pokémon.' },
      { name: 'Fire Blast', damage: '80', description: 'Discard 1 Fire Energy card attached to Ninetales in order to use this attack.' }
    ],
    weaknesses: [{ type: 'Water', value: 'x2' }],
    retreatCost: 1,
    description: 'Very smart and very vengeful. Grabbing one of its many tails could result in a 1000-year curse.',
    series: 'Base Set',
  },
  {
    id: 'base-poliwrath-013',
    name: 'Poliwrath',
    image: 'https://images.pokellector.com/cards/108/Poliwrath.BS.13.png',
    dataAiHint: 'Poliwrath water fighting pokemon',
    rarity: 'Holo Rare',
    type: 'Water',
    hp: 90,
    attacks: [
      { name: 'Water Gun', damage: '30+', description: 'Does 30 damage plus 10 more damage for each Water Energy attached to Poliwrath but not used to pay for this attack\'s Energy cost. Extra Water Energy after the 2nd doesn\'t count.' },
      { name: 'Whirlpool', damage: '40', description: 'If the Defending Pokémon has any Energy cards attached to it, choose 1 of them and discard it.' }
    ],
    weaknesses: [{ type: 'Grass', value: 'x2' }], // Poliwrath was weak to Grass in Base Set
    retreatCost: 3,
    description: 'An adept swimmer at both the front crawl and breaststroke. Easily overtakes the best human swimmers.',
    series: 'Base Set',
  },
  {
    id: 'base-raichu-014',
    name: 'Raichu',
    image: 'https://images.pokellector.com/cards/108/Raichu.BS.14.png',
    dataAiHint: 'Raichu electric mouse pokemon',
    rarity: 'Holo Rare',
    type: 'Lightning',
    hp: 80,
    attacks: [
      { name: 'Agility', damage: '20', description: 'Flip a coin. If heads, during your opponent\'s next turn, prevent all effects of attacks, including damage, done to Raichu.' },
      { name: 'Thunder', damage: '60', description: 'Flip a coin. If tails, Raichu does 30 damage to itself.' }
    ],
    weaknesses: [{ type: 'Fighting', value: 'x2' }],
    retreatCost: 1,
    description: 'Its long tail serves as a ground to protect itself from its own high voltage power.',
    series: 'Base Set',
  },
  {
    id: 'base-venusaur-015',
    name: 'Venusaur',
    image: 'https://images.pokellector.com/cards/108/Venusaur.BS.15.png',
    dataAiHint: 'Venusaur flower pokemon',
    rarity: 'Holo Rare',
    type: 'Grass',
    hp: 100,
    attacks: [
      { name: 'Energy Trans', damage: '', description: 'As often as you like during your turn (before your attack), you may take 1 Grass Energy card attached to 1 of your Pokémon and attach it to a different one. This power can\'t be used if Venusaur is Asleep, Confused, or Paralyzed.' },
      { name: 'Solarbeam', damage: '60', description: '' }
    ],
    weaknesses: [{ type: 'Fire', value: 'x2' }],
    retreatCost: 2,
    description: 'This plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
    series: 'Base Set',
  },
  {
    id: 'base-zapdos-016',
    name: 'Zapdos',
    image: 'https://images.pokellector.com/cards/108/Zapdos.BS.16.png',
    dataAiHint: 'Zapdos legendary electric bird',
    rarity: 'Holo Rare',
    type: 'Lightning',
    hp: 90,
    attacks: [
      { name: 'Thunder', damage: '60', description: 'Flip a coin. If tails, Zapdos does 30 damage to itself.' },
      { name: 'Thunderbolt', damage: '100', description: 'Discard all Energy cards attached to Zapdos in order to use this attack.' }
    ],
    weaknesses: [], // Zapdos had no weakness in Base Set
    resistances: [{ type: 'Fighting', value: '-30' }],
    retreatCost: 3,
    description: 'A legendary bird Pokémon that is said to appear from clouds while dropping enormous lightning bolts.',
    series: 'Base Set',
  },

  // Rares from Base Set
  {
    id: 'base-beedrill-017',
    name: 'Beedrill',
    image: 'https://images.pokellector.com/cards/108/Beedrill.BS.17.png',
    dataAiHint: 'Beedrill poison bee pokemon',
    rarity: 'Rare',
    type: 'Grass',
    hp: 80,
    attacks: [
      { name: 'Twineedle', damage: '30x', description: 'Flip 2 coins. This attack does 30 damage times the number of heads.' },
      { name: 'Poison Sting', damage: '40', description: 'The Defending Pokémon is now Poisoned.' }
    ],
    weaknesses: [{ type: 'Fire', value: 'x2' }],
    resistances: [{ type: 'Fighting', value: '-30' }],
    retreatCost: 0,
    description: 'Flies at high speed and attacks using its large venomous stingers on its forelegs and tail.',
    series: 'Base Set',
  },
  {
    id: 'base-dragonair-018',
    name: 'Dragonair',
    image: 'https://images.pokellector.com/cards/108/Dragonair.BS.18.png',
    dataAiHint: 'Dragonair dragon pokemon',
    rarity: 'Rare',
    type: 'Colorless', // Dragonair was Colorless in Base Set
    hp: 80,
    attacks: [
      { name: 'Slam', damage: '30x', description: 'Flip 2 coins. This attack does 30 damage times the number of heads.' },
      { name: 'Hyper Beam', damage: '20', description: 'If the Defending Pokémon has any Energy cards attached to it, choose 1 of them and discard it.' }
    ],
    weaknesses: [],
    resistances: [{ type: 'Psychic', value: '-30' }],
    retreatCost: 2,
    description: 'A mystical Pokémon that exudes a gentle aura. Has the ability to change climate conditions.',
    series: 'Base Set',
  },
   {
    id: 'base-dugtrio-019',
    name: 'Dugtrio',
    image: 'https://images.pokellector.com/cards/108/Dugtrio.BS.19.png',
    dataAiHint: 'Dugtrio ground pokemon',
    rarity: 'Rare',
    type: 'Fighting',
    hp: 70,
    attacks: [
        { name: 'Slash', damage: '40', description: '' },
        { name: 'Earthquake', damage: '70', description: 'Does 10 damage to each of your own Benched Pokémon. (Don\'t apply Weakness and Resistance for Benched Pokémon.)' }
    ],
    weaknesses: [{ type: 'Grass', value: 'x2' }],
    resistances: [{ type: 'Lightning', value: '-30' }],
    retreatCost: 2,
    description: 'A team of Diglett triplets. It triggers huge earthquakes by burrowing 60 miles underground.',
    series: 'Base Set',
  },
  {
    id: 'base-electabuzz-020',
    name: 'Electabuzz',
    image: 'https://images.pokellector.com/cards/108/Electabuzz.BS.20.png',
    dataAiHint: 'Electabuzz electric pokemon',
    rarity: 'Rare',
    type: 'Lightning',
    hp: 70,
    attacks: [
        { name: 'Thundershock', damage: '10', description: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.' },
        { name: 'Thunderpunch', damage: '30+', description: 'Flip a coin. If heads, this attack does 30 damage plus 10 more damage; if tails, this attack does 30 damage and Electabuzz does 10 damage to itself.' }
    ],
    weaknesses: [{ type: 'Fighting', value: 'x2' }],
    retreatCost: 2,
    description: 'Normally found near power plants, they can wander away and cause major blackouts in cities.',
    series: 'Base Set',
  },


  // Uncommons from Base Set
  {
    id: 'base-ivysaur-030',
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
    id: 'base-charmeleon-024',
    name: 'Charmeleon',
    image: 'https://images.pokellector.com/cards/108/Charmeleon.BS.24.png',
    dataAiHint: 'Charmeleon fire pokemon',
    rarity: 'Uncommon',
    type: 'Fire',
    hp: 80, // Corrected HP for Base Set Charmeleon is 80
    attacks: [
      { name: 'Slash', damage: '30', description: '' },
      { name: 'Flamethrower', damage: '50', description: 'Discard 1 Fire Energy card attached to Charmeleon in order to use this attack.' }
    ],
    weaknesses: [{ type: 'Water', value: 'x2' }],
    retreatCost: 1, // Corrected Retreat Cost
    description: 'When it swings its burning tail, it elevates the temperature to unbearably high levels.',
    series: 'Base Set',
  },
  {
    id: 'base-wartortle-042',
    name: 'Wartortle',
    image: 'https://images.pokellector.com/cards/108/Wartortle.BS.42.png',
    dataAiHint: 'Wartortle turtle pokemon',
    rarity: 'Uncommon',
    type: 'Water',
    hp: 70,
    attacks: [
      { name: 'Withdraw', damage: '', description: 'Flip a coin. If heads, prevent all damage done to Wartortle during your opponent\'s next turn. (Any other effects of attacks still happen.)' },
      { name: 'Bite', damage: '40', description: '' }
    ],
    weaknesses: [{ type: 'Lightning', value: 'x2' }],
    retreatCost: 1,
    description: 'Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.',
    series: 'Base Set',
  },
  {
    id: 'base-kakuna-033',
    name: 'Kakuna',
    image: 'https://images.pokellector.com/cards/108/Kakuna.BS.33.png',
    dataAiHint: 'Kakuna cocoon pokemon',
    rarity: 'Uncommon',
    type: 'Grass',
    hp: 80,
    attacks: [
      { name: 'Stiffen', damage: '', description: 'Flip a coin. If heads, prevent all damage done to Kakuna during your opponent\'s next turn. (Any other effects of attacks still happen.)' },
      { name: 'Poison Powder', damage: '20', description: 'The Defending Pokémon is now Poisoned.' }
    ],
    weaknesses: [{ type: 'Fire', value: 'x2' }],
    retreatCost: 2,
    description: 'Able to move only slightly. When endangered, it may stick out its stinger and poison its enemy.',
    series: 'Base Set',
  },


  // Commons from Base Set
  {
    id: 'base-pikachu-058',
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
    id: 'base-bulbasaur-044',
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
    id: 'base-charmander-046',
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
    id: 'base-squirtle-063',
    name: 'Squirtle',
    image: 'https://images.pokellector.com/cards/108/Squirtle.BS.63.png',
    dataAiHint: 'Squirtle shell pokemon',
    rarity: 'Common',
    type: 'Water',
    hp: 40,
    attacks: [
      { name: 'Bubble', damage: '10', description: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.' },
      { name: 'Withdraw', damage: '', description: 'Flip a coin. If heads, prevent all damage done to Squirtle during your opponent\'s next turn. (Any other effects of attacks still happen.)' }
    ],
    weaknesses: [{ type: 'Lightning', value: 'x2' }],
    retreatCost: 1,
    description: 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.',
    series: 'Base Set',
  },
  {
    id: 'base-caterpie-045',
    name: 'Caterpie',
    image: 'https://images.pokellector.com/cards/108/Caterpie.BS.45.png',
    dataAiHint: 'Caterpie worm pokemon',
    rarity: 'Common',
    type: 'Grass',
    hp: 40,
    attacks: [
      { name: 'String Shot', damage: '10', description: 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.' }
    ],
    weaknesses: [{ type: 'Fire', value: 'x2' }],
    retreatCost: 1,
    description: 'Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.',
    series: 'Base Set',
  },
  {
    id: 'base-weedle-069',
    name: 'Weedle',
    image: 'https://images.pokellector.com/cards/108/Weedle.BS.69.png',
    dataAiHint: 'Weedle hairy bug pokemon',
    rarity: 'Common',
    type: 'Grass',
    hp: 40,
    attacks: [
      { name: 'Poison Sting', damage: '10', description: 'Flip a coin. If heads, the Defending Pokémon is now Poisoned.' }
    ],
    weaknesses: [{ type: 'Fire', value: 'x2' }],
    retreatCost: 1,
    description: 'Often found in forests, eating leaves. It has a sharp venomous stinger on its head.',
    series: 'Base Set',
  },
  {
    id: 'base-pidgey-057',
    name: 'Pidgey',
    image: 'https://images.pokellector.com/cards/108/Pidgey.BS.57.png',
    dataAiHint: 'Pidgey tiny bird pokemon',
    rarity: 'Common',
    type: 'Colorless',
    hp: 40,
    attacks: [
      { name: 'Whirlwind', damage: '10', description: 'If your opponent has any Benched Pokémon, he or she chooses 1 of them and switches it with the Defending Pokémon. (Do the damage before switching the Pokémon.)' }
    ],
    weaknesses: [{ type: 'Lightning', value: 'x2' }],
    resistances: [{ type: 'Fighting', value: '-30' }],
    retreatCost: 1,
    description: 'A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.',
    series: 'Base Set',
  },
  {
    id: 'base-rattata-061',
    name: 'Rattata',
    image: 'https://images.pokellector.com/cards/108/Rattata.BS.61.png',
    dataAiHint: 'Rattata mouse pokemon',
    rarity: 'Common',
    type: 'Colorless',
    hp: 30,
    attacks: [
      { name: 'Bite', damage: '20', description: '' }
    ],
    weaknesses: [{ type: 'Fighting', value: 'x2' }],
    resistances: [{ type: 'Psychic', value: '-30' }],
    retreatCost: 0,
    description: 'Bites anything when it attacks. Small and very quick, it is a common sight in many places.',
    series: 'Base Set',
  },
];

// Assign Pokedex numbers based on current order
allCards.forEach((card, index) => {
  card.pokedexNumber = index + 1;
});


export const allPacks: PokemonPack[] = [
  {
    id: 'base-set-booster-001',
    name: 'Base Set Booster Pack',
    series: 'Base Set',
    image: 'https://product-images.tcgplayer.com/22754.jpg', // Charizard artwork pack
    dataAiHint: 'Base Set booster pack charizard',
    cardsPerPack: 10,
    rarityDistribution: {
      common: 6,
      uncommon: 3,
      rareSlot: 1,
    },
    // Ensure all cards from Base Set are included here
    possibleCards: allCards.filter(card => card.series === 'Base Set').map(card => card.id),
  },
];

export const getCardById = (id: string): PokemonCard | undefined => {
  return allCards.find(card => card.id === id);
};

export const getPackById = (id: string): PokemonPack | undefined => {
  return allPacks.find(pack => pack.id === id);
};
