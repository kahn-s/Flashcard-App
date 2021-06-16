// These are functions for handling the decks

export function handleDelete({ deck }, { setDecks }, { decks }) {
  const toRemove = deck.id;
  if (window.confirm("Delete this deck? You won't be able to recover it.")) {
    const newDecks = decks.filter((deck) => deck.id !== toRemove);
    setDecks(newDecks);
  }
}
