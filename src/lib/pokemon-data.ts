
import type { PokemonCard } from './types';
import { baseSetCards } from './pokemon-data-base-set';
import { destinedRivalsCards } from './pokemon-data-destined-rivals';

// Define the desired order of series for tabs and sorting
const desiredSeriesOrder = ["Base Set", "Destined Rivals"];

export const allCards: PokemonCard[] = [
  ...baseSetCards,
  ...destinedRivalsCards,
].sort((a, b) => {
  // Ensure desiredSeriesOrder is respected first
  const seriesAIndex = desiredSeriesOrder.indexOf(a.series);
  const seriesBIndex = desiredSeriesOrder.indexOf(b.series);

  if (seriesAIndex !== -1 && seriesBIndex !== -1) {
    if (seriesAIndex !== seriesBIndex) {
      return seriesAIndex - seriesBIndex;
    }
  } else if (seriesAIndex !== -1) {
    return -1; // seriesA comes first
  } else if (seriesBIndex !== -1) {
    return 1;  // seriesB comes first
  } else {
    // Fallback for series not in desiredSeriesOrder (alphabetical)
    if (a.series < b.series) return -1;
    if (a.series > b.series) return 1;
  }
  
  // If series are the same (or both not in desired order and alphabetically same)
  // then sort by pokedexNumber
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

const seriesSet = new Set(allCards.map(card => card.series));

// Build allSeriesNames respecting the desiredOrder first, then adding any others
export const allSeriesNames = desiredSeriesOrder.filter(name => seriesSet.has(name));
seriesSet.forEach(name => {
  if (!allSeriesNames.includes(name)) {
    allSeriesNames.push(name); // Add any other series found, maintaining their relative order from allCards if not in desiredOrder
  }
});
