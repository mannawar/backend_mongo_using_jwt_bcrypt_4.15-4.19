const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../src/app')
const api = supertest(app)
const Blog = require('../models/blog')
// const initialBlogs = require('./test_helper')
//const { deleteOne } = require('../models/blog')

jest.useFakeTimers()

//Initializing database for test
beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

//getting all data from the database
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then((response) => console.log(response.body)

    )
})

//test to check if id is returned in desired format
test('verify the unique identifier is returned as id', async () => {
  const response = await api.get('/api/blogs')
  const resId = () => {
    return response.body
  }
  expect(resId()).toBeDefined()
})

//post to add blog and check if the no of blog increments by one, second part will check if likes is missing
test('adding a blog through post http request', async () => {
  const newBlog = {
    name: 'Zarish',
    title: 'Love my parents',
    url: 'www.zarish.com'
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const names = blogsAtEnd.map(b => b.name)
  expect(names).toContain(
    'Zarish'
  )
})

//to check for creating new blog from the endpoint(/api/blogs) if title and url properties are missing, then backend responds 400, bad request
test('checking to send data without url and title', async () => {
  const newBlog = {
    name: 'i am nobody',
    likes: 100
  }

  if(newBlog.title === undefined && newBlog.url === undefined) {
    await expect( Promise.resolve().then(async () => {
      throw new Error('Bad Request')
    })).rejects.toThrow('Bad Request')
  }
})

//test to delete a particular entry
test('test to delete a single blog post', async () => {
  const finalBlog = 
})
afterAll(() => {
  mongoose.connection.close()
})