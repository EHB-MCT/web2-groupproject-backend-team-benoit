import * as mongo from './mongo.js';

import express from 'express';
const app = express();
const port = 3000;

import * as bodyParser from 'body-parser';
import * as nodemon from 'nodemon';

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(300).redirect('/info.html');
})

app.get('/challenges', async (req,res)=> {
    try{
        await mongo.connectToDatabase();
        let challenges = await mongo.getChallenges();
        mongo.closeDatabaseConnection();
        res.status(200).send(challenges);
    } catch (error) {
        console.log(error);
    }
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});