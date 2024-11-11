
const {test, expect} = require('@playwright/test');
const locators = require('../locators');

class ProductPage {
    constructor(page)
{
    this.page = page;
    this.allProducts = page.locator(locators.allProducts);
    this.continueModal = page.locator(locators.continueModal);
    this.viewCartModal = page.locator(locators.viewCartModal).nth(1);
    this.search = page.locator("[id='search_product']");
    this.searchClick = page.locator("[id='submit_search']");
    this.searchedProductDisplayed = page.getByRole('heading', { name: 'Searched Products' });
    this.allProductDisplayed = page.getByRole('heading', { name: 'All Products' });
    



}

async navigateSuccess()
{
    const allProductDisplayed = await this.allProductDisplayed;
    await expect(allProductDisplayed).toBeVisible();
    const allProductMessage = await allProductDisplayed.textContent();
    expect(allProductMessage ).toEqual("All Products");
    console.log(allProductMessage );
}



async addSearchedProducttoCart(searchProductData)
{

    const allProducts = this.allProducts;
    const countProducts = await allProducts.count();
    let productAddToCart = [];
    let productInResult = []


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


async assertProducts(searchProductData){
    const { productAddToCart, productInResult } = await this.addSearchedProducttoCart(searchProductData);

    expect(productInResult).toEqual(searchProductData);
    expect(productAddToCart).toEqual(searchProductData);
}


async searchProduct(data){

    const searchData = this.search.fill(data.searchText);
    this.searchClick.click();
    return searchData;

}

async verifyAfterSearch()
{
    const searchedProductDisplayed = await this.searchedProductDisplayed;
    await expect(searchedProductDisplayed).toBeVisible();
    const searchedProductMessage = await searchedProductDisplayed.textContent();
    expect(searchedProductMessage ).toEqual("Searched Products");
    console.log(searchedProductMessage );

}





}
module.exports = {ProductPage};

