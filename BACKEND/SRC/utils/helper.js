import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config.js";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoid =(length)=>{
    return nanoid(length); 
}

export const signToken = (playload ) =>{
    return jsonwebtoken.sign(playload , process.env.JWT_SECRET, {expiresIn: "1h"});
}
export const verifyToken = (token) =>{
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id)
    return decoded.id
}