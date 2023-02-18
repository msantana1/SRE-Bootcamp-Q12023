import express from 'express';
const app = express();
import bodyParser from 'body-parser';

import * as routes from './routes/index.js';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.init(app);

export default app;