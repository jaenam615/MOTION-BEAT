import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    nickname:{
        type:String,
        required:true,
        maxlength: 15,
        unique: true,        
    },
    pw:{
        type:String,
        required:true,
        minlength: 6
    },
    favorite: [
    ]
});

userSchema.statics.findAndValidate =  async function (email, pw){
    const foundUser = await this.findOne({email});
    const validate = await bcrypt.compare(pw, foundUser.pw);
    return validate? foundUser : false; 
}

userSchema.pre('save', async function(next){
    if (!this.isModified('pw')) return next();
    this.pw = await bcrypt.hash(this.pw, 12);
    console.log(this);
    next();
})

module.exports = mongoose.model("User", userSchema);