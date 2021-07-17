import express from 'express';
import ejs from 'ejs';
import path from 'path'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(path.resolve(), 'public')));
app.set('views', [
    path.join(path.resolve(), '/views'),
    path.join(path.resolve(), '/views/pages'),
    path.join(path.resolve(), '/views/partials')
])

app.get('/', (req, res) => {
    res.render('pages/index', { pageName: 'Portal' });
});

app.get('/:type', (req, res) => {
    res.send(req.params.type);
});

app.listen(5000, () => {

});
