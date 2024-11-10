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



async registernewUser(password, birthdayDayOption, birthdayMonthOption, 
    birthdayYearOption, firstName, lastName, company, address, address2, 
    country, state, city, zipcode, mobileNumber)
{
    await this.gender.click();
    await this.password.fill(password);
    await this.birthDay.selectOption({ value: birthdayDayOption });
    await this.birthMonth.selectOption({ value: birthdayMonthOption });
    await this.birthYear.selectOption({ value: birthdayYearOption });
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.company.fill(company);
    await this.address.fill(address);
    await this.address2.fill(address2);
    await this.country.selectOption({ value: country });
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zipcode);
    await this.mobileNumber.fill(mobileNumber);
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