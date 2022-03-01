import express from 'express';
import logger from 'morgan'
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';


// API routers
import api from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger('combined'));

app.use('/api', api);

// Configuration for serving React files
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});