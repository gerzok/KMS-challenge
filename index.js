let express = require("express");
let app = express();

const indexRouter = require("./routes");

// Server port
let HTTP_PORT = 8000;
// Start server

if (process.env.NODE_ENV == "test") {
    HTTP_PORT = 5000;
}

app.listen(HTTP_PORT, () => {
  console.log(`Server running at http://localhost:${HTTP_PORT}`)
});

app.use(express.json());
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" });
});

app.use('/api', indexRouter);


app.use((req, res) => {
    res.status(404);
});

module.exports = { app };