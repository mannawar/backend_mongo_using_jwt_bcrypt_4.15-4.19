const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  url: { type: String },
  title: { type: String, min: 8 },
  author: { type: String, minlength: 3, required: true, unique: true },
  likes: { type: Number },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  // id: {
  //   type: String,
  //   required: true,
  //   minlength: 3
  // }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)