Feature('Customer Reviews')

Before(({ I }) => {
  I.amOnPage('/')
})

Scenario('adding a customer review to a restaurant', async ({ I }) => {
  I.seeElement('.restaurant__name a')
  const restaurantIndex = 3
  const restaurantSelector = locate('.restaurant__name a').at(restaurantIndex)
  I.click(restaurantSelector)

  I.seeElement('#reviewForm')

  const reviewName = 'test'
  const reviewText = 'Nice Food'

  I.clearField('#reviewName')
  I.clearField('#reviewText')

  I.fillField('#reviewName', reviewName)
  I.fillField('#reviewText', reviewText)

  I.forceClick('.submit-review-button')

  I.waitForVisible('.restaurant__reviews')
})
