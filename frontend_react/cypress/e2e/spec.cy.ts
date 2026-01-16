describe('home page spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('check login', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="email"]').type('admin@example.com')
    cy.get('input[name="password"]').type('1234')
    cy.get('button[name="submit"]').click()
  })
})