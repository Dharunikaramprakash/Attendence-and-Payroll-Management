import jwt from "jsonwebtoken";

export const verifyUser=(req,res,next)=>{
    let token;
   const authHead= req.headers.authorization

   if(authHead && authHead.startsWith("Bearer ")){
    token= authHead.split(" ")[1]
   }
   if(!token){
    return res.json({message:"not authorized"})
   }
   const decoded = jwt.verify(token,"jwt-token")

   req.user=decoded;
   next()
}