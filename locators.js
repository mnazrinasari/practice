const locators = {

    //Product Page
    allProducts: "[class='single-products']",
    continueModal: "[class='btn btn-success close-modal btn-block']",
    viewCartModal: "p a",

    //Register Page
    gender: "[for='id_gender1']",
    password: "[type='password']",
    birthDay: "[data-qa='days']",
    birthMonth: "[data-qa='months']",
    birthYear: "[data-qa='years']",
    firstName: "[data-qa='first_name']",
    lastName: "[data-qa='last_name']",
    company: "[data-qa='company']",
    address: "[data-qa='address']",
    address2: "[data-qa='address2']",
    country: "[data-qa='country']",
    state: "[data-qa='state']",
    city: "[data-qa='city']",
    zipcode: "[data-qa='zipcode']",
    mobileNumber: "[data-qa='mobile_number']",
    createAccountButton: "[data-qa='create-account']",
    continue: "[data-qa='continue-button']",


    //Home Page
    login: "[href='/login']",
    signupName: "[data-qa='signup-name']",
    signupEmail: "[data-qa='signup-email']",
    signupButton: "[data-qa='signup-button']",
    allPProducts: "[class='single-products']",
    continueModal: "[class='btn btn-success close-modal btn-block']",
    viewCartModal: "p a",
    deleteAccountButton: "[href='/delete_account']",
    deleteConfirmButton: "[data-qa='continue-button']"


};

module.exports = locators;