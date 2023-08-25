"user server";
import { connectMongodb } from "@/libs/connection";
import login from "@/models/auth";
export default async function handler(req, res){
    if(req.method !== "POST"){
        res.status(405).send({
            message : "Only post request are required"
        });
        return
    } 

    const {loginRequest} = req.body

    try{
        await connectMongodb()
        login.findOne({email : "admin@gmail.com"}).then((data)=>{
            res.status(201).send(data)
        })
    }catch(err){
        console.log(err)
    }
}