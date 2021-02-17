import express, {Express} from 'express';
import { noExtendLeft } from 'sequelize/types/lib/operators';

const sequelize = require('../models').sequelize;
const post = require('../models').Post;
const app: Express = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('Hello World! This is To do List');
    next();
})

app.get('/posts', async (req, res, next) => {
    const postList = await post.findAll();
    return res.send(postList);
})

app.post('/posts', async (req, res, next) => {
    const body = req.body;
    const description = body.description;
    const createPost = await post.create({
        description,
    });
    return res.send(createPost);
})

app.delete('/posts/:id', async (req, res, next) => {
    const postID = req.params.id;
    const deletePost = await post.destroy({
        where: {postID}
    });
    const postList = await post.findAll();
    return res.send(postList);
})

app.put('/posts/:id', async (req, res, next) => {
    const postID = req.params.id;
    const body = req.body;
    const description = body.description;
    const findPost = await post.update({
      description
    },{
      where: {id: postID}
    });
    const postList = await post.findAll();
    return res.send(postList);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

sequelize.sync();