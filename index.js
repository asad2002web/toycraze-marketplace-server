const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();

// middleware
app.use(cors());




app.get('/', (req, res) => {
    res.send('ToyCraze is running')
})

app.listen(port, () => {
    console.log(`ToyCraze Server 100 is running on port ${port}`)
})