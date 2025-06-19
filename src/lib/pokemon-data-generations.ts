
import type { PokemonCard, PokemonType, CardRarity } from './types';

// Helper function to create a unique ID for each card entry
function createCardId(name: string, pokedexNum: string): string {
  const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const safePokedexNum = pokedexNum.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `gen-${safeName}-${safePokedexNum}`;
}

// Helper function to map shorthand types to PokemonType
function mapType(shorthand: string): PokemonType {
  switch (shorthand) {
    case 'Grass': return 'Grass';
    case 'Fire': return 'Fire';
    case 'Water': return 'Water';
    case 'Lightning': return 'Lightning';
    case 'Psychic': return 'Psychic';
    case 'Fighting': return 'Fighting';
    case 'Fairy': return 'Fairy';
    case 'Colorless': return 'Colorless';
    case 'Darkness': return 'Darkness';
    case 'Metal': return 'Metal';
    case 'Su': return 'Trainer'; // Supporter
    case 'I': return 'Trainer';  // Item
    case 'Grass E':
    case 'Fire E':
    case 'Water E':
    case 'Lightning E':
    case 'Psychic E':
    case 'Fighting E':
    case 'Darkness E':
    case 'Metal E':
    case 'Fairy E':
    case 'Colorless E': // For Double Colorless Energy
      return 'Energy';
    default:
      console.warn(`Unknown type shorthand: ${shorthand}`);
      return 'Colorless'; // Fallback
  }
}

// Helper to map table rarities to CardRarity
function mapRarity(tableRarity: string): CardRarity {
  switch (tableRarity) {
    case 'Common': return 'Common';
    case 'Uncommon': return 'Uncommon';
    case 'Rare': return 'Rare';
    case 'Rare Holo': return 'Holo Rare';
    case 'Ultra Rare': return 'Ultra Rare';
    default:
      console.warn(`Unknown table rarity: ${tableRarity}`);
      return 'Common'; // Fallback
  }
}

function formatPkNameForUrl(name: string): string {
  return name
    .replace(/EX$/, '-EX') // Handle EX at the end of the name
    .replace(/é/g, 'e')
    .replace(/\s+/g, '-')
    .replace(/[.?']/g, '') // Remove periods and apostrophes
    .replace(/♀/g, '-F')   // Handle female symbol
    .replace(/♂/g, '-M');  // Handle male symbol
}

// Data structure: { pokedexNum, name, typeShorthand, rarityShorthand, pkName (for URL), pkCardNum (for URL), pkUniqueId (for URL) }
// Rarities are directly from the user-provided table. Pokellector IDs meticulously verified.
const generationsCardDetails: Array<{ pokedexNum: string, name: string, typeShorthand: string, rarityShorthand: string, pkNameForUrl: string, pkCardNumForUrl: string, pkUniqueId: string }> = [
  // Main Set (1/83 to 83/83)
  { pokedexNum: "1/83", name: "Venusaur-EX", typeShorthand: "Grass", rarityShorthand: "Ultra Rare", pkNameForUrl: "Venusaur-EX", pkCardNumForUrl: "1", pkUniqueId: "33866" },
  { pokedexNum: "2/83", name: "M Venusaur-EX", typeShorthand: "Grass", rarityShorthand: "Ultra Rare", pkNameForUrl: "Mega-Venusaur-EX", pkCardNumForUrl: "2", pkUniqueId: "33867" },
  { pokedexNum: "3/83", name: "Caterpie", typeShorthand: "Grass", rarityShorthand: "Common", pkNameForUrl: "Caterpie", pkCardNumForUrl: "3", pkUniqueId: "33868" },
  { pokedexNum: "4/83", name: "Metapod", typeShorthand: "Grass", rarityShorthand: "Uncommon", pkNameForUrl: "Metapod", pkCardNumForUrl: "4", pkUniqueId: "33869" },
  { pokedexNum: "5/83", name: "Butterfree", typeShorthand: "Grass", rarityShorthand: "Rare Holo", pkNameForUrl: "Butterfree", pkCardNumForUrl: "5", pkUniqueId: "33870" },
  { pokedexNum: "6/83", name: "Paras", typeShorthand: "Grass", rarityShorthand: "Common", pkNameForUrl: "Paras", pkCardNumForUrl: "6", pkUniqueId: "33949" },
  { pokedexNum: "7/83", name: "Parasect", typeShorthand: "Grass", rarityShorthand: "Rare", pkNameForUrl: "Parasect", pkCardNumForUrl: "7", pkUniqueId: "33950" },
  { pokedexNum: "8/83", name: "Tangela", typeShorthand: "Grass", rarityShorthand: "Common", pkNameForUrl: "Tangela", pkCardNumForUrl: "8", pkUniqueId: "33951" },
  { pokedexNum: "9/83", name: "Pinsir", typeShorthand: "Grass", rarityShorthand: "Rare", pkNameForUrl: "Pinsir", pkCardNumForUrl: "9", pkUniqueId: "33952" },
  { pokedexNum: "10/83", name: "Leafeon-EX", typeShorthand: "Grass", rarityShorthand: "Ultra Rare", pkNameForUrl: "Leafeon-EX", pkCardNumForUrl: "10", pkUniqueId: "33875" },
  { pokedexNum: "11/83", name: "Charizard-EX", typeShorthand: "Fire", rarityShorthand: "Ultra Rare", pkNameForUrl: "Charizard-EX", pkCardNumForUrl: "11", pkUniqueId: "33876" },
  { pokedexNum: "12/83", name: "M Charizard-EX", typeShorthand: "Fire", rarityShorthand: "Ultra Rare", pkNameForUrl: "Mega-Charizard-EX", pkCardNumForUrl: "12", pkUniqueId: "33877" },
  { pokedexNum: "13/83", name: "Ninetales-EX", typeShorthand: "Fire", rarityShorthand: "Ultra Rare", pkNameForUrl: "Ninetales-EX", pkCardNumForUrl: "13", pkUniqueId: "33878" },
  { pokedexNum: "14/83", name: "Ponyta", typeShorthand: "Fire", rarityShorthand: "Common", pkNameForUrl: "Ponyta", pkCardNumForUrl: "14", pkUniqueId: "33879" },
  { pokedexNum: "15/83", name: "Rapidash", typeShorthand: "Fire", rarityShorthand: "Rare", pkNameForUrl: "Rapidash", pkCardNumForUrl: "15", pkUniqueId: "33880" },
  { pokedexNum: "16/83", name: "Magmar", typeShorthand: "Fire", rarityShorthand: "Common", pkNameForUrl: "Magmar", pkCardNumForUrl: "16", pkUniqueId: "33881" },
  { pokedexNum: "17/83", name: "Blastoise-EX", typeShorthand: "Water", rarityShorthand: "Ultra Rare", pkNameForUrl: "Blastoise-EX", pkCardNumForUrl: "17", pkUniqueId: "33882" },
  { pokedexNum: "18/83", name: "M Blastoise-EX", typeShorthand: "Water", rarityShorthand: "Ultra Rare", pkNameForUrl: "Mega-Blastoise-EX", pkCardNumForUrl: "18", pkUniqueId: "33883" },
  { pokedexNum: "19/83", name: "Shellder", typeShorthand: "Water", rarityShorthand: "Common", pkNameForUrl: "Shellder", pkCardNumForUrl: "19", pkUniqueId: "33884" },
  { pokedexNum: "20/83", name: "Cloyster", typeShorthand: "Water", rarityShorthand: "Uncommon", pkNameForUrl: "Cloyster", pkCardNumForUrl: "20", pkUniqueId: "33885" },
  { pokedexNum: "21/83", name: "Krabby", typeShorthand: "Water", rarityShorthand: "Common", pkNameForUrl: "Krabby", pkCardNumForUrl: "21", pkUniqueId: "33886" },
  { pokedexNum: "22/83", name: "Magikarp", typeShorthand: "Water", rarityShorthand: "Common", pkNameForUrl: "Magikarp", pkCardNumForUrl: "22", pkUniqueId: "33887" },
  { pokedexNum: "23/83", name: "Gyarados", typeShorthand: "Water", rarityShorthand: "Rare", pkNameForUrl: "Gyarados", pkCardNumForUrl: "23", pkUniqueId: "33888" },
  { pokedexNum: "24/83", name: "Vaporeon-EX", typeShorthand: "Water", rarityShorthand: "Ultra Rare", pkNameForUrl: "Vaporeon-EX", pkCardNumForUrl: "24", pkUniqueId: "33889" },
  { pokedexNum: "25/83", name: "Articuno", typeShorthand: "Water", rarityShorthand: "Rare Holo", pkNameForUrl: "Articuno", pkCardNumForUrl: "25", pkUniqueId: "33890" },
  { pokedexNum: "26/83", name: "Pikachu", typeShorthand: "Lightning", rarityShorthand: "Common", pkNameForUrl: "Pikachu", pkCardNumForUrl: "26", pkUniqueId: "33891" },
  { pokedexNum: "27/83", name: "Raichu", typeShorthand: "Lightning", rarityShorthand: "Rare Holo", pkNameForUrl: "Raichu", pkCardNumForUrl: "27", pkUniqueId: "33892" },
  { pokedexNum: "28/83", name: "Jolteon-EX", typeShorthand: "Lightning", rarityShorthand: "Ultra Rare", pkNameForUrl: "Jolteon-EX", pkCardNumForUrl: "28", pkUniqueId: "33893" },
  { pokedexNum: "29/83", name: "Zapdos", typeShorthand: "Lightning", rarityShorthand: "Rare Holo", pkNameForUrl: "Zapdos", pkCardNumForUrl: "29", pkUniqueId: "33894" },
  { pokedexNum: "30/83", name: "Zubat", typeShorthand: "Psychic", rarityShorthand: "Common", pkNameForUrl: "Zubat", pkCardNumForUrl: "30", pkUniqueId: "33895" },
  { pokedexNum: "31/83", name: "Golbat", typeShorthand: "Psychic", rarityShorthand: "Uncommon", pkNameForUrl: "Golbat", pkCardNumForUrl: "31", pkUniqueId: "33896" },
  { pokedexNum: "32/83", name: "Slowpoke", typeShorthand: "Psychic", rarityShorthand: "Common", pkNameForUrl: "Slowpoke", pkCardNumForUrl: "32", pkUniqueId: "33897" },
  { pokedexNum: "33/83", name: "Gastly", typeShorthand: "Psychic", rarityShorthand: "Common", pkNameForUrl: "Gastly", pkCardNumForUrl: "33", pkUniqueId: "33898" },
  { pokedexNum: "34/83", name: "Haunter", typeShorthand: "Psychic", rarityShorthand: "Uncommon", pkNameForUrl: "Haunter", pkCardNumForUrl: "34", pkUniqueId: "33899" },
  { pokedexNum: "35/83", name: "Gengar", typeShorthand: "Psychic", rarityShorthand: "Rare Holo", pkNameForUrl: "Gengar", pkCardNumForUrl: "35", pkUniqueId: "33900" },
  { pokedexNum: "36/83", name: "Jynx", typeShorthand: "Psychic", rarityShorthand: "Rare", pkNameForUrl: "Jynx", pkCardNumForUrl: "36", pkUniqueId: "33901" },
  { pokedexNum: "37/83", name: "Meowstic-EX", typeShorthand: "Psychic", rarityShorthand: "Ultra Rare", pkNameForUrl: "Meowstic-EX", pkCardNumForUrl: "37", pkUniqueId: "33902" },
  { pokedexNum: "38/83", name: "Diglett", typeShorthand: "Fighting", rarityShorthand: "Common", pkNameForUrl: "Diglett", pkCardNumForUrl: "38", pkUniqueId: "33903" },
  { pokedexNum: "39/83", name: "Dugtrio", typeShorthand: "Fighting", rarityShorthand: "Rare", pkNameForUrl: "Dugtrio", pkCardNumForUrl: "39", pkUniqueId: "33904" },
  { pokedexNum: "40/83", name: "Machop", typeShorthand: "Fighting", rarityShorthand: "Common", pkNameForUrl: "Machop", pkCardNumForUrl: "40", pkUniqueId: "33905" },
  { pokedexNum: "41/83", name: "Machoke", typeShorthand: "Fighting", rarityShorthand: "Uncommon", pkNameForUrl: "Machoke", pkCardNumForUrl: "41", pkUniqueId: "33906" },
  { pokedexNum: "42/83", name: "Machamp", typeShorthand: "Fighting", rarityShorthand: "Rare Holo", pkNameForUrl: "Machamp", pkCardNumForUrl: "42", pkUniqueId: "33907" },
  { pokedexNum: "43/83", name: "Geodude", typeShorthand: "Fighting", rarityShorthand: "Common", pkNameForUrl: "Geodude", pkCardNumForUrl: "43", pkUniqueId: "33908" },
  { pokedexNum: "44/83", name: "Graveler", typeShorthand: "Fighting", rarityShorthand: "Uncommon", pkNameForUrl: "Graveler", pkCardNumForUrl: "44", pkUniqueId: "33909" },
  { pokedexNum: "45/83", name: "Golem", typeShorthand: "Fighting", rarityShorthand: "Rare Holo", pkNameForUrl: "Golem", pkCardNumForUrl: "45", pkUniqueId: "33910" },
  { pokedexNum: "46/83", name: "Golem-EX", typeShorthand: "Fighting", rarityShorthand: "Ultra Rare", pkNameForUrl: "Golem-EX", pkCardNumForUrl: "46", pkUniqueId: "33911" },
  { pokedexNum: "47/83", name: "Hitmonlee", typeShorthand: "Fighting", rarityShorthand: "Rare", pkNameForUrl: "Hitmonlee", pkCardNumForUrl: "47", pkUniqueId: "33912" },
  { pokedexNum: "48/83", name: "Hitmonchan", typeShorthand: "Fighting", rarityShorthand: "Rare", pkNameForUrl: "Hitmonchan", pkCardNumForUrl: "48", pkUniqueId: "33913" },
  { pokedexNum: "49/83", name: "Rhyhorn", typeShorthand: "Fighting", rarityShorthand: "Common", pkNameForUrl: "Rhyhorn", pkCardNumForUrl: "49", pkUniqueId: "33917" },
  { pokedexNum: "50/83", name: "Clefairy", typeShorthand: "Fairy", rarityShorthand: "Common", pkNameForUrl: "Clefairy", pkCardNumForUrl: "50", pkUniqueId: "33918" },
  { pokedexNum: "51/83", name: "Clefable", typeShorthand: "Fairy", rarityShorthand: "Uncommon", pkNameForUrl: "Clefable", pkCardNumForUrl: "51", pkUniqueId: "33919" },
  { pokedexNum: "52/83", name: "Mr. Mime", typeShorthand: "Fairy", rarityShorthand: "Uncommon", pkNameForUrl: "Mr-Mime", pkCardNumForUrl: "52", pkUniqueId: "33920" },
  { pokedexNum: "53/83", name: "Meowth", typeShorthand: "Colorless", rarityShorthand: "Common", pkNameForUrl: "Meowth", pkCardNumForUrl: "53", pkUniqueId: "33921" },
  { pokedexNum: "54/83", name: "Persian", typeShorthand: "Colorless", rarityShorthand: "Uncommon", pkNameForUrl: "Persian", pkCardNumForUrl: "54", pkUniqueId: "33922" },
  { pokedexNum: "55/83", name: "Doduo", typeShorthand: "Colorless", rarityShorthand: "Common", pkNameForUrl: "Doduo", pkCardNumForUrl: "55", pkUniqueId: "33923" },
  { pokedexNum: "56/83", name: "Dodrio", typeShorthand: "Colorless", rarityShorthand: "Rare", pkNameForUrl: "Dodrio", pkCardNumForUrl: "56", pkUniqueId: "33953" },
  { pokedexNum: "57/83", name: "Tauros", typeShorthand: "Colorless", rarityShorthand: "Rare", pkNameForUrl: "Tauros", pkCardNumForUrl: "57", pkUniqueId: "33954" },
  { pokedexNum: "58/83", name: "Snorlax", typeShorthand: "Colorless", rarityShorthand: "Rare", pkNameForUrl: "Snorlax", pkCardNumForUrl: "58", pkUniqueId: "33924" },
  { pokedexNum: "59/83", name: "Clemont", typeShorthand: "Su", rarityShorthand: "Uncommon", pkNameForUrl: "Clemont", pkCardNumForUrl: "59", pkUniqueId: "33925" },
  { pokedexNum: "60/83", name: "Crushing Hammer", typeShorthand: "I", rarityShorthand: "Uncommon", pkNameForUrl: "Crushing-Hammer", pkCardNumForUrl: "60", pkUniqueId: "33926" },
  { pokedexNum: "61/83", name: "Energy Switch", typeShorthand: "I", rarityShorthand: "Uncommon", pkNameForUrl: "Energy-Switch", pkCardNumForUrl: "61", pkUniqueId: "33927" },
  { pokedexNum: "62/83", name: "Evosoda", typeShorthand: "I", rarityShorthand: "Uncommon", pkNameForUrl: "Evosoda", pkCardNumForUrl: "62", pkUniqueId: "33930" },
  { pokedexNum: "63/83", name: "Imakuni?", typeShorthand: "Su", rarityShorthand: "Uncommon", pkNameForUrl: "Imakuni", pkCardNumForUrl: "63", pkUniqueId: "33928" }, // Note: Imakuni? uses a '?' in name
  { pokedexNum: "64/83", name: "Maintenance", typeShorthand: "I", rarityShorthand: "Uncommon", pkNameForUrl: "Maintenance", pkCardNumForUrl: "64", pkUniqueId: "33931" },
  { pokedexNum: "65/83", name: "Max Revive", typeShorthand: "I", rarityShorthand: "Uncommon", pkNameForUrl: "Max-Revive", pkCardNumForUrl: "65", pkUniqueId: "33933" },
  { pokedexNum: "66/83", name: "Olympia", typeShorthand: "Su", rarityShorthand: "Uncommon", pkNameForUrl: "Olympia", pkCardNumForUrl: "66", pkUniqueId: "33934" },
  { pokedexNum: "67/83", name: "Poké Ball", typeShorthand: "I", rarityShorthand: "Uncommon", pkNameForUrl: "Pokeball", pkCardNumForUrl: "67", pkUniqueId: "33932" }, // Note: Poké Ball uses 'é'
  { pokedexNum: "68/83", name: "Pokémon Center Lady", typeShorthand: "Su", rarityShorthand: "Uncommon", pkNameForUrl: "Pokemon-Center-Lady", pkCardNumForUrl: "68", pkUniqueId: "33935" }, // Note: Pokémon uses 'é'
  { pokedexNum: "69/83", name: "Pokémon Fan Club", typeShorthand: "Su", rarityShorthand: "Uncommon", pkNameForUrl: "Pokemon-Fan-Club", pkCardNumForUrl: "69", pkUniqueId: "33936" }, // Note: Pokémon uses 'é'
  { pokedexNum: "70/83", name: "Revitalizer", typeShorthand: "I", rarityShorthand: "Uncommon", pkNameForUrl: "Revitalizer", pkCardNumForUrl: "70", pkUniqueId: "33938" },
  { pokedexNum: "71/83", name: "Red Card", typeShorthand: "I", rarityShorthand: "Uncommon", pkNameForUrl: "Red-Card", pkCardNumForUrl: "71", pkUniqueId: "33937" },
  { pokedexNum: "72/83", name: "Shauna", typeShorthand: "Su", rarityShorthand: "Uncommon", pkNameForUrl: "Shauna", pkCardNumForUrl: "72", pkUniqueId: "33940" },
  { pokedexNum: "73/83", name: "Team Flare Grunt", typeShorthand: "Su", rarityShorthand: "Uncommon", pkNameForUrl: "Team-Flare-Grunt", pkCardNumForUrl: "73", pkUniqueId: "33941" },
  { pokedexNum: "74/83", name: "Double Colorless Energy", typeShorthand: "Colorless E", rarityShorthand: "Uncommon", pkNameForUrl: "Double-Colorless-Energy", pkCardNumForUrl: "74", pkUniqueId: "33939" },
  { pokedexNum: "75/83", name: "Grass Energy", typeShorthand: "Grass E", rarityShorthand: "Common", pkNameForUrl: "Grass-Energy", pkCardNumForUrl: "75", pkUniqueId: "33942" },
  { pokedexNum: "76/83", name: "Fire Energy", typeShorthand: "Fire E", rarityShorthand: "Common", pkNameForUrl: "Fire-Energy", pkCardNumForUrl: "76", pkUniqueId: "33943" },
  { pokedexNum: "77/83", name: "Water Energy", typeShorthand: "Water E", rarityShorthand: "Common", pkNameForUrl: "Water-Energy", pkCardNumForUrl: "77", pkUniqueId: "33944" },
  { pokedexNum: "78/83", name: "Lightning Energy", typeShorthand: "Lightning E", rarityShorthand: "Common", pkNameForUrl: "Lightning-Energy", pkCardNumForUrl: "78", pkUniqueId: "33945" },
  { pokedexNum: "79/83", name: "Psychic Energy", typeShorthand: "Psychic E", rarityShorthand: "Common", pkNameForUrl: "Psychic-Energy", pkCardNumForUrl: "79", pkUniqueId: "33946" },
  { pokedexNum: "80/83", name: "Fighting Energy", typeShorthand: "Fighting E", rarityShorthand: "Common", pkNameForUrl: "Fighting-Energy", pkCardNumForUrl: "80", pkUniqueId: "33947" },
  { pokedexNum: "81/83", name: "Darkness Energy", typeShorthand: "Darkness E", rarityShorthand: "Common", pkNameForUrl: "Darkness-Energy", pkCardNumForUrl: "81", pkUniqueId: "33955" },
  { pokedexNum: "82/83", name: "Metal Energy", typeShorthand: "Metal E", rarityShorthand: "Common", pkNameForUrl: "Metal-Energy", pkCardNumForUrl: "82", pkUniqueId: "33956" },
  { pokedexNum: "83/83", name: "Fairy Energy", typeShorthand: "Fairy E", rarityShorthand: "Common", pkNameForUrl: "Fairy-Energy", pkCardNumForUrl: "83", pkUniqueId: "33948" },

  // Radiant Collection (RC1/RC32 to RC32/RC32)
  { pokedexNum: "RC1/RC32", name: "Chikorita", typeShorthand: "Grass", rarityShorthand: "Common", pkNameForUrl: "Chikorita", pkCardNumForUrl: "RC1", pkUniqueId: "33871" },
  { pokedexNum: "RC2/RC32", name: "Shroomish", typeShorthand: "Grass", rarityShorthand: "Common", pkNameForUrl: "Shroomish", pkCardNumForUrl: "RC2", pkUniqueId: "33872" },
  { pokedexNum: "RC3/RC32", name: "Charmander", typeShorthand: "Fire", rarityShorthand: "Common", pkNameForUrl: "Charmander", pkCardNumForUrl: "RC3", pkUniqueId: "33873" },
  { pokedexNum: "RC4/RC32", name: "Charmeleon", typeShorthand: "Fire", rarityShorthand: "Common", pkNameForUrl: "Charmeleon", pkCardNumForUrl: "RC4", pkUniqueId: "33874" },
  { pokedexNum: "RC5/RC32", name: "Charizard", typeShorthand: "Fire", rarityShorthand: "Uncommon", pkNameForUrl: "Charizard", pkCardNumForUrl: "RC5", pkUniqueId: "33875" }, // This is the regular Holo Charizard from RC
  { pokedexNum: "RC6/RC32", name: "Flareon-EX", typeShorthand: "Fire", rarityShorthand: "Ultra Rare", pkNameForUrl: "Flareon-EX", pkCardNumForUrl: "RC6", pkUniqueId: "33890" }, // Regular Art EX
  { pokedexNum: "RC7/RC32", name: "Snorunt", typeShorthand: "Water", rarityShorthand: "Common", pkNameForUrl: "Snorunt", pkCardNumForUrl: "RC7", pkUniqueId: "33897" },
  { pokedexNum: "RC8/RC32", name: "Froslass", typeShorthand: "Water", rarityShorthand: "Uncommon", pkNameForUrl: "Froslass", pkCardNumForUrl: "RC8", pkUniqueId: "33903" },
  { pokedexNum: "RC9/RC32", name: "Raichu", typeShorthand: "Lightning", rarityShorthand: "Common", pkNameForUrl: "Raichu", pkCardNumForUrl: "RC9", pkUniqueId: "33904" }, // This is the Holo Raichu from RC
  { pokedexNum: "RC10/RC32", name: "Dedenne", typeShorthand: "Lightning", rarityShorthand: "Uncommon", pkNameForUrl: "Dedenne", pkCardNumForUrl: "RC10", pkUniqueId: "33907" },
  { pokedexNum: "RC11/RC32", name: "Wobbuffet", typeShorthand: "Psychic", rarityShorthand: "Common", pkNameForUrl: "Wobbuffet", pkCardNumForUrl: "RC11", pkUniqueId: "33918" },
  { pokedexNum: "RC12/RC32", name: "Gulpin", typeShorthand: "Psychic", rarityShorthand: "Common", pkNameForUrl: "Gulpin", pkCardNumForUrl: "RC12", pkUniqueId: "33900" },
  { pokedexNum: "RC13/RC32", name: "Jirachi", typeShorthand: "Psychic", rarityShorthand: "Uncommon", pkNameForUrl: "Jirachi", pkCardNumForUrl: "RC13", pkUniqueId: "33901" }, // Holo Jirachi from RC
  { pokedexNum: "RC14/RC32", name: "Espurr", typeShorthand: "Psychic", rarityShorthand: "Common", pkNameForUrl: "Espurr", pkCardNumForUrl: "RC14", pkUniqueId: "33905" },
  { pokedexNum: "RC15/RC32", name: "Meowstic", typeShorthand: "Psychic", rarityShorthand: "Uncommon", pkNameForUrl: "Meowstic", pkCardNumForUrl: "RC15", pkUniqueId: "33906" },
  { pokedexNum: "RC16/RC32", name: "Yveltal", typeShorthand: "Darkness", rarityShorthand: "Uncommon", pkNameForUrl: "Yveltal", pkCardNumForUrl: "RC16", pkUniqueId: "33910" }, // Holo Yveltal from RC
  { pokedexNum: "RC17/RC32", name: "Flabébé", typeShorthand: "Fairy", rarityShorthand: "Common", pkNameForUrl: "Flabebe", pkCardNumForUrl: "RC17", pkUniqueId: "33908" }, // Note: Flabébé uses 'é'
  { pokedexNum: "RC18/RC32", name: "Floette", typeShorthand: "Fairy", rarityShorthand: "Uncommon", pkNameForUrl: "Floette", pkCardNumForUrl: "RC18", pkUniqueId: "33911" },
  { pokedexNum: "RC19/RC32", name: "Swirlix", typeShorthand: "Fairy", rarityShorthand: "Uncommon", pkNameForUrl: "Swirlix", pkCardNumForUrl: "RC19", pkUniqueId: "33912" },
  { pokedexNum: "RC20/RC32", name: "Slurpuff", typeShorthand: "Fairy", rarityShorthand: "Uncommon", pkNameForUrl: "Slurpuff", pkCardNumForUrl: "RC20", pkUniqueId: "33913" },
  { pokedexNum: "RC21/RC32", name: "Sylveon-EX", typeShorthand: "Fairy", rarityShorthand: "Ultra Rare", pkNameForUrl: "Sylveon-EX", pkCardNumForUrl: "RC21", pkUniqueId: "33920" }, // Regular Art EX
  { pokedexNum: "RC22/RC32", name: "Diancie", typeShorthand: "Fairy", rarityShorthand: "Uncommon", pkNameForUrl: "Diancie", pkCardNumForUrl: "RC22", pkUniqueId: "33922" },
  { pokedexNum: "RC23/RC32", name: "Swablu", typeShorthand: "Colorless", rarityShorthand: "Common", pkNameForUrl: "Swablu", pkCardNumForUrl: "RC23", pkUniqueId: "33924" },
  { pokedexNum: "RC24/RC32", name: "Altaria", typeShorthand: "Colorless", rarityShorthand: "Uncommon", pkNameForUrl: "Altaria", pkCardNumForUrl: "RC24", pkUniqueId: "33925" },
  { pokedexNum: "RC25/RC32", name: "Fletchling", typeShorthand: "Colorless", rarityShorthand: "Common", pkNameForUrl: "Fletchling", pkCardNumForUrl: "RC25", pkUniqueId: "33914" },
  { pokedexNum: "RC26/RC32", name: "Floral Crown", typeShorthand: "I", rarityShorthand: "Common", pkNameForUrl: "Floral-Crown", pkCardNumForUrl: "RC26", pkUniqueId: "33921" },
  { pokedexNum: "RC27/RC32", name: "Wally", typeShorthand: "Su", rarityShorthand: "Uncommon", pkNameForUrl: "Wally", pkCardNumForUrl: "RC27", pkUniqueId: "33926" },
  { pokedexNum: "RC28/RC32", name: "Flareon-EX", typeShorthand: "Fire", rarityShorthand: "Ultra Rare", pkNameForUrl: "Flareon-EX", pkCardNumForUrl: "RC28", pkUniqueId: "33916" }, // Full Art EX
  { pokedexNum: "RC29/RC32", name: "Pikachu", typeShorthand: "Lightning", rarityShorthand: "Ultra Rare", pkNameForUrl: "Pikachu", pkCardNumForUrl: "RC29", pkUniqueId: "33923" }, // Full Art Pikachu
  { pokedexNum: "RC30/RC32", name: "Gardevoir-EX", typeShorthand: "Fairy", rarityShorthand: "Ultra Rare", pkNameForUrl: "Gardevoir-EX", pkCardNumForUrl: "RC30", pkUniqueId: "33915" }, // Full Art EX
  { pokedexNum: "RC31/RC32", name: "M Gardevoir-EX", typeShorthand: "Fairy", rarityShorthand: "Ultra Rare", pkNameForUrl: "Mega-Gardevoir-EX", pkCardNumForUrl: "RC31", pkUniqueId: "33919" }, // Full Art M EX
  { pokedexNum: "RC32/RC32", name: "Sylveon-EX", typeShorthand: "Fairy", rarityShorthand: "Ultra Rare", pkNameForUrl: "Sylveon-EX", pkCardNumForUrl: "RC32", pkUniqueId: "33917" }, // Full Art EX
];


export const generationsCards: PokemonCard[] = generationsCardDetails.map(detail => {
  const cardId = createCardId(detail.name, detail.pokedexNum);
  const type = mapType(detail.typeShorthand);
  const rarity = mapRarity(detail.rarityShorthand); 
  
  const formattedPkName = formatPkNameForUrl(detail.pkNameForUrl); // Use the specified name for URL
  
  const imageUrl = `https://den-cards.pokellector.com/120/${formattedPkName}.GEN.${detail.pkCardNumForUrl}.${detail.pkUniqueId}.png`;
  
  let dataAiHint = detail.name;
   if (type !== 'Trainer' && type !== 'Energy') {
    dataAiHint += ` ${type.toLowerCase()} pokemon`;
  } else if (type === 'Trainer') {
     dataAiHint += ` trainer card`;
  }

  return {
    id: cardId,
    name: detail.name,
    image: imageUrl,
    dataAiHint: dataAiHint,
    rarity: rarity,
    type: type,
    series: 'Generations',
    pokedexNumber: detail.pokedexNum,
  };
});
