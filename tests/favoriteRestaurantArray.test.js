import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract'

let favoriteRestaurants = []

const FavoriteRestaurantArray = {
  getRestaurant (id) {
    if (!id) {
      return
    }

    // eslint-disable-next-line consistent-return, eqeqeq
    return favoriteRestaurants.find((restaurant) => restaurant.id == id)
  },

  getAllRestaurants () {
    return favoriteRestaurants
  },

  putRestaurant (restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return
    }

    // ensure the id does not already exist in the favoriteRestaurants list
    if (this.getRestaurant(restaurant.id)) {
      return
    }

    favoriteRestaurants.push(restaurant)
  },

  deleteRestaurant (id) {
    // remove the restaurant with the specified id by filtering the array
    // eslint-disable-next-line eqeqeq
    favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id != id)
  },

  async searchRestaurants (query) {
    return (await this.getAllRestaurants()).filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase()
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '')

      const loweredCaseQuery = query.toLowerCase()
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '')

      return jammedRestaurantName.indexOf(jammedQuery) !== -1
    })
  }
}

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurants = []
  })

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray)
})
