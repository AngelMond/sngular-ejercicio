class FavoritesStore {
    constructor() {
      this.favorites = [];
      this.listeners = [];
    }
  
    addFavorite(character) {
      if (!this.isFavorite(character)) {
        this.favorites = [...this.favorites, character];
        this._notify();
      }
    }
  
    removeFavorite(character) {
      this.favorites = this.favorites.filter(fav => fav.id !== character.id);
      this._notify();
    }
  
    isFavorite(character) {
      return this.favorites.some(fav => fav.id === character.id);
    }
  
    _notify() {
      this.listeners.forEach(listener => listener(this.favorites));
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }
  }
  
  export const favoritesStore = new FavoritesStore();