const Post = require('./../models/postModel')

exports.postData = async(req, res) => {
    try{
        const newPost =await Post.create(req.body)
        res.status(201).json({
            status: 'success',
            data: newPost
        })
    }catch(err){
        console.log(err)
    }
}


exports.getSinglepost = async(req, res) => {
    try{
        console.log(req.params)
        const newPost =await Post.findById(req.params.id).populate('comment')
        res.status(201).json({
            status: 'success',
            data: newPost
        })
    }catch(err){
        console.log(err)
    }
}


exports.getData = async(req, res) => {
    try{
        const newPost =await Post.find().populate('author')
        res.status(200).json({
            length: newPost.length,
            data: newPost
        })
    }catch(err){
        console.log(err)
    }
}

exports.deletePost = async(req, res) => {
    try{
        console.log(req.user)
        console.log(req.body)
        let doc
        if (req.user._id == req.body.userid){
            console.log("deleted")
            doc = await Post.findByIdAndDelete(req.body.postid)
        }
        if (!doc){
            throw new err('No Document found', 404)
        }
        res.status(204).json({
            status: 'success',
            data: null
          });
    }catch(err){
        console.log(err)
    }
}

exports.likePost = async(req, res) => {
    try{
        // console.log("From post like controler")
        // console.log(req.params)
        // console.log(req.user)
        const post = await Post.findById(req.params.id)
        let data = post.like
        // console.log(data)
        data.push(req.user._id)
        // console.log(post)
        // console.log("Data grabbed after pushing",data)
        const newPost =await Post.findByIdAndUpdate(req.params.id, {
            like: data
        }, {new: true,
        runValidators: true})
        // console.log(newPost)
        res.status(201).json({
            status: 'success',
            data: newPost
          });
    }catch(err){
        console.log(err)
    }
}