import * as express from 'express';
import { join } from 'path';

const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static(join(__dirname, '../rollup-demo')));

app.get('/api/version', (req, res) => {
  res.json({
    version: '1.0.0',
    timestamp: Date.now(),
  }).end();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
