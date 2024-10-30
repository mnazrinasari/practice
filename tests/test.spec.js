const { test, expect } = require('@playwright/test');

test('login', async ({ page  }) => {
  const website = "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login";
  await page.goto(website);
  const customerLogin = page.locator("[ng-click='customer()']");
  await customerLogin.click()
  const nameOption = page.locator("[name='userSelect']");
  const userSelect = "Harry Potter"
  await nameOption.selectOption(userSelect);
  await page.locator("[type='submit']").click();
  const welcomeText = await page.locator("[class='fontBig ng-binding']").textContent()
  expect(welcomeText).toEqual(userSelect);

  //check account number selected 
  const accountNumberSelected = Number(await page.locator("[selected='selected']").textContent());
  const accountNumber = Number(await page.locator("[class='ng-binding']").nth(0).textContent());
  expect(accountNumberSelected).toEqual(accountNumber);
 

  ///Check current account balance
  const accountInfo = page.locator("[ng-hide='noAccount']");
  const count = await accountInfo.count();
  let amountDeposited = 0;
  for(let i=0; i<count; i++){
    const accountBalance = await accountInfo.nth(i).textContent();
    if(accountBalance.trim().includes("Balance")){
      const amountDeposit = await page.locator("[class='ng-binding']").nth(i).textContent();
      amountDeposited += Number(amountDeposit);
    }
  }
  console.log(amountDeposited);
  const originalAmountDeposited = amountDeposited;
///

await page.locator("[ng-click='deposit()']").click();
const depositAmount = "100";

await page.locator("[ng-model='amount']").fill(depositAmount);
await page.locator("[type='submit']").click();

const depositSucess = await page.locator("[ng-show='message']").textContent();
expect(depositSucess).toBe("Deposit Successful");

//// check current acccount balance
for(let i=0; i<count; i++){
  const accountBalance = await accountInfo.nth(i).textContent();
  if(accountBalance.trim().includes("Balance")){
    const amountDeposit = await page.locator("[class='ng-binding']").nth(i).textContent();
    amountDeposited += Number(amountDeposit);
  }
}

console.log(`Total Amount depositited to account ${accountNumber} by ${userSelect} is ${amountDeposited}`);
/////

const totalDepositAmount = Number(depositAmount) + originalAmountDeposited;
console.log(totalDepositAmount);
expect(amountDeposited).toEqual(Number(totalDepositAmount));

//withdrawal scenario

await page.locator("[ng-click='withdrawl()']").click();
await page.waitForTimeout(5000);
// expect(page.getByText('Amount to be Withdrawn :')).toBeVisible();

const actionDesc = await page.locator("[class='form-group']").textContent();
const exceedAmount = "5000";
await page.locator("[type='number']").fill(exceedAmount);
// await page.getByRole('button', { name: 'Withdraw', exact: true }).click();

await page.locator("[type='submit']").click();
const errorMessage = await page.locator("[ng-show='message']").textContent();
expect(errorMessage).toEqual("Transaction Failed. You can not withdraw amount more than the balance.");
const withdrawAmount = "5";
await page.locator("[type='number']").fill(withdrawAmount);
await page.locator("[type='submit']").click();
await page.locator("[type='number']").fill(withdrawAmount);
await page.locator("[type='submit']").click();


const balance = Number(await page.locator("[class='ng-binding']").nth(1).textContent());
const currentBalance = amountDeposited - Number(withdrawAmount) - Number(withdrawAmount);
expect(currentBalance).toEqual(balance);
console.log(currentBalance);
console.log(balance);

await page.locator("[ng-click='transactions()']").click();

// expect (rows).toHaveCount(rowCount);

// element not found handling
try {
  // await page.waitForSelector("tbody tr");
  await page.waitForSelector("tbody tr", { timeout: 2000 });
  console.log('Element found');
} catch (error) {
  console.log('Element not found, reloading the page...');
  await page.reload();
}

const rows =  page.locator("tbody tr");
const rowCount = await rows.count();
let depositTotal = 0;
let withdrawTotal = 0;
for(let i=0; i<rowCount; i++){
  const lineRow =  rows.nth(i).locator("td");
  const type = await lineRow.nth(2).textContent();
  const total = await lineRow.nth(1).textContent();
  if(type === "Credit"){
    const depositTotals = Number(total);
    depositTotal += depositTotals;
  

  }
  if(type ==="Debit"){
    const withdrawalTotals = Number(total);
    withdrawTotal += withdrawalTotals;


  }


}
console.log(`Amount Deposited:${depositTotal}`);
console.log(`Amount Withdrawn:${withdrawTotal}`);



});

// test('keyboard', async ({ page }) => {
//   await page.goto(this.website);
//   await page.keyboard.press("s");
//   await page.pause();


// });

test('sweetshop', async ({ page }) => {
  await page.goto("https://sweetshop.netlify.app/");
  const allProducts = page.locator("[class='card']");
  const productCount = await allProducts.count();
  let productList = [];
  let productAddtoCart = 0;

  for(let i=0; i<productCount; i++){
    const productName = await allProducts.nth(i).locator("[class='card-title']").textContent();
    if(productName.trim() === "Chocolate Cups"){
      await allProducts.nth(i).locator("[class='btn btn-success btn-block addItem']").click();
      productList.push(productName);
      productAddtoCart ++; 
    } 
  }
  console.log(productList);


  const numberOfCart = Number(await page.locator("[class='badge badge-success']").textContent());
  console.log(numberOfCart);
  console.log(productAddtoCart);
  expect(productAddtoCart).toEqual(numberOfCart);

});


test('attribute', async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/inventory.html");
  const images = await page.$$('img.inventory_item_img');
  let count = images.length;
  const targetSrcValue = "./img/bolt-shirt-1200x1500.jpg";

  // Iterate through the images and get the src attribute values
  for (let i=0; i<count; i++){
    // const srcValue = await img.getAttribute('src');
    const srcValue = await images[i].getAttribute('src');
    if (srcValue.includes(targetSrcValue)) {
      console.log('Matching src attribute value found:', srcValue);
      await page.locator("[class='btn_primary btn_inventory']").nth(i).click();
      }
  
    }
await page.pause();
});




test.only('order', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator('[type="email"]').fill("test1234321@gmail.com");
  await page.locator('[type="password"]').fill("Password32!");
  await page.locator('[type="submit"]').click();
  const allProducts = page.locator("[class='card']");
  const product = "ADIDAS ORIGINAL";
  const productCount = await allProducts.count();
  // console.log(productCount);
  // const productCount = 4;
  for(let i=0; i<productCount; i++){
    const productToAdd = await allProducts.nth(i).locator("div h5 b").textContent();
    if(productToAdd === product){
      await page.locator("[class='btn w-10 rounded']").nth(i).click();
    }
    }

  await page.locator("[routerlink='/dashboard/cart']").click();
  await page.locator("[class='btn btn-primary']").nth(2).click();
  await page.locator("[placeholder='Select Country']").pressSequentially("Ind");
  const dropdown =  page.locator(".ta-results");
  await dropdown.waitFor();
  await dropdown.locator("button").nth(1).click();
    // const optionsCount = await this.dropdown.locator("button").count();
    // for(let i =0;i< optionsCount; ++i)
    // {
    //   const  text =  await this.dropdown.locator("button").nth(i).textContent();
    //     if(text.trim() === countryName)
    //     {
    //        await this.dropdown.locator("button").nth(i).click(

  // expect(page.locator("[class='ta-item list-group-item ng-star-inserted']")).toBeVisible();
  // await page.locator("[class='ng-star-inserted']").nth(1).click();
  await page.locator("[class='btnn action__submit ng-star-inserted']").click();
  const orderNumber = await page.locator("[class='ng-star-inserted']").nth(2).textContent();
  let cleanOrderNumber = orderNumber.replace(/\|/g, "").trim();
  console.log(cleanOrderNumber);
  await page.locator("[routerlink='/dashboard/myorders']").nth(1).click();

  const allOrder =  page.locator("tbody tr");
  const allOrderCount = await allOrder.count();
  console.log(allOrderCount);
  for(let i=0; i<6; i++){
    const order = await allOrder.nth(i).locator("th").textContent();
    console.log(order);
    if(order.includes(cleanOrderNumber)){
      console.log("Order Found");
    }
    else{
      console.log("order not found");
    }
  }

  // await page.pause();
});







  // let destinationList = [];

  // for(let i=0; i<destinationCount; i++){
  //   const productName = await allProducts.nth(i).locator("[class='card-title']").textContent();
  //   if(productName.trim() === "Chocolate Cups"){
  //     await allProducts.nth(i).locator("[class='btn btn-success btn-block addItem']").click();
  //     productList.push(productName);
  //   } 
  // }
  // console.log(productList);


  // const numberOfCart = Number(await page.locator("[class='badge badge-success']").textContent());
  // console.log(numberOfCart);
  // console.log(productAddtoCart);
  // expect(productAddtoCart).toEqual(numberOfCart);

// });