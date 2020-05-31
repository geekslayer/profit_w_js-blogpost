'use strict';

const express = require("express");
const app = express();
const multer  = require('multer');
const Post = require('./services/post');
const PostService = require("./services/post");

// ################################################################ //

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});

const getExt = (mimetype) => {
    switch(mimetype){
        case "image/png":
            return '.png';
        case "image/jpeg":
            return '.jpg';
    }
}

var upload = multer({ storage: storage });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());

app.use('/uploads', express.static('uploads'));

// ################################################ //

const postServiceData = new PostService();

app.get("/api/posts", (req, res)=>{
    let results = postServiceData.get();

    results.then((data) => {
        res.status(200).send(data);
    })
    .catch((err) => {
        res.status(500).send(err);
    });
});

app.get("/api/posts/:postId", (req, res)=>{
    const postId = req.params.postId;
    const post = postServiceData.getPost(postId);

    post.then((data) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send("Not Found")
        }
    });
});

app.post("/api/posts", upload.single("post-image") ,(req, res)=>{
    
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": req.file.path,
        "added_date": `${Date.now()}`
    }
    
    postServiceData
        .add(newPost)
        .then((data) => {
            res.status(201).send(data);
        });
});

app.delete("/api/posts/:postId", (req, res) => {
    let postId = req.params.postId;
    
    try {
        postServiceData.delete(postId);
        res.status(200).send('ok');
    } catch(e) {
        res.status(500).send(e);
    }
    
});

app.post("/api/posts/cleanslate", (req, res) => {
    if (req.query['cleanall'] === '1') {
        postServiceData.deleteAll();
        res.status(200).send('ok');
    } else {
        res.status(401).send('not ok');
    }
});

app.post("/api/posts/populate", (req, res) => {
    try {
        postServiceData.createBasePosts();
        res.status(200).send('Everything good');
    } catch(e) {
        res.status(500).send(e);
    }
});

app.listen(3000, ()=>console.log("Listening on http://localhost:3000/"));