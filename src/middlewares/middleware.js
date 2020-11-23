import jwt from 'jsonwebtoken'
export const isAuthorized = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Authorization required");
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, { userId, role }) => {
        if (err) {
            res.status(500).json({ message: err })
        } else {
            req.userId = userId;
            req.role = role;
            next();
        }
    });

}

export const isAdmin = (req, res, next) => {

    if (req.role !== "admin") {
        res.status(401).send("Unauthorized admin")
    } else {
        next();
    }
}

export const isUser = (req, res, next) => {

    if (req.role !== "user") {
        res.status(401).send("Unauthorized user")
    } else {
        next();
    }
}

