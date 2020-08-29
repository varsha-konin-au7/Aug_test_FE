const express = require('express')
const compression = require('compression');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const cors = require('cors');

const app = express()

app.use(cors());

app.use(express.json())

app.use(compression());

app.use('/api/v1/users', userRouter)
app.use('/api/v1/post', postRouter)
app.use('/api/v1/comment', commentRouter)




app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message
	});
});


module.exports = app