const {test, expect} = require('@playwright/test');
const locators = require('../locators');


class RegisterPage {
    constructor(page)
{
    this.page = page;
    this.gender = page.locator(locators.gender);
    this.password = page.locator(locators.password);
    this.birthDay = page.locator(locators.birthDay);
    this.birthMonth = page.locator(locators.birthMonth);
    this.birthYear = page.locator(locators.birthYear);
    this.firstName = page.locator(locators.firstName);
    this.lastName = page.locator(locators.lastName);
    this.company = page.locator(locators.company);
    this.address = page.locator(locators.address);
    this.address2 = page.locator(locators.address2);
    this.country = page.locator(locators.country);
    this.state = page.locator(locators.state);
    this.city = page.locator(locators.city);
    this.zipcode = page.locator(locators.zipcode);
    this.mobileNumber = page.locator(locators.mobileNumber);
    this.createAccountButton = page.locator(locators.createAccountButton);

    //register completed page
    this.successCreatedMessage = page.getByRole('heading', { name: 'Account Created!' });
    this.continue = page.locator(locators.continue);


    



}



async registernewUser(data)
{
    await this.gender.click();
    await this.password.fill(data.password);
    await this.birthDay.selectOption({ value: data.birthdayDayOption });
    await this.birthMonth.selectOption({ value: data.birthdayMonthOption });
    await this.birthYear.selectOption({ value: data.birthdayYearOption });
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.company.fill(data.company);
    await this.address.fill(data.address);
    await this.address2.fill(data.address2);
    await this.country.selectOption({ value: data.country });
    await this.state.fill(data.state);
    await this.city.fill(data.city);
    await this.zipcode.fill(data.zipcode);
    await this.mobileNumber.fill(data.mobileNumber);
    await this.createAccountButton.click();
}



async completedRegister()
{
    await expect(this.successCreatedMessage).toBeVisible();
    const message = await this.successCreatedMessage.textContent();
    return message;
    
}

async completedContinue()
{
    await this.continue.click();
}

}
module.exports = {RegisterPage};