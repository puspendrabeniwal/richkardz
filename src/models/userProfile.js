import mongoose from "mongoose";
const userProfileSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    }
});

const userProfileModel = mongoose.model("users", userProfileSchema);
export default userProfileModel