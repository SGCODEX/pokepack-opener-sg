
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
  if (cardNumberInSet === 34) return 56855;  // Ethan's Typhlosion
  if (cardNumberInSet === 49) return 56856;  // Misty's Gyarados
  if (cardNumberInSet === 87) return 56857;  // Team Rocket's Mimikyu
  if (cardNumberInSet === 96) return 56858;  // Team Rocket's Tyranitar
  if (cardNumberInSet === 193) return 57235; // Misty's Psyduck
  if (cardNumberInSet === 198) return 57253; // Team Rocket's Orbeetle
  if (cardNumberInSet === 203) return 57242; // Team Rocket's Meowth
  if (cardNumberInSet === 204) return 56864; // Kangaskhan
  if (cardNumberInSet === 209) return 57233; // Ethan's Ho-Oh ex
  if (cardNumberInSet === 231) return 57254; // Team Rocket's Mewtwo ex
  if (cardNumberInSet === 232) return 57234; // Cynthia's Garchomp ex
  if (cardNumberInSet === 233) return 57488; // Card #233 specific ID
  if (cardNumberInSet === 234) return 57243; // Team Rocket's Crobat ex

  // Ranges
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
  // Note: Card 96 is an exception handled above.
  if (cardNumberInSet >= 97 && cardNumberInSet <= 192) { // Ends before Misty's Psyduck (193)
    return 57359 + (cardNumberInSet - 97);
  }
  // Note: Card 193 is an exception.
  if (cardNumberInSet >= 194 && cardNumberInSet <= 197) {
    return 57455 + (cardNumberInSet - 194);
  }
  // Note: Card 198 is an exception.
  if (cardNumberInSet >= 199 && cardNumberInSet <= 202) {
    return 57459 + (cardNumberInSet - 199);
  }
  // Note: Cards 203 and 204 are exceptions.
  if (cardNumberInSet >= 205 && cardNumberInSet <= 208) {
    return 57463 + (cardNumberInSet - 205);
  }
  // Note: Card 209 is an exception.
  if (cardNumberInSet >= 210 && cardNumberInSet <= 230) {
    return 57467 + (cardNumberInSet - 210);
  }
  // Note: Cards 231, 232, 233, 234 are exceptions handled above.
  if (cardNumberInSet >= 235 && cardNumberInSet <= 244) {
    return 57489 + (cardNumberInSet - 235);
  }
  
  // Fallback for any unhandled case (should not be reached if all 244 are covered)
  console.warn(`Unhandled card number for Destined Rivals UniqueID: ${cardNumberInSet}`);
  return 0; 
}

const cardListData: { name: string, type: PokemonCard['type'], rarity: PokemonCard['rarity'] }[] = [
  { name: "Ethan's Pinsir", type: 'Grass', rarity: 'Holo Rare' }, // 1
  { name: 'Yanma', type: 'Grass', rarity: 'Common' }, // 2
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' }, // 3
  { name: 'Pineco', type: 'Grass', rarity: 'Common' }, // 4
  { name: 'Shroomish', type: 'Grass', rarity: 'Common' }, // 5
  { name: 'Breloom', type: 'Grass', rarity: 'Uncommon' }, // 6
  { name: "Cynthia's Roselia", type: 'Grass', rarity: 'Uncommon' }, // 7
  { name: "Cynthia's Roserade", type: 'Grass', rarity: 'Holo Rare' }, // 8
  { name: 'Mow Rotom', type: 'Grass', rarity: 'Holo Rare' }, // 9
  { name: 'Shaymin', type: 'Grass', rarity: 'Holo Rare' }, // 10
  { name: 'Dwebble', type: 'Grass', rarity: 'Common' }, // 11
  { name: 'Crustle', type: 'Grass', rarity: 'Uncommon' }, // 12
  { name: 'Fomantis', type: 'Grass', rarity: 'Common' }, // 13
  { name: 'Lurantis', type: 'Grass', rarity: 'Holo Rare' }, // 14
  { name: "Team Rocket's Blipbug", type: 'Grass', rarity: 'Common' }, // 15
  { name: 'Applin', type: 'Grass', rarity: 'Common' }, // 16
  { name: 'Dipplin', type: 'Grass', rarity: 'Uncommon' }, // 17
  { name: 'Hydrapple', type: 'Grass', rarity: 'Holo Rare' }, // 18
  { name: "Team Rocket's Tarountula", type: 'Grass', rarity: 'Common' }, // 19
  { name: "Team Rocket's Spidops", type: 'Grass', rarity: 'Uncommon' }, // 20
  { name: 'Smoliv', type: 'Grass', rarity: 'Common' }, // 21
  { name: 'Dolliv', type: 'Grass', rarity: 'Uncommon' }, // 22
  { name: 'Arboliva ex', type: 'Grass', rarity: 'Holo Rare' }, // 23
  { name: 'Rellor', type: 'Grass', rarity: 'Common' }, // 24
  { name: 'Rabsca ex', type: 'Grass', rarity: 'Holo Rare' }, // 25
  { name: 'Teal Mask Ogerpon', type: 'Grass', rarity: 'Holo Rare' }, // 26
  { name: 'Growlithe', type: 'Fire', rarity: 'Common' }, // 27
  { name: 'Arcanine', type: 'Fire', rarity: 'Uncommon' }, // 28
  { name: 'Ponyta', type: 'Fire', rarity: 'Common' }, // 29
  { name: 'Rapidash', type: 'Fire', rarity: 'Uncommon' }, // 30
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' }, // 31
  { name: "Ethan's Cyndaquil", type: 'Fire', rarity: 'Common' }, // 32
  { name: "Ethan's Quilava", type: 'Fire', rarity: 'Uncommon' }, // 33
  { name: "Ethan's Typhlosion", type: 'Fire', rarity: 'Holo Rare' }, // 34
  { name: "Ethan's Slugma", type: 'Fire', rarity: 'Common' }, // 35
  { name: "Ethan's Magcargo", type: 'Fire', rarity: 'Uncommon' }, // 36
  { name: "Team Rocket's Houndour", type: 'Fire', rarity: 'Common' }, // 37
  { name: "Team Rocket's Houndoom", type: 'Fire', rarity: 'Holo Rare' }, // 38
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' }, // 39
  { name: 'Torchic', type: 'Fire', rarity: 'Common' }, // 40
  { name: 'Combusken', type: 'Fire', rarity: 'Uncommon' }, // 41
  { name: 'Blaziken', type: 'Fire', rarity: 'Holo Rare' }, // 42
  { name: 'Heat Rotom', type: 'Fire', rarity: 'Holo Rare' }, // 43
  { name: 'Hearthflame Mask Ogerpon', type: 'Fire', rarity: 'Holo Rare' }, // 44
  { name: "Misty's Psyduck", type: 'Water', rarity: 'Common' }, // 45
  { name: "Misty's Staryu", type: 'Water', rarity: 'Common' }, // 46
  { name: "Misty's Starmie", type: 'Water', rarity: 'Uncommon' }, // 47
  { name: "Misty's Magikarp", type: 'Water', rarity: 'Common' }, // 48
  { name: "Misty's Gyarados", type: 'Water', rarity: 'Holo Rare' }, // 49
  { name: "Misty's Lapras", type: 'Water', rarity: 'Holo Rare' }, // 50
  { name: "Team Rocket's Articuno", type: 'Water', rarity: 'Holo Rare' }, // 51
  { name: "Cynthia's Feebas", type: 'Water', rarity: 'Common' }, // 52
  { name: "Cynthia's Milotic", type: 'Water', rarity: 'Holo Rare' }, // 53
  { name: 'Clamperl', type: 'Water', rarity: 'Common' }, // 54
  { name: 'Huntail', type: 'Water', rarity: 'Uncommon' }, // 55
  { name: 'Gorebyss', type: 'Water', rarity: 'Uncommon' }, // 56
  { name: 'Buizel', type: 'Water', rarity: 'Common' }, // 57
  { name: 'Floatzel', type: 'Water', rarity: 'Uncommon' }, // 58
  { name: 'Snover', type: 'Water', rarity: 'Common' }, // 59
  { name: 'Abomasnow', type: 'Water', rarity: 'Uncommon' }, // 60
  { name: 'Wash Rotom', type: 'Water', rarity: 'Holo Rare' }, // 61
  { name: 'Arrokuda', type: 'Water', rarity: 'Common' }, // 62
  { name: 'Barraskewda', type: 'Water', rarity: 'Uncommon' }, // 63
  { name: 'Cetoddle', type: 'Water', rarity: 'Common' }, // 64
  { name: 'Cetitan ex', type: 'Water', rarity: 'Holo Rare' }, // 65
  { name: 'Dondozo ex', type: 'Water', rarity: 'Holo Rare' }, // 66
  { name: 'Wellspring Mask Ogerpon', type: 'Water', rarity: 'Holo Rare' }, // 67
  { name: 'Electabuzz', type: 'Lightning', rarity: 'Common' }, // 68
  { name: 'Electivire ex', type: 'Lightning', rarity: 'Holo Rare' }, // 69
  { name: "Team Rocket's Zapdos", type: 'Lightning', rarity: 'Holo Rare' }, // 70
  { name: "Ethan's Pichu", type: 'Lightning', rarity: 'Common' }, // 71
  { name: "Team Rocket's Mareep", type: 'Lightning', rarity: 'Common' }, // 72
  { name: "Team Rocket's Flaaffy", type: 'Lightning', rarity: 'Uncommon' }, // 73
  { name: "Team Rocket's Ampharos", type: 'Lightning', rarity: 'Holo Rare' }, // 74
  { name: 'Electrike', type: 'Lightning', rarity: 'Common' }, // 75
  { name: 'Manectric', type: 'Lightning', rarity: 'Uncommon' }, // 76
  { name: 'Rotom', type: 'Lightning', rarity: 'Holo Rare' }, // 77
  { name: 'Zeraora', type: 'Lightning', rarity: 'Holo Rare' }, // 78
  { name: "Team Rocket's Drowzee", type: 'Psychic', rarity: 'Common' }, // 79
  { name: "Team Rocket's Hypno", type: 'Psychic', rarity: 'Uncommon' }, // 80
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' }, // 81
  { name: "Team Rocket's Wobbuffet", type: 'Psychic', rarity: 'Uncommon' }, // 82
  { name: "Steven's Baltoy", type: 'Psychic', rarity: 'Common' }, // 83
  { name: "Steven's Claydol", type: 'Psychic', rarity: 'Uncommon' }, // 84
  { name: "Team Rocket's Chingling", type: 'Psychic', rarity: 'Common' }, // 85
  { name: "Steven's Carbink", type: 'Psychic', rarity: 'Uncommon' }, // 86
  { name: "Team Rocket's Mimikyu", type: 'Psychic', rarity: 'Holo Rare' }, // 87
  { name: "Team Rocket's Dottler", type: 'Psychic', rarity: 'Uncommon' }, // 88
  { name: "Team Rocket's Orbeetle", type: 'Psychic', rarity: 'Holo Rare' }, // 89
  { name: 'Mankey', type: 'Fighting', rarity: 'Common' }, // 90
  { name: 'Primeape', type: 'Fighting', rarity: 'Uncommon' }, // 91
  { name: 'Annihilape', type: 'Fighting', rarity: 'Holo Rare' }, // 92
  { name: "Ethan's Sudowoodo", type: 'Fighting', rarity: 'Uncommon' }, // 93
  { name: "Team Rocket's Larvitar", type: 'Fighting', rarity: 'Common' }, // 94
  { name: "Team Rocket's Pupitar", type: 'Fighting', rarity: 'Uncommon' }, // 95
  { name: "Team Rocket's Tyranitar", type: 'Darkness', rarity: 'Holo Rare' }, // 96
  { name: 'Nosepass', type: 'Fighting', rarity: 'Common' }, // 97
  { name: 'Probopass', type: 'Metal', rarity: 'Uncommon' }, // 98
  { name: 'Meditite', type: 'Fighting', rarity: 'Common' }, // 99
  { name: 'Medicham', type: 'Fighting', rarity: 'Uncommon' }, // 100
  { name: 'Regirock ex', type: 'Fighting', rarity: 'Holo Rare' }, // 101
  { name: "Cynthia's Gible", type: 'Dragon', rarity: 'Common' }, // 102
  { name: "Cynthia's Gabite", type: 'Dragon', rarity: 'Uncommon' }, // 103
  { name: "Cynthia's Garchomp ex", type: 'Dragon', rarity: 'Holo Rare' }, // 104
  { name: 'Hippopotas', type: 'Fighting', rarity: 'Common' }, // 105
  { name: 'Hippowdon', type: 'Fighting', rarity: 'Uncommon' }, // 106
  { name: 'Mudbray', type: 'Fighting', rarity: 'Common' }, // 107
  { name: 'Mudsdale', type: 'Fighting', rarity: 'Uncommon' }, // 108
  { name: "Arven's Toedscool", type: 'Grass', rarity: 'Common' }, // 109
  { name: "Arven's Toedscruel", type: 'Grass', rarity: 'Uncommon' }, // 110
  { name: 'Cornerstone Mask Ogerpon', type: 'Fighting', rarity: 'Holo Rare' }, // 111
  { name: "Team Rocket's Ekans", type: 'Grass', rarity: 'Common' }, // 112
  { name: "Team Rocket's Arbok", type: 'Grass', rarity: 'Uncommon' }, // 113
  { name: "Team Rocket's Nidoran♀", type: 'Grass', rarity: 'Common' }, // 114
  { name: "Team Rocket's Nidorina", type: 'Grass', rarity: 'Uncommon' }, // 115
  { name: "Team Rocket's Nidoqueen", type: 'Grass', rarity: 'Holo Rare' }, // 116
  { name: "Team Rocket's Nidoran♂", type: 'Grass', rarity: 'Common' }, // 117
  { name: "Team Rocket's Nidorino", type: 'Grass', rarity: 'Uncommon' }, // 118
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' }, // 119
  { name: "Team Rocket's Zubat", type: 'Grass', rarity: 'Common' }, // 120
  { name: "Team Rocket's Golbat", type: 'Grass', rarity: 'Uncommon' }, // 121
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // 122
  { name: "Team Rocket's Grimer", type: 'Grass', rarity: 'Common' }, // 123
  { name: "Team Rocket's Muk", type: 'Grass', rarity: 'Uncommon' }, // 124
  { name: "Team Rocket's Koffing", type: 'Grass', rarity: 'Common' }, // 125
  { name: "Team Rocket's Weezing", type: 'Grass', rarity: 'Holo Rare' }, // 126
  { name: "Team Rocket's Murkrow", type: 'Darkness', rarity: 'Common' }, // 127
  { name: "Team Rocket's Sneasel", type: 'Darkness', rarity: 'Common' }, // 128
  { name: "Cynthia's Spiritomb", type: 'Psychic', rarity: 'Holo Rare' }, // 129
  { name: "Marnie's Purrloin", type: 'Darkness', rarity: 'Common' }, // 130
  { name: "Marnie's Liepard", type: 'Darkness', rarity: 'Uncommon' }, // 131
  { name: "Marnie's Scraggy", type: 'Darkness', rarity: 'Common' }, // 132
  { name: "Marnie's Scrafty", type: 'Darkness', rarity: 'Uncommon' }, // 133
  { name: "Marnie's Impidimp", type: 'Darkness', rarity: 'Common' }, // 134
  { name: "Marnie's Morgrem", type: 'Darkness', rarity: 'Uncommon' }, // 135
  { name: "Marnie's Grimmsnarl ex", type: 'Darkness', rarity: 'Holo Rare' }, // 136
  { name: "Marnie's Morpeko", type: 'Lightning', rarity: 'Holo Rare' }, // 137
  { name: "Arven's Maschiff", type: 'Darkness', rarity: 'Common' }, // 138
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' }, // 139
  { name: 'Forretress', type: 'Metal', rarity: 'Uncommon' }, // 140
  { name: 'Skarmory', type: 'Metal', rarity: 'Common' }, // 141
  { name: "Steven's Skarmory", type: 'Metal', rarity: 'Uncommon' }, // 142
  { name: "Steven's Beldum", type: 'Metal', rarity: 'Common' }, // 143
  { name: "Steven's Metang", type: 'Metal', rarity: 'Uncommon' }, // 144
  { name: "Steven's Metagross ex", type: 'Metal', rarity: 'Holo Rare' }, // 145
  { name: 'Zamazenta', type: 'Metal', rarity: 'Holo Rare' }, // 146
  { name: "Team Rocket's Rattata", type: 'Colorless', rarity: 'Common' }, // 147
  { name: "Team Rocket's Raticate", type: 'Colorless', rarity: 'Uncommon' }, // 148
  { name: "Team Rocket's Meowth", type: 'Colorless', rarity: 'Common' }, // 149
  { name: "Team Rocket's Persian ex", type: 'Colorless', rarity: 'Holo Rare' }, // 150
  { name: 'Kangaskhan', type: 'Colorless', rarity: 'Holo Rare' }, // 151
  { name: 'Tauros', type: 'Colorless', rarity: 'Uncommon' }, // 152
  { name: "Team Rocket's Porygon", type: 'Colorless', rarity: 'Common' }, // 153
  { name: "Team Rocket's Porygon2", type: 'Colorless', rarity: 'Uncommon' }, // 154
  { name: "Team Rocket's Porygon-Z", type: 'Colorless', rarity: 'Holo Rare' }, // 155
  { name: 'Taillow', type: 'Colorless', rarity: 'Common' }, // 156
  { name: 'Swellow', type: 'Colorless', rarity: 'Uncommon' }, // 157
  { name: "Arven's Skwovet", type: 'Colorless', rarity: 'Common' }, // 158
  { name: "Arven's Greedent", type: 'Colorless', rarity: 'Uncommon' }, // 159
  { name: 'Squawkabilly', type: 'Colorless', rarity: 'Holo Rare' }, // 160
  { name: "Arven's Sandwich", type: 'Trainer', rarity: 'Uncommon' }, // 161
  { name: "Cynthia's Power Weight", type: 'Trainer', rarity: 'Uncommon' }, // 162
  { name: "Emcee's Hype", type: 'Trainer', rarity: 'Holo Rare' }, // 163
  { name: 'Energy Recycler', type: 'Trainer', rarity: 'Uncommon' }, // 164
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' }, // 165
  { name: 'Granite Cave', type: 'Trainer', rarity: 'Uncommon' }, // 166
  { name: 'Judge', type: 'Trainer', rarity: 'Holo Rare' }, // 167
  { name: 'Sacred Ash', type: 'Trainer', rarity: 'Uncommon' }, // 168
  { name: 'Spikemuth Gym', type: 'Trainer', rarity: 'Uncommon' }, // 169
  { name: "Team Rocket's Archer", type: 'Trainer', rarity: 'Holo Rare' }, // 170
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' }, // 171
  { name: "Team Rocket's Bother-Bot", type: 'Trainer', rarity: 'Uncommon' }, // 172
  { name: "Team Rocket's Factory", type: 'Trainer', rarity: 'Uncommon' }, // 173
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' }, // 174
  { name: "Team Rocket's Great Ball", type: 'Trainer', rarity: 'Uncommon' }, // 175
  { name: "Team Rocket's Petrel", type: 'Trainer', rarity: 'Holo Rare' }, // 176
  { name: "Team Rocket's Proton", type: 'Trainer', rarity: 'Holo Rare' }, // 177
  { name: "Team Rocket's Transceiver", type: 'Trainer', rarity: 'Uncommon' }, // 178
  { name: "Team Rocket's Venture Bomb", type: 'Trainer', rarity: 'Uncommon' }, // 179
  { name: "Team Rocket's Watchtower", type: 'Trainer', rarity: 'Uncommon' }, // 180
  { name: 'TM Machine', type: 'Trainer', rarity: 'Uncommon' }, // 181
  { name: "Team Rocket's Energy", type: 'Energy', rarity: 'Holo Rare' }, // 182
  { name: 'Yanma', type: 'Grass', rarity: 'Holo Rare' }, // 183 - Illustration Rare
  { name: "Cynthia's Roserade", type: 'Grass', rarity: 'Holo Rare' }, // 184 - Illustration Rare
  { name: 'Shaymin', type: 'Grass', rarity: 'Holo Rare' }, // 185 - Illustration Rare
  { name: 'Crustle', type: 'Grass', rarity: 'Holo Rare' }, // 186 - Illustration Rare
  { name: "Team Rocket's Spidops", type: 'Grass', rarity: 'Holo Rare' }, // 187 - Illustration Rare
  { name: 'Hydrapple', type: 'Grass', rarity: 'Holo Rare' }, // 188 - Illustration Rare
  { name: 'Rapidash', type: 'Fire', rarity: 'Holo Rare' }, // 189 - Illustration Rare
  { name: "Ethan's Typhlosion", type: 'Fire', rarity: 'Holo Rare' }, // 190 - Illustration Rare
  { name: "Team Rocket's Houndoom", type: 'Fire', rarity: 'Holo Rare' }, // 191 - Illustration Rare
  { name: 'Blaziken', type: 'Fire', rarity: 'Holo Rare' }, // 192 - Illustration Rare
  { name: "Misty's Psyduck", type: 'Water', rarity: 'Holo Rare' }, // 193 - Illustration Rare
  { name: "Misty's Lapras", type: 'Water', rarity: 'Holo Rare' }, // 194 - Illustration Rare
  { name: 'Clamperl', type: 'Water', rarity: 'Holo Rare' }, // 195 - Illustration Rare
  { name: 'Electrike', type: 'Lightning', rarity: 'Holo Rare' }, // 196 - Illustration Rare
  { name: 'Rotom', type: 'Lightning', rarity: 'Holo Rare' }, // 197 - Illustration Rare
  { name: "Team Rocket's Orbeetle", type: 'Psychic', rarity: 'Holo Rare' }, // 198 - Illustration Rare
  { name: "Team Rocket's Weezing", type: 'Grass', rarity: 'Holo Rare' }, // 199 - Illustration Rare (Poison -> Grass)
  { name: "Team Rocket's Murkrow", type: 'Darkness', rarity: 'Holo Rare' }, // 200 - Illustration Rare
  { name: 'Zamazenta', type: 'Metal', rarity: 'Holo Rare' }, // 201 - Illustration Rare
  { name: "Team Rocket's Raticate", type: 'Colorless', rarity: 'Holo Rare' }, // 202 - Illustration Rare
  { name: "Team Rocket's Meowth", type: 'Colorless', rarity: 'Holo Rare' }, // 203 - Illustration Rare
  { name: 'Kangaskhan', type: 'Colorless', rarity: 'Holo Rare' }, // 204 - Illustration Rare
  { name: "Arven's Greedent", type: 'Colorless', rarity: 'Holo Rare' }, // 205 - Illustration Rare
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' }, // 206 - Full Art ex
  { name: 'Arboliva ex', type: 'Grass', rarity: 'Holo Rare' }, // 207 - Full Art ex
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' }, // 208 - Full Art ex
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' }, // 209 - Full Art ex
  { name: 'Cetitan ex', type: 'Water', rarity: 'Holo Rare' }, // 210 - Full Art ex
  { name: 'Dondozo ex', type: 'Water', rarity: 'Holo Rare' }, // 211 - Full Art ex
  { name: 'Electivire ex', type: 'Lightning', rarity: 'Holo Rare' }, // 212 - Full Art ex
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' }, // 213 - Full Art ex
  { name: 'Regirock ex', type: 'Fighting', rarity: 'Holo Rare' }, // 214 - Full Art ex
  { name: "Cynthia's Garchomp ex", type: 'Dragon', rarity: 'Holo Rare' }, // 215 - Full Art ex (Dragon)
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' }, // 216 - Full Art ex (Poison -> Grass)
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // 217 - Full Art ex (Poison/Flying -> Darkness)
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' }, // 218 - Full Art ex
  { name: "Team Rocket's Persian ex", type: 'Colorless', rarity: 'Holo Rare' }, // 219 - Full Art ex
  { name: "Emcee's Hype", type: 'Trainer', rarity: 'Holo Rare' }, // 220 - Full Art Supporter
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' }, // 221 - Full Art Supporter
  { name: 'Judge', type: 'Trainer', rarity: 'Holo Rare' }, // 222 - Full Art Supporter
  { name: "Team Rocket's Archer", type: 'Trainer', rarity: 'Holo Rare' }, // 223 - Full Art Supporter
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' }, // 224 - Full Art Supporter
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' }, // 225 - Full Art Supporter
  { name: "Team Rocket's Petrel", type: 'Trainer', rarity: 'Holo Rare' }, // 226 - Full Art Supporter
  { name: "Team Rocket's Proton", type: 'Trainer', rarity: 'Holo Rare' }, // 227 - Full Art Supporter
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Holo Rare' }, // 228 - Special Illustration Rare ex
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Holo Rare' }, // 229 - Special Illustration Rare ex
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' }, // 230 - Special Illustration Rare ex
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' }, // 231 - Special Illustration Rare ex
  { name: "Cynthia's Garchomp ex", type: 'Dragon', rarity: 'Holo Rare' }, // 232 - Special Illustration Rare ex (Dragon)
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Holo Rare' }, // 233 - Special Illustration Rare ex (Poison -> Grass)
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // 234 - Special Illustration Rare ex (Poison/Flying -> Darkness)
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Holo Rare' }, // 235 - Special Illustration Rare ex
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Holo Rare' }, // 236 - Special Illustration Supporter
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Holo Rare' }, // 237 - Special Illustration Supporter
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Holo Rare' }, // 238 - Special Illustration Supporter
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Holo Rare' }, // 239 - Hyper Rare (Gold) ex
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Holo Rare' }, // 240 - Hyper Rare (Gold) ex
  { name: "Cynthia's Garchomp ex", type: 'Dragon', rarity: 'Holo Rare' }, // 241 - Hyper Rare (Gold) ex (Dragon)
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Holo Rare' }, // 242 - Hyper Rare (Gold) ex (Poison/Flying -> Darkness)
  { name: 'Jamming Tower', type: 'Trainer', rarity: 'Holo Rare' }, // 243 - Hyper Rare Stadium
  { name: 'Levincia', type: 'Trainer', rarity: 'Holo Rare' }, // 244 - Hyper Rare Stadium
];


export const destinedRivalsCards: PokemonCard[] = cardListData.map((card, index) => {
  const cardNumberInSet = index + 1; // 1-based index
  const uniqueID = getDestinedRivalsUniqueID(cardNumberInSet);
  const formattedName = formatNameForUrl(card.name);
  const cardId = `dri-${formattedName.toLowerCase().replace(/-+/g, '-')}-${String(cardNumberInSet).padStart(3, '0')}`;
  
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
