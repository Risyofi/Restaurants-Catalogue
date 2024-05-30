class ErrorMessage extends HTMLElement {
  connectedCallback () {
    this.message = this.getAttribute('message') || 'An error occurred'
    this.render()
  }

  render () {
    this.innerHTML = `
      <div class="error-message">${this.message}</div>
    `
  }
}

customElements.define('error-message', ErrorMessage)
