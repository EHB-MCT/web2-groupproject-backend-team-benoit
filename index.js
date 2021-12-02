import * as mongo from './mongo.js';

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

import * as bodyParser from 'body-parser';
import * as nodemon from 'nodemon';
import {
    cp
} from 'fs';

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(300).redirect('/info.html');
})

app.get('/challenges', async (req, res) => {
    try {
        await mongo.connectToDatabase();
        let challenges = await mongo.getChallenges();
        res.status(200).send(challenges);
    } catch (error) {
        console.log(error);
    } finally {
        mongo.closeDatabaseConnection();
    }
})

app.post('/challenges', async (req, res) => {
    console.log(req.body);
    if (!req.body.name || !req.body.points || !req.body.course) {
        res.status(400).send('Bad request: name, points, course missing')
        return;
    }

    try {
        await mongo.connectToDatabase();
        const newChallenge = req.body;
        await mongo.addChallenge(newChallenge);
        res.status(200).send("Challenge added!")
    } catch (error) {
        console.log(error);
    } finally {
        mongo.closeDatabaseConnection();
    }
});

app.put("/challenges/:id", async (req, res) => {
    let {
        id
    } = req.params;
    if (!req.body.name || !req.body.points || !req.body.course) {
        res.status(400).send('Bad request: name, points or course missing')
        return;
    }

    try {
        await mongo.connectToDatabase();
        const updatedChallenge = req.body;
        await mongo.updateChallenge(id, updatedChallenge);
        res.status(200).send("Challenge updated");
    } catch (error) {
        console.log(error)
    } finally {
        mongo.closeDatabaseConnection();
    }

})

app.delete("/challenges/:id", async (req, res) => {
    const {
        id
    } = req.params;
    try {
        await mongo.connectToDatabase();
        await mongo.deleteChallenge(id);
        res.status(200).send("Challenge deleted");
    } catch (error) {
        console.log(error)
    } finally {
        mongo.closeDatabaseConnection();
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})