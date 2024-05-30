class NoRestaurantsMessage extends HTMLElement {
  connectedCallback () {
    this.innerHTML = `
      <div class="no-restaurants">No restaurants found.</div>
    `
  }
}

customElements.define('no-restaurants-message', NoRestaurantsMessage)
