const express = require('express');
const cors = require('cors');
const routerApi = require('./routers/index');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const whitelist = ['http://localhost:4000/', 'https://127.0.0.1:5500/'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('HOLA MI SERVER EN EXPRESS');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta en Express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port: ' + port);
});
