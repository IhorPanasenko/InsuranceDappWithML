// registerModel.js
class Address {
  constructor(country, city, street, houseNumber, postIndex) {
    this.country = country;
    this.city = city;
    this.street = street;
    this.houseNumber = houseNumber;
    this.postIndex = postIndex;
  }
}

class RegisterModel {
  constructor(firstName, lastName, email, password, address, phoneNumber, dateOfBirth, ethereumAccount ,role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = new Address(
      address.country,
      address.city,
      address.street,
      address.houseNumber,
      address.postIndex
    );
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.ethereumAccount = ethereumAccount;
    this.role = role;
  }
}

module.exports = RegisterModel;
module.exports = Address;
