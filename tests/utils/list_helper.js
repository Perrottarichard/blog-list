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

module.exports = { dummy, totalLikes }