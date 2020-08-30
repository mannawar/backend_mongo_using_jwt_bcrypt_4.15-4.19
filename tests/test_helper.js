const Blog = require('../models/blog')

const initialBlogs = [
  {
    name: 'Zarien',
    title: 'Cooking is my hobby',
    likes: 100,
    url: 'www.zarr.com'
  },
  {
    name: 'Mannawar',
    title: 'Coding is my hobby',
    likes: 1001,
    url: 'www.mannawar.com'
  }
]

const nonExistingId = async() => {
  const blog = new Blog({ name: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}