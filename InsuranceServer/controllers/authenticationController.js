// registrationController.js
const bcrypt = require('bcrypt');

const RegisterModel = require('../models/registerModel');
const LoginModel = require('../models/loginModel')
const User = require('../models/user');
const Role = require("../models/role");

const validatePassword = require('../utils/passwordValidator');
const generateJwtToken = require('../utils/tokenGenerator');
const Address = require('../models/registerModel');

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, address, phoneNumber, dateOfBirth, ethereumAccount, role } = req.body;
  console.log(req.body)

  try {

    // Validate password complexity
    if (!validatePassword(password)) {
      return res.status(400).json({ error: 'Password does not meet complexity requirements' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dbRoles = await Role.find();
    const dbRole = dbRoles.filter(r => r.roleName === role);

    if(dbRole.length === 0){
      var newRole = new Role({
        roleName: role,
      })

      await newRole.save
      dbRoles = await Role.find();
      dbRole = dbRoles.filter(r => r.roleName === role);
    }

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      address: {
        country: address.country,
        city: address.city,
        street: address.street,
        houseNumber: address.houseNumber,
        postIndex: address.postIndex,
      },
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      ethereumAccount: ethereumAccount,
      role: dbRole[0],
    });

    
    const savedUser = await newUser.save();
    console.log(savedUser)
    // Respond with the saved user or appropriate success message
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error)
    // Handle validation errors or other registration failures
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      console.log(user)
      console.log(email)
      console.log(password)
      console.log(req.body)

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword+"\n\n");
      console.log(user.password+"\n\n");
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const token = generateJwtToken(user._id, user.email, user.role);
      res.json({ token });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  registerUser,
  loginUser
};
