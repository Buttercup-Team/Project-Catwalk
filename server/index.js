const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const path = require('path');
const { reset } = require('nodemon');
const config = require('../config.js');
const TOKEN = config.TOKEN

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(express.static(PUBLIC_DIR));
app.use(express.json());

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/';
            'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/20113';

// API request to get the product info
app.get('/product/:params', (req, res) => {
  const { params } = req.params;
  axios.get(`${url}products/${params}`, {
    headers: { Authorization: TOKEN },
  })
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => console.log('error getting product info', err.response.data));
});

// API request to get the styles
app.get('/styles/:params', (req, res) => {
  const { params } = req.params;
  axios.get(`${url}products/${params}/styles`, {
    headers: { Authorization: TOKEN },
  })
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => console.log('error getting styles', err.response.data));
});

// API request to get the reviews based on a different sort option
app.get('/reviews/:product_id/:sort', (req, res) => {
  const { product_id, sort } = req.params;
  axios.get(`http://localhost:3003/reviews/${product_id}/${sort}`)
    .then((data) => res.send(data.data))
    .catch((err) => console.log('error getting reviews', err.response.data));
});

// API request to get the reviews meta data
app.get('/api/reviews/meta/:product_id', (req, res) => {
  const { product_id } = req.params;
  axios.get(`http://localhost:3003/api/reviews/meta/${product_id}`)
    .then((data) => res.send(data.data))
    .catch((err) => console.log('error getting reviews', err.response.data));
});

app.get('/questions/:params', (req, res) => {
  const { params } = req.params;
  axios.get(`${url}qa/questions/?product_${params}`, {
    headers: { Authorization: TOKEN },
  })
    .then((data) => res.send(data.data))
    .catch((err) => console.log('error getting questions', err.response.data));
});

// API request to increment the helpfulness counter
app.put('/reviews/help', (req, res) => {
  axios.put(`http://localhost:3003/reviews/help`, { body: { id: req.body.id } })
    .then(() => res.sendStatus(204))
    .catch((err) => console.log('server help error', err));
});

// API request to remove the review
app.put('/reviews/report', (req, res) => {
  axios.put(`http://localhost:3003/reviews/report`, { body: { id: req.body.id } })
    .then(() => res.send(204))
    .catch((err) => console.log('server report error', err));
});

// API request to post a new review
app.post('/newReview/', (req, res) => {
  console.log('at the server', req.body);
  axios.post(`${url}reviews`, req.body.reviewObj, {
    headers: { Authorization: TOKEN },
  })
    .then((response) => {
      console.log('server review submit success');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('server review submit error', err);
      res.sendStatus(500);
    });
});

// API request to post a new answer to an existing question
app.post('/api/qa/questions/:questionId/answers', (req, res) => {
  const { questionId } = req.params;
  axios.post(`${url}qa/questions/${questionId}/answers`, req.body.params, {
    headers: { Authorization: TOKEN },
  })
    .then((response) => {
      console.log('server answer submit response');
      res.send(201);
    })
    .catch((err) => {
      console.log('server answer submit error', err);
      res.sendStatus(500);
    });
});

// API request to post a new question
app.post('/api/qa/questions', (req, res) => {
  axios.post(`${url}qa/questions`, req.body, {
    headers: { Authorization: TOKEN },
  })
    .then((response) => {
      console.log('server question submit response');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('server question submit error', err);
      res.sendStatus(500);
    });
});

// API request to increment the helpfulness of an answer
app.put('/api/qa/answers/:answerId/helpful', (req, res) => {
  const { answerId } = req.params;
  axios.put(`${url}qa/answers/${answerId}/helpful`, { body: { answer_id: req.body.id } }, {
    headers: { Authorization: TOKEN },
  })
    .then((response) => {
      console.log('server helpfulness put response');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('server helpfulness put error', err);
      res.sendStatus(500);
    });
});

// API request to increment the helpfulness of a question
app.put('/api/qa/questions/:questionId/helpful', (req, res) => {
  const { questionId } = req.params;
  axios.put(`${url}qa/questions/${questionId}/helpful`, { body: { question_id: req.body.id } }, {
    headers: { Authorization: TOKEN },
  })
    .then((response) => {
      console.log('server helpfulness question put response');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('server helpfulness question put error', err);
      res.sendStatus(500);
    });
});

// API request to report this answer
app.put('/api/qa/answers/:answerId/report', (req, res) => {
  const { answerId } = req.params;
  axios.put(`${url}qa/answers/${answerId}/report`, { body: { answer_id: req.body.id } }, {
    headers: { Authorization: TOKEN },
  })
    .then((response) => {
      console.log('server report put response');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('server report put error', err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
