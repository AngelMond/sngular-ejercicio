import { LitElement, html, nothing } from "lit-element";
import styles from "./home-page-styles";
import '../components/character-card/character-card';
import '../components/favorite-characters/favorite-characters';
import { favoritesStore } from "../components/favorites-store/favorites-store";


class HomePage extends LitElement {

  static get styles() {
    return [styles]
  }

  static get properties() {
    return {
      characters: { type: Array },
      opened: { type: Boolean },
      currentPage: { type: Number },
      nextPage: {type: String},
      prevPage: {type: String}
    }
  }

  constructor() {
    super()
    this.characters = [];
    this.opened = false;
    this.currentPage = 1;
    this.nextPage = null;
    this.prevPage = null;
  }
  
  firstUpdated() {
    this.getCharactersData(this.currentPage);
  }

  async getCharactersData(pageNumber) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`);

      if (!response.ok) {
        throw new Error(`Error al obtener resultados. Status: ${response.status}`);
      }
      const data = await response.json();
      const { info, results } = data;
      // Personajes
      this.characters = results;

      // Paginacion
      this.nextPage = info.next;
      this.prevPage = info.prev;
      this.currentPage = pageNumber;
    } catch (error) {
      console.error('Error al consultar api:', error);
    }
  }

  handleAddFavorites(event) {
    const character = event.detail;
    favoritesStore.addFavorite(character);
    this.requestUpdate();
  }

  handleRemoveFavorite(event) {
    const character = event.detail;
    favoritesStore.removeFavorite(character);
    this.requestUpdate();
  }

  openModalFavorites() {
    if (!this.opened) {
      this.opened = true;
    } else {
      this.opened = false;
    }
  }

  _prevPage() {
    if (this.prevPage) {
      const prevPageNumber = this.currentPage - 1;
      this.getCharactersData(prevPageNumber);
    }
  }

  _nextPage() {
    if (this.nextPage) {
      const nextPageNumber = this.currentPage + 1;
      this.getCharactersData(nextPageNumber);
    }
  }

  render() {
    return html`
      <h1>Rick and Morty page</h1>
      ${favoritesStore.favorites.length > 0
        ? html `<p>Agregados a favoritos:</span><span>${favoritesStore.favorites.length}</p>`
        : nothing
      }
      <button class='button' @click=${this.openModalFavorites} >Mostrar favoritos</button>
      <button class=${!this.prevPage ? 'button-disabled' : 'button'}  @click=${this._prevPage} ?disabled=${!this.prevPage}>Anterior</button>
      <button class=${!this.nextPage ? 'button-disabled' : 'button'}  @click=${this._nextPage} ?disabled=${!this.nextPage}>Siguiente</button>


      <div class='cards-container'>
        ${this.characters
        ? this.characters.map((character) => html`
          <character-card .character=${character} 
                          .isFavorite=${favoritesStore.isFavorite(character)}
                          @add-favorite=${this.handleAddFavorites}
                          @remove-favorite=${this.handleRemoveFavorite}
                          ></character-card>`)
        : nothing
      }
      </div>

      ${this.opened
        ? html`<favorite-characters .favoriteCharacters=${favoritesStore.favorites} 
                                    @handle-close-modal=${this.openModalFavorites} 
                                    opened=${this.opened}
                ></favorite-characters>`
        : nothing
      }
    `
  }
}

customElements.define("home-page", HomePage)