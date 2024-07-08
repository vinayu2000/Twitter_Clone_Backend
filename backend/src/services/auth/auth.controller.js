import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../schema/user.schema.js';

const signInKey = 'twitter-clone';
const expiryMinutes = 300;

const signUpController = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (firstName && lastName && email && phoneNumber && password) {
      const signupData = await User.find({ email })
      signupData.map((item) => {
        console.log(item.email);
        if (item.email === email) {
          return res.status(400).send({ STATUS: 'failed', data: 'Email already exists' })
        }
      });

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      if (hashedPassword) {
        const newUser = await User.create({ firstName, lastName, email, phoneNumber, password: hashedPassword })
        if (newUser) {
          res.status(201).send({ STATUS: 'OK', data: 'Account created successfully' })
        } else {
          res.status(401).send({ STATUS: 'failed', data: 'Failed to create account' })
        }
      }
    } else {
      res.status(400).send({ STATUS: 'failed', data: 'bad request' })
    }
  }
  catch (error) {
    console.log('Sign Up error', error);
  }
}
const signInController = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    if (email && password) {
      const result = await User.findOne({ email })

      if (result && result.password) {
        const decryptedPassword = await bcrypt.compare(password, result.password)
        if (decryptedPassword) {
          const token = jwt.sign({ userID: result._id,email: result.email,firstName:result.firstName,lastName:result.lastName }, signInKey, { expiresIn: expiryMinutes * 60 })
          res.status(200).send({ STATUS: 'OK', data: { token, userID: result._id, email: result.email,firstName:result.firstName,lastName:result.lastName } })
        } else {
          res.status(401).send({ STATUS: 'failed', data: 'Password Incorrect' })
        }
      } else {
        res.status(401).send({ STATUS: 'failed', data: 'Invalid Credentials' })
      }
    } else {
      res.status(400).send({ STATUS: 'failed', data: 'email and password required' })
    }
  }
  catch (error) {
    console.log('Sign In error', error);
  }
}

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.send({ STATUS: 'failed', data: 'header not found' })
  }
  const token = authHeader?.split(" ")[1];
  jwt.verify(token, signInKey, expiryMinutes * 60, (err, payload) => {
    if (err) {
      res.send({ STATUS: "failed", data: 'authentication failed' })
      // const err = new Error(err)
      // err.code ='401'
      // throw err
    }
    req.user = {
      userID: payload.userID,
      email:payload.email,
      firstName:payload.firstName,
      lastName:payload.lastName
    }
  })
  next()
}


export const AuthController = {
  signUpController,
  signInController,
  validateToken,
}