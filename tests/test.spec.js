const { test, expect } = require('@playwright/test');
const { stat } = require('fs');

function generateUsername() {
  const date = new Date();
  const timestamp = date.getTime();
  const randomNum = Math.floor(Math.random() * 1000); 
  return `user_${timestamp}_${randomNum}`;
}


function cleanAddressEntry(entry) {
  return entry.replace(/\s+/g, ' ').trim().replace(/, 0000$/, '');
}



//testdata
const username = generateUsername();
const email = username+"@test.com";
const password = "test1234";
const firstName = "first_name";
const lastName = "last_name";
const company = "company";
const address = "address";
const address2 = "address2";
const country = "Singapore";
const state = "state";
const city = "city";
const zipcode = "0000";
const mobileNumber = "9999";


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
await page.locator("[type='password']").fill(password);
await page.locator("[data-qa='days']").selectOption({ value: "1" });
await page.locator("[data-qa='months']").selectOption({ value: "1" });
await page.locator("[data-qa='years']").selectOption({ value: "2000" });
await page.locator("[data-qa='first_name']").fill(firstName);
await page.locator("[data-qa='last_name']").fill(lastName);
await page.locator("[data-qa='company']").fill(company);
await page.locator("[data-qa='address']").fill(address);
await page.locator("[data-qa='address2']").fill(address2);
await page.locator("[data-qa='country']").selectOption({ value: country });
await page.locator("[data-qa='state']").fill(state);
await page.locator("[data-qa='city']").fill(city);
await page.locator("[data-qa='zipcode']").fill(zipcode);
await page.locator("[data-qa='mobile_number']").fill(mobileNumber);
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

for (let i = 0; i < countProducts; i++) {
  const productNameElements = await allProducts.nth(i).locator("div p").nth(1).allTextContents();
  
  for (const name of productNameElements) {
    for (const productName of productNames) {
      if (name.trim() === productName) {
        productAddToCart.push(name.trim());
        await allProducts.nth(i).locator("div a").nth(0).click();
        
        if (productAddToCart.length < productNames.length) {
          const modal = page.locator("[class='btn btn-success close-modal btn-block']");
          await modal.waitFor({ state: 'attached' });
          await modal.waitFor({ state: 'visible' });
          await modal.click();
          console.log("clicked");

// 9. Click 'Cart' button
        } else {
          const modal = page.locator("p a");
          await modal.waitFor({ state: 'attached' });
          await modal.waitFor({ state: 'visible' });
          await modal.click();
          console.log("last product clicked");
        }
        break;
      }
    }
  }
}

console.log(productAddToCart);

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
//option1
// const alert = await page.getByText('Your order has been placed successfully!');
// const alertText = await alert.textContent();
// console.log(alertText);

//option2
const text = await page.locator("[class='alert-success alert']").nth(0).textContent();
console.log(text);

//option3
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
const allProducts = page.locator("[class='single-products']");
const countProducts = await allProducts.count();
let productAddToCart = [];
let productInResult = []

// 8. Add those products to cart
for (let i = 0; i < countProducts; i++) {
    const productNameElements = await allProducts.nth(i).locator("div p").nth(1).allTextContents();
    
    for (const name of productNameElements) {
      productInResult.push(name.trim());
        if (name.trim().includes("Sleeveless")) {
            productAddToCart.push(name.trim());
            await allProducts.nth(i).locator("div a").nth(0).click();
            //
            if (productAddToCart.length < productNames.length) {
              const modal = page.locator("[class='btn btn-success close-modal btn-block']");
              await modal.waitFor({ state: 'attached' });
              await modal.waitFor({ state: 'visible' });
              await modal.click();
              console.log("clicked");
            } else {
// 9. Click 'Cart' button and verify that products are visible in cart
              const modal = page.locator("p a");
              await modal.waitFor({ state: 'attached' });
              await modal.waitFor({ state: 'visible' });
              await modal.click();
              console.log("last product clicked");
            }
            break;
          }
        }
      }
expect(productInResult).toEqual(productNames); 

  

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
expect(productInCart).toEqual(productAddToCart);


// Additional step : Delete all products from cart for fresh new test

const deleteButton = page.locator("[class='cart_quantity_delete']");
const counter = await deleteButton.count();
for(let i=0; i<counter; i++){
  await deleteButton.nth(i).click();
}

});



test('Test Case 23: Verify address details in checkout page', async ({ page }) => {
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
await page.locator("[type='password']").fill(password);
await page.locator("[data-qa='days']").selectOption({ value: "1" });
await page.locator("[data-qa='months']").selectOption({ value: "1" });
await page.locator("[data-qa='years']").selectOption({ value: "2000" });
await page.locator("[data-qa='first_name']").fill(firstName);
await page.locator("[data-qa='last_name']").fill(lastName);
await page.locator("[data-qa='company']").fill(company);
await page.locator("[data-qa='address']").fill(address);
await page.locator("[data-qa='address2']").fill(address2);
await page.locator("[data-qa='country']").selectOption({ value: country });
await page.locator("[data-qa='state']").fill(state);
await page.locator("[data-qa='city']").fill(city);
await page.locator("[data-qa='zipcode']").fill(zipcode);
await page.locator("[data-qa='mobile_number']").fill(mobileNumber);
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

for (let i = 0; i < countProducts; i++) {
  const productNameElements = await allProducts.nth(i).locator("div p").nth(1).allTextContents();
  
  for (const name of productNameElements) {
    for (const productName of productNames) {
      if (name.trim() === productName) {
        productAddToCart.push(name.trim());
        await allProducts.nth(i).locator("div a").nth(0).click();
        
        if (productAddToCart.length < productNames.length) {
          const modal = page.locator("[class='btn btn-success close-modal btn-block']");
          await modal.waitFor({ state: 'attached' });
          await modal.waitFor({ state: 'visible' });
          await modal.click();
          console.log("clicked");

// 9. Click 'Cart' button
        } else {
          const modal = page.locator("p a");
          await modal.waitFor({ state: 'attached' });
          await modal.waitFor({ state: 'visible' });
          await modal.click();
          console.log("last product clicked");
        }
        break;
      }
    }
  }
}

console.log(productAddToCart);

// 10. Verify that cart page is displayed
const cartVisible =  page.locator("[class='active']");
expect(await cartVisible).toBeVisible();
expect(await cartVisible.textContent()).toEqual("Shopping Cart");

// 11. Click Proceed To Checkout
await page.locator("[class='btn btn-default check_out']").click();

// 12. Verify that the delivery address is same address filled at the time registration of account
const deliveryAddress = page.locator("[id='address_delivery']");
const deliveryElements = deliveryAddress.locator("li");
console.log(count);
let retrievedDeliveryAddress = [];
for(let i=0; i<count; i++){
  const addressDetail = await deliveryElements.nth(i).textContent();
  retrievedDeliveryAddress.push(addressDetail.trim());
}
//cleaning the data
retrievedDeliveryAddress = retrievedDeliveryAddress.filter(entry => 
    entry !== 'Your delivery address' && !entry.startsWith('Mr.')
  );


retrievedDeliveryAddress = retrievedDeliveryAddress.map((entry, index) => {
  if (index === 3) { 
    return cleanAddressEntry(entry);
  }
    return entry;
  });


const expectedDeliveryAddress = [
  company,
  address,
  address2,
  `${city} ${state} ${zipcode}`,
  country,
  mobileNumber
];

// console.log(retrievedDeliveryAddress);
// console.log(expectedDeliveryAddress);
expect(expectedDeliveryAddress).toEqual(retrievedDeliveryAddress);



// 13. Verify that the billing address is same address filled at the time registration of account
const billingAddress = page.locator("[id='address_invoice']");
const billingAddressElements = billingAddress.locator("li");
const counter = 8;
let retrievedBillingAddress = [];
for(let i=0; i<counter; i++){
  const addressDetail = await billingAddressElements.nth(i).textContent();
  retrievedBillingAddress.push(addressDetail.trim());
}
//cleaning the data
retrievedBillingAddress = retrievedBillingAddress.filter(entry => 
    entry !== 'Your billing address' && !entry.startsWith('Mr.')
  );


retrievedBillingAddress = retrievedBillingAddress.map((entry, index) => {
  if (index === 3) { 
    return cleanAddressEntry(entry);
  }
    return entry;
  });


const expectedBillingAddress = [
  company,
  address,
  address2,
  `${city} ${state} ${zipcode}`,
  country,
  mobileNumber
];

// console.log(retrievedBillingAddress);
// console.log(expectedBillingAddress);
expect(expectedBillingAddress).toEqual(retrievedBillingAddress);

// 14. Click 'Delete Account' button
await page.locator("[href='/delete_account']").click();

// 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
const accountDeleted = page.getByRole('heading', { name: 'Account Deleted!' });
await expect(accountDeleted).toBeVisible();
const deletedMessage = await accountDeleted.textContent();
expect(deletedMessage).toEqual("Account Deleted!");
console.log(deletedMessage);
await page.locator("[data-qa='continue-button']").click();
});
