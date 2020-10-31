import UserCollection from '../models/userModel.js';

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

