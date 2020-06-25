import 'reflect-metadata';
import express, { json, Request, Response, NextFunction } from 'express';
import routes from './routes';
import AppError from './errors/AppError';
import uploadConfig from './config/upload';

const app = express();
app.use(json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.get('/', (request, response) => response.json({ message: 'Server ok' }));

app.listen(3333, () => {
    console.log('>>> Server started on port 3333!');
});
