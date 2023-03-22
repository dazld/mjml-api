import mjml2Html from 'mjml';
import express from 'express';

const app = express();
const KEY = process.env.API_KEY;

app.use(express.json());

app.use(function(req, res, next){
  const key = req.header('x-api-key');

  if (key !== KEY) {
    return res.sendStatus(404);
  }

  next();
});

app.post('/api/render', function(req,res){
  if (req.body.mjml) {
    const {html, errors} = mjml2Html(req.body.mjml);

    for (let e of errors) {
      console.log(e);
    }

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    return res.send(html);
  }

  res.sendStatus(400);
});

module.exports = app;
