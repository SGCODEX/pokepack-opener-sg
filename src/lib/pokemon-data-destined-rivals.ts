
import type { PokemonCard } from './types';

// Helper function to format card names for URLs
// Removes content in parentheses, handles apostrophes, symbols, spaces, and colons.
function formatNameForUrl(name: string): string {
  let cleanedName = name.replace(/\s*\(.*?\)\s*/g, ''); // Remove content in parentheses
  
  return cleanedName
    .replace(/'s/g, 's') // Ethan's -> Ethans
    .replace(/'/g, '')   // Remove other apostrophes
    .replace(/’/g, '')   // Remove right single quotation mark
    .replace(/\./g, '')  // Remove periods (e.g., Lt.)
    .replace(/♀/g, '-F') // Female symbol
    .replace(/♂/g, '-M') // Male symbol
    .replace(/é/g, 'e')  // Pokémon -> Pokemon
    .replace(/[\s:]+/g, '-') // Replace spaces and colons with a single hyphen
    .replace(/-+/g, '-')    // Consolidate multiple hyphens
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}

// Helper function to generate UniqueID based on card number with exceptions
function getUniqueId(cardNumberInSet: number): number {
  if (cardNumberInSet >= 1 && cardNumberInSet <= 33) {
    return 57267 + (cardNumberInSet - 1);
  } else if (cardNumberInSet === 34) {
    return 56855; // Special case for Ethan's Typhlosion (DRI 34)
  } else if (cardNumberInSet >= 35 && cardNumberInSet <= 244) {
    // Resumes sequence from card 35 with a new base
    return 57300 + (cardNumberInSet - 35);
  }
  // Fallback for numbers outside the range, though the list is fixed at 244
  console.warn(`Card number ${cardNumberInSet} is out of expected range for UniqueID generation.`);
  return 0; 
}


const cardListData = [
  { name: "Ethan's Pinsir", type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Yanma', type: 'Grass', rarity: 'Common' },
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Pineco', type: 'Grass', rarity: 'Common' },
  { name: 'Shroomish', type: 'Grass', rarity: 'Common' },
  { name: 'Breloom', type: 'Grass', rarity: 'Uncommon' },
  { name: "Cynthia's Roselia", type: 'Grass', rarity: 'Uncommon' },
  { name: "Cynthia's Roserade", type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Mow Rotom', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Shaymin', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Dwebble', type: 'Grass', rarity: 'Common' },
  { name: 'Crustle', type: 'Grass', rarity: 'Uncommon' },
  { name: 'Fomantis', type: 'Grass', rarity: 'Common' },
  { name: 'Lurantis', type: 'Grass', rarity: 'Holo Rare' },
  { name: "Team Rocket's Blipbug", type: 'Grass', rarity: 'Common' },
  { name: 'Applin', type: 'Grass', rarity: 'Common' },
  { name: 'Dipplin', type: 'Grass', rarity: 'Uncommon' },
  { name: 'Hydrapple', type: 'Grass', rarity: 'Holo Rare' },
  { name: "Team Rocket's Tarountula", type: 'Grass', rarity: 'Common' },
  { name: "Team Rocket's Spidops", type: 'Grass', rarity: 'Uncommon' },
  { name: 'Smoliv', type: 'Grass', rarity: 'Common' },
  { name: 'Dolliv', type: 'Grass', rarity: 'Uncommon' },
  { name: 'Arboliva ex', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Rellor', type: 'Grass', rarity: 'Common' },
  { name: 'Rabsca ex', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Teal Mask Ogerpon', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Growlithe', type: 'Fire', rarity: 'Common' },
  { name: 'Arcanine', type: 'Fire', rarity: 'Uncommon' },
  { name: 'Ponyta', type: 'Fire', rarity: 'Common' },
  { name: 'Rapidash', type: 'Fire', rarity: 'Uncommon' },
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' },
  { name: "Ethan's Cyndaquil", type: 'Fire', rarity: 'Common' },
  { name: "Ethan's Quilava", type: 'Fire', rarity: 'Uncommon' },
  { name: "Ethan's Typhlosion", type: 'Fire', rarity: 'Holo Rare' }, // Card 34
  { name: "Ethan's Slugma", type: 'Fire', rarity: 'Common' }, // Card 35
  { name: "Ethan's Magcargo", type: 'Fire', rarity: 'Uncommon' },
  { name: "Team Rocket's Houndour", type: 'Fire', rarity: 'Common' },
  { name: "Team Rocket's Houndoom", type: 'Fire', rarity: 'Holo Rare' },
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' },
  { name: 'Torchic', type: 'Fire', rarity: 'Common' },
  { name: 'Combusken', type: 'Fire', rarity: 'Uncommon' },
  { name: 'Blaziken', type: 'Fire', rarity: 'Holo Rare' },
  { name: 'Heat Rotom', type: 'Fire', rarity: 'Holo Rare' },
  { name: 'Hearthflame Mask Ogerpon', type: 'Fire', rarity: 'Holo Rare' },
  { name: "Misty's Psyduck", type: 'Water', rarity: 'Common' },
  { name: "Misty's Staryu", type: 'Water', rarity: 'Common' },
  { name: "Misty's Starmie", type: 'Water', rarity: 'Uncommon' },
  { name: "Misty's Magikarp", type: 'Water', rarity: 'Common' },
  { name: "Misty's Gyarados", type: 'Water', rarity: 'Holo Rare' },
  { name: "Misty's Lapras", type: 'Water', rarity: 'Holo Rare' },
  { name: "Team Rocket's Articuno", type: 'Water', rarity: 'Holo Rare' },
  { name: "Cynthia's Feebas", type: 'Water', rarity: 'Common' },
  { name: "Cynthia's Milotic", type: 'Water', rarity: 'Holo Rare' },
  { name: 'Clamperl', type: 'Water', rarity: 'Common' },
  { name: 'Huntail', type: 'Water', rarity: 'Uncommon' },
  { name: 'Gorebyss', type: 'Water', rarity: 'Uncommon' },
  { name: 'Buizel', type: 'Water', rarity: 'Common' },
  { name: 'Floatzel', type: 'Water', rarity: 'Uncommon' },
  { name: 'Snover', type: 'Water', rarity: 'Common' }, // Grass/Ice -> Water
  { name: 'Abomasnow', type: 'Water', rarity: 'Uncommon' }, // Grass/Ice -> Water
  { name: 'Wash Rotom', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Arrokuda', type: 'Water', rarity: 'Common' },
  { name: 'Barraskewda', type: 'Water', rarity: 'Uncommon' },
  { name: 'Cetoddle', type: 'Water', rarity: 'Common' },
  { name: 'Cetitan ex', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Dondozo ex', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Wellspring Mask Ogerpon', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Electabuzz', type: 'Lightning', rarity: 'Common' },
  { name: 'Electivire ex', type: 'Lightning', rarity: 'Holo Rare' },
  { name: "Team Rocket's Zapdos", type: 'Lightning', rarity: 'Holo Rare' },
  { name: "Ethan's Pichu", type: 'Lightning', rarity: 'Common' },
  { name: "Team Rocket's Mareep", type: 'Lightning', rarity: 'Common' },
  { name: "Team Rocket's Flaaffy", type: 'Lightning', rarity: 'Uncommon' },
  { name: "Team Rocket's Ampharos", type: 'Lightning', rarity: 'Holo Rare' },
  { name: 'Electrike', type: 'Lightning', rarity: 'Common' },
  { name: 'Manectric', type: 'Lightning', rarity: 'Uncommon' },
  { name: 'Rotom', type: 'Lightning', rarity: 'Holo Rare' },
  { name: 'Zeraora', type: 'Lightning', rarity: 'Holo Rare' },
  { name: "Team Rocket's Drowzee", type: 'Psychic', rarity: 'Common' },
  { name: "Team Rocket's Hypno", type: 'Psychic', rarity: 'Uncommon' },
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' },
  { name: "Team Rocket's Wobbuffet", type: 'Psychic', rarity: 'Uncommon' },
  { name: "Steven's Baltoy", type: 'Psychic', rarity: 'Common' }, // Ground/Psychic
  { name: "Steven's Claydol", type: 'Psychic', rarity: 'Uncommon' }, // Ground/Psychic
  { name: "Team Rocket's Chingling", type: 'Psychic', rarity: 'Common' },
  { name: "Steven's Carbink", type: 'Psychic', rarity: 'Uncommon' }, // Rock/Fairy
  { name: "Team Rocket's Mimikyu", type: 'Psychic', rarity: 'Holo Rare' }, // Ghost/Fairy
  { name: "Team Rocket's Dottler", type: 'Psychic', rarity: 'Uncommon' }, // Bug/Psychic
  { name: "Team Rocket's Orbeetle", type: 'Psychic', rarity: 'Holo Rare' }, // Bug/Psychic
  { name: 'Mankey', type: 'Fighting', rarity: 'Common' },
  { name: 'Primeape', type: 'Fighting', rarity: 'Uncommon' },
  { name: 'Annihilape', type: 'Fighting', rarity: 'Holo Rare' }, // Assumed Holo Rare, could be non-ex Rare too
  { name: "Ethan's Sudowoodo", type: 'Fighting', rarity: 'Uncommon' }, // Rock
  { name: "Team Rocket's Larvitar", type: 'Fighting', rarity: 'Common' }, // Rock/Ground
  { name: "Team Rocket's Pupitar", type: 'Fighting', rarity: 'Uncommon' }, // Rock/Ground
  { name: "Team Rocket's Tyranitar", type: 'Fighting', rarity: 'Holo Rare' }, // Rock/Dark
  { name: 'Nosepass', type: 'Fighting', rarity: 'Common' }, // Rock
  { name: 'Probopass', type: 'Fighting', rarity: 'Uncommon' }, // Rock/Steel
  { name: 'Meditite', type: 'Fighting', rarity: 'Common' },
  { name: 'Medicham', type: 'Fighting', rarity: 'Uncommon' },
  { name: 'Regirock ex', type: 'Fighting', rarity: 'Holo Rare' }, // Rock
  { name: "Cynthia's Gible", type: 'Fighting', rarity: 'Common' }, // Dragon/Ground
  { name: "Cynthia's Gabite", type: 'Fighting', rarity: 'Uncommon' }, // Dragon/Ground
  { name: "Cynthia's Garchomp ex", type: 'Fighting', rarity: 'Holo Rare' }, // Dragon/Ground
  { name: 'Hippopotas', type: 'Fighting', rarity: 'Common' }, // Ground
  { name: 'Hippowdon', type: 'Fighting', rarity: 'Uncommon' }, // Ground
  { name: 'Mudbray', type: 'Fighting', rarity: 'Common' }, // Ground
  { name: 'Mudsdale', type: 'Fighting', rarity: 'Uncommon' }, // Ground
  { name: "Arven's Toedscool", type: 'Fighting', rarity: 'Common' }, // Ground/Grass
  { name: "Arven's Toedscruel", type: 'Fighting', rarity: 'Uncommon' }, // Ground/Grass
  { name: 'Cornerstone Mask Ogerpon', type: 'Fighting', rarity: 'Holo Rare' }, // Grass/Rock
  { name: "Team Rocket's Ekans", type: 'Grass', rarity: 'Common' }, // Poison
  { name: "Team Rocket's Arbok", type: 'Grass', rarity: 'Uncommon' }, // Poison
  { name: "Team Rocket's Nidoran♀", type: 'Grass', rarity: 'Common' }, // Poison
  { name: "Team Rocket's Nidorina", type: 'Grass', rarity: 'Uncommon' }, // Poison
  { name: "Team Rocket's Nidoqueen", type: 'Grass', rarity: 'Holo Rare' }, // Poison/Ground
  { name: "Team Rocket's Nidoran♂", type: 'Grass', rarity: 'Common' }, // Poison
  { name: "Team Rocket's Nidorino", type: 'Grass', rarity: 'Uncommon' }, // Poison
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' }, // Poison/Ground
  { name: "Team Rocket's Zubat", type: 'Grass', rarity: 'Common' }, // Poison/Flying
  { name: "Team Rocket's Golbat", type: 'Grass', rarity: 'Uncommon' }, // Poison/Flying
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // Poison/Flying -> Darkness
  { name: "Team Rocket's Grimer", type: 'Grass', rarity: 'Common' }, // Poison
  { name: "Team Rocket's Muk", type: 'Grass', rarity: 'Uncommon' }, // Poison
  { name: "Team Rocket's Koffing", type: 'Grass', rarity: 'Common' }, // Poison
  { name: "Team Rocket's Weezing", type: 'Grass', rarity: 'Holo Rare' }, // Poison
  { name: "Team Rocket's Murkrow", type: 'Darkness', rarity: 'Common' }, // Dark/Flying
  { name: "Team Rocket's Sneasel", type: 'Darkness', rarity: 'Common' }, // Dark/Ice
  { name: "Cynthia's Spiritomb", type: 'Darkness', rarity: 'Holo Rare' }, // Ghost/Dark
  { name: "Marnie's Purrloin", type: 'Darkness', rarity: 'Common' },
  { name: "Marnie's Liepard", type: 'Darkness', rarity: 'Uncommon' },
  { name: "Marnie's Scraggy", type: 'Darkness', rarity: 'Common' }, // Dark/Fighting
  { name: "Marnie's Scrafty", type: 'Darkness', rarity: 'Uncommon' }, // Dark/Fighting
  { name: "Marnie's Impidimp", type: 'Darkness', rarity: 'Common' }, // Dark/Fairy
  { name: "Marnie's Morgrem", type: 'Darkness', rarity: 'Uncommon' }, // Dark/Fairy
  { name: "Marnie's Grimmsnarl ex", type: 'Darkness', rarity: 'Holo Rare' }, // Dark/Fairy
  { name: "Marnie's Morpeko", type: 'Darkness', rarity: 'Holo Rare' }, // Electric/Dark
  { name: "Arven's Maschiff", type: 'Darkness', rarity: 'Common' },
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' },
  { name: 'Forretress', type: 'Metal', rarity: 'Uncommon' }, // Bug/Steel
  { name: 'Skarmory', type: 'Metal', rarity: 'Common' }, // Steel/Flying
  { name: "Steven's Skarmory", type: 'Metal', rarity: 'Uncommon' }, // Steel/Flying
  { name: "Steven's Beldum", type: 'Metal', rarity: 'Common' }, // Steel/Psychic
  { name: "Steven's Metang", type: 'Metal', rarity: 'Uncommon' }, // Steel/Psychic
  { name: "Steven's Metagross ex", type: 'Metal', rarity: 'Holo Rare' }, // Steel/Psychic
  { name: 'Zamazenta', type: 'Metal', rarity: 'Holo Rare' }, // Fighting/Steel
  { name: "Team Rocket's Rattata", type: 'Colorless', rarity: 'Common' },
  { name: "Team Rocket's Raticate", type: 'Colorless', rarity: 'Uncommon' },
  { name: "Team Rocket's Meowth", type: 'Colorless', rarity: 'Common' },
  { name: "Team Rocket's Persian ex", type: 'Colorless', rarity: 'Holo Rare' },
  { name: 'Kangaskhan', type: 'Colorless', rarity: 'Holo Rare' },
  { name: 'Tauros', type: 'Colorless', rarity: 'Uncommon' },
  { name: "Team Rocket's Porygon", type: 'Colorless', rarity: 'Common' },
  { name: "Team Rocket's Porygon2", type: 'Colorless', rarity: 'Uncommon' },
  { name: "Team Rocket's Porygon-Z", type: 'Colorless', rarity: 'Holo Rare' },
  { name: 'Taillow', type: 'Colorless', rarity: 'Common' },
  { name: 'Swellow', type: 'Colorless', rarity: 'Uncommon' },
  { name: "Arven's Skwovet", type: 'Colorless', rarity: 'Common' },
  { name: "Arven's Greedent", type: 'Colorless', rarity: 'Uncommon' },
  { name: 'Squawkabilly', type: 'Colorless', rarity: 'Holo Rare' },
  { name: "Arven's Sandwich", type: 'Trainer', rarity: 'Uncommon' },
  { name: "Cynthia's Power Weight", type: 'Trainer', rarity: 'Uncommon' },
  { name: "Emcee's Hype", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter Full Art style
  { name: 'Energy Recycler', type: 'Trainer', rarity: 'Uncommon' },
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter Full Art style
  { name: 'Granite Cave', type: 'Trainer', rarity: 'Uncommon' }, // Stadium
  { name: 'Judge', type: 'Trainer', rarity: 'Holo Rare' }, // Supporter Full Art style
  { name: 'Sacred Ash', type: 'Trainer', rarity: 'Uncommon' },
  { name: 'Spikemuth Gym', type: 'Trainer', rarity: 'Uncommon' }, // Stadium
  { name: "Team Rocket's Archer", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter Full Art style
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter Full Art style
  { name: "Team Rocket's Bother-Bot", type: 'Trainer', rarity: 'Uncommon' },
  { name: "Team Rocket's Factory", type: 'Trainer', rarity: 'Uncommon' }, // Stadium
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter Full Art style
  { name: "Team Rocket's Great Ball", type: 'Trainer', rarity: 'Uncommon' },
  { name: "Team Rocket's Petrel", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter Full Art style
  { name: "Team Rocket's Proton", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter Full Art style
  { name: "Team Rocket's Transceiver", type: 'Trainer', rarity: 'Uncommon' },
  { name: "Team Rocket's Venture Bomb", type: 'Trainer', rarity: 'Uncommon' },
  { name: "Team Rocket's Watchtower", type: 'Trainer', rarity: 'Uncommon' }, // Stadium
  { name: 'TM Machine', type: 'Trainer', rarity: 'Uncommon' },
  { name: "Team Rocket's Energy", type: 'Energy', rarity: 'Holo Rare' }, // Special Energy, often Holo or Uncommon
  { name: 'Yanma', type: 'Grass', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Cynthia's Roserade", type: 'Grass', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Shaymin', type: 'Grass', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Crustle', type: 'Grass', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Team Rocket's Spidops", type: 'Grass', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Hydrapple', type: 'Grass', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Rapidash', type: 'Fire', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Ethan's Typhlosion", type: 'Fire', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Team Rocket's Houndoom", type: 'Fire', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Blaziken', type: 'Fire', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Misty's Psyduck", type: 'Water', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Misty's Lapras", type: 'Water', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Clamperl', type: 'Water', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Electrike', type: 'Lightning', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Rotom', type: 'Lightning', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Team Rocket's Orbeetle", type: 'Psychic', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Team Rocket's Weezing", type: 'Grass', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Team Rocket's Murkrow", type: 'Darkness', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Zamazenta', type: 'Metal', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Team Rocket's Raticate", type: 'Colorless', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Team Rocket's Meowth", type: 'Colorless', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Kangaskhan', type: 'Colorless', rarity: 'Holo Rare' }, // Illustration Rare
  { name: "Arven's Greedent", type: 'Colorless', rarity: 'Holo Rare' }, // Illustration Rare
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' }, // Full Art
  { name: 'Arboliva ex', type: 'Grass', rarity: 'Holo Rare' }, // Full Art
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' }, // Full Art
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' }, // Full Art
  { name: 'Cetitan ex', type: 'Water', rarity: 'Holo Rare' }, // Full Art
  { name: 'Dondozo ex', type: 'Water', rarity: 'Holo Rare' }, // Full Art
  { name: 'Electivire ex', type: 'Lightning', rarity: 'Holo Rare' }, // Full Art
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' }, // Full Art
  { name: 'Regirock ex', type: 'Fighting', rarity: 'Holo Rare' }, // Full Art
  { name: "Cynthia's Garchomp ex", type: 'Fighting', rarity: 'Holo Rare' }, // Full Art
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' }, // Full Art
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // Full Art
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' }, // Full Art
  { name: "Team Rocket's Persian ex", type: 'Colorless', rarity: 'Holo Rare' }, // Full Art
  { name: "Emcee's Hype", type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: 'Judge', type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: "Team Rocket's Archer", type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: "Team Rocket's Petrel", type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: "Team Rocket's Proton", type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' }, // Special Illustration Rare
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' }, // Special Illustration Rare
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' }, // Special Illustration Rare
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' }, // Special Illustration Rare
  { name: "Cynthia's Garchomp ex", type: 'Fighting', rarity: 'Holo Rare' }, // Special Illustration Rare
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' }, // Special Illustration Rare
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // Special Illustration Rare
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' }, // Special Illustration Rare
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' }, // Special Illustration Rare Supporter
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' }, // Special Illustration Rare Supporter
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' }, // Special Illustration Rare Supporter
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' }, // Hyper Rare (Gold)
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' }, // Hyper Rare (Gold)
  { name: "Cynthia's Garchomp ex", type: 'Fighting', rarity: 'Holo Rare' }, // Hyper Rare (Gold)
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // Hyper Rare (Gold)
  { name: 'Jamming Tower', type: 'Trainer', rarity: 'Holo Rare' }, // Hyper Rare (Gold Stadium)
  { name: 'Levincia', type: 'Trainer', rarity: 'Holo Rare' }, // Hyper Rare (Gold Stadium)
];

export const destinedRivalsCards: PokemonCard[] = cardListData.map((card, index) => {
  const cardNumberInSet = index + 1;
  const uniqueID = getUniqueId(cardNumberInSet);
  const formattedName = formatNameForUrl(card.name);
  // Construct the ID for the card
  const cardId = `dri-${formattedName.toLowerCase().replace(/-+/g, '-')}-${String(cardNumberInSet).padStart(3, '0')}`;

  return {
    id: cardId,
    name: card.name,
    image: `https://den-cards.pokellector.com/412/${formattedName}.DRI.${cardNumberInSet}.${uniqueID}.thumb.png`,
    dataAiHint: `${card.name} ${card.type.toLowerCase()}`, // Basic hint
    rarity: card.rarity as PokemonCard['rarity'], // Explicitly cast rarity
    type: card.type as PokemonCard['type'], // Explicitly cast type
    series: 'Destined Rivals',
    pokedexNumber: `${cardNumberInSet}/244`,
  };
});
