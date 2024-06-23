import { LitElement, html, css } from "lit-element";
import styles from "./character-card-styles";
import { favoritesStore } from "../favorites-store/favorites-store";

class CharacterCard extends LitElement {

    static get styles() {
        return [styles];
    }

    static get properties() {
        return {
            character: { type: Object },
            isFavorite: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.isFavorite = false;
    }

    updated(changedProperties) {
        if (changedProperties.has('character')) {
          this.isFavorite = favoritesStore.isFavorite(this.character);
        }
      }

    addFavoriteCharacter() {
        this.dispatchEvent(new CustomEvent('add-favorite', {
            detail: this.character,
            bubbles: true,
            composed: true
        }));
    }

    removeFavoriteCharacter() {
        this.dispatchEvent(new CustomEvent('remove-favorite', {
            detail: this.character,
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
        <div class='card'>
            <div class='card-content-disposition'>
                <div class='card-image'>
                    <img src=${this.character.image} alt="Imagen del personaje">
                </div>
                <div class='card-content'>
                    <div class='card-description-container-name'>
                        <span class="card-name">${this.character.name}</span>
                    </div>
                    <div class='card-description-container'>
                        <span class="card-title">Especie: </span>
                        <span class="card-description">${this.character.species}</span>
                    </div>
                    <div class='card-description-container'>
                        <span class="card-title">Género: </span>
                        <span class="card-description">${this.character.gender}</span>
                    </div>
                    <div class='card-button'>
                        ${this.isFavorite
                            ? html`<button class='button-remove' @click=${this.removeFavoriteCharacter}>Quitar de favoritos</button>`
                            : html`<button class='button' @click=${this.addFavoriteCharacter}>Agregar a favoritos</button>`
                        }
                    </div>
                </div>
             </div>
        </div>
    `;
    }
}

customElements.define("character-card", CharacterCard);
