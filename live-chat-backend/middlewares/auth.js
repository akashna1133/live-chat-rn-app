
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('Authorization');
    const secretKey = "sample_token";
    console.log('Token value :: 111 ')
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    console.log('Token value :: 222 ')

    try {
        const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzg3OWJhZDg2MDhkYTUwZjIzMDI1MGMiLCJpYXQiOjE3MzY5NDk5MjQsImV4cCI6MTczNjk1MzUyNH0.IY7oK9tvQmupzcX0BMEHQK8bgNy9wG1lgAyuA7C47DE', secretKey);
        console.log('Token value :: ', decoded)
        
        req.user = decoded.userId;
        next();
    } catch (err) {
        console.log('Token value :: ', err)
        return res.status(401).json({ error: 'Token is not valid' });
    }
};

