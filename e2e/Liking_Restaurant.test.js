const assert = require('assert')

Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/like')
})

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query')
  I.see('Tidak ada restoran untuk ditampilkan', '.no-restaurants-container')
})

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.no-restaurants-container')

  I.amOnPage('/')

  I.seeElement('.restaurant__name a')
  const firstRestaurant = locate('.restaurant__name a').first()
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant)
  I.click(firstRestaurant)

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/like')
  I.seeElement('.restaurant-item')
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name')

  assert.strictEqual(firstRestaurantName, likedRestaurantName)
})

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.no-restaurants-container')

  I.amOnPage('/')

  I.seeElement('.restaurant__name a')
  const firstRestaurant = locate('.restaurant__name a').first()
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant)
  I.click(firstRestaurant)

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/like')
  I.seeElement('.restaurant-item')
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name')

  assert.strictEqual(firstRestaurantName, likedRestaurantName)

  I.click('.restaurant__name a')

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/like')
  I.dontSeeElement('.restaurant-item')
})

Scenario('searching liked restaurants', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.no-restaurants-container')

  I.amOnPage('/')

  I.seeElement('.restaurant__name a')

  const names = []

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name a').at(i))

    I.seeElement('#likeButton')
    I.click('#likeButton')

    names.push(await I.grabTextFrom('.restaurant__title'))

    I.amOnPage('/')
  }

  I.amOnPage('/#/like')
  I.seeElement('#query')

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item')
  assert.strictEqual(names.length, visibleLikedRestaurants)

  const searchQuery = names[1].substring(1, 3)

  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  const visibleSearchedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item')
  const visibleRestaurantNames = await I.grabTextFromAll('.restaurant__title')
  const matchingNames = names.filter(name => name.includes(searchQuery))
  assert.strictEqual(visibleSearchedRestaurants, matchingNames.length)
  visibleRestaurantNames.forEach(name => {
    assert(name.includes(searchQuery))
  })
})
