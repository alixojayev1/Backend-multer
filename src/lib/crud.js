import { Router } from "express";
import fs from "fs";
import path, { join } from "path";
import { upload } from "./multer.js";


export const userRout = Router();


userRout.get('/user', (req,res)=>{
    const data = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "src", "model", "users.json"))
    )
    return res.send(data)
})



userRout.post("/user", upload.single("img"),(req,res)=>{
    const {name, img}= req.body;
    const {filename}= req.file;
    const data = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), "src", "model", "users.json"))
    )
    data.push({id:data.at(-1)?.id +1||1,
    name,
    img:`/img/${filename}`,
    download:`/download/${filename}`
})
fs.writeFileSync(path.join(process.cwd(), "src", "model", "users.json"), JSON.stringify(data, null,4))
    return res.send('post')
})

userRout.get('/img/:file', (req,res)=>{
    try {
       const {file}=req.params;
       return res.sendFile(join(process.cwd(), "uploads", file)) 
    } catch (error) {
        console.log(error);
    }
})

userRout.get('/download/:file', (req,res)=>{
    try {
       const {file}=req.params;
       return res.download(join(process.cwd(), "uploads", file)) 
    } catch (error) {
        console.log(error);
    }
})

userRout.delete('/user/img/:id', (req, res)=>{
    const { id } = req.params;
    const data = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "src", "model", "users.json"))
    );
    const fileId = data.find(u=>u.id == id)
    console.log(fileId.img.slice(5));
    fs.unlinkSync(path.join(process.cwd(),"uploads", fileId.img.slice(5)))
    

    const newData = data.filter((e) => e.id != id);
    fs.writeFileSync(
      path.join(process.cwd(), "src", "model", "users.json"),
      JSON.stringify(newData)
    );

  
   
    return res.send("delete");
})













