import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique: true
    }, 
        artist:{
        type:String,
        required:true,
    },
    imagePath: {
        type:String,
        required: true,
        unique: true
    },
    runtime:{
        type:String,
        required:true        
    },

    difficulty: {
        enum: ["easy", "normal", "hard"]
    }
});

export default mongoose.model("Song", songSchema);