
const {test, expect} = require('@playwright/test');
const locators = require('../locators');

class PaymentPage {
    constructor(page)
{
    this.page = page;
    this.cardName = page.locator("[data-qa='name-on-card']");
    this.cardNumber = page.locator("[data-qa='card-number']");
    this.cardCVC = page.locator("[data-qa='cvc']");
    this.cardExpiryMonth = page.locator("[data-qa='expiry-month']");
    this.cardExpiryYear = page.locator("[data-qa='expiry-year']");
    this.continuePay = page.locator("[data-qa='pay-button']");
}




async enterPayment(data) 
{
    
    // 14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await this.cardName.fill(data.cardName);
    await this.cardNumber.fill(data.cardNumber);
    await this.cardCVC.fill(data.cardCVC);
    await this.cardExpiryMonth.fill(data.cardExpiryMonth);
    await this.cardExpiryYear.fill(data.cardExpiryYear);

    // 15. Click 'Pay and Confirm Order' button
    await this.continuePay.click();
}


}
module.exports = {PaymentPage};

