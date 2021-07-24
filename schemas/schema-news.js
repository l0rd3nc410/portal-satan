import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var newsSchema = new Schema({
    "title": String,
    "category": String,
    "author": String,
    "author_img": String,
    "news_content": String,
    "news_img": String,
    "slug": String,
    "views": Number
}, {collection:'news'});

var News = mongoose.model("News", newsSchema);

export default News;