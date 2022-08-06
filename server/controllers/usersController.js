const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = id => {

    return jwt.sign({
        id
    }, process.env.SECRET, {
        expiresIn: '10d'
    })
}

const loginUser = async (req, res) => {
    const {
        error
    } = User.validateLogin(req.body)

    try {
        if (error) throw Error(error.details[0].message)

        const {
            id,
            firstName,
            email
        } = await User.login(req.body)
        const token = createToken(id)

        return res.status(200)
            .json({
                id,
                firstName,
                email,
                token
            })
    }
    catch (error) {
        res.status(400)
            .json({
                error: error.message
            })
    }
}

const signupUser = async (req, res) => {
    const {
        error
    } = User.validateSignup(req.body)

    try {
        if (error) throw Error(error.details[0].message)

        const {
            id,
            firstName,
            email
        } = await User.signup(req.body)
        const token = createToken(id)

        return res.status(200)
            .json({
                id,
                firstName,
                email,
                token
            })
    }
    catch (error) {
        if (error.code === 'P2002')
            return res.status(400)
                .json({
                    error: 'User already exists'
                })
        else res.status(400)
            .json({
                error: error
            })
    }
}

module.exports = {
    loginUser,
    signupUser
}