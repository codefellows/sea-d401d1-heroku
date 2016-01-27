const express = require('express');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();
const fs = require('fs');

mongoose.connect(process.env.MONGOLAB_URI);
console.log('shhhhhh, it\'s a secret:' + process.env.APP_SECRET);

var Message = mongoose.model('Message', new Mongoose.Schema({
  msg: String
}));

const app = express();
app.post('/api/message', jsonParser, (req, res) => {
  var msg = new Message(req.body);
  msg.save((err, data) => {
    if (err) return res.status(500).json({msg: 'server err'});

    res.json(msg);
  });
});

app.get('*', (req, res) => {
  var index = fs.createReadStream(__dirname + '/index.html');
  index.pipe(res);
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('server up on port: ' + port));
