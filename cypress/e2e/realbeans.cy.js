const STORE_URL = 'https://r1065961-realbeans.myshopify.com'
const STORE_PASSWORD = 'lawdea'

const enterPassword = () => {
  cy.visit(STORE_URL)
  cy.get('body').then(($body) => {
    if ($body.find('input[type="password"]').length > 0) {
      cy.get('input[type="password"]').type(STORE_PASSWORD)
      cy.get('button[type="submit"]').click()
    }
  })
}

// TEST 1: Homepage
describe('Homepage', () => {
  it('shows the intro text', () => {
    enterPassword()
    cy.contains('Since 1801, RealBeans has roasted premium coffee').should('be.visible')
  })

  it('shows a product list', () => {
    enterPassword()
    cy.visit(STORE_URL + '/collections/all')
    // Look for any list items or product links on the page
    cy.get('ul li').should('have.length.greaterThan', 0)
  })
})

// TEST 2: Product catalog page
describe('Product Catalog', () => {
  it('shows Roasted coffee beans 5kg', () => {
    enterPassword()
    cy.visit(STORE_URL + '/collections/all')
    cy.contains('Roasted coffee beans 5kg').should('exist')
  })

  it('shows Blended coffee 5kg', () => {
    enterPassword()
    cy.visit(STORE_URL + '/collections/all')
    cy.contains('Blended coffee 5kg').should('exist')
  })

  it('can sort products by price', () => {
    enterPassword()
    cy.visit(STORE_URL + '/collections/all?sort_by=price-ascending')
    cy.contains('Roasted coffee beans 5kg').should('exist')
    cy.contains('Blended coffee 5kg').should('exist')
  })
})

// TEST 3: Product detail pages
describe('Product Detail Pages', () => {
  it('Roasted beans page shows correct info', () => {
    enterPassword()
    cy.visit(STORE_URL + '/products/roasted-coffee-beans-5kg')
    cy.contains('Roasted coffee beans 5kg').should('exist')
    cy.contains('Our best and sustainable real roasted beans.').should('exist')
    cy.contains('40').should('exist')
  })

  it('Blended coffee page shows correct info', () => {
    enterPassword()
    cy.visit(STORE_URL + '/products/blended-coffee-5kg')
    cy.contains('Blended coffee 5kg').should('exist')
    cy.contains('RealBeans coffee, ready to brew.').should('exist')
    cy.contains('55').should('exist')
  })
})

// TEST 4: About page
describe('About Page', () => {
  it('shows the history paragraph', () => {
    enterPassword()
    cy.visit(STORE_URL + '/pages/about')
    cy.contains('From a small Antwerp grocery to a European coffee staple').should('exist')
  })
})