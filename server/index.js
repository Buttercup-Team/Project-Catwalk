const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(express.static(PUBLIC_DIR));
app.use(express.json());

// API request to get the product info
app.get('/product/:params', (req, res) => {
  const { params } = req.params;
  axios
    .get(`http://18.217.87.199/product/${params}`)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) =>
      console.log('error getting product info', err.response.data)
    );
});

// API request to get the styles
app.get('/styles/:params', (req, res) => {
  const { params } = req.params;
  axios
    .get(`http://18.217.87.199/styles/${params}`)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => console.log('error getting styles', err.response.data));
});

// API request to get the reviews based on a different sort option
app.get('/reviews/:product_id/:sort', (req, res) => {
  const { product_id, sort } = req.params;
  axios.get(`http://52.25.85.5/reviews/${product_id}/${sort}`)
    .then((data) => res.send(data.data))
    .catch((err) => console.log('error getting reviews', err.response.data));
});

// API request to get the reviews meta data
app.get('/api/reviews/meta/:product_id', (req, res) => {
  const { product_id } = req.params;
  axios.get(`http://52.25.85.5/api/reviews/meta/${product_id}`)
    .then((data) => res.send(data.data))
    .catch((err) => console.log('error getting reviews', err.response.data));
});

app.get('/questions/:params', (req, res) => {
  const { params } = req.params;
  axios.get(`http://18.218.131.22:6000/questions/${params}`)
    .then((data) => res.send(data.data))
    .catch((err) => console.log('error getting questions', err.response.data));
});

// API request to increment the helpfulness counter
app.put('/reviews/help', (req, res) => {
  axios.put(`http://52.25.85.5/reviews/help`, { body: { id: req.body.id } })
    .then(() => res.sendStatus(204))
    .catch((err) => console.log('server help error', err));
});

// API request to remove the review
app.put('/reviews/report', (req, res) => {
  axios.put(`http://52.25.85.5/reviews/report`, { body: { id: req.body.id } })
    .then(() => res.send(204))
    .catch((err) => console.log('server report error', err));
});

// API request to post a new review
app.post('/newReview/', (req, res) => {
  axios.post(`http://52.25.85.5/newReview/`, req.body.reviewObj)
    .then((response) => {
      console.log('server review submit success');
      res.send(201);
    })
    .catch((err) => {
      console.log('server review submit error', err);
      res.send(500);
    });
});

// API request to post a new answer to an existing question
app.post('/api/qa/questions/:questionId/answers', (req, res) => {
  const { questionId } = req.params;
  axios.post(`http://18.218.131.22:6000/qa/questions/${questionId}/answers`, req.body)
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
  axios.post('http://18.218.131.22:6000/qa/questions', req.body)
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
  axios.put(`http://18.218.131.22:6000/api/qa/answers/${answerId}/helpful`)
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
  axios.put(`http://18.218.131.22:6000/api/qa/questions/${questionId}/helpful`)
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
  axios.put(`http://18.218.131.22:6000/qa/answers/${answerId}/report`)
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
  console.log(`Example app listening at ${port}`);
});
