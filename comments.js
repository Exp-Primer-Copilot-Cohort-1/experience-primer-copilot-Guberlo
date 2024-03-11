// Create a web server
// 1. Create a web server
// 2. Handle GET requests to /comments
// 3. Handle POST requests to /comments
// 4. Handle PUT requests to /comments
// 5. Handle DELETE requests to /comments
// 6. Handle GET requests to /comments/:id
// 7. Handle 404
// 8. Start server on port 3000

const express = require('express');
const app = express();
app.use(express.json());

let comments = [
    { id: 1, author: 'user1', body: 'comment1' },
    { id: 2, author: 'user2', body: 'comment2' },
    { id: 3, author: 'user3', body: 'comment3' }
];

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    comments.push({ id: comments.length + 1, ...req.body });
    res.json({ message: 'Comment added' });
});

app.put('/comments/:id', (req, res) => {
    const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
    if (index >= 0) {
        comments[index] = { ...comments[index], ...req.body };
        res.json({ message: 'Comment updated' });
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
    if (index >= 0) {
        comments.splice(index, 1);
        res.json({ message: 'Comment deleted' });
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).json({ message: 'Comment not found' });
    }
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.listen(3000, () => {
    console.log('Server started