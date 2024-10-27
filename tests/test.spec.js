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
expect(amountDeposited).toBe(Number(totalDepositAmount));


});

// test('keyboard', async ({ page }) => {
//   await page.goto(this.website);
//   await page.keyboard.press("s");
//   await page.pause();


// });