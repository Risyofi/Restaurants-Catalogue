import CONFIG from '../../globals/config'

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__title">${restaurant.name}</h2>
  <img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="restaurant__info">
    <h3>Information</h3>
    <h4>Address</h4>
    <p>${restaurant.address}, ${restaurant.city}</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
    <h4>Categories</h4>
    <p>${restaurant.categories.map((category) => category.name).join(', ')}</p>
  </div>
  <div class="restaurant__overview">
    <h3>Overview</h3>
    <p>${restaurant.description}</p>
  </div>
  <div class="restaurant__menu">
    <h3>Menu</h3>
    <div class="menu-section">
      <div class="menu-section__food">
        <h4>Foods</h4>
        <ul>
          ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
        </ul>
      </div>
      <div class="menu-section__drink">
        <h4>Drinks</h4>
        <ul>
          ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  <div class="restaurant__reviews">
    <h3>Customer Reviews</h3>
    <div class="review-cards">
      ${restaurant.customerReviews.map((review) => `
        <div class="review">
          <div class="review__name">${review.name}</div>
          <div class="review__date">${review.date}</div>
          <div class="review__text">${review.review}</div>
        </div>
      `).join('')}
    </div>
  </div>
  <div class="restaurant__add-review">
    <h3>Add Your Review</h3>
    <form id="reviewForm">
      <div class="form-group">
        <label for="reviewName">Name</label>
        <input type="text" id="reviewName" name="name" required>
      </div>
      <div class="form-group">
        <label for="reviewText">Review</label>
        <textarea id="reviewText" name="review" required></textarea>
      </div>
      <button type="submit" class="submit-review-button">Submit</button>
    </form>
  </div>
`

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster lazyload" alt="${restaurant.name || '-'}"
          data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
      <div class="restaurant-item__header__address">
        ${restaurant.city || '-'}
      </div>
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating || '-'}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__name"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h3>
      <p>${restaurant.description || '-'}</p>
    </div>
  </div>
`

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like" aria-label="like">
    <img src="/fontawesome/heart-regular.svg" alt="like icon" class="icon">
  </button>

`

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like" aria-label="unlike">
    <img src="/fontawesome/heart-solid.svg" alt="unlike icon" class="icon">
  </button>
`

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate
}
