const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./routes/dbRoutes')(app);

app.get("/ping", (req, res) => res.json({ status: "OK" }));
const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));