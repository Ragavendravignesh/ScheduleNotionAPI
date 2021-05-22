const getData = require('./services/notion')
const express = require('express')

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('public'))

app.get('/items', async (req, res) => {
    const data  = await getData();

    res.json(data);
})

app.listen(PORT, console.log(`Server is listening at port ${PORT}`));