import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter'
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view'

describe('Showing all favorite restaurants', () => {
  let view

  const renderTemplate = () => {
    view = new FavoriteRestaurantView()
    document.body.innerHTML = view.getTemplate()
  }

  beforeEach(() => {
    renderTemplate()
  })

  describe('When no restaurants have been liked', () => {
    it('should render the information that no restaurants have been liked', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [])
      }

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })

      const restaurants = []
      presenter._displayRestaurants(restaurants)

      expect(document.querySelectorAll('.no-restaurants-container').length).toEqual(1)
    })

    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [])
      }

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1)
    })
  })

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2)

        done()
      })

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'Restaurant A',
            rating: 3,
            description: 'A restaurant A'
          },
          {
            id: 22,
            name: 'Restaurant B',
            rating: 4,
            description: 'A restaurant B'
          }
        ])
      }

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })
    })
  })
})
