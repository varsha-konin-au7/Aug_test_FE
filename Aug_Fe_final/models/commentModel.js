const mongoose = require('mongoose')

const commentScehma = new mongoose.Schema({
    comment: String,
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, 'A Comment should have valid postid']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A Comment should have valid userid']
    }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// commentScehma.statics.calculatelike = async function (postId){
//     const stats = await this.aggregate([
//         {
//             $match: { Post: PostId}
//         },
//         {
//             $group: {
// 				_id: '$Post',
// 				nRating: { $sum: 1 },
// 				avgRating: { $avg: '$rating' }
// 			}
//         }
//     ])
// }
commentScehma.pre(/^find/, function(next) {
this.populate({
    path: 'user',
    select: 'username'
  });
  next();
});

const Comment = mongoose.model('Comment', commentScehma)

module.exports = Comment