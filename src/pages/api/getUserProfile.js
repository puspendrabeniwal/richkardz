import { connectMongodb } from "@/libs/connection";
import userProfileModel from "@/models/userProfile";
export default async function handler(req, res){
    await connectMongodb();
    if(req.method !== "POST"){
        res.status(405).send({
            message : "Only post request are required"
        });
        return
    } 

    try{
        userProfileModel.findOne({email : "admin@gmail.com"}).then((data)=>{
            res.status(201).send(data)
        })
    }catch(err){
        console.log(err)
    }
}