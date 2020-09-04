const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


//get all the users from database
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')

  response.json(users.map (u => u.toJSON()))
})

//post request
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  //testing for empty username and min length requirement
  if(body.username === undefined || body.username.length < 3) {
    return response.status(400).json({ error: 'username is required field and must be of 3 characters' })
  }

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter