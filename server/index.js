import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5173;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.resolve(__dirname, '..', 'dist', 'index.html');

app.use(express.static(
    path.resolve(__dirname, '..', 'dist'),
    { maxAge: '30d' },
));

app.get('/test/:id', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', async (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // get post info
        const postId = req.params.id;
        console.log(postId);
        const post = await fetch(`https://fakestoreapi.com/products/${postId}`)
            .then(res => res.json())
            .then(json => json);
        console.log(post);
        if (!post) return res.status(404).send("Post not found");

        // inject meta tags
        htmlData = htmlData.replace(
            "<title>React App</title>",
            `<title>${post.title}</title>`
        )
            .replaceAll('__META_OG_TITLE__', post.title)
            .replaceAll('__META_OG_DESCRIPTION__', post.description)
            .replaceAll('__META_DESCRIPTION__', post.description)
            .replaceAll('__META_OG_IMAGE__', post.image)
        return res.send(htmlData);
    });
});

app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});