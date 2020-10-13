const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 3030;
const http = require('http').createServer(app);

// Express App Config
app.use(bodyParser.json({
    limit: '10mb'
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})

http.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
})


