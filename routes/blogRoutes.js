const express = require('express');
const fetchBlogs = require('../middlewares/blogMiddleware')
const {getBlogStats, getFilteredBlogs} = require('../controllers/blogController');

const router = express.Router();

router.get("/blog-stats",fetchBlogs,getBlogStats)

router.get("/blog-search",fetchBlogs,getFilteredBlogs)

module.exports = router;