
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

// Function to get the correct UniqueID based on card number and exceptions
function getDestinedRivalsUniqueID(cardNumberInSet: number): number {
  // Specific exceptions first
  if (cardNumberInSet === 34) return 56855; // Ethan's Typhlosion
  if (cardNumberInSet === 49) return 56856; // Misty's Gyarados
  if (cardNumberInSet === 87) return 56857; // Team Rocket's Mimikyu
  if (cardNumberInSet === 96) return 56858; // Team Rocket's Tyranitar
  if (cardNumberInSet === 193) return 57235; // Misty's Psyduck
  if (cardNumberInSet === 198) return 57253; // Team Rocket's Orbeetle
  if (cardNumberInSet === 203) return 57242; // Team Rocket's Meowth
  if (cardNumberInSet === 204) return 56864; // Kangaskhan
  if (cardNumberInSet === 209) return 57233; // Ethan's Ho-Oh ex
  if (cardNumberInSet === 231) return 57254; // Team Rocket's Mewtwo ex
  if (cardNumberInSet === 232) return 57234; // Cynthia's Garchomp ex
  if (cardNumberInSet === 234) return 57243; // Team Rocket's Crobat ex

  // General patterns by range
  if (cardNumberInSet >= 1 && cardNumberInSet <= 33) {
    return 57267 + (cardNumberInSet - 1);
  }
  if (cardNumberInSet >= 35 && cardNumberInSet <= 48) {
    return 57300 + (cardNumberInSet - 35);
  }
  if (cardNumberInSet >= 50 && cardNumberInSet <= 86) {
    return 57314 + (cardNumberInSet - 50);
  }
  if (cardNumberInSet >= 88 && cardNumberInSet <= 95) {
    return 57351 + (cardNumberInSet - 88);
  }
  // This is the main "catch-all" pattern for remaining cards within 97-244 range
  // that are not covered by the specific exceptions above.
  if (cardNumberInSet >= 97 && cardNumberInSet <= 244) {
    return 57359 + (cardNumberInSet - 97);
  }

  // Fallback for any unhandled case
  console.warn(`Unhandled card number for Destined Rivals UniqueID: ${cardNumberInSet}`);
  return 0; 
}


const cardListData: { name: string, type: PokemonCard['type'], rarity: PokemonCard['rarity'] }[] = [
  { name: "Ethan's Pinsir", type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Yanma', type: 'Grass', rarity: 'Common' },
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Pineco', type: 'Grass', rarity: 'Common' },
  { name: 'Shroomish', type: 'Grass', rarity: 'Common' },
  { name: 'Breloom', type: 'Grass', rarity: 'Uncommon' },
  { name: "Cynthia's Roselia", type: 'Grass', rarity: 'Uncommon' },
  { name: "Cynthia's Roserade", type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Mow Rotom', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Shaymin', type: 'Grass', rarity: 'Holo Rare' }, // Typically Holo or better
  { name: 'Dwebble', type: 'Grass', rarity: 'Common' },
  { name: 'Crustle', type: 'Grass', rarity: 'Uncommon' },
  { name: 'Fomantis', type: 'Grass', rarity: 'Common' },
  { name: 'Lurantis', type: 'Grass', rarity: 'Holo Rare' }, // Often Holo
  { name: "Team Rocket's Blipbug", type: 'Grass', rarity: 'Common' },
  { name: 'Applin', type: 'Grass', rarity: 'Common' },
  { name: 'Dipplin', type: 'Grass', rarity: 'Uncommon' },
  { name: 'Hydrapple', type: 'Grass', rarity: 'Holo Rare' }, // Likely Holo or ex
  { name: "Team Rocket's Tarountula", type: 'Grass', rarity: 'Common' },
  { name: "Team Rocket's Spidops", type: 'Grass', rarity: 'Uncommon' },
  { name: 'Smoliv', type: 'Grass', rarity: 'Common' },
  { name: 'Dolliv', type: 'Grass', rarity: 'Uncommon' },
  { name: 'Arboliva ex', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Rellor', type: 'Grass', rarity: 'Common' },
  { name: 'Rabsca ex', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Teal Mask Ogerpon', type: 'Grass', rarity: 'Holo Rare' }, // Special card, Holo
  { name: 'Growlithe', type: 'Fire', rarity: 'Common' },
  { name: 'Arcanine', type: 'Fire', rarity: 'Uncommon' },
  { name: 'Ponyta', type: 'Fire', rarity: 'Common' },
  { name: 'Rapidash', type: 'Fire', rarity: 'Uncommon' },
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' },
  { name: "Ethan's Cyndaquil", type: 'Fire', rarity: 'Common' },
  { name: "Ethan's Quilava", type: 'Fire', rarity: 'Uncommon' },
  { name: "Ethan's Typhlosion", type: 'Fire', rarity: 'Holo Rare' }, // Often Holo
  { name: "Ethan's Slugma", type: 'Fire', rarity: 'Common' },
  { name: "Ethan's Magcargo", type: 'Fire', rarity: 'Uncommon' },
  { name: "Team Rocket's Houndour", type: 'Fire', rarity: 'Common' },
  { name: "Team Rocket's Houndoom", type: 'Fire', rarity: 'Holo Rare' }, // Often Holo
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' },
  { name: 'Torchic', type: 'Fire', rarity: 'Common' },
  { name: 'Combusken', type: 'Fire', rarity: 'Uncommon' },
  { name: 'Blaziken', type: 'Fire', rarity: 'Holo Rare' }, // Often Holo
  { name: 'Heat Rotom', type: 'Fire', rarity: 'Holo Rare' }, // Rotoms are often Holo
  { name: 'Hearthflame Mask Ogerpon', type: 'Fire', rarity: 'Holo Rare' }, // Special card, Holo
  { name: "Misty's Psyduck", type: 'Water', rarity: 'Common' },
  { name: "Misty's Staryu", type: 'Water', rarity: 'Common' },
  { name: "Misty's Starmie", type: 'Water', rarity: 'Uncommon' }, // Can be Holo, but uncommon is safe base
  { name: "Misty's Magikarp", type: 'Water', rarity: 'Common' },
  { name: "Misty's Gyarados", type: 'Water', rarity: 'Holo Rare' }, // Often Holo
  { name: "Misty's Lapras", type: 'Water', rarity: 'Holo Rare' }, // Often Holo
  { name: "Team Rocket's Articuno", type: 'Water', rarity: 'Holo Rare' }, // Legendaries are Holo
  { name: "Cynthia's Feebas", type: 'Water', rarity: 'Common' },
  { name: "Cynthia's Milotic", type: 'Water', rarity: 'Holo Rare' }, // Often Holo
  { name: 'Clamperl', type: 'Water', rarity: 'Common' },
  { name: 'Huntail', type: 'Water', rarity: 'Uncommon' },
  { name: 'Gorebyss', type: 'Water', rarity: 'Uncommon' },
  { name: 'Buizel', type: 'Water', rarity: 'Common' },
  { name: 'Floatzel', type: 'Water', rarity: 'Uncommon' },
  { name: 'Snover', type: 'Water', rarity: 'Common' },
  { name: 'Abomasnow', type: 'Water', rarity: 'Uncommon' },
  { name: 'Wash Rotom', type: 'Water', rarity: 'Holo Rare' }, // Rotoms are often Holo
  { name: 'Arrokuda', type: 'Water', rarity: 'Common' },
  { name: 'Barraskewda', type: 'Water', rarity: 'Uncommon' },
  { name: 'Cetoddle', type: 'Water', rarity: 'Common' },
  { name: 'Cetitan ex', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Dondozo ex', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Wellspring Mask Ogerpon', type: 'Water', rarity: 'Holo Rare' }, // Special card, Holo
  { name: 'Electabuzz', type: 'Lightning', rarity: 'Common' }, // Can be uncommon/rare too
  { name: 'Electivire ex', type: 'Lightning', rarity: 'Holo Rare' },
  { name: "Team Rocket's Zapdos", type: 'Lightning', rarity: 'Holo Rare' }, // Legendaries are Holo
  { name: "Ethan's Pichu", type: 'Lightning', rarity: 'Common' }, // Baby pokemon often common/uncommon
  { name: "Team Rocket's Mareep", type: 'Lightning', rarity: 'Common' },
  { name: "Team Rocket's Flaaffy", type: 'Lightning', rarity: 'Uncommon' },
  { name: "Team Rocket's Ampharos", type: 'Lightning', rarity: 'Holo Rare' }, // Often Holo
  { name: 'Electrike', type: 'Lightning', rarity: 'Common' },
  { name: 'Manectric', type: 'Lightning', rarity: 'Uncommon' },
  { name: 'Rotom', type: 'Lightning', rarity: 'Holo Rare' }, // Base Rotom often Holo
  { name: 'Zeraora', type: 'Lightning', rarity: 'Holo Rare' }, // Mythical often Holo
  { name: "Team Rocket's Drowzee", type: 'Psychic', rarity: 'Common' },
  { name: "Team Rocket's Hypno", type: 'Psychic', rarity: 'Uncommon' }, // Can be rare
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' },
  { name: "Team Rocket's Wobbuffet", type: 'Psychic', rarity: 'Uncommon' }, // Often uncommon/rare
  { name: "Steven's Baltoy", type: 'Psychic', rarity: 'Common' },
  { name: "Steven's Claydol", type: 'Psychic', rarity: 'Uncommon' }, // Can be rare
  { name: "Team Rocket's Chingling", type: 'Psychic', rarity: 'Common' },
  { name: "Steven's Carbink", type: 'Psychic', rarity: 'Uncommon' }, // Fairy type usually, Psychic in TCG
  { name: "Team Rocket's Mimikyu", type: 'Psychic', rarity: 'Holo Rare' }, // Often Holo
  { name: "Team Rocket's Dottler", type: 'Psychic', rarity: 'Uncommon' },
  { name: "Team Rocket's Orbeetle", type: 'Psychic', rarity: 'Holo Rare' }, // Often Holo
  { name: 'Mankey', type: 'Fighting', rarity: 'Common' },
  { name: 'Primeape', type: 'Fighting', rarity: 'Uncommon' },
  { name: 'Annihilape', type: 'Fighting', rarity: 'Holo Rare' }, // Often Holo
  { name: "Ethan's Sudowoodo", type: 'Fighting', rarity: 'Uncommon' }, // Rock type, Fighting in TCG
  { name: "Team Rocket's Larvitar", type: 'Fighting', rarity: 'Common' }, // Ground/Rock, Fighting in TCG
  { name: "Team Rocket's Pupitar", type: 'Fighting', rarity: 'Uncommon' },
  { name: "Team Rocket's Tyranitar", type: 'Fighting', rarity: 'Holo Rare' }, // Dark/Rock, often Fighting or Darkness in TCG
  { name: 'Nosepass', type: 'Fighting', rarity: 'Common' }, // Rock type
  { name: 'Probopass', type: 'Fighting', rarity: 'Uncommon' }, // Rock/Steel type
  { name: 'Meditite', type: 'Fighting', rarity: 'Common' },
  { name: 'Medicham', type: 'Fighting', rarity: 'Uncommon' },
  { name: 'Regirock ex', type: 'Fighting', rarity: 'Holo Rare' },
  { name: "Cynthia's Gible", type: 'Fighting', rarity: 'Common' }, // Dragon/Ground, Fighting in TCG
  { name: "Cynthia's Gabite", type: 'Fighting', rarity: 'Uncommon' },
  { name: "Cynthia's Garchomp ex", type: 'Fighting', rarity: 'Holo Rare' },
  { name: 'Hippopotas', type: 'Fighting', rarity: 'Common' }, // Ground type
  { name: 'Hippowdon', type: 'Fighting', rarity: 'Uncommon' },
  { name: 'Mudbray', type: 'Fighting', rarity: 'Common' }, // Ground type
  { name: 'Mudsdale', type: 'Fighting', rarity: 'Uncommon' },
  { name: "Arven's Toedscool", type: 'Fighting', rarity: 'Common' }, // Grass/Ground, Fighting for TCG
  { name: "Arven's Toedscruel", type: 'Fighting', rarity: 'Uncommon' },
  { name: 'Cornerstone Mask Ogerpon', type: 'Fighting', rarity: 'Holo Rare' }, // Special card, Holo
  { name: "Team Rocket's Ekans", type: 'Grass', rarity: 'Common' }, // Poison type mapped to Grass
  { name: "Team Rocket's Arbok", type: 'Grass', rarity: 'Uncommon' },
  { name: "Team Rocket's Nidoran♀", type: 'Grass', rarity: 'Common' },
  { name: "Team Rocket's Nidorina", type: 'Grass', rarity: 'Uncommon' },
  { name: "Team Rocket's Nidoqueen", type: 'Grass', rarity: 'Holo Rare' },
  { name: "Team Rocket's Nidoran♂", type: 'Grass', rarity: 'Common' },
  { name: "Team Rocket's Nidorino", type: 'Grass', rarity: 'Uncommon' },
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' },
  { name: "Team Rocket's Zubat", type: 'Grass', rarity: 'Common' },
  { name: "Team Rocket's Golbat", type: 'Grass', rarity: 'Uncommon' },
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // Poison/Flying, often Darkness
  { name: "Team Rocket's Grimer", type: 'Grass', rarity: 'Common' },
  { name: "Team Rocket's Muk", type: 'Grass', rarity: 'Uncommon' },
  { name: "Team Rocket's Koffing", type: 'Grass', rarity: 'Common' },
  { name: "Team Rocket's Weezing", type: 'Grass', rarity: 'Holo Rare' },
  { name: "Team Rocket's Murkrow", type: 'Darkness', rarity: 'Common' },
  { name: "Team Rocket's Sneasel", type: 'Darkness', rarity: 'Common' },
  { name: "Cynthia's Spiritomb", type: 'Darkness', rarity: 'Holo Rare' }, // Ghost/Dark, often Psychic or Darkness
  { name: "Marnie's Purrloin", type: 'Darkness', rarity: 'Common' },
  { name: "Marnie's Liepard", type: 'Darkness', rarity: 'Uncommon' },
  { name: "Marnie's Scraggy", type: 'Darkness', rarity: 'Common' },
  { name: "Marnie's Scrafty", type: 'Darkness', rarity: 'Uncommon' },
  { name: "Marnie's Impidimp", type: 'Darkness', rarity: 'Common' }, // Dark/Fairy
  { name: "Marnie's Morgrem", type: 'Darkness', rarity: 'Uncommon' },
  { name: "Marnie's Grimmsnarl ex", type: 'Darkness', rarity: 'Holo Rare' },
  { name: "Marnie's Morpeko", type: 'Darkness', rarity: 'Holo Rare' }, // Electric/Dark
  { name: "Arven's Maschiff", type: 'Darkness', rarity: 'Common' },
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' },
  { name: 'Forretress', type: 'Metal', rarity: 'Uncommon' }, // Bug/Steel
  { name: 'Skarmory', type: 'Metal', rarity: 'Common' }, // Steel/Flying
  { name: "Steven's Skarmory", type: 'Metal', rarity: 'Uncommon' },
  { name: "Steven's Beldum", type: 'Metal', rarity: 'Common' },
  { name: "Steven's Metang", type: 'Metal', rarity: 'Uncommon' },
  { name: "Steven's Metagross ex", type: 'Metal', rarity: 'Holo Rare' },
  { name: 'Zamazenta', type: 'Metal', rarity: 'Holo Rare' }, // Legendary
  { name: "Team Rocket's Rattata", type: 'Colorless', rarity: 'Common' },
  { name: "Team Rocket's Raticate", type: 'Colorless', rarity: 'Uncommon' },
  { name: "Team Rocket's Meowth", type: 'Colorless', rarity: 'Common' },
  { name: "Team Rocket's Persian ex", type: 'Colorless', rarity: 'Holo Rare' },
  { name: 'Kangaskhan', type: 'Colorless', rarity: 'Holo Rare' }, // Often Holo
  { name: 'Tauros', type: 'Colorless', rarity: 'Uncommon' }, // Can be rare
  { name: "Team Rocket's Porygon", type: 'Colorless', rarity: 'Common' },
  { name: "Team Rocket's Porygon2", type: 'Colorless', rarity: 'Uncommon' },
  { name: "Team Rocket's Porygon-Z", type: 'Colorless', rarity: 'Holo Rare' },
  { name: 'Taillow', type: 'Colorless', rarity: 'Common' },
  { name: 'Swellow', type: 'Colorless', rarity: 'Uncommon' },
  { name: "Arven's Skwovet", type: 'Colorless', rarity: 'Common' },
  { name: "Arven's Greedent", type: 'Colorless', rarity: 'Uncommon' },
  { name: 'Squawkabilly', type: 'Colorless', rarity: 'Holo Rare' }, // Often Holo
  { name: "Arven's Sandwich", type: 'Trainer', rarity: 'Uncommon' }, // Item
  { name: "Cynthia's Power Weight", type: 'Trainer', rarity: 'Uncommon' }, // Tool
  { name: "Emcee's Hype", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter (often holo if full art style)
  { name: 'Energy Recycler', type: 'Trainer', rarity: 'Uncommon' }, // Item
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter
  { name: 'Granite Cave', type: 'Trainer', rarity: 'Uncommon' }, // Stadium
  { name: 'Judge', type: 'Trainer', rarity: 'Holo Rare' }, // Supporter
  { name: 'Sacred Ash', type: 'Trainer', rarity: 'Uncommon' }, // Item
  { name: 'Spikemuth Gym', type: 'Trainer', rarity: 'Uncommon' }, // Stadium
  { name: "Team Rocket's Archer", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter
  { name: "Team Rocket's Bother-Bot", type: 'Trainer', rarity: 'Uncommon' }, // Item/Tool
  { name: "Team Rocket's Factory", type: 'Trainer', rarity: 'Uncommon' }, // Stadium
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter
  { name: "Team Rocket's Great Ball", type: 'Trainer', rarity: 'Uncommon' }, // Item
  { name: "Team Rocket's Petrel", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter
  { name: "Team Rocket's Proton", type: 'Trainer', rarity: 'Holo Rare' }, // Supporter
  { name: "Team Rocket's Transceiver", type: 'Trainer', rarity: 'Uncommon' }, // Item
  { name: "Team Rocket's Venture Bomb", type: 'Trainer', rarity: 'Uncommon' }, // Tool
  { name: "Team Rocket's Watchtower", type: 'Trainer', rarity: 'Uncommon' }, // Stadium
  { name: 'TM Machine', type: 'Trainer', rarity: 'Uncommon' }, // Tool
  { name: "Team Rocket's Energy", type: 'Energy', rarity: 'Holo Rare' }, // Special Energy often Holo
  // Illustration Rares and beyond are typically Holo Rare in our system
  { name: 'Yanma', type: 'Grass', rarity: 'Holo Rare' }, // Illustration Rare from list
  { name: "Cynthia's Roserade", type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Shaymin', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Crustle', type: 'Grass', rarity: 'Holo Rare' },
  { name: "Team Rocket's Spidops", type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Hydrapple', type: 'Grass', rarity: 'Holo Rare' },
  { name: 'Rapidash', type: 'Fire', rarity: 'Holo Rare' },
  { name: "Ethan's Typhlosion", type: 'Fire', rarity: 'Holo Rare' },
  { name: "Team Rocket's Houndoom", type: 'Fire', rarity: 'Holo Rare' },
  { name: 'Blaziken', type: 'Fire', rarity: 'Holo Rare' },
  { name: "Misty's Psyduck", type: 'Water', rarity: 'Holo Rare' },
  { name: "Misty's Lapras", type: 'Water', rarity: 'Holo Rare' },
  { name: 'Clamperl', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Electrike', type: 'Lightning', rarity: 'Holo Rare' },
  { name: 'Rotom', type: 'Lightning', rarity: 'Holo Rare' },
  { name: "Team Rocket's Orbeetle", type: 'Psychic', rarity: 'Holo Rare' },
  { name: "Team Rocket's Weezing", type: 'Grass', rarity: 'Holo Rare' }, // Poison
  { name: "Team Rocket's Murkrow", type: 'Darkness', rarity: 'Holo Rare' },
  { name: 'Zamazenta', type: 'Metal', rarity: 'Holo Rare' },
  { name: "Team Rocket's Raticate", type: 'Colorless', rarity: 'Holo Rare' },
  { name: "Team Rocket's Meowth", type: 'Colorless', rarity: 'Holo Rare' },
  { name: 'Kangaskhan', type: 'Colorless', rarity: 'Holo Rare' },
  { name: "Arven's Greedent", type: 'Colorless', rarity: 'Holo Rare' },
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' }, // Full Art ex
  { name: 'Arboliva ex', type: 'Grass', rarity: 'Holo Rare' },
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' },
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' },
  { name: 'Cetitan ex', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Dondozo ex', type: 'Water', rarity: 'Holo Rare' },
  { name: 'Electivire ex', type: 'Lightning', rarity: 'Holo Rare' },
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' },
  { name: 'Regirock ex', type: 'Fighting', rarity: 'Holo Rare' },
  { name: "Cynthia's Garchomp ex", type: 'Fighting', rarity: 'Holo Rare' },
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' }, // Poison
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // Poison/Flying
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' },
  { name: "Team Rocket's Persian ex", type: 'Colorless', rarity: 'Holo Rare' },
  { name: "Emcee's Hype", type: 'Trainer', rarity: 'Holo Rare' }, // Full Art Supporter
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' },
  { name: 'Judge', type: 'Trainer', rarity: 'Holo Rare' },
  { name: "Team Rocket's Archer", type: 'Trainer', rarity: 'Holo Rare' },
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' },
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' },
  { name: "Team Rocket's Petrel", type: 'Trainer', rarity: 'Holo Rare' },
  { name: "Team Rocket's Proton", type: 'Trainer', rarity: 'Holo Rare' },
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' }, // Special Illustration Rare ex
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' },
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' },
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' },
  { name: "Cynthia's Garchomp ex", type: 'Fighting', rarity: 'Holo Rare' },
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' }, // Poison
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // Poison/Flying
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' },
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' }, // Special Illustration Supporter
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' },
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' },
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' }, // Hyper Rare (Gold) ex
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' },
  { name: "Cynthia's Garchomp ex", type: 'Fighting', rarity: 'Holo Rare' },
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // Poison/Flying
  { name: 'Jamming Tower', type: 'Trainer', rarity: 'Holo Rare' }, // Hyper Rare Stadium
  { name: 'Levincia', type: 'Trainer', rarity: 'Holo Rare' }, // Hyper Rare Stadium
];


export const destinedRivalsCards: PokemonCard[] = cardListData.map((card, index) => {
  const cardNumberInSet = index + 1; // 1-based index
  const uniqueID = getDestinedRivalsUniqueID(cardNumberInSet);
  const formattedName = formatNameForUrl(card.name);
  const cardId = `dri-${formattedName.toLowerCase().replace(/-+/g, '-')}-${String(cardNumberInSet).padStart(3, '0')}`;
  
  // Basic dataAiHint, can be improved with more specifics if needed
  let dataAiHint = card.name;
  if (card.type !== 'Trainer' && card.type !== 'Energy') {
    dataAiHint += ` ${card.type.toLowerCase()} pokemon`;
  } else if (card.type === 'Trainer') {
     dataAiHint += ` trainer card`;
  }


  return {
    id: cardId,
    name: card.name,
    image: `https://den-cards.pokellector.com/412/${formattedName}.DRI.${cardNumberInSet}.${uniqueID}.thumb.png`,
    dataAiHint: dataAiHint,
    rarity: card.rarity,
    type: card.type,
    series: 'Destined Rivals',
    pokedexNumber: `${cardNumberInSet}/244`,
  };
});

    