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

app.post('/render', function(req,res){
  if (req.body.mjml) {
    const {html, errors} = mjml2Html(req.body.mjml);

    for (let e of errors) {
      console.log(e);
    }

    return res.send(html);
  }

  res.sendStatus(400);
});

app.listen(3002)
