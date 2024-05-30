import RestaurantSource from '../../data/restaurant-source'
import { createRestaurantItemTemplate } from '../templates/template-creator'
import '../components/loading'
import '../components/error-message'
import '../components/no-found-message'

const Home = {
  async render () {
    return `
      <section class="app-main__hero" loading="lazy">
        <p class="app-main__hero__content">Welcome to Culinary Adventure!</p>
      </section>
      <section class="app-main__content">
        <h2 class="content__heading">Discover Amazing Restaurants</h2>
        <loading-indicator></loading-indicator>
        <div id="restaurants" class="restaurant-list"></div>
        <div id="error-container"></div>
        <div id="no-restaurants-container"></div>
      </section>
    `
  },

  async afterRender () {
    const loadingElement = document.querySelector('loading-indicator')
    const restaurantsContainer = document.querySelector('#restaurants')
    const errorContainer = document.querySelector('#error-container')
    const noRestaurantsContainer = document.querySelector('#no-restaurants-container')

    try {
      const restaurants = await RestaurantSource.listRestaurants()
      if (restaurants.length === 0) {
        noRestaurantsContainer.innerHTML = '<no-restaurants-message></no-restaurants-message>'
      } else {
        restaurantsContainer.innerHTML = ''
        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant)
        })
      }
    } catch (error) {
      errorContainer.innerHTML = '<error-message message="Failed to load restaurants. Please try again later."></error-message>'
    } finally {
      loadingElement.style.display = 'none'
    }
  }
}

export default Home
