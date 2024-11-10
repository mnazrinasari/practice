const {test, expect} = require('@playwright/test');

class HomePage {
    constructor(page)
{
    this.page = page;
    this.login = page.locator("[href='/login']");
    this.signupName = page.locator("[data-qa='signup-name']");
    this.signupEmail = page.locator("[data-qa='signup-email']");
    this.signupButton = page.locator("[data-qa='signup-button']");
    this.allProducts = page.locator("[class='single-products']");
    this.continueModal = page.locator("[class='btn btn-success close-modal btn-block']");
    this.viewCartModal = page.locator("p a");
    this.deleteAccountButton = page.locator("[href='/delete_account']");
    this.deleteAccountMessage = page.getByRole('heading', { name: 'Account Deleted!' });
    this.deleteConfirmButton = page.locator("[data-qa='continue-button']");
    



}


generateUsername() {
    const date = new Date();
    const timestamp = date.getTime();
    const randomNum = Math.floor(Math.random() * 1000); 
    return `user_${timestamp}_${randomNum}`;
  }


async navigateTo(sourceURL)
{
    await this.page.goto("https://automationexercise.com/");;
}

async proceedRegisternewUser(username, email)
{
    await this.signupName.fill(username);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
}


async addRandomProductToCart(randomProductData)
{
    const allProducts = this.allProducts;
    const countProducts = await allProducts.count();
    let productAddToCart = [];

    for (let i = 0; i < countProducts; i++) {
    const productNameElements = await allProducts.nth(i).locator("div p").nth(1).allTextContents();
    
    for (const name of productNameElements) {
        for (const productName of randomProductData) {
        if (name.trim() === productName) {
            productAddToCart.push(name.trim());
            await allProducts.nth(i).locator("div a").nth(0).click();
            
            if (productAddToCart.length < randomProductData.length) {
            const modal = this.continueModal;
            await modal.waitFor({ state: 'attached' });
            await modal.waitFor({ state: 'visible' });
            await modal.click();
            console.log("clicked");

    // 9. Click 'Cart' button
            } else {
            const modal = this.viewCartModal;
            // await modal.waitFor({ state: 'attached' });
            await modal.waitFor({ state: 'visible' });
            await modal.click();
            console.log("last product clicked");
            }
            break;
        }
        }
    }
    }

    return(productAddToCart);

}

async deleteAccount()
{
    // 17. Click 'Delete Account' button
    await this.deleteAccountButton.click();

    // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    const accountDeleted = this.deleteAccountMessage;
    await expect(accountDeleted).toBeVisible();
    const deletedMessage = await accountDeleted.textContent();
    expect(deletedMessage).toEqual("Account Deleted!");
    await this.deleteConfirmButton.click();

    return deletedMessage

}






}
module.exports = {HomePage};