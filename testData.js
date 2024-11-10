// testData.js
const testData = {
    loginData: {
        existingUsername: "test33@test.com",
        existingPassword: "test33"
    },
    productData: {
        searchProductData: [
            "Sleeveless Dress", 
            "Sleeveless Unicorn Patch Gown - Pink", 
            "Sleeveless Unicorn Print Fit & Flare Net Dress - Multi"
        ],
        randomProductData: [
            "Sleeveless Dress", 
            "Winter Top", 
            "Frozen Tops For Kids"
        ]
    },
    registrationData: {
        password: "test1234",
        birthdayDayOption: "1", 
        birthdayMonthOption: "1",
        birthdayYearOption: "2000",
        firstName: "first_name",
        lastName: "last_name",
        company: "company",
        address: "address",
        address2: "address2",
        country: "Singapore",
        state: "state",
        city: "city",
        zipcode: "0000",
        mobileNumber: "9999",
        expectedAddress: [
            "company",
            "address",
            "address2",
            "city state 0000",
            "Singapore",
            "9999"
        ]
    },
    cardData: {
        cardNumber: "4444444444444444",
        cardCVC: "123",
        cardExpiryMonth: "12",
        cardExpiryYear: "2030"
    },
    environment: {
        sourceURL: "http://automationexercise.com"
    }
};

module.exports = testData;