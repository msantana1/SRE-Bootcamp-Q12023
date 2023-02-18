import * as dotenv from 'dotenv';
import e from 'express';
import jwt from 'jsonwebtoken';

export const protectFunction = (authorization) => {
  //Validating header content
  let jwttoken = verifyToken(authorization)
  //Validating wrong headers
  if(jwttoken === 'Error' || typeof jwttoken === 'undefined'){
    return 'Invalid headers';
  }
  try{
    //Reading token
    let userObj = jwt.verify(jwttoken, process.env.JWT_TOKEN);
    //return userObj;
    return "You are under protected data";
  }catch(err){
    //return error
    return 'Invalid token';
  }
}

const verifyToken = (bearerHeader) => {
  //Validating header is not undefined
  if(typeof bearerHeader !== 'undefined'){
    //Get only token from header
    let bearerHeaderStr = bearerHeader.split(" ")[0];
    if(bearerHeaderStr != 'Bearer'){
      return 'Error';
    }else{
      let bearerToken = bearerHeader.split(" ")[1];
      return bearerToken;
    }
  }else{
    return 'Error';
  }
}
