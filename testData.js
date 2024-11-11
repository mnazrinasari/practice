const testData = {
    loginData: {
        existingUsername: "test33@test.com",
        existingPassword: "test33"
    },
    productData: {
        searchText: "Sleeveless",
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
        get expectedAddress() {
            return [
                this.company,
                this.address,
                this.address2,
                `${this.city} ${this.state} ${this.zipcode}`,
                this.country,
                this.mobileNumber
            ];
        }
    },
    cardData: {
        cardNumber: "4444444444444444",
        cardCVC: "123",
        cardExpiryMonth: "12",
        cardExpiryYear: "2030",
        get cardName() {
            return `${testData.registrationData.firstName} ${testData.registrationData.lastName}`;
        }
    },
    environment: {
        sourceURL: "http://automationexercise.com"
    }
};

module.exports = testData;