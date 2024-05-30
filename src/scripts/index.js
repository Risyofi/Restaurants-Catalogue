import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

import 'regenerator-runtime'
import '../styles/main.scss'
import App from './views/app'
import swRegister from './utils/sw-register'
import Footer from './views/components/footer'

import('../animasi/animations')

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#maincontent')
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', async () => {
  await app.renderPage()
  swRegister()
})

const footerContainer = document.getElementById('footer')
footerContainer.innerHTML = Footer()
