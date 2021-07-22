import express from 'express';
import ejs from 'ejs';
import path from 'path'
import { type } from 'os';

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
