import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getQuery } from '../database.js';
import crypto from 'crypto';

dotenv.config();

export const loginFunction = async (username, password) => {

  //Validating credentials are not missing
  if(!username || !password){
    return 'Username and password required';
  }

  //Getting data from DB
  const user = await getQuery(username);

  //Validating user found
  if(Object.keys(user).length == 0){
    return 'Username not found';
  }

  //append salt to password
  let saltedpassword = password+user[0].salt;
  //hash SHA512
  var hash = crypto.createHash('sha512');
  var data = hash.update(saltedpassword).digest('hex');

  //Validating correct password
  if(user[0].password != data){
    return 'Password incorrect';
  } 

  //format data
  const userj = {
    username: user[0].username,
    role: user[0].role
  }

  //Creating JWT token
  let jwttoken = jwt.sign(
    { user: userj },
    process.env.JWT_TOKEN/*,
    {
      expiresIn: "5m",
    }*/
  )
  return jwttoken;
}
