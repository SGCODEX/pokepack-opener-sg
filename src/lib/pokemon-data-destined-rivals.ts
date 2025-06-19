
import type { PokemonCard, CardRarity } from './types';

// Helper function to format card names for URLs
function formatNameForUrl(name: string): string {
  let cleanedName = name.replace(/\s*\(.*?\)\s*/g, ''); // Remove content in parentheses

  return cleanedName
    .replace(/'s/g, 's')
    .replace(/'/g, '')
    .replace(/’/g, '')
    .replace(/\./g, '')
    .replace(/♀/g, '-F')
    .replace(/♂/g, '-M')
    .replace(/é/g, 'e')
    .replace(/[\s:]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
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
  if (cardNumberInSet === 233) return 57488; // Card #233 specific ID (Team Rocket's Nidoking ex SIR)
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
  if (cardNumberInSet >= 97 && cardNumberInSet <= 192) { 
    return 57359 + (cardNumberInSet - 97);
  }
  if (cardNumberInSet >= 194 && cardNumberInSet <= 197) {
    return 57455 + (cardNumberInSet - 194);
  }
  if (cardNumberInSet >= 199 && cardNumberInSet <= 202) {
    return 57459 + (cardNumberInSet - 199);
  }
  if (cardNumberInSet >= 205 && cardNumberInSet <= 208) {
    return 57463 + (cardNumberInSet - 205);
  }
  if (cardNumberInSet >= 210 && cardNumberInSet <= 230) { 
    return 57467 + (cardNumberInSet - 210);
  }
  if (cardNumberInSet >= 235 && cardNumberInSet <= 244) { 
    return 57489 + (cardNumberInSet - 235);
  }
  
  console.warn(`Unhandled card number for Destined Rivals UniqueID: ${cardNumberInSet}`);
  return 0; 
}

// Baseline data for the 244 cards in "Destined Rivals Illustration Collection (DRI)"
// Types are based on typical TCG representations.
// initialRarity is now DIRECTLY from the user-provided image list (Pokellector DRI Rarity)
const cardListData: { name: string, type: PokemonCard['type'], initialRarity: CardRarity }[] = [
  { name: "Ethan's Pinsir", type: 'Grass', initialRarity: 'Illustration Rare' }, // 1
  { name: 'Yanma', type: 'Grass', initialRarity: 'Common' }, // 2
  { name: 'Yanmega ex', type: 'Grass', initialRarity: 'Double Rare' }, // 3
  { name: 'Pineco', type: 'Grass', initialRarity: 'Common' }, // 4
  { name: 'Shroomish', type: 'Grass', initialRarity: 'Common' }, // 5
  { name: 'Breloom', type: 'Grass', initialRarity: 'Uncommon' }, // 6
  { name: "Cynthia's Roselia", type: 'Grass', initialRarity: 'Uncommon' }, // 7
  { name: "Cynthia's Roserade", type: 'Grass', initialRarity: 'Rare' }, // 8 - Rare Holo maps to Rare
  { name: 'Mow Rotom', type: 'Grass', initialRarity: 'Rare' }, // 9 - Rare Holo maps to Rare
  { name: 'Shaymin', type: 'Grass', initialRarity: 'Rare' }, // 10 - Rare Holo maps to Rare
  { name: 'Dwebble', type: 'Grass', initialRarity: 'Common' }, // 11
  { name: 'Crustle', type: 'Grass', initialRarity: 'Uncommon' }, // 12
  { name: 'Fomantis', type: 'Grass', initialRarity: 'Common' }, // 13
  { name: 'Lurantis', type: 'Grass', initialRarity: 'Rare' }, // 14 - Rare Holo maps to Rare
  { name: "Team Rocket's Blipbug", type: 'Grass', initialRarity: 'Common' }, // 15
  { name: 'Applin', type: 'Grass', initialRarity: 'Common' }, // 16
  { name: 'Dipplin', type: 'Grass', initialRarity: 'Uncommon' }, // 17
  { name: 'Hydrapple', type: 'Grass', initialRarity: 'Rare' }, // 18 - Rare Holo maps to Rare
  { name: "Team Rocket's Tarountula", type: 'Grass', initialRarity: 'Common' }, // 19
  { name: "Team Rocket's Spidops", type: 'Grass', initialRarity: 'Uncommon' }, // 20
  { name: 'Smoliv', type: 'Grass', initialRarity: 'Common' }, // 21
  { name: 'Dolliv', type: 'Grass', initialRarity: 'Uncommon' }, // 22
  { name: 'Arboliva ex', type: 'Grass', initialRarity: 'Double Rare' }, // 23
  { name: 'Rellor', type: 'Grass', initialRarity: 'Common' }, // 24
  { name: 'Rabsca ex', type: 'Grass', initialRarity: 'Double Rare' }, // 25
  { name: 'Teal Mask Ogerpon', type: 'Grass', initialRarity: 'Rare' }, // 26 - Rare Holo maps to Rare
  { name: 'Growlithe', type: 'Fire', initialRarity: 'Common' }, // 27
  { name: 'Arcanine', type: 'Fire', initialRarity: 'Uncommon' }, // 28
  { name: 'Ponyta', type: 'Fire', initialRarity: 'Common' }, // 29
  { name: 'Rapidash', type: 'Fire', initialRarity: 'Uncommon' }, // 30
  { name: "Team Rocket's Moltres ex", type: 'Fire', initialRarity: 'Double Rare' }, // 31
  { name: "Ethan's Cyndaquil", type: 'Fire', initialRarity: 'Common' }, // 32
  { name: "Ethan's Quilava", type: 'Fire', initialRarity: 'Uncommon' }, // 33
  { name: "Ethan's Typhlosion", type: 'Fire', initialRarity: 'Rare' }, // 34 - Rare Holo maps to Rare
  { name: "Ethan's Slugma", type: 'Fire', initialRarity: 'Common' }, // 35
  { name: "Ethan's Magcargo", type: 'Fire', initialRarity: 'Uncommon' }, // 36
  { name: "Team Rocket's Houndour", type: 'Fire', initialRarity: 'Common' }, // 37
  { name: "Team Rocket's Houndoom", type: 'Fire', initialRarity: 'Rare' }, // 38 - Rare Holo maps to Rare
  { name: "Ethan's Ho-Oh ex", type: 'Fire', initialRarity: 'Double Rare' }, // 39
  { name: 'Torchic', type: 'Fire', initialRarity: 'Common' }, // 40
  { name: 'Combusken', type: 'Fire', initialRarity: 'Uncommon' }, // 41
  { name: 'Blaziken', type: 'Fire', initialRarity: 'Rare' }, // 42 - Rare Holo maps to Rare
  { name: 'Heat Rotom', type: 'Fire', initialRarity: 'Rare' }, // 43 - Rare Holo maps to Rare
  { name: 'Hearthflame Mask Ogerpon', type: 'Fire', initialRarity: 'Rare' }, // 44 - Rare Holo maps to Rare
  { name: "Misty's Psyduck", type: 'Water', initialRarity: 'Common' }, // 45
  { name: "Misty's Staryu", type: 'Water', initialRarity: 'Common' }, // 46
  { name: "Misty's Starmie", type: 'Water', initialRarity: 'Uncommon' }, // 47
  { name: "Misty's Magikarp", type: 'Water', initialRarity: 'Common' }, // 48
  { name: "Misty's Gyarados", type: 'Water', initialRarity: 'Rare' }, // 49 - Rare Holo maps to Rare
  { name: "Misty's Lapras", type: 'Water', initialRarity: 'Rare' }, // 50 - Rare Holo maps to Rare
  { name: "Team Rocket's Articuno", type: 'Water', initialRarity: 'Rare' }, // 51 - Rare Holo maps to Rare
  { name: "Cynthia's Feebas", type: 'Water', initialRarity: 'Common' }, // 52
  { name: "Cynthia's Milotic", type: 'Water', initialRarity: 'Rare' }, // 53 - Rare Holo maps to Rare
  { name: 'Clamperl', type: 'Water', initialRarity: 'Common' }, // 54
  { name: 'Huntail', type: 'Water', initialRarity: 'Uncommon' }, // 55
  { name: 'Gorebyss', type: 'Water', initialRarity: 'Uncommon' }, // 56
  { name: 'Buizel', type: 'Water', initialRarity: 'Common' }, // 57
  { name: 'Floatzel', type: 'Water', initialRarity: 'Uncommon' }, // 58
  { name: 'Snover', type: 'Water', initialRarity: 'Common' }, // 59
  { name: 'Abomasnow', type: 'Water', initialRarity: 'Uncommon' }, // 60
  { name: 'Wash Rotom', type: 'Water', initialRarity: 'Rare' }, // 61 - Rare Holo maps to Rare
  { name: 'Arrokuda', type: 'Water', initialRarity: 'Common' }, // 62
  { name: 'Barraskewda', type: 'Water', initialRarity: 'Uncommon' }, // 63
  { name: 'Cetoddle', type: 'Water', initialRarity: 'Common' }, // 64
  { name: 'Cetitan ex', type: 'Water', initialRarity: 'Double Rare' }, // 65
  { name: 'Dondozo ex', type: 'Water', initialRarity: 'Double Rare' }, // 66
  { name: 'Wellspring Mask Ogerpon', type: 'Water', initialRarity: 'Rare' }, // 67 - Rare Holo maps to Rare
  { name: 'Electabuzz', type: 'Lightning', initialRarity: 'Common' }, // 68
  { name: 'Electivire ex', type: 'Lightning', initialRarity: 'Double Rare' }, // 69
  { name: "Team Rocket's Zapdos", type: 'Lightning', initialRarity: 'Rare' }, // 70 - Rare Holo maps to Rare
  { name: "Ethan's Pichu", type: 'Lightning', initialRarity: 'Common' }, // 71
  { name: "Team Rocket's Mareep", type: 'Lightning', initialRarity: 'Common' }, // 72
  { name: "Team Rocket's Flaaffy", type: 'Lightning', initialRarity: 'Uncommon' }, // 73
  { name: "Team Rocket's Ampharos", type: 'Lightning', initialRarity: 'Rare' }, // 74 - Rare Holo maps to Rare
  { name: 'Electrike', type: 'Lightning', initialRarity: 'Common' }, // 75
  { name: 'Manectric', type: 'Lightning', initialRarity: 'Uncommon' }, // 76
  { name: 'Rotom', type: 'Lightning', initialRarity: 'Rare' }, // 77 - Rare Holo maps to Rare
  { name: 'Zeraora', type: 'Lightning', initialRarity: 'Rare' }, // 78 - Rare Holo maps to Rare
  { name: "Team Rocket's Drowzee", type: 'Psychic', initialRarity: 'Common' }, // 79
  { name: "Team Rocket's Hypno", type: 'Psychic', initialRarity: 'Uncommon' }, // 80
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', initialRarity: 'Double Rare' }, // 81
  { name: "Team Rocket's Wobbuffet", type: 'Psychic', initialRarity: 'Uncommon' }, // 82
  { name: "Steven's Baltoy", type: 'Psychic', initialRarity: 'Common' }, // 83
  { name: "Steven's Claydol", type: 'Psychic', initialRarity: 'Uncommon' }, // 84
  { name: "Team Rocket's Chingling", type: 'Psychic', initialRarity: 'Common' }, // 85
  { name: "Steven's Carbink", type: 'Psychic', initialRarity: 'Uncommon' }, // 86
  { name: "Team Rocket's Mimikyu", type: 'Psychic', initialRarity: 'Rare' }, // 87 - Rare Holo maps to Rare
  { name: "Team Rocket's Dottler", type: 'Psychic', initialRarity: 'Uncommon' }, // 88
  { name: "Team Rocket's Orbeetle", type: 'Psychic', initialRarity: 'Rare' }, // 89 - Rare Holo maps to Rare
  { name: 'Mankey', type: 'Fighting', initialRarity: 'Common' }, // 90
  { name: 'Primeape', type: 'Fighting', initialRarity: 'Uncommon' }, // 91
  { name: 'Annihilape', type: 'Fighting', initialRarity: 'Rare' }, // 92 - Rare Holo maps to Rare
  { name: "Ethan's Sudowoodo", type: 'Fighting', initialRarity: 'Uncommon' }, // 93
  { name: "Team Rocket's Larvitar", type: 'Fighting', initialRarity: 'Common' }, // 94
  { name: "Team Rocket's Pupitar", type: 'Fighting', initialRarity: 'Uncommon' }, // 95
  { name: "Team Rocket's Tyranitar", type: 'Darkness', initialRarity: 'Rare' }, // 96 - Rare Holo maps to Rare
  { name: 'Nosepass', type: 'Fighting', initialRarity: 'Common' }, // 97
  { name: 'Probopass', type: 'Metal', initialRarity: 'Uncommon' }, // 98
  { name: 'Meditite', type: 'Fighting', initialRarity: 'Common' }, // 99
  { name: 'Medicham', type: 'Fighting', initialRarity: 'Uncommon' }, // 100
  { name: 'Regirock ex', type: 'Fighting', initialRarity: 'Double Rare' }, // 101
  { name: "Cynthia's Gible", type: 'Dragon', initialRarity: 'Common' }, // 102
  { name: "Cynthia's Gabite", type: 'Dragon', initialRarity: 'Uncommon' }, // 103
  { name: "Cynthia's Garchomp ex", type: 'Dragon', initialRarity: 'Double Rare' }, // 104
  { name: 'Hippopotas', type: 'Fighting', initialRarity: 'Common' }, // 105
  { name: 'Hippowdon', type: 'Fighting', initialRarity: 'Uncommon' }, // 106
  { name: 'Mudbray', type: 'Fighting', initialRarity: 'Common' }, // 107
  { name: 'Mudsdale', type: 'Fighting', initialRarity: 'Uncommon' }, // 108
  { name: "Arven's Toedscool", type: 'Grass', initialRarity: 'Common' }, // 109
  { name: "Arven's Toedscruel", type: 'Grass', initialRarity: 'Uncommon' }, // 110
  { name: 'Cornerstone Mask Ogerpon', type: 'Fighting', initialRarity: 'Rare' }, // 111 - Rare Holo maps to Rare
  { name: "Team Rocket's Ekans", type: 'Grass', initialRarity: 'Common' }, // 112
  { name: "Team Rocket's Arbok", type: 'Grass', initialRarity: 'Uncommon' }, // 113
  { name: "Team Rocket's Nidoran♀", type: 'Grass', initialRarity: 'Common' }, // 114
  { name: "Team Rocket's Nidorina", type: 'Grass', initialRarity: 'Uncommon' }, // 115
  { name: "Team Rocket's Nidoqueen", type: 'Grass', initialRarity: 'Rare' }, // 116 - Rare Holo maps to Rare
  { name: "Team Rocket's Nidoran♂", type: 'Grass', initialRarity: 'Common' }, // 117
  { name: "Team Rocket's Nidorino", type: 'Grass', initialRarity: 'Uncommon' }, // 118
  { name: "Team Rocket's Nidoking ex", type: 'Grass', initialRarity: 'Double Rare' }, // 119
  { name: "Team Rocket's Zubat", type: 'Grass', initialRarity: 'Common' }, // 120
  { name: "Team Rocket's Golbat", type: 'Grass', initialRarity: 'Uncommon' }, // 121
  { name: "Team Rocket's Crobat ex", type: 'Darkness', initialRarity: 'Double Rare' }, // 122
  { name: "Team Rocket's Grimer", type: 'Grass', initialRarity: 'Common' }, // 123
  { name: "Team Rocket's Muk", type: 'Grass', initialRarity: 'Uncommon' }, // 124
  { name: "Team Rocket's Koffing", type: 'Grass', initialRarity: 'Common' }, // 125
  { name: "Team Rocket's Weezing", type: 'Grass', initialRarity: 'Rare' }, // 126 - Rare Holo maps to Rare
  { name: "Team Rocket's Murkrow", type: 'Darkness', initialRarity: 'Common' }, // 127
  { name: "Team Rocket's Sneasel", type: 'Darkness', initialRarity: 'Common' }, // 128
  { name: "Cynthia's Spiritomb", type: 'Psychic', initialRarity: 'Rare' }, // 129 - Rare Holo maps to Rare
  { name: "Marnie's Purrloin", type: 'Darkness', initialRarity: 'Common' }, // 130
  { name: "Marnie's Liepard", type: 'Darkness', initialRarity: 'Uncommon' }, // 131
  { name: "Marnie's Scraggy", type: 'Darkness', initialRarity: 'Common' }, // 132
  { name: "Marnie's Scrafty", type: 'Darkness', initialRarity: 'Uncommon' }, // 133
  { name: "Marnie's Impidimp", type: 'Darkness', initialRarity: 'Common' }, // 134
  { name: "Marnie's Morgrem", type: 'Darkness', initialRarity: 'Uncommon' }, // 135
  { name: "Marnie's Grimmsnarl ex", type: 'Darkness', initialRarity: 'Double Rare' }, // 136
  { name: "Marnie's Morpeko", type: 'Lightning', initialRarity: 'Rare' }, // 137 - Rare Holo maps to Rare
  { name: "Arven's Maschiff", type: 'Darkness', initialRarity: 'Common' }, // 138
  { name: "Arven's Mabosstiff ex", type: 'Darkness', initialRarity: 'Double Rare' }, // 139
  { name: 'Forretress', type: 'Metal', initialRarity: 'Uncommon' }, // 140
  { name: 'Skarmory', type: 'Metal', initialRarity: 'Common' }, // 141
  { name: "Steven's Skarmory", type: 'Metal', initialRarity: 'Uncommon' }, // 142
  { name: "Steven's Beldum", type: 'Metal', initialRarity: 'Common' }, // 143
  { name: "Steven's Metang", type: 'Metal', initialRarity: 'Uncommon' }, // 144
  { name: "Steven's Metagross ex", type: 'Metal', initialRarity: 'Double Rare' }, // 145
  { name: 'Zamazenta', type: 'Metal', initialRarity: 'Rare' }, // 146 - Rare Holo maps to Rare
  { name: "Team Rocket's Rattata", type: 'Colorless', initialRarity: 'Common' }, // 147
  { name: "Team Rocket's Raticate", type: 'Colorless', initialRarity: 'Uncommon' }, // 148
  { name: "Team Rocket's Meowth", type: 'Colorless', initialRarity: 'Common' }, // 149
  { name: "Team Rocket's Persian ex", type: 'Colorless', initialRarity: 'Double Rare' }, // 150
  { name: 'Kangaskhan', type: 'Colorless', initialRarity: 'Rare' }, // 151 - Rare Holo maps to Rare
  { name: 'Tauros', type: 'Colorless', initialRarity: 'Uncommon' }, // 152
  { name: "Team Rocket's Porygon", type: 'Colorless', initialRarity: 'Common' }, // 153
  { name: "Team Rocket's Porygon2", type: 'Colorless', initialRarity: 'Uncommon' }, // 154
  { name: "Team Rocket's Porygon-Z", type: 'Colorless', initialRarity: 'Rare' }, // 155 - Rare Holo maps to Rare
  { name: 'Taillow', type: 'Colorless', initialRarity: 'Common' }, // 156
  { name: 'Swellow', type: 'Colorless', initialRarity: 'Uncommon' }, // 157
  { name: "Arven's Skwovet", type: 'Colorless', initialRarity: 'Common' }, // 158
  { name: "Arven's Greedent", type: 'Colorless', initialRarity: 'Uncommon' }, // 159
  { name: 'Squawkabilly', type: 'Colorless', initialRarity: 'Rare' }, // 160 - Rare Holo maps to Rare
  { name: "Arven's Sandwich", type: 'Trainer', initialRarity: 'Uncommon' }, // 161
  { name: "Cynthia's Power Weight", type: 'Trainer', initialRarity: 'Uncommon' }, // 162
  { name: "Emcee's Hype", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 163 (DRI Supporter - mapped to Ultra Rare as per image)
  { name: 'Energy Recycler', type: 'Trainer', initialRarity: 'Uncommon' }, // 164
  { name: "Ethan's Adventure", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 165 (DRI Supporter - mapped to Ultra Rare)
  { name: 'Granite Cave', type: 'Trainer', initialRarity: 'Uncommon' }, // 166
  { name: 'Judge', type: 'Trainer', initialRarity: 'Rare' }, // 167 (DRI Supporter - Mapped to Rare, as per image not specifying "Ultra")
  { name: 'Sacred Ash', type: 'Trainer', initialRarity: 'Uncommon' }, // 168
  { name: 'Spikemuth Gym', type: 'Trainer', initialRarity: 'Uncommon' }, // 169
  { name: "Team Rocket's Archer", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 170 (DRI Supporter - mapped to Ultra Rare)
  { name: "Team Rocket's Ariana", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 171 (DRI Supporter - mapped to Ultra Rare)
  { name: "Team Rocket's Bother-Bot", type: 'Trainer', initialRarity: 'Uncommon' }, // 172
  { name: "Team Rocket's Factory", type: 'Trainer', initialRarity: 'Uncommon' }, // 173
  { name: "Team Rocket's Giovanni", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 174 (DRI Supporter - mapped to Ultra Rare)
  { name: "Team Rocket's Great Ball", type: 'Trainer', initialRarity: 'Uncommon' }, // 175
  { name: "Team Rocket's Petrel", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 176 (DRI Supporter - mapped to Ultra Rare)
  { name: "Team Rocket's Proton", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 177 (DRI Supporter - mapped to Ultra Rare)
  { name: "Team Rocket's Transceiver", type: 'Trainer', initialRarity: 'Uncommon' }, // 178
  { name: "Team Rocket's Venture Bomb", type: 'Trainer', initialRarity: 'Uncommon' }, // 179
  { name: "Team Rocket's Watchtower", type: 'Trainer', initialRarity: 'Uncommon' }, // 180
  { name: 'TM Machine', type: 'Trainer', initialRarity: 'Uncommon' }, // 181
  { name: "Team Rocket's Energy", type: 'Energy', initialRarity: 'Rare' }, // 182 - (Special Energy, Rare Holo -> Rare)
  { name: 'Yanma', type: 'Grass', initialRarity: 'Illustration Rare' }, // 183
  { name: "Cynthia's Roserade", type: 'Grass', initialRarity: 'Illustration Rare' }, // 184
  { name: 'Shaymin', type: 'Grass', initialRarity: 'Illustration Rare' }, // 185
  { name: 'Crustle', type: 'Grass', initialRarity: 'Illustration Rare' }, // 186
  { name: "Team Rocket's Spidops", type: 'Grass', initialRarity: 'Illustration Rare' }, // 187
  { name: 'Hydrapple', type: 'Grass', initialRarity: 'Illustration Rare' }, // 188
  { name: 'Rapidash', type: 'Fire', initialRarity: 'Illustration Rare' }, // 189
  { name: "Ethan's Typhlosion", type: 'Fire', initialRarity: 'Illustration Rare' }, // 190
  { name: "Team Rocket's Houndoom", type: 'Fire', initialRarity: 'Illustration Rare' }, // 191
  { name: 'Blaziken', type: 'Fire', initialRarity: 'Illustration Rare' }, // 192
  { name: "Misty's Psyduck", type: 'Water', initialRarity: 'Illustration Rare' }, // 193
  { name: "Misty's Lapras", type: 'Water', initialRarity: 'Illustration Rare' }, // 194
  { name: 'Clamperl', type: 'Water', initialRarity: 'Illustration Rare' }, // 195
  { name: 'Electrike', type: 'Lightning', initialRarity: 'Illustration Rare' }, // 196
  { name: 'Rotom', type: 'Lightning', initialRarity: 'Illustration Rare' }, // 197
  { name: "Team Rocket's Orbeetle", type: 'Psychic', initialRarity: 'Illustration Rare' }, // 198
  { name: "Team Rocket's Weezing", type: 'Grass', initialRarity: 'Illustration Rare' }, // 199
  { name: "Team Rocket's Murkrow", type: 'Darkness', initialRarity: 'Illustration Rare' }, // 200
  { name: 'Zamazenta', type: 'Metal', initialRarity: 'Illustration Rare' }, // 201
  { name: "Team Rocket's Raticate", type: 'Colorless', initialRarity: 'Illustration Rare' }, // 202
  { name: "Team Rocket's Meowth", type: 'Colorless', initialRarity: 'Illustration Rare' }, // 203
  { name: 'Kangaskhan', type: 'Colorless', initialRarity: 'Illustration Rare' }, // 204
  { name: "Arven's Greedent", type: 'Colorless', initialRarity: 'Illustration Rare' }, // 205
  { name: 'Yanmega ex', type: 'Grass', initialRarity: 'Ultra Rare' }, // 206 (Full Art ex)
  { name: 'Arboliva ex', type: 'Grass', initialRarity: 'Ultra Rare' }, // 207 (Full Art ex)
  { name: "Team Rocket's Moltres ex", type: 'Fire', initialRarity: 'Ultra Rare' }, // 208 (Full Art ex)
  { name: "Ethan's Ho-Oh ex", type: 'Fire', initialRarity: 'Ultra Rare' }, // 209 (Full Art ex)
  { name: 'Cetitan ex', type: 'Water', initialRarity: 'Ultra Rare' }, // 210 (Full Art ex)
  { name: 'Dondozo ex', type: 'Water', initialRarity: 'Ultra Rare' }, // 211 (Full Art ex)
  { name: 'Electivire ex', type: 'Lightning', initialRarity: 'Ultra Rare' }, // 212 (Full Art ex)
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', initialRarity: 'Ultra Rare' }, // 213 (Full Art ex)
  { name: 'Regirock ex', type: 'Fighting', initialRarity: 'Ultra Rare' }, // 214 (Full Art ex)
  { name: "Cynthia's Garchomp ex", type: 'Dragon', initialRarity: 'Ultra Rare' }, // 215 (Full Art ex)
  { name: "Team Rocket's Nidoking ex", type: 'Grass', initialRarity: 'Ultra Rare' }, // 216 (Full Art ex)
  { name: "Team Rocket's Crobat ex", type: 'Darkness', initialRarity: 'Ultra Rare' }, // 217 (Full Art ex)
  { name: "Arven's Mabosstiff ex", type: 'Darkness', initialRarity: 'Ultra Rare' }, // 218 (Full Art ex)
  { name: "Team Rocket's Persian ex", type: 'Colorless', initialRarity: 'Ultra Rare' }, // 219 (Full Art ex)
  { name: "Emcee's Hype", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 220 (Full Art Supporter)
  { name: "Ethan's Adventure", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 221 (Full Art Supporter)
  { name: 'Judge', type: 'Trainer', initialRarity: 'Ultra Rare' }, // 222 (Full Art Supporter)
  { name: "Team Rocket's Archer", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 223 (Full Art Supporter)
  { name: "Team Rocket's Ariana", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 224 (Full Art Supporter)
  { name: "Team Rocket's Giovanni", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 225 (Full Art Supporter)
  { name: "Team Rocket's Petrel", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 226 (Full Art Supporter)
  { name: "Team Rocket's Proton", type: 'Trainer', initialRarity: 'Ultra Rare' }, // 227 (Full Art Supporter)
  { name: 'Yanmega ex', type: 'Grass', initialRarity: 'Special Illustration Rare' }, // 228
  { name: "Team Rocket's Moltres ex", type: 'Fire', initialRarity: 'Special Illustration Rare' }, // 229
  { name: "Ethan's Ho-Oh ex", type: 'Fire', initialRarity: 'Special Illustration Rare' }, // 230
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', initialRarity: 'Special Illustration Rare' }, // 231
  { name: "Cynthia's Garchomp ex", type: 'Dragon', initialRarity: 'Special Illustration Rare' }, // 232
  { name: "Team Rocket's Nidoking ex", type: 'Grass', initialRarity: 'Special Illustration Rare' }, // 233
  { name: "Team Rocket's Crobat ex", type: 'Darkness', initialRarity: 'Special Illustration Rare' }, // 234
  { name: "Arven's Mabosstiff ex", type: 'Darkness', initialRarity: 'Special Illustration Rare' }, // 235
  { name: "Ethan's Adventure", type: 'Trainer', initialRarity: 'Special Illustration Rare' }, // 236
  { name: "Team Rocket's Ariana", type: 'Trainer', initialRarity: 'Special Illustration Rare' }, // 237
  { name: "Team Rocket's Giovanni", type: 'Trainer', initialRarity: 'Special Illustration Rare' }, // 238
  { name: "Ethan's Ho-Oh ex", type: 'Fire', initialRarity: 'Hyper Rare' }, // 239
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', initialRarity: 'Hyper Rare' }, // 240
  { name: "Cynthia's Garchomp ex", type: 'Dragon', initialRarity: 'Hyper Rare' }, // 241
  { name: "Team Rocket's Crobat ex", type: 'Darkness', initialRarity: 'Hyper Rare' }, // 242
  { name: 'Jamming Tower', type: 'Trainer', initialRarity: 'Hyper Rare' }, // 243
  { name: 'Levincia', type: 'Trainer', initialRarity: 'Hyper Rare' }, // 244
];

export const destinedRivalsCards: PokemonCard[] = cardListData.map((cardData, index) => {
  const cardNumberInSet = index + 1;
  const uniqueID = getDestinedRivalsUniqueID(cardNumberInSet);
  const formattedNameForFile = formatNameForUrl(cardData.name);
  let dataAiHint = cardData.name;
  if (cardData.type !== 'Trainer' && cardData.type !== 'Energy') {
    dataAiHint += ` ${cardData.type.toLowerCase()} pokemon`;
  } else if (cardData.type === 'Trainer') {
     dataAiHint += ` trainer card`;
  }

  let imageUrl = `https://den-cards.pokellector.com/412/${formattedNameForFile}.DRI.${cardNumberInSet}.${uniqueID}.thumb.png`;

  // Specific overrides for Nidoran image URLs based on exact links previously confirmed
  if (cardNumberInSet === 114) { // Team Rocket's Nidoran♀
    imageUrl = 'https://den-cards.pokellector.com/412/Team-Rockets-Nidoran.DRI.114.57376.thumb.png';
  } else if (cardNumberInSet === 117) { // Team Rocket's Nidoran♂
    imageUrl = 'https://den-cards.pokellector.com/412/Team-Rockets-Nidoran.DRI.117.57379.thumb.png';
  }

  return {
    id: `dri-${formattedNameForFile.toLowerCase().replace(/-+/g, '-')}-${String(cardNumberInSet).padStart(3, '0')}`,
    name: cardData.name,
    image: imageUrl,
    dataAiHint: dataAiHint,
    rarity: cardData.initialRarity, // Use the rarity directly from the image list mapping
    type: cardData.type,
    series: 'Destined Rivals',
    pokedexNumber: `${cardNumberInSet}/244`,
  };
});
