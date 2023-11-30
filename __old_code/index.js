import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/index.js';

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
config();

const access = process.env.ATLAS_URI;
const port = process.env.PORT;

console.log('=======', access, port);

app.use('/api/v1', router);

app.get('/', (req, res) => {
  try {
    console.log('----------->>>', req);
    res.json('working');
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

connect(access)
  .then(() => {
    app.listen(8080, () => {
      console.log(`App is listening on 8080`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
