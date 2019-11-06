const express = require('express');
const app = express();
const mongoose= require('mongoose');
const port= process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/iti',{useNewUrlParser:true, useUnifiedTopology: true});
const authMiddleware= require('./middleware/auth');

const authRouter= require('./routes/authRoutes');
const userRouter= require('./routes/users');
const postRouter= require('./routes/post');
const reviewRouter = require('./routes/review');


app.use(authRouter);
app.use(authMiddleware);
app.use('/users',userRouter);
app.use('/posts',postRouter);
app.use('/review',reviewRouter);

app.listen(port , (err)=>{
    if(err) console.log(err);
    else console.log(`listen on post ${port}`);
    
})