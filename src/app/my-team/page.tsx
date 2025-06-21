
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { PokemonCard, Team } from '@/lib/types';
import { allCards, allSeriesNames, getCardById } from '@/lib/pokemon-data';
import { CardComponent } from '@/components/card-component';
import { CardDetailModal } from '@/components/card-detail-modal';
import { usePokedex } from '@/hooks/use-pokedex';
import { useMyTeam } from '@/hooks/use-my-team';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Search, Trash2, Users, PlusCircle, MinusCircle, ShieldCheck, Pencil, Copy, ListChecks, Edit3, Star, CheckCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';


const cardTypes = ["All", "Fire", "Water", "Grass", "Lightning", "Psychic", "Fighting", "Colorless", "Darkness", "Metal", "Dragon", "Fairy", "Trainer", "Energy"];
const baseSetRarities: string[] = ["All", "Common", "Uncommon", "Rare", "Holo Rare", "Ultra Rare"];
const destinedRivalsRarities: string[] = [
  "All", "Common", "Uncommon", "Rare", 
  "Double Rare", "Ultra Rare", "Illustration Rare", 
  "Special Illustration Rare", "Hyper Rare"
];
const generationsRarities: string[] = ["All", "Common", "Uncommon", "Rare", "Holo Rare", "Ultra Rare"];

type ViewMode = 'list' | 'edit';

export default function MyTeamPage() {
  const { collectedCardsMap, getCollectedCount, isLoaded: pokedexLoaded } = usePokedex();
  const {
    teams,
    activeTeamId,
    setActiveTeamId,
    getActiveTeam,
    getActiveTeamCards,
    createTeam,
    deleteTeam,
    renameTeam,
    duplicateTeam,
    addCardToActiveTeam,
    removeCardFromActiveTeamSlot,
    isCardInActiveTeam,
    getActiveTeamSlotCount,
    clearActiveTeam,
    isLoaded: teamHookLoaded,
    teamSize,
  } = useMyTeam();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedCardForModal, setSelectedCardForModal] = useState<PokemonCard | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterRarity, setFilterRarity] = useState('All');
  const [activeSeriesTab, setActiveSeriesTab] = useState<string>(allSeriesNames.length > 0 ? allSeriesNames[0] : 'Base Set');

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [teamToRename, setTeamToRename] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState('');

  const currentActiveTeamDetails = useMemo(() => getActiveTeam(), [getActiveTeam, activeTeamId, teams]);
  const currentTeamCardsToDisplay = useMemo(() => getActiveTeamCards(), [getActiveTeamCards, activeTeamId, teams]);
  const currentTeamMemberCount = useMemo(() => getActiveTeamSlotCount(), [getActiveTeamSlotCount, activeTeamId, teams]);


  useEffect(() => {
    if (allSeriesNames.length > 0 && !allSeriesNames.includes(activeSeriesTab)) {
      setActiveSeriesTab(allSeriesNames[0]);
    } else if (allSeriesNames.length === 0) {
      setActiveSeriesTab('Base Set');
    }
  }, [allSeriesNames, activeSeriesTab]);

  const raritiesForFilter = useMemo(() => {
    if (activeSeriesTab === 'Destined Rivals') return destinedRivalsRarities;
    if (activeSeriesTab === 'Generations') return generationsRarities;
    return baseSetRarities;
  }, [activeSeriesTab]);

  useEffect(() => {
    if (!raritiesForFilter.includes(filterRarity)) {
      setFilterRarity("All");
    }
  }, [raritiesForFilter, filterRarity]);

  const handleCardClickForModal = (card: PokemonCard) => {
    setSelectedCardForModal(card);
    setIsCardModalOpen(true);
  };

  const closeCardModal = () => {
    setIsCardModalOpen(false);
    setSelectedCardForModal(null);
  };

  const collectedPokemonList = useMemo(() => {
    return allCards.filter(card => getCollectedCount(card.id) > 0);
  }, [getCollectedCount, collectedCardsMap]);

  const cardsInCurrentSeriesForSelection = useMemo(() => {
    return collectedPokemonList.filter(card => card.series === activeSeriesTab);
  }, [activeSeriesTab, collectedPokemonList]);

  const filteredAndSortedCardsForSelection = useMemo(() => {
    return cardsInCurrentSeriesForSelection.filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = filterType === 'All' || card.type === filterType;
      const rarityMatch = filterRarity === 'All' || card.rarity === filterRarity;
      return nameMatch && typeMatch && rarityMatch;
    });
  }, [searchTerm, filterType, filterRarity, cardsInCurrentSeriesForSelection]);


  const handleCreateNewTeam = () => {
    const newId = createTeam();
    setActiveTeamId(newId);
    setViewMode('edit');
  };

  const handleEditTeam = (teamId: string) => {
    setActiveTeamId(teamId);
    setViewMode('edit');
  };

  const handleOpenRenameDialog = (team: Team) => {
    setTeamToRename(team);
    setNewTeamName(team.name);
    setIsRenameDialogOpen(true);
  };

  const handleRenameTeam = () => {
    if (teamToRename && newTeamName.trim() !== '') {
      renameTeam(teamToRename.id, newTeamName.trim());
    }
    setIsRenameDialogOpen(false);
    setTeamToRename(null);
    setNewTeamName('');
  };

  const handleDuplicateTeam = (teamId: string) => {
    const newTeamId = duplicateTeam(teamId);
    if (newTeamId) {
      setActiveTeamId(newTeamId);
      setViewMode('edit'); 
    }
  };


  if (!pokedexLoaded || !teamHookLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)]"></div>
        <p className="ml-4 text-lg dark:text-foreground">Loading Team Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 flex flex-col flex-grow">
      {viewMode === 'list' && (
        <>
          <header className="text-center space-y-3">
            <h1 className="text-4xl font-headline font-bold text-primary-foreground dark:text-foreground">Your Pokémon Teams</h1>
            <p className="text-lg text-muted-foreground dark:text-foreground/80">Manage your battle squads or themed collections.</p>
          </header>
          <div className="text-center">
            <Button onClick={handleCreateNewTeam} size="lg" className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white">
              <PlusCircle className="mr-2 h-5 w-5" /> Create New Team
            </Button>
          </div>

          {teams.length > 0 ? (
            <ScrollArea className="flex-grow min-h-0"> 
              <div className="space-y-4 p-1">
                {teams.map(team => (
                  <div 
                    key={team.id} 
                    className={cn(
                      "p-4 bg-card rounded-lg shadow-md border flex flex-col sm:flex-row justify-between items-center gap-3 transition-all",
                      team.id === activeTeamId ? "border-[hsl(217,91%,60%)] ring-2 ring-[hsl(217,91%,60%)] shadow-xl" : "border-border hover:shadow-lg"
                    )}
                  >
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-card-foreground">{team.name}</h3>
                        {team.id === activeTeamId && (
                           <Badge className="bg-[hsl(217,91%,60%)] text-white">
                             <Star className="mr-1 h-3 w-3" /> Active
                           </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {team.pokemonIds.filter(id => id !== null).length} / {teamSize} Pokémon
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {team.id !== activeTeamId && (
                        <Button variant="outline" size="sm" onClick={() => setActiveTeamId(team.id)} className="bg-green-500 hover:bg-green-600 text-white border-green-600">
                          <CheckCircle className="mr-1.5 h-4 w-4" /> Make Active
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleEditTeam(team.id)}>
                        <Edit3 className="mr-1.5 h-4 w-4" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenRenameDialog(team)}>
                        <Pencil className="mr-1.5 h-4 w-4" /> Rename
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDuplicateTeam(team.id)}>
                        <Copy className="mr-1.5 h-4 w-4" /> Duplicate
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="mr-1.5 h-4 w-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the team "{team.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteTeam(team.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-10 flex-grow flex flex-col justify-center items-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No teams created yet.</p>
              <p className="text-sm text-muted-foreground">Click "Create New Team" to get started!</p>
            </div>
          )}
        </>
      )}

      {viewMode === 'edit' && currentActiveTeamDetails && (
        <>
          <header className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <Button variant="outline" onClick={() => { setViewMode('list'); /* setActiveTeamId(null); // Keep activeTeamId for highlighting in list */ }}>
              <ListChecks className="mr-2 h-4 w-4" /> Back to Team List
            </Button>
            <div className="text-center flex-grow">
                 <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary-foreground dark:text-foreground">
                    Editing: {currentActiveTeamDetails.name}
                 </h1>
            </div>
            <div className="w-[150px]"> {/* Spacer to balance the back button */} </div>
          </header>

          <section className="p-4 bg-card rounded-lg shadow-xl border border-border">
            <h2 className="text-2xl font-headline font-semibold text-center mb-4">Current Team ({currentTeamMemberCount}/{teamSize})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4">
              {currentTeamCardsToDisplay.map((card, index) => (
                <div key={`team-slot-${index}`} className="relative group aspect-[240/336] border-2 border-dashed border-muted rounded-lg flex items-center justify-center bg-background/50">
                  {card ? (
                    <>
                      <CardComponent 
                        card={card} 
                        onClick={() => handleCardClickForModal(card)} 
                        className="w-full h-full" 
                        showDetails={false} 
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 z-10 opacity-80 group-hover:opacity-100 transition-opacity h-7 w-7"
                        onClick={() => removeCardFromActiveTeamSlot(index)}
                        aria-label="Remove from team"
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="text-center text-muted-foreground p-2">
                      <Users className="h-10 w-10 mx-auto mb-1" />
                      <p className="text-xs">Empty Slot</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {currentTeamMemberCount > 0 && (
              <div className="text-center mt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Trash2 className="mr-2 h-4 w-4" /> Clear This Team
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all Pokémon from the team "{currentActiveTeamDetails.name}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearActiveTeam}>Clear Team</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-headline font-semibold text-center mb-6">Select from Your Collected Pokémon</h2>
            {allSeriesNames.length > 0 ? (
              <Tabs value={activeSeriesTab} onValueChange={setActiveSeriesTab} className="w-full">
                <div className="w-full overflow-x-auto flex justify-center mb-4">
                  <TabsList>
                    {allSeriesNames.map(seriesName => (
                      <TabsTrigger key={seriesName} value={seriesName}>{seriesName}</TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="p-4 bg-card rounded-lg shadow space-y-4 md:flex md:items-end md:justify-between md:space-y-0 md:space-x-4 mb-6">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      type="text"
                      placeholder="Search by name..."
                      className="pl-10 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-2">
                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-full md:w-[150px]">
                          <SelectValue placeholder="Filter by Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {cardTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                      </Select>

                      <Select value={filterRarity} onValueChange={setFilterRarity}>
                        <SelectTrigger className="w-full md:w-[180px]">
                          <SelectValue placeholder="Filter by Rarity" />
                        </SelectTrigger>
                        <SelectContent>
                          {raritiesForFilter.map(rarity => <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>)}
                        </SelectContent>
                      </Select>
                  </div>
                </div>
                
                {allSeriesNames.map(seriesName => (
                  <TabsContent key={`select-${seriesName}`} value={seriesName}>
                    {filteredAndSortedCardsForSelection.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 justify-items-center">
                        {filteredAndSortedCardsForSelection.map((card) => {
                          const collected = getCollectedCount(card.id);
                          const inTeam = isCardInActiveTeam(card.id);
                          const teamFull = currentTeamMemberCount >= teamSize;
                          return (
                            <div key={`select-${card.id}`} className="flex flex-col items-center gap-2">
                              <CardComponent
                                card={card}
                                onClick={() => handleCardClickForModal(card)}
                                viewContext="pokedex"
                                pokedexNumber={card.pokedexNumber} 
                                collectedCount={collected}
                              />
                              {inTeam ? (
                                <Button variant="outline" disabled className="w-full text-xs sm:text-sm">
                                  <ShieldCheck className="mr-2 h-4 w-4 text-green-500" /> In Team
                                </Button>
                              ) : teamFull ? (
                                <Button variant="outline" disabled className="w-full text-xs sm:text-sm">Team Full</Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  onClick={() => addCardToActiveTeam(card.id)} 
                                  className="w-full text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground"
                                >
                                  <PlusCircle className="mr-2 h-4 w-4" /> Add to Team
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-xl text-muted-foreground">No collected cards match your filters for {seriesName}.</p>
                        <p className="text-sm text-muted-foreground">Collect more cards or try adjusting filters.</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="text-center py-10">
                  <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-xl text-muted-foreground">No Pokémon series available for display.</p>
                </div>
            )}
          </section>
        </>
      )}

      {!currentActiveTeamDetails && viewMode === 'edit' && (
         <div className="text-center py-10">
            <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground">No team selected for editing.</p>
            <Button variant="outline" onClick={() => setViewMode('list')}>Go to Team List</Button>
          </div>
      )}

      {selectedCardForModal && (
        <CardDetailModal
          card={selectedCardForModal}
          isOpen={isCardModalOpen}
          onClose={closeCardModal}
          collectedCount={getCollectedCount(selectedCardForModal.id)}
        />
      )}

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Team</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="teamName">New Team Name</Label>
            <Input 
              id="teamName"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="Enter new team name"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleRenameTeam}>Save Name</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
