const { test, expect } = require('@playwright/test');

function generateUsername() {
  const date = new Date();
  const timestamp = date.getTime(); // Get the current timestamp
  const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
  return `user_${timestamp}_${randomNum}`;
}

const username = generateUsername();
const email = username+"@test.com";

test.only('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {

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
  await page.goto("https://automationexercise.com/");
  // await page.locator("[href='/login']").click();
  // await page.locator("[data-qa='login-email']").fill("test33@test.com");
  // await page.locator("[data-qa='login-password']").fill("test33");
  // await page.locator("[data-qa='login-button']").click();
  await page.locator("[href='/products']").click();
  const productNames = ["Sleeveless Dress", "Sleeveless Unicorn Patch Gown - Pink", "Sleeveless Unicorn Print Fit & Flare Net Dress - Multi"];
  await page.locator("[id='search_product']").fill("Sleeveless");
  await page.locator("[id='submit_search']").click();

  const allProducts = page.locator("[class='single-products']");
  const countProducts = await allProducts.count();
  let productAddToCart = [];
  let lastMatchingIndex = -1;


  
  for (let i = 0; i < countProducts; i++) {
    const productNameElements = await allProducts.nth(i).locator("div p").nth(1).allTextContents();
    
    for (const name of productNameElements) {
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
    
    // 9. Click 'Cart' button
    if (lastMatchingIndex !== -1) {
      await allProducts.nth(lastMatchingIndex).locator("div a").nth(0).click();
      const modal = page.locator("p a");
      await modal.waitFor({ state: 'attached' });
      await modal.waitFor({ state: 'visible' });
      await modal.click();
    }
    

console.log(productAddToCart);
await page.pause();


  // const allProducts = page.locator("[class='single-products']");
  // const countProducts = await allProducts.count();
  // // const allProductNames = page.locator("[class='productinfo text-center']");
  // let productAddToCart = [];
  // for(let i=0; i<countProducts; i++){
  //   let productName = await allProducts.nth(i).locator("div p").nth(0).textContent();
  //   productAddToCart.push(productName);
  //   }


// productAddToCart.push(productName);
    
  // const productNames = allProductNames.allTextContents();
  console.log(productAddToCart);
  console.log(productNames);
  expect(productAddToCart).toEqual(productNames);
 

  let arraysEqual = true;
  if (productNames.length !== productAddToCart.length) {
      arraysEqual = false;
  } else {
      for (let i = 0; i < productNames.length; i++) {
          if (productNames[i].trim() !== productAddToCart[i].trim()) {
              arraysEqual = false;
              break;
          }
      }
    }


  console.log(arraysEqual);
  if(arraysEqual = true){
    console.log("Product search match");
  }
  else{
    console.log("Product search not match");
  }


});


test('keyboard', async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  // await page.locator("[href='/login']").click();
  // await page.locator("[data-qa='login-email']").fill("test33@test.com");
  // await page.locator("[data-qa='login-password']").fill("test33");
  // await page.locator("[data-qa='login-button']").click();
  await page.locator("[href='/products']").click();
  const productNames = ["Sleeveless Dress", "Sleeveless Unicorn Patch Gown - Pink", "Sleeveless Unicorn Print Fit & Flare Net Dress - Multi"];
  await page.locator("[id='search_product']").fill("Fancy Green Top");
  await page.locator("[id='submit_search']").click();
  const product = await page.locator(".overlay-content p").textContent();
  console.log(product);

});


// test('keyboard', async ({ page }) => {
//   await page.goto(this.website);
//   await page.keyboard.press("s");
//   await page.pause();
//   await 

// });