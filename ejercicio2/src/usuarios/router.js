import express from 'express';
import { viewLogin, doLogin, doLogout } from './controllers.js';

const usuariosRouter = express.Router();

// /usuarios/login
usuariosRouter.get('/login', viewLogin);    //mostrar el formulario del login
usuariosRouter.get('/logout', doLogout);    //cierra la sesion y muestra un mensaje de despedida
usuariosRouter.post('/login', doLogin);     //recibe los datos del formulario de login y valida el usuario y contrasenia

export default usuariosRouter;