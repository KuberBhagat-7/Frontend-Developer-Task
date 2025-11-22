import jwt from 'jsonwebtoken';
import User  from '../models/userModel.js';

const protect = async (req, res, next) => {
    let token;
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user by ID
            req.user = await User.findById(decoded.userId).select('-password');
            
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }else if(req.cookies.jwt) {
        try {
            token = req.cookies.jwt;
            
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Find user by ID
            req.user = await User.findById(decoded.userId).select('-password');
            
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else{
        res.status(401).json({ message: 'Not authorized, no token' });
    }
   
}

export { protect };