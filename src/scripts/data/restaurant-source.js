import API_ENDPOINT from '../globals/api-endpoint'

class RestaurantSource {
  static async listRestaurants () {
    const response = await fetch(API_ENDPOINT.LIST)
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async detailRestaurant (id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id))
      const responseJson = await response.json()
      return responseJson.restaurant
    } catch (error) {
      console.error('Error fetching restaurant detail:', error)
      const errorElement = document.getElementById('error-message')
      errorElement.innerText = 'Failed to fetch restaurant detail. Please try again later.'
      throw error
    }
  }

  static async searchRestaurant (query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query))
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async addReview ({ id, name, review }) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        name,
        review
      })
    })
    return response.json()
  }
}

export default RestaurantSource
