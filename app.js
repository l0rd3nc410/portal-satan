import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const uri = 'mongodb://GHOST:PASS12345@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';

mongoose.connect(uri , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('logged');
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

    if(req.query.search == null) {
        res.render('pages/index', { pageName: 'Portal' });
    }
    
});

app.get('/:topic', (req, res) => {    
    res.render('pages/single-news', { pageName: req.params.topic.toUpperCase()  });
});

app.listen(5000, () => {

});
