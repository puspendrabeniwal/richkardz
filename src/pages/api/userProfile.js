import { connectMongodb } from "@/libs/connection";
import userProfileModel from "@/models/userProfile";

export default async function handler(req, res){
    if(req.method !== "POST"){
        res.status(405).send({
            message : "Only post request are required"
        });
        return
    } 

    console.log(req.body, "req.body")
    try{
        await connectMongodb()
        userProfileModel.updateOne({email : "admin@gmail.com"},{first_name : req.body.first_name}).then((data)=>{
            res.status(201).send(data)
        })
    }catch(err){
        console.log(err)
    }
}