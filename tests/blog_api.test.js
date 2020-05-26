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
describe('when there are blogs saved', () => {
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
})
describe('specific blog success', () => {
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blog')
        const contents = response.body.map(r => r.title)
        expect(contents).toContain('React patterns')
    })
    test('new post added successfully', async () => {
        const content = new Blog(initialSample[2])
        await api.post('/api/blog')
            .send(content)
        expect(200)
        await content.save();
        const res = await api.get('/api/blog')
        expect(res.body[2].title).toContain('Canonical string reduction')
    })
})
describe('blog content exists and is formatted correctly', () => {
    test('unique identifier is named id', async () => {
        const response = await api.get('/api/blog')
        const content = response.body.map(i => i.id)
        expect(content).toBeDefined()
    })
    test('default likes to 0', async () => {
        const content = new Blog({
            title: 'Test 1',
            author: 'Richard',
            url: 'https://mangolatte.dev'
        })
        await api.post('/api/blog')
            .send(content)
        expect(200)
        await content.save();
        const res = await api.get('/api/blog')
        expect(res.body[3].likes).toBe(0)
    })
    test('missing title and url', async () => {
        const content = {
            author: 'Richard'
        }
        await api.post('/api/blog')
            .send(content)
        expect(400)
    })
})
describe('delete blog post', () => {
    test('remove blog post', async () => {
        await api.delete('/api/blog/5a422a851b54a676234d17f7')
        expect(204)
    })
})
describe('edit existing blog post', () => {
    test('edit and update single blog post', async () => {
        const content = { author: 'Richard' }
        const res = await api.put('/api/blog/5a422aa71b54a676234d17f8')
            .send(content)
        expect(200)
    })
})

afterAll(() => {
    mongoose.connection.close()
})