import express, {Express} from 'express';
import { SignupService } from '../service/user';

const sequelize = require('../models').sequelize;
const post = require('../models').Post;
const app: Express = express();
const port = 8000;

app.use(express.json());

app.post('/signup', async (req, res) => {
    const signupService = new SignupService();
    const signupUser = await signupService.signup(req.body);
    res.status(201).json({
        message: 'User created',
        userID: `Welcome ${signupUser.userID}`,
      })
})

app.post('/signin', async (req, res) => {
    const signinService = new SignupService();
    const token = await signinService.signin(req.body);
    res.status(200).json({
        message: 'User sign in',
        token,
    })
})

app.get('/', (req, res, next) => {
    res.send('Hello World! This is To do List');
    next();
})

app.get('/posts', async (req, res) => {
    const postList = await post.findAll();
    return res.send(postList);
})

app.post('/posts', async (req, res) => {
    const body = req.body;
    const description = body.description;
    const createPost = await post.create({
        description,
    });
    return res.send(createPost);
})

app.delete('/posts/:id', async (req, res) => {
    const postID = req.params.id;
    await post.destroy({
        where: {postID}
    });
    const postList = await post.findAll();
    return res.send(postList);
})

app.put('/posts/:id', async (req, res) => {
    const postID = req.params.id;
    const body = req.body;
    const description = body.description;
    await post.update({
        description
    },{
        where: {id: postID}
    });
    const postList = await post.findAll();
    return res.send(postList);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

sequelize.sync();