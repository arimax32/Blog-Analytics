const _ = require('lodash')
const cachePeriod = require("../utils/cacheUtil")

const searchUtil = (title,word) => {
    return _.find(_.words(title),(s) => { return s.toLowerCase()===word; })
}

const getPrivacyUtil = (blogs) => {
    const count = _.countBy(blogs,(blog) => {
        const matchString = "privacy";
        const res = searchUtil(blog.title,matchString)
        if(res===undefined){
            return "";
        }
        return matchString;
    }).privacy;
    return count === undefined ? 0 : count;
} 

const analyzeData = (blogs,cacheKey) => {
    return {
        "num_blogs" : _.size(blogs),
        "longest_title" : _.maxBy(blogs,(blog) => { return blog.title.length}).title,
        "privacy_blogs" : getPrivacyUtil(blogs),
        "distinct_titles" : _.map(_.uniq(blogs,'title'),'title'),
    }
}

const cachedResults = _.memoize(analyzeData,cachePeriod)

const searchFilter = (blogs, searchWord) => {
    let allBlogs = false
    if(searchWord === ""){
        allBlogs = true
    }
    return _.filter(blogs,(blog) => {
        return searchUtil(blog.title,searchWord)!==undefined || allBlogs;
    }) 
}
const cachedSearch = _.memoize(searchFilter,cachePeriod)

module.exports = {

    getBlogStats: async (req,res) => { res.json(cachedResults(req.blogs,"")); },

    getFilteredBlogs: async (req,res) => { 
        let searchQuery = req.query.query;
        if(searchQuery===undefined){
            searchQuery = "";
        } 
        res.json(cachedSearch(req.blogs,searchQuery.toLocaleLowerCase())); 
    },
};