
const {test, expect} = require('@playwright/test');
const locators = require('../locators');

class ProductPage {
    constructor(page)
{
    this.page = page;
    this.allProducts = page.locator(locators.allProducts);
    this.continueModal = page.locator(locators.continueModal);
    this.viewCartModal = page.locator(locators.viewCartModal).nth(1);

    



}



async addSearchedProducttoCart(searchProductData)
{
    // 7. Verify all the products related to search are visible
    const allProducts = this.allProducts;
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
                if (productAddToCart.length < searchProductData.length) {
                const modal = this.continueModal;
                await modal.waitFor({ state: 'attached' });
                await modal.waitFor({ state: 'visible' });
                await modal.click();
                console.log("clicked");
                } else {
    // 9. Click 'Cart' button and verify that products are visible in cart
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
    return {productAddToCart, productInResult};
}


async assertProducts(searchProductData) {
    const { productAddToCart, productInResult } = await this.addSearchedProducttoCart(searchProductData);

    expect(productInResult).toEqual(searchProductData);
    expect(productAddToCart).toEqual(searchProductData);
}



}
module.exports = {ProductPage};

