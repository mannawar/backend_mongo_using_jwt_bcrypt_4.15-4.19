const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  title: { type: String, min: 8 },
  likes: { type: Number },
  url: { type: String }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)