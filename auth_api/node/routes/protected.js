import { protectFunction } from '../services/protected.js';

export const protect = (req, res, next) => {
  let authorization = req.headers.authorization;

  let response = {
    "data": protectFunction(authorization)
  };

  //Validating correct data
  if(response.data === 'Invalid headers'){
    res.send({
      "Error": response.data
    });
    next();
  }else if(response.data === 'Invalid token'){
    res.send({
      "Error": response.data
    });
    next();
  }else{
    //Correct data
    /*let userdata = {
      "Message": "Token valid, welcome",
      "Username": response.data.user.username,
      "Role": response.data.user.role
    }
    res.send(userdata);*/
    res.send(response);
    next();
  }
}
