const mongoose =  require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'You must enter valid username']
    },
    email: {
		type: String,
		required: [ true, 'YOu must enter email' ],
		unique: true,
		lowercase: true,
		validate: [ validator.isEmail, 'Provide valid email' ]
	},
	password: {
		type: String,
		required: [ true, 'YOu must enter password' ]
	},
	confirmPassword: {
		type: String,
		required: [ true, 'Please confirm your password' ],
		validate: {
			validator: function(value) {
				return value === this.password;
			},
			message: 'Password are not same'
		}
	}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
) 

userSchema.virtual('post', {
	ref: 'Post',
	foreignField: 'author',
	localField: '_id'
})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
})

const User = mongoose.model('User', userSchema)

module.exports = User