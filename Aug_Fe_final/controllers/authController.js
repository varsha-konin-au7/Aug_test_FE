const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try{
	const newUser = await User.create(req.body);

	id = newUser._id;

	const token = jwt.sign({ id }, 'abcdefebgudjnwksjcscjscsdjkcnjdc');
	const cookieOptions = {
		expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
		httpOnly: true
    };
    
	res.cookie('jwt', token, cookieOptions);

	res.status(201).json({
		status: 'success',
		token: token,
		data: newUser
    })
    }catch(err){
        console.log(err)
    }
}

exports.login = async (req, res) => {
    try{
        // console.log(req.body)
        const email = req.body.email;
        const password = req.body.password;
        // console.log(req.body)
        // console.log(email, password)
        if (!email || !password) throw new err('Please provide username or password', 404);
        const singleUser = await User.findOne({ email: email });
        // console.log(singleUser)
        const correct = await bcrypt.compare(password, singleUser.password);

        if (!singleUser || !correct) throw new err('Please provide valid username or password', 404);

        id = singleUser._id;
        const token = jwt.sign({ id }, 'abcdefebgudjnwksjcscjscsdjkcnjdc');
        // console.log(token);
        const cookieOptions = {
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };
        res.cookie('jwt', token, cookieOptions);
        res.status(200).json({
            status: 'success',
            token: token
        });
    }catch(err){
        console.log(err)
    }
}

exports.isLoggedIn = async (req, res, next) => {
	try {
        // console.log(req.headers.cookie)
        // console.log(req.headers.cookie.split('=')[1])
		if ((req.headers.cookie.split('=')[0] === 'jwt' )) {
			// 1) verify token
			const decoded = await jwt.verify(req.headers.cookie.split('=')[1], 'abcdefebgudjnwksjcscjscsdjkcnjdc');

            // console.log(decoded)
			// 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            // console.log(currentUser)
			if (!currentUser) {
				return next(new err('You must logged in to continue', 401));
			}
			// THERE IS A LOGGED IN USER
			req.user = currentUser;
			return next();
		}
		next(new err('You must logged in to continue', 401));
	} catch (err) {
		console.log(err)
	}
};


exports.getUser = async (req, res) => {
    try{
        const user = await User.find({email: req.user.email}).populate('post')
        console.log(user)
        res.json(user);
    }catch(err){
        console.log(err)
    }
}