import "babel-polyfill";
import chai from 'chai';
import { loginFunction } from '../services/login';
import { protectFunction } from '../services/protected';

const expect = chai.expect;

describe('Testing correct data', function () {
  it('Test correct credentials only', async function () {
    let credentials = [
      ['admin','secret'],
      ['noadmin','noPow3r'],
      ['bob','thisIsNotAPasswordBob'],
    ];
    for (const index of credentials){
      let token = await loginFunction(index[0], index[1]);
      //console.log(token);
      expect("Password incorrect").to.not.equal(token) && expect("Username and password required").to.not.equal(token) && expect("Username not found").to.not.equal(token);
    }
  });
  it('Test correct credentials and validating correct token', async function () {
    let credentials = [
      ['admin','secret'],
      ['noadmin','noPow3r'],
      ['bob','thisIsNotAPasswordBob'],
    ];
    for (const index of credentials){
      let token = await loginFunction(index[0], index[1]);
      //console.log(token);
      let data = await protectFunction('Bearer '+token);
      //console.log(data);
      expect("You are under protected data").to.be.equal(data);
    }
  });
});

describe('Testing wrong data', function () {
  it('Test wrong credentials', async function () {
    let credentials = [
      ['admin','secret_'],
      ['noadmin','noPow3r_'],
      ['bob','thisIsNotAPasswordBob_'],
    ];
    for (const index of credentials){
      let token = await loginFunction(index[0], index[1]);
      //console.log(token);
      expect("Password incorrect").to.be.equal(token);
    }
  });
  it('Test wrong user', async function () {
    let credentials = [
      ['admin_','secret'],
      ['noadmin_','noPow3r'],
      ['bob_','thisIsNotAPasswordBob'],
    ];
    for (const index of credentials){
      let token = await loginFunction(index[0], index[1]);
      //console.log(token);
      expect("Username not found").to.be.equal(token);
    }
  });
  it('Test wrong missing username/password', async function () {
    let credentials = [
      ['','secret'],
      ['noadmin_',''],
      ['',''],
    ];
    for (const index of credentials){
      let token = await loginFunction(index[0], index[1]);
      //console.log(token);
      expect("Username and password required").to.be.equal(token);
    }
  });
  it('Test correct credentials but wrong token', async function () {
    let credentials = [
      ['admin','secret'],
      ['noadmin','noPow3r'],
      ['bob','thisIsNotAPasswordBob'],
    ];
    for (const index of credentials){
      let token = await loginFunction(index[0], index[1]);
      //console.log(token);
      let data = await protectFunction('Bearer '+token+'hh');
      //console.log(data);
      expect("Invalid token").to.be.equal(data);
    }
  });
  it('Test correct credentials but wrong Bearer header', async function () {
    let credentials = [
      ['admin','secret'],
      ['noadmin','noPow3r'],
      ['bob','thisIsNotAPasswordBob'],
    ];
    for (const index of credentials){
      let token = await loginFunction(index[0], index[1]);
      //console.log(token);
      let data = await protectFunction('Bearer-'+token);
      //console.log(data);
      expect("Invalid headers").to.be.equal(data);
    }
  });
});
