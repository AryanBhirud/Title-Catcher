import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import User from './models/User.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.post('/getinfo', async (req, res) => {
    try {
        const { name, url, about, bio, location, followerCount, connectionCount } = req.body;
        const newUser = await User.create({
            name: name, url: url, about: about, bio: bio, location: location, followerCount: followerCount, connectionCount:connectionCount,
        })
        res.status(200).send(newUser);
    } catch (err) {
        console.log(err.message);
    }
})

app.get('/ping', (req, res) => {
    res.send('pong');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });