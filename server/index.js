
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';

import postRouter from './routes/posts.js';

const CONNECTION_URL = 'mongodb+srv://mongodbuser:mongo@nodeproject.15lxv.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

//connecting to mongo db
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server is listening on : ${PORT}`)))
    .catch((error) => console.log(error.message));

//to avoid any warning from mongoDB
mongoose.set('useFindAndModify', false);

const app = express();
app.use(cors());
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/posts', postRouter);



