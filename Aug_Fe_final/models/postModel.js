const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type:String,
        required: [true , 'You must provide title to post']
    },
    description: {
        type:String,
        required: [true , 'You must provide description to post']
    },
    like: [{
        user:{
            type:mongoose.Schema.ObjectId,
            ref: 'User',
        }
    }],
    author: {
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true , 'You must provide user to post']
    },
    datetime: {
        type:String,
        required: [true , 'You must provide datetime of post']
    }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

postSchema.virtual('comment', {
    ref: 'Comment',
    foreignField: 'post',
    localField: '_id'
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post

