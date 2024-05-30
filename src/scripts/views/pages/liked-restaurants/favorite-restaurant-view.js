import { createRestaurantItemTemplate } from '../../templates/template-creator'

class FavoriteRestaurantView {
  getTemplate () {
    return `
      <div class="app-main__content">
        <div class="search-container">
            <input id="query" type="text" placeholder="Search for restaurants...">
            <button type="submit" class="search-button" aria-label="Search">
              <img src="/fontawesome/search.svg" alt="Search Icon">
            </button>
        </div>
        <h2 class="content__heading lazyload">Your Liked Restaurants</h2>
        <div id="restaurants" class="restaurant-list">
        </div>
      </div>

    `
  }

  runWhenUserIsSearching (callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showFavoriteRestaurants (restaurants) {
    let html
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '')
    } else {
      html = this._getEmptyRestaurantTemplate()
    }

    document.getElementById('restaurants').innerHTML = html

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'))
  }

  _getEmptyRestaurantTemplate () {
    return `
      <div class="no-restaurants-container">
        Tidak ada restoran untuk ditampilkan
      </div>
    `
  }
}

export default FavoriteRestaurantView
