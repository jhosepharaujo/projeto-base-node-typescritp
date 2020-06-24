import express, { json } from 'express';
import routes from './routes';

const app = express();
app.use(json());
app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Server ok' }));

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
