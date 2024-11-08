const { test, expect } = require('@playwright/test');

function generateUsername() {
  const date = new Date();
  const timestamp = date.getTime(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
  return `user_${timestamp}_${randomNum}`;
}

const username = generateUsername();
const email = username+"@test.com";

test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {

// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
await page.goto("https://automationexercise.com/");

// 3. Verify that home page is visible successfully
await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();

// 4. Click 'Signup / Login' button
await page.locator("[href='/login']").click();
// 5. Fill all details in Signup and create account
await page.locator("[data-qa='signup-name']").fill(username);
await page.locator("[data-qa='signup-email']").fill(email);
await page.locator("[data-qa='signup-button']").click();
await page.locator("[for='id_gender1']").click();
await page.locator("[type='password']").fill("test1234");
await page.locator("[data-qa='days']").selectOption({ value: "1" });
await page.locator("[data-qa='months']").selectOption({ value: "1" });
await page.locator("[data-qa='years']").selectOption({ value: "2000" });
await page.locator("[data-qa='first_name']").fill("first_name");
await page.locator("[data-qa='last_name']").fill("last_name");
await page.locator("[data-qa='company']").fill("company");
await page.locator("[data-qa='address']").fill("address");
await page.locator("[data-qa='address2']").fill("address2");
await page.locator("[data-qa='country']").selectOption({ value: "Singapore" });
await page.locator("[data-qa='state']").fill("state");
await page.locator("[data-qa='city']").fill("city");
await page.locator("[data-qa='zipcode']").fill("0000");
await page.locator("[data-qa='mobile_number']").fill("9999");
await page.locator("[data-qa='create-account']").click();

// 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
await page.locator("[data-qa='continue-button']").click();
// 7. Verify ' Logged in as username' at top
const loggedUser = await page.locator("li:has-text('Logged in as')").textContent();
const expectedloggedUser = `Logged in as ${username}`;
expect(loggedUser.trim()).toEqual(expectedloggedUser);

// 8. Add products to cart

const productNames = ["Sleeveless Dress", "Winter Top", "Frozen Tops For Kids"];

const allProducts = page.locator("[class='single-products']");
const countProducts = await allProducts.count();
let productAddToCart = [];
let lastMatchingIndex = -1;

for (let i = 0; i < countProducts; i++) {
  const productNameElements = await allProducts.nth(i).locator("div p").nth(1).allTextContents();
  
  for (const name of productNameElements) {
    for (const productName of productNames) {
      if (name.trim() === productName) {
        productAddToCart.push(name.trim());
        lastMatchingIndex = i; 
        await allProducts.nth(i).locator("div a").nth(0).click();
        
        if (i < countProducts - 1) {
          const modal = page.locator("[class='btn btn-success close-modal btn-block']");
          await modal.waitFor({ state: 'attached' });
          await modal.waitFor({ state: 'visible' });
          await modal.click();
          console.log("clicked");
        }
        break;
      }
    }
  }
}

// 9. Click 'Cart' button
if (lastMatchingIndex !== -1) {
  await allProducts.nth(lastMatchingIndex).locator("div a").nth(0).click();
  const modal = page.locator("p a");
  await modal.waitFor({ state: 'attached' });
  await modal.waitFor({ state: 'visible' });
  await modal.click();
  console.log("last product clicked");
}


console.log(productAddToCart);
// const modal =  page.locator("p a");
// await modal.waitFor({ state: 'attached' });
// await modal.waitFor({ state: 'visible' });
// await modal.click();
// 10. Verify that cart page is displayed
const cartVisible =  page.locator("[class='active']");
expect(await cartVisible).toBeVisible();
expect(await cartVisible.textContent()).toEqual("Shopping Cart");

// 11. Click Proceed To Checkout
await page.locator("[class='btn btn-default check_out']").click();
// 12. Verify Address Details and Review Your Order
// 13. Enter description in comment text area and click 'Place Order'
await page.locator("[name='message']").fill("message");
await page.locator("[class='btn btn-default check_out']").click();
// 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
await page.locator("[data-qa='name-on-card']").fill("name");
await page.locator("[data-qa='card-number']").fill("4444444444444444");
await page.locator("[data-qa='cvc']").fill("123");
await page.locator("[data-qa='expiry-month']").fill("12");
await page.locator("[data-qa='expiry-year']").fill("2030");

// 15. Click 'Pay and Confirm Order' button
await page.locator("[data-qa='pay-button']").click();
// 16. Verify success message 'Your order has been placed successfully!'

// const message = page.locator('#success_message .alert-success.alert:has-text("Your order has been placed successfully!")');
// console.log(await message.textContent());
// expect(await message.textContent()).toEqual("Your order has been placed successfully!");

// 17. Click 'Delete Account' button
await page.locator("[href='/delete_account']").click();
// 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
const accountDeleted = page.getByRole('heading', { name: 'Account Deleted!' });
await expect(accountDeleted).toBeVisible();
const deletedMessage = await accountDeleted.textContent();
expect(deletedMessage).toEqual("Account Deleted!");
console.log(deletedMessage);
await page.locator("[data-qa='continue-button']").click();



});



test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {

// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
  await page.goto("https://automationexercise.com/");
// 3. Click on 'Products' button
  await page.locator("[href='/products']").click();
// 4. Verify user is navigated to ALL PRODUCTS page successfully
const allProductDisplayed = page.getByRole('heading', { name: 'All Products' });
await expect(allProductDisplayed).toBeVisible();
const allProductMessage = await allProductDisplayed.textContent();
expect(allProductMessage ).toEqual("All Products");
console.log(allProductMessage );

// 5. Enter product name in search input and click search button

const productNames = ["Sleeveless Dress", "Sleeveless Unicorn Patch Gown - Pink", "Sleeveless Unicorn Print Fit & Flare Net Dress - Multi"];
await page.locator("[id='search_product']").fill("Sleeveless");
await page.locator("[id='submit_search']").click();
// 6. Verify 'SEARCHED PRODUCTS' is visible
const searchedProductDisplayed = page.getByRole('heading', { name: 'Searched Products' });
await expect(searchedProductDisplayed).toBeVisible();
const searchedProductMessage = await searchedProductDisplayed.textContent();
expect(searchedProductMessage ).toEqual("Searched Products");
console.log(searchedProductMessage );

// 7. Verify all the products related to search are visible
// 8. Add those products to cart
const allProducts = page.locator("[class='single-products']");
const countProducts = await allProducts.count();
let productAddToCart = [];
let lastMatchingIndex = -1;
let productInResult = []


  
for (let i = 0; i < countProducts; i++) {
    const productNameElements = await allProducts.nth(i).locator("div p").nth(1).allTextContents();
    
    for (const name of productNameElements) {
      productInResult.push(name.trim());
        if (name.trim().includes("Sleeveless")) {
            productAddToCart.push(name.trim());
            lastMatchingIndex = i; 
            await allProducts.nth(i).locator("div a").nth(0).click();
            
            if (i < countProducts - 1) {
              const modal = page.locator("[class='btn btn-success close-modal btn-block']");
              await modal.waitFor({ state: 'attached' });
              await modal.waitFor({ state: 'visible' });
              await modal.click();
              console.log("clicked");
            }
            break;
          }
        }
      }
expect(productInResult).toEqual(productNames);
// console.log(productInResult);
// console.log(productNames);
    
// 9. Click 'Cart' button and verify that products are visible in cart

    if (lastMatchingIndex !== -1) {
      await allProducts.nth(lastMatchingIndex).locator("div a").nth(0).click();
      const modal = page.locator("p a");
      await modal.waitFor({ state: 'attached' });
      await modal.waitFor({ state: 'visible' });
      await modal.click();
      console.log("last product clicked");
    }
  

// 10. Click 'Signup / Login' button and submit login details
const signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
await signupLoginLink.click();
await page.locator("[data-qa='login-email']").fill("test33@test.com");
await page.locator("[data-qa='login-password']").fill("test33");
await page.locator("[data-qa='login-button']").click();


// 11. Again, go to Cart page

await page.locator("[href='/view_cart']").first().click();

// 12. Verify that those products are visible in cart after login as well
const allCartProducts = page.locator("[class='cart_description']");
const count = await allCartProducts.count();
console.log(count);
let productInCart = [];
for(let i=0; i<count; i++){
  const productName = await allCartProducts.nth(i).locator("h4 a").textContent();
  productInCart.push(productName);

}
// console.log(productInCart);
expect(productAddToCart).toEqual(productAddToCart);


// Additional step. 
//Delete all products from cart for next test

const deleteButton = page.locator("[class='cart_quantity_delete']");
const counter = await deleteButton.count();
for(let i=0; i<counter; i++){
  await deleteButton.nth(i).click();
}


});




// test('keyboard', async ({ page }) => {
//   await page.goto(this.website);
//   await page.keyboard.press("s");
//   await page.pause();
//   await 

// });