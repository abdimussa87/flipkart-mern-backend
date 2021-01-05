import UserCollection from '../../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import shortId from 'shortid'
export const signup = (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    // *Checking if user exists
    const hashPassword = bcrypt.hash(password, 10)
    UserCollection.findOne({ email: req.body.email }, async (err, user) => {
        if (user) {
            res.status(400).json({ message: 'Email already in use' })
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            UserCollection.create({
                firstName: firstName, lastName: lastName, email: email, hashPassword, username: shortId.generate(), role: 'admin'
            }, (err, data) => {
                if (err) {
                    res.status(500).send(err.message)
                } else {
                    res.status(201).json({ message: "Admin created successfully" });
                }
            });


        }
    });
}

export const signin = (req, res) => {
    UserCollection.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            res.status(500).json({ message: err })
        } else if (user) {
            const validCredential = await bcrypt.compare(req.body.password, user.hashPassword)
            if (validCredential && user.role === 'admin') {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
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

