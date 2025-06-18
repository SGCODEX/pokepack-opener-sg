
import type { PokemonCard } from './types';
import { baseSetCards } from './pokemon-data-base-set';
import { mcDonaldsCollection2024Cards } from './pokemon-data-mcdonalds-dragon-discovery'; // File name kept for now, content is new set

export const allCards: PokemonCard[] = [
  ...baseSetCards,
  ...mcDonaldsCollection2024Cards, // Now contains McDonald's Collection 2024 cards
].sort((a, b) => {
  if (a.series < b.series) return -1;
  if (a.series > b.series) return 1;
  
  const numA = parseInt(String(a.pokedexNumber).split('/')[0]);
  const numB = parseInt(String(b.pokedexNumber).split('/')[0]);
  return numA - numB;
});

export const getCardById = (id: string): PokemonCard | undefined => {
  return allCards.find(card => card.id === id);
};

export const getCardsBySeries = (series: string): PokemonCard[] => {
  return allCards.filter(card => card.series === series);
};

const desiredSeriesOrder = ["Base Set", "McDonald's Collection 2024"]; // Updated series name
const seriesSet = new Set(allCards.map(card => card.series));
export const allSeriesNames = desiredSeriesOrder.filter(name => seriesSet.has(name));

seriesSet.forEach(name => {
  if (!allSeriesNames.includes(name)) {
    allSeriesNames.push(name);
  }
});
