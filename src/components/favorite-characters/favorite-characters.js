import { LitElement, html, nothing } from "lit-element";
import styles from "./favorite-characters-styles";
import '../character-card/character-card';
import { favoritesStore } from '../favorites-store/favorites-store';

class FavoriteCharacters extends LitElement {
  static get styles() {
    return [styles]
  }

  static get properties() {
    return {
      favorites: { type: Array },
      opened: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.favorites = favoritesStore.favorites;
    this.opened = false;
    this._unsubscribe = favoritesStore.subscribe(favorites => {
      this.favorites = favorites;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    this._unsubscribe();
    super.disconnectedCallback();
  }

  handleRemoveFavorite(event) {
    const character = event.detail;
    favoritesStore.removeFavorite(character);
  }

  closeModal() {
    this.dispatchEvent(new CustomEvent('handle-close-modal', {
      detail: { opened: this.opened },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
          <div class="modal">
            <div class="modal-content">
              <span class="close" @click="${this.closeModal}">&times;</span>

              <div>
              ${this.favorites.length > 0
                ? html `<p>Agregados a favoritos:</span><span>${this.favorites.length}</p>`
                : nothing
              }
              </div>
              <div class="cards-container">
                ${this.favorites.length > 0
                    ? this.favorites.map((character) => html`
                                                            <character-card .character=${character} 
                                                                            .isFavorite=${true}
                                                                            @remove-favorite=${this.handleRemoveFavorite}
                                                            ></character-card>`)
                    : html`
                          <div>
                            <h4>No hay favoritos</h4>
                            <span>Agrega a tus personajes favoritos dando click en "Agregar favorito"</span>
                          </div>
                        `
                }
              </div>
            </div>
          </div>
        `;
  }
}

customElements.define("favorite-characters", FavoriteCharacters)