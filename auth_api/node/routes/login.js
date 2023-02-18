import { loginFunction } from '../services/login.js';

export const login = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  
  let response = {
    "data": await loginFunction(username, password)
  };
  
  //Validate content of data
  if(response.data == 'Password incorrect' || response.data == 'Username and password required' || response.data == 'Username not found' ){
    res.status(400).json({
      Error : response.data
    })
  }else{
    //correct data
    res.send(response);
    next();
  }
}
