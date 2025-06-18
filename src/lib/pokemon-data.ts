
import type { PokemonCard } from './types';
import { baseSetCards } from './pokemon-data-base-set';
import { mcDonaldsDragonDiscoveryCards } from './pokemon-data-mcdonalds-dragon-discovery';

export const allCards: PokemonCard[] = [
  ...baseSetCards,
  ...mcDonaldsDragonDiscoveryCards,
].sort((a, b) => {
  // Sort by series first, then by pokedex number within that series
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

// Extract unique series names for Pokedex tabs, maintaining a specific order if desired
const desiredSeriesOrder = ["Base Set", "McDonald's Dragon Discovery"];
const seriesSet = new Set(allCards.map(card => card.series));
export const allSeriesNames = desiredSeriesOrder.filter(name => seriesSet.has(name));
// Add any other series not in desiredOrder to the end
seriesSet.forEach(name => {
  if (!allSeriesNames.includes(name)) {
    allSeriesNames.push(name);
  }
});
