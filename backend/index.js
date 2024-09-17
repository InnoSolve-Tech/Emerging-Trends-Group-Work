const express = require("express");

const app = express();

const port = process.env.PORT || 4000;

 // Root route to verify server is running
 app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

 // Start the server
 app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});