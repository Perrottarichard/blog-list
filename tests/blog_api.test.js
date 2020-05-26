const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const initialSample = require('./utils/sampleList')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialSample[0])
    await blogObject.save()

    blogObject = new Blog(initialSample[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
    const response = await api.get('/api/blog')

    expect(response.body).toHaveLength(2)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blog')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('React patterns')
})

afterAll(() => {
    mongoose.connection.close()
})