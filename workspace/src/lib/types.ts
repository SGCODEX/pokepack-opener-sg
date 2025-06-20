
export type PokemonType =
  | 'Fire'
  | 'Water'
  | 'Grass'
  | 'Lightning'
  | 'Psychic'
  | 'Fighting'
  | 'Colorless'
  | 'Darkness'
  | 'Metal'
  | 'Dragon'
  | 'Fairy'
  | 'Trainer'
  | 'Energy';

export type CardRarity =
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Holo Rare' // Added for Base Set
  | 'Double Rare' // Typically Pokémon ex
  | 'Ultra Rare' // Typically Full Arts, V, GX, VMAX
  | 'Illustration Rare'
  | 'Special Illustration Rare'
  | 'Hyper Rare'; // Typically Gold cards

export interface PokemonCard {
  id: string;
  name: string;
  image: string; // URL to image
  dataAiHint?: string; // For actual image generation hint
  rarity: CardRarity;
  type: PokemonType;
  series: string; // e.g., "Base Set", "Jungle"
  pokedexNumber: string; // Card number like "1/102", "75/102"
}

export interface PokemonPack {
  id: string;
  name: string;
  series: string;
  image: string; // URL to pack image
  dataAiHint?: string;
  cardsPerPack: number; // Total cards in one pack opening
  rarityDistribution: {
    common: number;
    uncommon: number;
    rareSlot: number; // Number of cards that can be rare or any higher tier
  };
  possibleCards: string[]; // Array of card IDs that can be in this pack
}

export interface Team {
  id: string;
  name: string;
  pokemonIds: (string | null)[];
}

export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  displayName: string | null;
  photoURL: string | null;
  timestamp: any; // Firestore Timestamp or ServerTimestampFieldValue
}
