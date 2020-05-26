const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0;
    let total = (blogs) => {
        blogs.map(item => {
            sum += item.likes
        })
        return sum
    }
    return blogs.length === 0 ? 0 : total(blogs)
}

const favorite = (blogs) => {
    function compare(a, b) {
        const A = a.likes
        const B = b.likes

        let comparison = 0;
        if (A > B) {
            comparison = -1;
        } else if (A < B) {
            comparison = 1;
        }
        return comparison;
    }
    blogs.sort(compare);
    return {
        author: blogs[0].author,
        likes: blogs[0].likes,
        title: blogs[0].title
    }
}

const mostBlogs = (blogs) => {
    let authorArr = blogs.map(i => i.author)
    let counted = _.values(_.groupBy(authorArr)).map(a => ({ author: a[0], blogs: a.length }))
    let result = _.maxBy(counted, 'blogs');
    return result
}
const mostLikes = (blogs) => {
    let arr = blogs.map(i => {
        return {
            author: i.author,
            likes: i.likes
        }
    })
    let sorted = _.values(_.groupBy(arr))

}
module.exports = { dummy, totalLikes, favorite, mostBlogs, mostLikes }