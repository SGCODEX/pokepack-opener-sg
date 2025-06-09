// This is an AI-powered function to generate trivia about a given Pokemon card.
'use server';

/**
 * @fileOverview Generates trivia and educational details about a given Pokémon card.
 *
 * - generateCardTrivia - A function that generates trivia for a given card.
 * - GenerateCardTriviaInput - The input type for the generateCardTrivia function.
 * - GenerateCardTriviaOutput - The return type for the generateCardTrivia function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCardTriviaInputSchema = z.object({
  cardName: z.string().describe('The name of the Pokemon card.'),
  cardType: z.string().describe('The type of the Pokemon card (e.g., Fire, Water, Grass).'),
  cardRarity: z.string().describe('The rarity of the Pokemon card (e.g., Common, Uncommon, Rare).'),
});

export type GenerateCardTriviaInput = z.infer<typeof GenerateCardTriviaInputSchema>;

const GenerateCardTriviaOutputSchema = z.object({
  trivia: z.string().describe('Interesting trivia and educational details about the Pokemon card.'),
});

export type GenerateCardTriviaOutput = z.infer<typeof GenerateCardTriviaOutputSchema>;

export async function generateCardTrivia(input: GenerateCardTriviaInput): Promise<GenerateCardTriviaOutput> {
  return generateCardTriviaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCardTriviaPrompt',
  input: {schema: GenerateCardTriviaInputSchema},
  output: {schema: GenerateCardTriviaOutputSchema},
  prompt: `You are a Pokemon trivia expert. Generate interesting and educational trivia about the following Pokemon card:

Card Name: {{{cardName}}}
Card Type: {{{cardType}}}
Card Rarity: {{{cardRarity}}}

Provide concise and engaging trivia that would be interesting to Pokemon card collectors and enthusiasts.`,
});

const generateCardTriviaFlow = ai.defineFlow(
  {
    name: 'generateCardTriviaFlow',
    inputSchema: GenerateCardTriviaInputSchema,
    outputSchema: GenerateCardTriviaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
