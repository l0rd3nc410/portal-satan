import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import News from './schemas/schema-news.js'

dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@cluster0.j9per.mongodb.net/satan-news?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

    }).catch(err => {
        console.log(err.message);
    });


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(path.resolve(), 'public')));
app.set('views', [
    path.join(path.resolve(), '/views'),
    path.join(path.resolve(), '/views/pages'),
    path.join(path.resolve(), '/views/partials')
])

app.get('/', (req, res) => {

    if (req.query.search == null) {
        News.find({}).sort({'_id':-1}).exec((err, news) => {
            News.find({}).sort({'views':-1}).limit(3).exec((err, mostViewed) => {
                res.render('pages/index', { pageName: 'Portal', 'news':news, mostViewed:mostViewed });
            });
        });        
    }
    else {
        News.find({title: {$regex: req.query.search, $options:'i'}}).exec((err, news) => {
            console.log(news);
        });
    }

});

app.get('/:topic', (req, res) => {
    News.findOneAndUpdate({'slug':req.params.topic}, {$inc : {views: 1}}, (err, news) => {
        res.render('pages/single-news', { pageName: req.params.topic.toUpperCase(), news:news });
    });
});

app.listen(5000, () => {

});
