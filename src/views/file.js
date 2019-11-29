const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const file = './generate-template.vue';
app.get('/', (req, res) => {
  let html = req.query.html || '';
  html = html.split('"').join('');
  html = html.split('\\').join('"');
  const source = `<template>
    ${html}
</template>
<script>
export default {
  name: 'generate-template',
};
</script>
<style>
  .row div {
    padding: 10px 15px;
    background: rgba(86, 61, 124, 0.15);
    border: 1px solid rgba(86, 61, 124, 0.2);
    height: 70px;
  }
</style>
`;
  fs.writeFile(file, source, (err) => {
    if (err) {
      res.send(`ERROR: ${err}`);
    }
    res.send('');
  });
});

app.listen(3000, () => {
  console.log('listening on *:3000');
});
