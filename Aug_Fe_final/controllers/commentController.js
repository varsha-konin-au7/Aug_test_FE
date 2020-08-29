const Comment  = require('./../models/commentModel')

exports.createComment = async(req, res) => {
    try{
        const newComment = await Comment.create(req.body)
        res.status(201).json({
            status:'success',
            data: newComment
        })
    }catch(err){
        console.log(err)
    }
}

exports.getComment = async(req, res) => {
    try{
        const comments = await Comment.find().populate('post user')
        res.status(200).json({
            status:'success',
            length: comments.length,
            data: comments
        })
    }catch(err){
        console.log(err)
    }
}
