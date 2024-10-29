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

test.only('sweetshop', async ({ page }) => {
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