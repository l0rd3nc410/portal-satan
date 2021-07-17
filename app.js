import express from 'express';
import ejs from 'ejs';
import path from 'path'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use('./public', express.static(path.join(path.resolve(), 'public')));
app.set('view', [
    path.join(path.resolve(), '/views/pages')
])

app.listen(5000, () => {

});
