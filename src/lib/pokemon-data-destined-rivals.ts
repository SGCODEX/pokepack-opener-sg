
import type { PokemonCard } from './types';

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
  if (cardNumberInSet === 34) return 56855;
  if (cardNumberInSet === 49) return 56856;
  if (cardNumberInSet === 87) return 56857;
  if (cardNumberInSet === 96) return 56858;
  if (cardNumberInSet === 193) return 57235;
  if (cardNumberInSet === 198) return 57253;
  if (cardNumberInSet === 203) return 57242;
  if (cardNumberInSet === 204) return 56864;
  if (cardNumberInSet === 209) return 57233;
  if (cardNumberInSet === 231) return 57254;
  if (cardNumberInSet === 232) return 57234;
  if (cardNumberInSet === 233) return 57488;
  if (cardNumberInSet === 234) return 57243;

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

// Rarity Mapping from Pokellector to our system for DRI (Set ID 412):
// Pokellector "Common" -> Common
// Pokellector "Uncommon" -> Uncommon
// Pokellector "Rare" (non-holo) & "Rare Holo" (standard set holos) -> Rare
// Pokellector "Double Rare" (Pokémon ex) -> Double Rare
// Pokellector "Ultra Rare" (Full Art Pokémon ex, Full Art Trainers) -> Ultra Rare
// Pokellector "Illustration Rare" -> Illustration Rare
// Pokellector "Special Illustration Rare" -> Special Illustration Rare
// Pokellector "Hyper Rare" (Gold cards) -> Hyper Rare

const cardListData: { name: string, type: PokemonCard['type'], rarity: PokemonCard['rarity'] }[] = [
  { name: "Ethan's Pinsir", type: 'Grass', rarity: 'Illustration Rare' }, // 1
  { name: 'Yanma', type: 'Grass', rarity: 'Common' }, // 2
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Double Rare' }, // 3
  { name: 'Pineco', type: 'Grass', rarity: 'Common' }, // 4
  { name: 'Shroomish', type: 'Grass', rarity: 'Common' }, // 5
  { name: 'Breloom', type: 'Grass', rarity: 'Uncommon' }, // 6
  { name: "Cynthia's Roselia", type: 'Grass', rarity: 'Uncommon' }, // 7
  { name: "Cynthia's Roserade", type: 'Grass', rarity: 'Rare' }, // 8 (Rare Holo)
  { name: 'Mow Rotom', type: 'Grass', rarity: 'Rare' }, // 9 (Rare Holo)
  { name: 'Shaymin', type: 'Grass', rarity: 'Rare' }, // 10 (Rare Holo)
  { name: 'Dwebble', type: 'Grass', rarity: 'Common' }, // 11
  { name: 'Crustle', type: 'Grass', rarity: 'Uncommon' }, // 12
  { name: 'Fomantis', type: 'Grass', rarity: 'Common' }, // 13
  { name: 'Lurantis', type: 'Grass', rarity: 'Rare' }, // 14 (Rare Holo)
  { name: "Team Rocket's Blipbug", type: 'Grass', rarity: 'Common' }, // 15
  { name: 'Applin', type: 'Grass', rarity: 'Common' }, // 16
  { name: 'Dipplin', type: 'Grass', rarity: 'Uncommon' }, // 17
  { name: 'Hydrapple', type: 'Grass', rarity: 'Rare' }, // 18 (Rare Holo)
  { name: "Team Rocket's Tarountula", type: 'Grass', rarity: 'Common' }, // 19
  { name: "Team Rocket's Spidops", type: 'Grass', rarity: 'Uncommon' }, // 20
  { name: 'Smoliv', type: 'Grass', rarity: 'Common' }, // 21
  { name: 'Dolliv', type: 'Grass', rarity: 'Uncommon' }, // 22
  { name: 'Arboliva ex', type: 'Grass', rarity: 'Double Rare' }, // 23
  { name: 'Rellor', type: 'Grass', rarity: 'Common' }, // 24
  { name: 'Rabsca ex', type: 'Grass', rarity: 'Double Rare' }, // 25
  { name: 'Teal Mask Ogerpon', type: 'Grass', rarity: 'Rare' }, // 26 (Rare Holo)
  { name: 'Growlithe', type: 'Fire', rarity: 'Common' }, // 27
  { name: 'Arcanine', type: 'Fire', rarity: 'Uncommon' }, // 28
  { name: 'Ponyta', type: 'Fire', rarity: 'Common' }, // 29
  { name: 'Rapidash', type: 'Fire', rarity: 'Uncommon' }, // 30
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Double Rare' }, // 31
  { name: "Ethan's Cyndaquil", type: 'Fire', rarity: 'Common' }, // 32
  { name: "Ethan's Quilava", type: 'Fire', rarity: 'Uncommon' }, // 33
  { name: "Ethan's Typhlosion", type: 'Fire', rarity: 'Rare' }, // 34 (Rare Holo)
  { name: "Ethan's Slugma", type: 'Fire', rarity: 'Common' }, // 35
  { name: "Ethan's Magcargo", type: 'Fire', rarity: 'Uncommon' }, // 36
  { name: "Team Rocket's Houndour", type: 'Fire', rarity: 'Common' }, // 37
  { name: "Team Rocket's Houndoom", type: 'Fire', rarity: 'Rare' }, // 38 (Rare Holo)
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Double Rare' }, // 39
  { name: 'Torchic', type: 'Fire', rarity: 'Common' }, // 40
  { name: 'Combusken', type: 'Fire', rarity: 'Uncommon' }, // 41
  { name: 'Blaziken', type: 'Fire', rarity: 'Rare' }, // 42 (Rare Holo)
  { name: 'Heat Rotom', type: 'Fire', rarity: 'Rare' }, // 43 (Rare Holo)
  { name: 'Hearthflame Mask Ogerpon', type: 'Fire', rarity: 'Rare' }, // 44 (Rare Holo)
  { name: "Misty's Psyduck", type: 'Water', rarity: 'Common' }, // 45
  { name: "Misty's Staryu", type: 'Water', rarity: 'Common' }, // 46
  { name: "Misty's Starmie", type: 'Water', rarity: 'Uncommon' }, // 47
  { name: "Misty's Magikarp", type: 'Water', rarity: 'Common' }, // 48
  { name: "Misty's Gyarados", type: 'Water', rarity: 'Rare' }, // 49 (Rare Holo)
  { name: "Misty's Lapras", type: 'Water', rarity: 'Rare' }, // 50 (Rare Holo)
  { name: "Team Rocket's Articuno", type: 'Water', rarity: 'Rare' }, // 51 (Rare Holo)
  { name: "Cynthia's Feebas", type: 'Water', rarity: 'Common' }, // 52
  { name: "Cynthia's Milotic", type: 'Water', rarity: 'Rare' }, // 53 (Rare Holo)
  { name: 'Clamperl', type: 'Water', rarity: 'Common' }, // 54
  { name: 'Huntail', type: 'Water', rarity: 'Uncommon' }, // 55
  { name: 'Gorebyss', type: 'Water', rarity: 'Uncommon' }, // 56
  { name: 'Buizel', type: 'Water', rarity: 'Common' }, // 57
  { name: 'Floatzel', type: 'Water', rarity: 'Uncommon' }, // 58
  { name: 'Snover', type: 'Water', rarity: 'Common' }, // 59
  { name: 'Abomasnow', type: 'Water', rarity: 'Uncommon' }, // 60
  { name: 'Wash Rotom', type: 'Water', rarity: 'Rare' }, // 61 (Rare Holo)
  { name: 'Arrokuda', type: 'Water', rarity: 'Common' }, // 62
  { name: 'Barraskewda', type: 'Water', rarity: 'Uncommon' }, // 63
  { name: 'Cetoddle', type: 'Water', rarity: 'Common' }, // 64
  { name: 'Cetitan ex', type: 'Water', rarity: 'Double Rare' }, // 65
  { name: 'Dondozo ex', type: 'Water', rarity: 'Double Rare' }, // 66
  { name: 'Wellspring Mask Ogerpon', type: 'Water', rarity: 'Rare' }, // 67 (Rare Holo)
  { name: 'Electabuzz', type: 'Lightning', rarity: 'Common' }, // 68
  { name: 'Electivire ex', type: 'Lightning', rarity: 'Double Rare' }, // 69
  { name: "Team Rocket's Zapdos", type: 'Lightning', rarity: 'Rare' }, // 70 (Rare Holo)
  { name: "Ethan's Pichu", type: 'Lightning', rarity: 'Common' }, // 71
  { name: "Team Rocket's Mareep", type: 'Lightning', rarity: 'Common' }, // 72
  { name: "Team Rocket's Flaaffy", type: 'Lightning', rarity: 'Uncommon' }, // 73
  { name: "Team Rocket's Ampharos", type: 'Lightning', rarity: 'Rare' }, // 74 (Rare Holo)
  { name: 'Electrike', type: 'Lightning', rarity: 'Common' }, // 75
  { name: 'Manectric', type: 'Lightning', rarity: 'Uncommon' }, // 76
  { name: 'Rotom', type: 'Lightning', rarity: 'Rare' }, // 77 (Rare Holo)
  { name: 'Zeraora', type: 'Lightning', rarity: 'Rare' }, // 78 (Rare Holo)
  { name: "Team Rocket's Drowzee", type: 'Psychic', rarity: 'Common' }, // 79
  { name: "Team Rocket's Hypno", type: 'Psychic', rarity: 'Uncommon' }, // 80
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Double Rare' }, // 81
  { name: "Team Rocket's Wobbuffet", type: 'Psychic', rarity: 'Uncommon' }, // 82
  { name: "Steven's Baltoy", type: 'Psychic', rarity: 'Common' }, // 83
  { name: "Steven's Claydol", type: 'Psychic', rarity: 'Uncommon' }, // 84
  { name: "Team Rocket's Chingling", type: 'Psychic', rarity: 'Common' }, // 85
  { name: "Steven's Carbink", type: 'Psychic', rarity: 'Uncommon' }, // 86
  { name: "Team Rocket's Mimikyu", type: 'Psychic', rarity: 'Rare' }, // 87 (Rare Holo)
  { name: "Team Rocket's Dottler", type: 'Psychic', rarity: 'Uncommon' }, // 88
  { name: "Team Rocket's Orbeetle", type: 'Psychic', rarity: 'Rare' }, // 89 (Rare Holo)
  { name: 'Mankey', type: 'Fighting', rarity: 'Common' }, // 90
  { name: 'Primeape', type: 'Fighting', rarity: 'Uncommon' }, // 91
  { name: 'Annihilape', type: 'Fighting', rarity: 'Rare' }, // 92 (Rare Holo)
  { name: "Ethan's Sudowoodo", type: 'Fighting', rarity: 'Uncommon' }, // 93
  { name: "Team Rocket's Larvitar", type: 'Fighting', rarity: 'Common' }, // 94
  { name: "Team Rocket's Pupitar", type: 'Fighting', rarity: 'Uncommon' }, // 95
  { name: "Team Rocket's Tyranitar", type: 'Darkness', rarity: 'Rare' }, // 96 (Rare Holo)
  { name: 'Nosepass', type: 'Fighting', rarity: 'Common' }, // 97
  { name: 'Probopass', type: 'Metal', rarity: 'Uncommon' }, // 98
  { name: 'Meditite', type: 'Fighting', rarity: 'Common' }, // 99
  { name: 'Medicham', type: 'Fighting', rarity: 'Uncommon' }, // 100
  { name: 'Regirock ex', type: 'Fighting', rarity: 'Double Rare' }, // 101
  { name: "Cynthia's Gible", type: 'Dragon', rarity: 'Common' }, // 102
  { name: "Cynthia's Gabite", type: 'Dragon', rarity: 'Uncommon' }, // 103
  { name: "Cynthia's Garchomp ex", type: 'Dragon', rarity: 'Double Rare' }, // 104
  { name: 'Hippopotas', type: 'Fighting', rarity: 'Common' }, // 105
  { name: 'Hippowdon', type: 'Fighting', rarity: 'Uncommon' }, // 106
  { name: 'Mudbray', type: 'Fighting', rarity: 'Common' }, // 107
  { name: 'Mudsdale', type: 'Fighting', rarity: 'Uncommon' }, // 108
  { name: "Arven's Toedscool", type: 'Grass', rarity: 'Common' }, // 109
  { name: "Arven's Toedscruel", type: 'Grass', rarity: 'Uncommon' }, // 110
  { name: 'Cornerstone Mask Ogerpon', type: 'Fighting', rarity: 'Rare' }, // 111 (Rare Holo)
  { name: "Team Rocket's Ekans", type: 'Grass', rarity: 'Common' }, // 112
  { name: "Team Rocket's Arbok", type: 'Grass', rarity: 'Uncommon' }, // 113
  { name: "Team Rocket's Nidoran♀", type: 'Grass', rarity: 'Common' }, // 114
  { name: "Team Rocket's Nidorina", type: 'Grass', rarity: 'Uncommon' }, // 115
  { name: "Team Rocket's Nidoqueen", type: 'Grass', rarity: 'Rare' }, // 116 (Rare Holo)
  { name: "Team Rocket's Nidoran♂", type: 'Grass', rarity: 'Common' }, // 117
  { name: "Team Rocket's Nidorino", type: 'Grass', rarity: 'Uncommon' }, // 118
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Double Rare' }, // 119
  { name: "Team Rocket's Zubat", type: 'Grass', rarity: 'Common' }, // 120
  { name: "Team Rocket's Golbat", type: 'Grass', rarity: 'Uncommon' }, // 121
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Double Rare' }, // 122
  { name: "Team Rocket's Grimer", type: 'Grass', rarity: 'Common' }, // 123
  { name: "Team Rocket's Muk", type: 'Grass', rarity: 'Uncommon' }, // 124
  { name: "Team Rocket's Koffing", type: 'Grass', rarity: 'Common' }, // 125
  { name: "Team Rocket's Weezing", type: 'Grass', rarity: 'Rare' }, // 126 (Rare Holo)
  { name: "Team Rocket's Murkrow", type: 'Darkness', rarity: 'Common' }, // 127
  { name: "Team Rocket's Sneasel", type: 'Darkness', rarity: 'Common' }, // 128
  { name: "Cynthia's Spiritomb", type: 'Psychic', rarity: 'Rare' }, // 129 (Rare Holo)
  { name: "Marnie's Purrloin", type: 'Darkness', rarity: 'Common' }, // 130
  { name: "Marnie's Liepard", type: 'Darkness', rarity: 'Uncommon' }, // 131
  { name: "Marnie's Scraggy", type: 'Darkness', rarity: 'Common' }, // 132
  { name: "Marnie's Scrafty", type: 'Darkness', rarity: 'Uncommon' }, // 133
  { name: "Marnie's Impidimp", type: 'Darkness', rarity: 'Common' }, // 134
  { name: "Marnie's Morgrem", type: 'Darkness', rarity: 'Uncommon' }, // 135
  { name: "Marnie's Grimmsnarl ex", type: 'Darkness', rarity: 'Double Rare' }, // 136
  { name: "Marnie's Morpeko", type: 'Lightning', rarity: 'Rare' }, // 137 (Rare Holo)
  { name: "Arven's Maschiff", type: 'Darkness', rarity: 'Common' }, // 138
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Double Rare' }, // 139
  { name: 'Forretress', type: 'Metal', rarity: 'Uncommon' }, // 140
  { name: 'Skarmory', type: 'Metal', rarity: 'Common' }, // 141
  { name: "Steven's Skarmory", type: 'Metal', rarity: 'Uncommon' }, // 142
  { name: "Steven's Beldum", type: 'Metal', rarity: 'Common' }, // 143
  { name: "Steven's Metang", type: 'Metal', rarity: 'Uncommon' }, // 144
  { name: "Steven's Metagross ex", type: 'Metal', rarity: 'Double Rare' }, // 145
  { name: 'Zamazenta', type: 'Metal', rarity: 'Rare' }, // 146 (Rare Holo)
  { name: "Team Rocket's Rattata", type: 'Colorless', rarity: 'Common' }, // 147
  { name: "Team Rocket's Raticate", type: 'Colorless', rarity: 'Uncommon' }, // 148
  { name: "Team Rocket's Meowth", type: 'Colorless', rarity: 'Common' }, // 149
  { name: "Team Rocket's Persian ex", type: 'Colorless', rarity: 'Double Rare' }, // 150
  { name: 'Kangaskhan', type: 'Colorless', rarity: 'Rare' }, // 151 (Rare Holo)
  { name: 'Tauros', type: 'Colorless', rarity: 'Uncommon' }, // 152
  { name: "Team Rocket's Porygon", type: 'Colorless', rarity: 'Common' }, // 153
  { name: "Team Rocket's Porygon2", type: 'Colorless', rarity: 'Uncommon' }, // 154
  { name: "Team Rocket's Porygon-Z", type: 'Colorless', rarity: 'Rare' }, // 155 (Rare Holo)
  { name: 'Taillow', type: 'Colorless', rarity: 'Common' }, // 156
  { name: 'Swellow', type: 'Colorless', rarity: 'Uncommon' }, // 157
  { name: "Arven's Skwovet", type: 'Colorless', rarity: 'Common' }, // 158
  { name: "Arven's Greedent", type: 'Colorless', rarity: 'Uncommon' }, // 159
  { name: 'Squawkabilly', type: 'Colorless', rarity: 'Rare' }, // 160 (Rare Holo)
  { name: "Arven's Sandwich", type: 'Trainer', rarity: 'Uncommon' }, // 161
  { name: "Cynthia's Power Weight", type: 'Trainer', rarity: 'Uncommon' }, // 162
  { name: "Emcee's Hype", type: 'Trainer', rarity: 'Ultra Rare' }, // 163 - Assuming Full Art Supporter
  { name: 'Energy Recycler', type: 'Trainer', rarity: 'Uncommon' }, // 164
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Ultra Rare' }, // 165 - Assuming Full Art Supporter
  { name: 'Granite Cave', type: 'Trainer', rarity: 'Uncommon' }, // 166
  { name: 'Judge', type: 'Trainer', rarity: 'Rare' }, // 167 - Regular print of a supporter, often Rare
  { name: 'Sacred Ash', type: 'Trainer', rarity: 'Uncommon' }, // 168
  { name: 'Spikemuth Gym', type: 'Trainer', rarity: 'Uncommon' }, // 169
  { name: "Team Rocket's Archer", type: 'Trainer', rarity: 'Ultra Rare' }, // 170 - Assuming Full Art Supporter
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Ultra Rare' }, // 171 - Assuming Full Art Supporter
  { name: "Team Rocket's Bother-Bot", type: 'Trainer', rarity: 'Uncommon' }, // 172
  { name: "Team Rocket's Factory", type: 'Trainer', rarity: 'Uncommon' }, // 173
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Ultra Rare' }, // 174 - Assuming Full Art Supporter
  { name: "Team Rocket's Great Ball", type: 'Trainer', rarity: 'Uncommon' }, // 175
  { name: "Team Rocket's Petrel", type: 'Trainer', rarity: 'Ultra Rare' }, // 176 - Assuming Full Art Supporter
  { name: "Team Rocket's Proton", type: 'Trainer', rarity: 'Ultra Rare' }, // 177 - Assuming Full Art Supporter
  { name: "Team Rocket's Transceiver", type: 'Trainer', rarity: 'Uncommon' }, // 178
  { name: "Team Rocket's Venture Bomb", type: 'Trainer', rarity: 'Uncommon' }, // 179
  { name: "Team Rocket's Watchtower", type: 'Trainer', rarity: 'Uncommon' }, // 180
  { name: 'TM Machine', type: 'Trainer', rarity: 'Uncommon' }, // 181
  { name: "Team Rocket's Energy", type: 'Energy', rarity: 'Rare' }, // 182 - Special Energy, often Rare or Uncommon
  { name: 'Yanma', type: 'Grass', rarity: 'Illustration Rare' }, // 183
  { name: "Cynthia's Roserade", type: 'Grass', rarity: 'Illustration Rare' }, // 184
  { name: 'Shaymin', type: 'Grass', rarity: 'Illustration Rare' }, // 185
  { name: 'Crustle', type: 'Grass', rarity: 'Illustration Rare' }, // 186
  { name: "Team Rocket's Spidops", type: 'Grass', rarity: 'Illustration Rare' }, // 187
  { name: 'Hydrapple', type: 'Grass', rarity: 'Illustration Rare' }, // 188
  { name: 'Rapidash', type: 'Fire', rarity: 'Illustration Rare' }, // 189
  { name: "Ethan's Typhlosion", type: 'Fire', rarity: 'Illustration Rare' }, // 190
  { name: "Team Rocket's Houndoom", type: 'Fire', rarity: 'Illustration Rare' }, // 191
  { name: 'Blaziken', type: 'Fire', rarity: 'Illustration Rare' }, // 192
  { name: "Misty's Psyduck", type: 'Water', rarity: 'Illustration Rare' }, // 193
  { name: "Misty's Lapras", type: 'Water', rarity: 'Illustration Rare' }, // 194
  { name: 'Clamperl', type: 'Water', rarity: 'Illustration Rare' }, // 195
  { name: 'Electrike', type: 'Lightning', rarity: 'Illustration Rare' }, // 196
  { name: 'Rotom', type: 'Lightning', rarity: 'Illustration Rare' }, // 197
  { name: "Team Rocket's Orbeetle", type: 'Psychic', rarity: 'Illustration Rare' }, // 198
  { name: "Team Rocket's Weezing", type: 'Grass', rarity: 'Illustration Rare' }, // 199
  { name: "Team Rocket's Murkrow", type: 'Darkness', rarity: 'Illustration Rare' }, // 200
  { name: 'Zamazenta', type: 'Metal', rarity: 'Illustration Rare' }, // 201
  { name: "Team Rocket's Raticate", type: 'Colorless', rarity: 'Illustration Rare' }, // 202
  { name: "Team Rocket's Meowth", type: 'Colorless', rarity: 'Illustration Rare' }, // 203
  { name: 'Kangaskhan', type: 'Colorless', rarity: 'Illustration Rare' }, // 204
  { name: "Arven's Greedent", type: 'Colorless', rarity: 'Illustration Rare' }, // 205
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Ultra Rare' }, // 206 - Full Art ex
  { name: 'Arboliva ex', type: 'Grass', rarity: 'Ultra Rare' }, // 207 - Full Art ex
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Ultra Rare' }, // 208 - Full Art ex
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Ultra Rare' }, // 209 - Full Art ex
  { name: 'Cetitan ex', type: 'Water', rarity: 'Ultra Rare' }, // 210 - Full Art ex
  { name: 'Dondozo ex', type: 'Water', rarity: 'Ultra Rare' }, // 211 - Full Art ex
  { name: 'Electivire ex', type: 'Lightning', rarity: 'Ultra Rare' }, // 212 - Full Art ex
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Ultra Rare' }, // 213 - Full Art ex
  { name: 'Regirock ex', type: 'Fighting', rarity: 'Ultra Rare' }, // 214 - Full Art ex
  { name: "Cynthia's Garchomp ex", type: 'Dragon', rarity: 'Ultra Rare' }, // 215 - Full Art ex
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Ultra Rare' }, // 216 - Full Art ex
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Ultra Rare' }, // 217 - Full Art ex
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Ultra Rare' }, // 218 - Full Art ex
  { name: "Team Rocket's Persian ex", type: 'Colorless', rarity: 'Ultra Rare' }, // 219 - Full Art ex
  { name: "Emcee's Hype", type: 'Trainer', rarity: 'Ultra Rare' }, // 220 - Full Art Supporter
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Ultra Rare' }, // 221 - Full Art Supporter
  { name: 'Judge', type: 'Trainer', rarity: 'Ultra Rare' }, // 222 - Full Art Supporter (this is likely the FA version)
  { name: "Team Rocket's Archer", type: 'Trainer', rarity: 'Ultra Rare' }, // 223 - Full Art Supporter
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Ultra Rare' }, // 224 - Full Art Supporter
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Ultra Rare' }, // 225 - Full Art Supporter
  { name: "Team Rocket's Petrel", type: 'Trainer', rarity: 'Ultra Rare' }, // 226 - Full Art Supporter
  { name: "Team Rocket's Proton", type: 'Trainer', rarity: 'Ultra Rare' }, // 227 - Full Art Supporter
  { name: 'Yanmega ex', type: 'Grass', rarity: 'Special Illustration Rare' }, // 228
  { name: "Team Rocket's Moltres ex", type: 'Fire', rarity: 'Special Illustration Rare' }, // 229
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Special Illustration Rare' }, // 230
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Special Illustration Rare' }, // 231
  { name: "Cynthia's Garchomp ex", type: 'Dragon', rarity: 'Special Illustration Rare' }, // 232
  { name: "Team Rocket's Nidoking ex", type: 'Grass', rarity: 'Special Illustration Rare' }, // 233
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Special Illustration Rare' }, // 234
  { name: "Arven's Mabosstiff ex", type: 'Darkness', rarity: 'Special Illustration Rare' }, // 235
  { name: "Ethan's Adventure", type: 'Trainer', rarity: 'Special Illustration Rare' }, // 236
  { name: "Team Rocket's Ariana", type: 'Trainer', rarity: 'Special Illustration Rare' }, // 237
  { name: "Team Rocket's Giovanni", type: 'Trainer', rarity: 'Special Illustration Rare' }, // 238
  { name: "Ethan's Ho-Oh ex", type: 'Fire', rarity: 'Hyper Rare' }, // 239 - Gold ex
  { name: "Team Rocket's Mewtwo ex", type: 'Psychic', rarity: 'Hyper Rare' }, // 240 - Gold ex
  { name: "Cynthia's Garchomp ex", type: 'Dragon', rarity: 'Hyper Rare' }, // 241 - Gold ex
  { name: "Team Rocket's Crobat ex", type: 'Darkness', rarity: 'Hyper Rare' }, // 242 - Gold ex
  { name: 'Jamming Tower', type: 'Trainer', rarity: 'Hyper Rare' }, // 243 - Gold Stadium
  { name: 'Levincia', type: 'Trainer', rarity: 'Hyper Rare' }, // 244 - Gold Stadium
];

export const destinedRivalsCards: PokemonCard[] = cardListData.map((card, index) => {
  const cardNumberInSet = index + 1;
  const uniqueID = getDestinedRivalsUniqueID(cardNumberInSet);
  const formattedNameForFile = formatNameForUrl(card.name);
  let dataAiHint = card.name;
  if (card.type !== 'Trainer' && card.type !== 'Energy') {
    dataAiHint += ` ${card.type.toLowerCase()} pokemon`;
  } else if (card.type === 'Trainer') {
     dataAiHint += ` trainer card`;
  }

  let imageUrl = `https://den-cards.pokellector.com/412/${formattedNameForFile}.DRI.${cardNumberInSet}.${uniqueID}.thumb.png`;

  if (cardNumberInSet === 114) { // Team Rocket's Nidoran♀
    imageUrl = 'https://den-cards.pokellector.com/412/Team-Rockets-Nidoran.DRI.114.57376.thumb.png';
  } else if (cardNumberInSet === 117) { // Team Rocket's Nidoran♂
    imageUrl = 'https://den-cards.pokellector.com/412/Team-Rockets-Nidoran.DRI.117.57379.thumb.png';
  }

  return {
    id: `dri-${formattedNameForFile.toLowerCase().replace(/-+/g, '-')}-${String(cardNumberInSet).padStart(3, '0')}`,
    name: card.name,
    image: imageUrl,
    dataAiHint: dataAiHint,
    rarity: card.rarity,
    type: card.type,
    series: 'Destined Rivals',
    pokedexNumber: `${cardNumberInSet}/244`,
  };
});
