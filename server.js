const express = require('express');
const cors = require('cors');

const PORT = 8180;
const webServer = express();
const results = {
    "Victor": "0",
    "Sally": "0",
    "John": "0",
    "Sue": "0",
    "Jill": "0"
}

webServer.use(express.json());

webServer.use(express.urlencoded({ extended: true }));
webServer.use(cors());


webServer.get(`/`, (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

webServer.post(`/stat`, (req, res) =>{
    res.send(JSON.stringify(results));
});

// Тут я могу и через ссылку передать, и в теле. Давайте попробуем через ссылку сделать?!
webServer.post(`/vote/:name`, (req, res) =>{
    const name = req.params.name;
    results[name]++;
    res.send(results);
});

webServer.get('/variants', (req, res) => {
    res.send(Object.keys(results));
});


webServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});