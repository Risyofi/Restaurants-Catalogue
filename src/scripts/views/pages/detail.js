import UrlParser from '../../routes/url-parser'
import RestaurantSource from '../../data/restaurant-source'
import { createRestaurantDetailTemplate } from '../templates/template-creator'
import LikeButtonPresenter from '../../utils/like-button-presenter'
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'

const Detail = {
  async render () {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const restaurant = await RestaurantSource.detailRestaurant(url.id)
    const restaurantContainer = document.querySelector('#restaurant')
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant)

    const reviewForm = document.querySelector('#reviewForm')
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault()
      const name = document.querySelector('#reviewName').value
      const review = document.querySelector('#reviewText').value

      await RestaurantSource.addReview({ id: url.id, name, review })

      const updatedRestaurant = await RestaurantSource.detailRestaurant(url.id)
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(updatedRestaurant)
    })

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating
      }
    })
  }
}

export default Detail
