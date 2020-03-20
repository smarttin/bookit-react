const User = require("../models/user.model");
const jwt =  require("jsonwebtoken");
const { normalizeErrors } = require('../helpers/mongoose');
const { SECRET } = require("../config")

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({errors: [{title: "Data missing", detail: "Provide email and password"}]});
  }

  User.findOne({email}, (err, user) => {
    // console.log(user);
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (!user) {
      return res.status(422).send({errors: [{title: "Invalid user", detail: "User does not exist"}]});
    }

    if (user.hasSamePassword(password)) {
      // return jwt
      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET, { expiresIn: '1h'});
      return res.json(token);
    } else {
      return res.status(422).send({errors: [{title: "Wrong data", detail: "Wrong email or password"}]});
    }
  })
}

const register = (req, res) => {
  const {username, email, password, confirmPassword} = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: "Data missing", detail: "Provide email and password"}]});
  }

  if (password !== confirmPassword) {
    return res.status(422).send({errors: [{title: "Invalid password!", detail: "Password is not the same as password confirmation"}]})
  }

  User.findOne({email}, (err, existingUser) => {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (existingUser) {
      return res.status(422).send({errors: [{title: "Invalid email", detail: "User with this email already exists"}]})
    }

    const user = new User({
      username,
      email,
      password,
    });

    user.save(err => {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({"registered": true});
    });
  });
}

const authMiddleware = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({errors: [{title: "Unauthorised", detail: "You need to login to gain access"}]})
  }

  const user = parseToken(token);
  // console.log(user);
  User.findById(user.userId, function (err, user) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    if (!user) {
      return res.status(401).send({errors: [{title: "Unauthorised", detail: "You need to login to gain access"}]})
    }
    res.locals.user = user;
    next();
  })
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], SECRET);
}

module.exports = {
  login,
  register,
  authMiddleware
}