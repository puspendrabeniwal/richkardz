"user server";
import mongoose from "mongoose";
const loginSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }
});

const login = mongoose.model("users", loginSchema);
export default login