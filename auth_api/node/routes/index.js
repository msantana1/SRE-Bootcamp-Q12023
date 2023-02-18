import { login } from './login.js';
import { protect } from './protected.js';
import { health } from '../services/health.js';


export const init = (app) => {
  app.post('/login', login);
  app.get('/protected', protect);
  app.get('/_health', health);
};
