const express = require('express')
const { scrape } = require('./scrape')
const app = express()

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!' })
})

app.get('/teste', (req, res) => {
    res.status(200).json({ message: 'teste' })
})

app.get('/scrape/:word', async (req, res) => {
    try {
        const data = await scrape(req.params.word); // Espere pela conclusão da chamada assíncrona
        res.send(data); // Envie os dados de volta como resposta
    } catch (error) {
        res.status(500).json({ error: error.message }); // Trate os erros adequadamente
    }
})

app.listen(3000)