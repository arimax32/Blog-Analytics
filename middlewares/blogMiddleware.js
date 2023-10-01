const _ = require('lodash')
const cachePeriod = require("../utils/cacheUtil")

const getBlogData = async () => {
    return fetch('https://intent-kit-16.hasura.app/api/rest/blogs', {
                headers: {
                    'x-hasura-admin-secret': process.env.ADMIN_SECRET
                }
            })
            .then(response => response.json())
            .then(d => d.blogs)
            .catch(err => err)
}

const cachedCall = _.memoize(getBlogData,cachePeriod)

const fetchBlogs = async (req,res,next) => {
    const result = await getBlogData();
    if(result instanceof Error || result === undefined){
        res.status(404).send(`Error occured in fetching data from the Third Party Source -: \n${result}`)
    }
    else{
        req.blogs = result;
        next();
    }
}

module.exports = fetchBlogs;