
import type { PokemonCard } from './types';
import { baseSetCards } from './pokemon-data-base-set';
import { destinedRivalsCards } from './pokemon-data-destined-rivals';
import { generationsCards } from './pokemon-data-generations';

// Define the desired order of series for tabs and sorting
const desiredSeriesOrder = ["Base Set", "Destined Rivals", "Generations"];

const parsePokedexNumber = (pokedexNumStr: string): number => {
  const s = String(pokedexNumStr).toUpperCase();
  if (s.startsWith('RC')) {
    // For Radiant Collection, e.g., RC5/RC32 -> 1000 + 5
    return 1000 + parseInt(s.substring(2).split('/')[0], 10);
  }
  // For standard numbers, e.g., 5/102 -> 5
  return parseInt(s.split('/')[0], 10);
};

export const allCards: PokemonCard[] = [
  ...baseSetCards,
  ...destinedRivalsCards,
  ...generationsCards,
].sort((a, b) => {
  const seriesAIndex = desiredSeriesOrder.indexOf(a.series);
  const seriesBIndex = desiredSeriesOrder.indexOf(b.series);

  if (seriesAIndex !== -1 && seriesBIndex !== -1) {
    if (seriesAIndex !== seriesBIndex) {
      return seriesAIndex - seriesBIndex;
    }
  } else if (seriesAIndex !== -1) {
    return -1; 
  } else if (seriesBIndex !== -1) {
    return 1;  
  } else {
    if (a.series < b.series) return -1;
    if (a.series > b.series) return 1;
  }
  
  const numA = parsePokedexNumber(a.pokedexNumber);
  const numB = parsePokedexNumber(b.pokedexNumber);

  if (isNaN(numA) && isNaN(numB)) return 0; // both NaN, treat as equal
  if (isNaN(numA)) return 1; // numA is NaN, sort b first
  if (isNaN(numB)) return -1; // numB is NaN, sort a first
  
  return numA - numB;
});

export const getCardById = (id: string): PokemonCard | undefined => {
  return allCards.find(card => card.id === id);
};

export const getCardsBySeries = (series: string): PokemonCard[] => {
  return allCards.filter(card => card.series === series);
};

const seriesSet = new Set(allCards.map(card => card.series));

export const allSeriesNames = desiredSeriesOrder.filter(name => seriesSet.has(name));
seriesSet.forEach(name => {
  if (!allSeriesNames.includes(name)) {
    allSeriesNames.push(name); 
  }
});
