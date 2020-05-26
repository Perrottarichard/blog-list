const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blog = await Blog.find({})
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (request.body.url === undefined || request.body.title === undefined) {
        const result = { error: 'invalid format' }
        response.status(400).json(result)
    } else {
        const result = await blog.save()
        response.status(201).json(result)
    }
})

blogRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(200).json('blog updated')
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json('blog deleted')
})
module.exports = blogRouter