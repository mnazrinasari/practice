const {test, expect} = require('@playwright/test');
const locators = require('../locators');

class CheckoutPage {
    constructor(page)
{
    this.page = page;
    this.deliveryAddress = page.locator("[id='address_delivery']");
    this.billingAddress = page.locator("[id='address_invoice']");
}


cleanAddressEntry(entry) {
    return entry.replace(/\s+/g, ' ').trim().replace(/, 0000$/, '');
  }
  
cleanSpecificEntry(retrievedAddress) {
    return retrievedAddress.map((entry, index) => {
      if (index === 3) { 
        return this.cleanAddressEntry(entry);
      }
      return entry;
    });
  }
  
cleanAddressData(addressArray, unwantedEntry, unwantedPrefix) {
    return addressArray.filter(entry => 
      entry !== unwantedEntry && !entry.startsWith(unwantedPrefix)
    );
  }


async verifyAddress(type, data) 
{   
    let addressType;
    let addressLabel;
    let genderPrefix;

    switch (type) {
        case 'delivery':
            addressType = this.deliveryAddress;
            addressLabel = 'Your delivery address';
            genderPrefix = 'Mr.';
            break;
        case 'billing':
            addressType = this.billingAddress;
            addressLabel = 'Your billing address';
            genderPrefix = 'Mr.';
            break;
    }

    const addressElements = addressType.locator("li");
    const count = 8;
    let retrievedAddress = [];
    for(let i=0; i<count; i++){
    const addressDetail = await addressElements.nth(i).textContent();
    retrievedAddress.push(addressDetail.trim());
    }
    //cleaning the data
   retrievedAddress = this.cleanAddressData(retrievedAddress, addressLabel, genderPrefix);
    
    retrievedAddress = this.cleanSpecificEntry(retrievedAddress);

    // console.log(retrievedDeliveryAddress);
    // console.log(expectedDeliveryAddress);
    expect(data.expectedAddress).toEqual(retrievedAddress);
}

}
module.exports = {CheckoutPage};