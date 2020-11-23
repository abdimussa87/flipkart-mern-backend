import UserCollection from '../models/userModel.js';
import jwt from 'jsonwebtoken';
export const signup = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    // *Checking if user exists
    UserCollection.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            res.status(400).json({ message: 'Email already in use' })
        } else {
            UserCollection.create({
                firstName: firstName, lastName: lastName, email: email, password: password, username: Math.random().toString()
            }, (err, data) => {
                if (err) {
                    res.status(500).send(err.message)
                } else {
                    res.status(201).json({ message: "User created successfully" });
                }
            });


        }
    });
}

export const signin = (req, res) => {
    UserCollection.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500).json({ message: err })
        } else if (user) {
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).send({ token, user: { _id, firstName, lastName, email, role, fullName } })

            }
            else {
                res.status(404).json({ message: 'Invalid credentials' })
            }
        } else {
            res.status(404).json({ message: 'Invalid credentials' })
        }
    })
}

export const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
        if (err) {
            res.status(500).json({ message: err })
        } else {
            req.userId = userId;
            next();
        }
    });

}