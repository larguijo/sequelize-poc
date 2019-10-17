const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./routes/dbRoutes')(app);

// Since create-react-app doesn't exist in production.
// We have to instruct Node to let react router handle route it doesn't know
if (process.env.NODE_ENV === 'production') {
  //Express to serve up production assets.
  app.use(express.static('client/build'));
  //Express will serve up the index.html file if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.get("/ping", (req, res) => res.json({ status: "OK" }));
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));