const { test, expect } = require('@playwright/test');
const { stat } = require('fs');
const testData = require('../testData');
const { HomePage } = require('../pages/homePage');
const { RegisterPage } = require('../pages/registerPage');
const { ProductPage } = require('../pages/productPage');
const { PaymentPage } = require('../pages/paymentPage');
const { CheckoutPage } = require('../pages/checkoutPage');




test('Test Case 15: Place Order: Register before Checkout', async ({ page }) => {

// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
const homepage = new HomePage(page);
const register = new RegisterPage(page);
const payment = new PaymentPage(page);

await homepage.navigateTo(testData.environment.sourceURL);
// 3. Verify that home page is visible successfully
await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();

// 4. Click 'Signup / Login' button
await homepage.navigateToPage('login');

// 5. Fill all details in Signup and create account
await homepage.proceedRegisternewUser();
await register.registernewUser(testData.registrationData);

// 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
const registerCompletedMessage = await register.completedRegister();
console.log(registerCompletedMessage); //print account created message
await register.completedContinue();

// 7. Verify ' Logged in as username' at top
await homepage.verifyLoggedinUser();

// 8. Add products to cart
// 9. Click 'Cart' button
const addProduct = await homepage.addProductToCart(testData.productData.randomProductData);
console.log(addProduct); //print product added to cart


// 10. Verify that cart page is displayed
const cartVisible =  page.locator("[class='active']");
expect(cartVisible).toBeVisible();
expect(await cartVisible.textContent()).toEqual("Shopping Cart");

// 11. Click Proceed To Checkout
await page.locator("[class='btn btn-default check_out']").click();

// 12. Verify Address Details and Review Your Order
// 13. Enter description in comment text area and click 'Place Order'
await page.locator("[name='message']").fill("message");
await page.locator("[class='btn btn-default check_out']").click();

// 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
// 15. Click 'Pay and Confirm Order' button
await payment.enterPayment(testData.cardData);


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
// 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
const deleteAccount = await homepage.deleteAccount();
console.log(deleteAccount);
});


test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {

// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
const homepage = new HomePage(page);
const register = new RegisterPage(page);
const product = new ProductPage(page);

await homepage.navigateTo(testData.environment.sourceURL);
// 3. Click on 'Products' button
await homepage.navigateToPage('product');

// 4. Verify user is navigated to ALL PRODUCTS page successfully
await product.navigateSuccess();
// 5. Enter product name in search input and click search button
await product.searchProduct(testData.productData);

// 6. Verify 'SEARCHED PRODUCTS' is visible
await product.verifyAfterSearch();

// 7. Verify all the products related to search are visible
// 8. Add those products to cart
// 9. Click 'Cart' button and verify that products are visible in cart
const searchProductData = testData.productData.searchProductData;
const { productAddToCart, productInResult } = await product.addSearchedProducttoCart(searchProductData);
console.log(productInResult);
console.log(productAddToCart);

expect(productInResult).toEqual(searchProductData);
expect(productAddToCart).toEqual(searchProductData);

// 10. Click 'Signup / Login' button and submit login details
const signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
await signupLoginLink.click();
await page.locator("[data-qa='login-email']").fill(testData.loginData.existingUsername);
await page.locator("[data-qa='login-password']").fill(testData.loginData.existingPassword);
await page.locator("[data-qa='login-button']").click();

// 11. Again, go to Cart page
await homepage.navigateToPage('cart');

// 12. Verify that those products are visible in cart after login as well
const allCartProducts = page.locator("[class='cart_description']");
const count = await allCartProducts.count();
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
const homepage = new HomePage(page);
const register = new RegisterPage(page);
const checkout = new CheckoutPage(page);

await homepage.navigateTo(testData.environment.sourceURL);
// 3. Verify that home page is visible successfully
await expect(page.getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();

// 4. Click 'Signup / Login' button
await homepage.navigateToPage('login');

// 5. Fill all details in Signup and create account
await homepage.proceedRegisternewUser();
await register.registernewUser(testData.registrationData);

// 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
const registerCompletedMessage = await register.completedRegister();
console.log(registerCompletedMessage); //print account created message
await register.completedContinue();

// 7. Verify ' Logged in as username' at top
await homepage.verifyLoggedinUser();

// 8. Add products to cart
// 9. Click 'Cart' button
const addProduct = await homepage.addProductToCart(testData.productData.randomProductData);
console.log(addProduct); //print product added to cart


// 10. Verify that cart page is displayed
const cartVisible =  page.locator("[class='active']");
expect(await cartVisible).toBeVisible();
expect(await cartVisible.textContent()).toEqual("Shopping Cart");

// 11. Click Proceed To Checkout
await page.locator("[class='btn btn-default check_out']").click();

// 12. Verify that the delivery address is same address filled at the time registration of account
await checkout.verifyAddress('delivery', testData.registrationData)


// 13. Verify that the billing address is same address filled at the time registration of account
await checkout.verifyAddress('billing', testData.registrationData)

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
