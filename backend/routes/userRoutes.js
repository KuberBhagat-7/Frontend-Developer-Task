import express from 'express';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password });
        if (user) {
            generateToken(res,user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        generateToken(res,user._id),
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
    
})


router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
})

router.put('/profile', protect, async (req, res) => {
    const {name , currentPassword, newPassword} = req.body;

    const user = await User.findById(req.user._id);

    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if(name){
        user.name = name;
    }
    if(currentPassword && newPassword) {
        if(await user.matchPassword(currentPassword)) {
            user.password = newPassword;
        } else {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
    }

    try {
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }

})

router.post("/logout", (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,    // same as login
    sameSite: "Lax",  // same as login
    path: "/",        // must match login cookie path
  });

  res.status(200).json({ message: "Logged out successfully" });
});


export default router;