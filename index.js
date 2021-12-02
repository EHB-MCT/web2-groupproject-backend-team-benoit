const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(300).redirect('/info.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});