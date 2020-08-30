const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

//post request
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.title === undefined && body.url === undefined) {
    response.status(400).send('Bad Request')
  }
  const blog = new Blog({
    name: body.name,
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
  })

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter