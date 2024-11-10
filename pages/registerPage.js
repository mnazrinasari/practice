const {test, expect} = require('@playwright/test');

class RegisterPage {
    constructor(page)
{
    this.page = page;
    this.gender = page.locator("[for='id_gender1']");
    this.password = page.locator("[type='password']");
    this.birthDay = page.locator("[data-qa='days']");
    this.birthMonth = page.locator("[data-qa='months']");
    this.birthYear = page.locator("[data-qa='years']");
    this.firstName = page.locator("[data-qa='first_name']");
    this.lastName = page.locator("[data-qa='last_name']");
    this.company = page.locator("[data-qa='company']");
    this.address = page.locator("[data-qa='address']");
    this.address2 = page.locator("[data-qa='address2']");
    this.country = page.locator("[data-qa='country']");
    this.state = page.locator("[data-qa='state']");
    this.city = page.locator("[data-qa='city']");
    this.zipcode = page.locator("[data-qa='zipcode']");
    this.mobileNumber = page.locator("[data-qa='mobile_number']");
    this.createAccountButton = page.locator("[data-qa='create-account']");

    //register completed page
    this.successCreatedMessage = page.getByRole('heading', { name: 'Account Created!' });
    this.continue = page.locator("[data-qa='continue-button']");


    



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