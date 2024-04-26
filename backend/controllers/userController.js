import User from "../schemas/userSchema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userController = {
    getAllUsers: async (req, res)=>{
        try{
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status (500).json({message: err.message});
        }
    },

    getUser: async(req, res) =>{
        const { _id } = req.body;
        try{
            const user = await User.find({_id});
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message});
        }
    },

    createUser: async(req, res) =>{
        const { email, nickname, pw } = req.body;
        let isValid = await User.findOne({ email })
        if(isValid){
            return res.status(409).json({message: "이 이메일은 사용할 수 없습니다."});
        } 
        isValid = await User.findOne({ nickname })
        if(isValid) {
            return res.status(409).json({message: "이 이름은 사용할 수 없습니다."});
        }

        try{
            const newUser = new User({ email, nickname, pw });
            await newUser.save();
            res.status(201).json({ message: "회원가입 성공"});
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: err.message});
        }
    },

    loginUser: async(req,res) =>{
        const {email, pw} = req.body;
        try{
            const loginUser = await User.findOne({ email });
            console.log(loginUser);
            if(!loginUser){
                return res.status(404).json({message: "사용자를 찾을 수 없습니다."});
            }
            const validate = await User.findAndValidate(email, pw);
            if(!validate){
                return res.status(404).json({message:"잘못된 패스워드입니다."});
            }
            req.session.user_id = loginUser._id;
            res.json({message: "로그인 성공!"})
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }
}

export default userController