const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        title:{
            type:String,
            max: 500
        },
        Desc:{
            type:String,
            required: true
        },
        Image:{
            type:Array,
            default:[],
            required: true
        },
        Price:{
            type:Number,
            required: true
        },
        Stock:{
            type:Number,
            required: true
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("Uploads", UploadSchema);