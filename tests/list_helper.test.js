const listHelper = require('./utils/list_helper')
const blogs = require('./utils/sampleList')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]
    test('when list has no blogs total likes is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test('when list has many blogs equals sum of all the likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})
describe('mosts', () => {

    test('most popular blog by likes', () => {
        const result = listHelper.favorite(blogs)
        expect(result).toStrictEqual({
            author: "Edsger W. Dijkstra",
            likes: 12,
            title: "Canonical string reduction"


        })
    })
    test('most written by', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toStrictEqual({
            author: "Robert C. Martin",
            blogs: 3
        })
    })
    // test('author with most likes', () => {
    //     const result = listHelper.mostLikes(blogs)
    //     expect(result).toStrictEqual({
    //         author: "Edsger W. Dijkstra",
    //         blogs: 17
    //     })
    // })
})
