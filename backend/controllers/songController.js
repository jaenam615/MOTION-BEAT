import Song from "../schemas/songSchema.js";
import mongoose from "mongoose";

const songController = {
    getAllSongs: async (req, res)=>{
        try{
            const songs = await Song.find({});
            res.json(songs);
        } catch (err) {
            console.log(err);
            res.status (500).json({message: err.message});
        }
    },

    getSongById: async(req, res) =>{
        try{
            const song = await Song.findById(req.params.id);
            if(song){
                res.json(song);
            } else {
                res.status(404).json({message: "곡을 찾을 수 없습니다."});
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message});
        }
    }
}

export default songController