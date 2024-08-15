const jwt = require("jsonwebtoken")

const verifyToken = (allowedRoles = []) => {
    return (req, res, next) => {

        const token = req.headers['authorization'];
        if (!token) return res.status(403).json({ msg: 'Forbidden' });

        jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ msg: 'Invalid token' });

            if (decoded) {
                var allowed = allowedRoles.length ? allowedRoles.includes(decoded.role) : true;
                if (allowed) {
                    req.verifiedUser = { id: decoded.id, role: decoded.role };
                    next();
                }
                else return res.status(403).json({ msg: 'Forbidden' })
            }
        })
    }
}

module.exports = verifyToken