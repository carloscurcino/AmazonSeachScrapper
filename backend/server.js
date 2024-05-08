const express = require('express')
const cors = require('cors');
const { scrape } = require('./scrape')
const app = express()

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' })
})

app.get('/scrape', async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ error: 'Missing keyword parameter' });
    }

    try {
        const data = await scrape(keyword); // Espere pela conclusão da chamada assíncrona

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Trate os erros adequadamente
    }
})

app.listen(3000)