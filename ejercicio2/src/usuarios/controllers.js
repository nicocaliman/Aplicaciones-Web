import { body } from 'express-validator';

export function viewLogin(req, res) 
{
    const params = {
        contenido: 'paginas/login', // fichero ejs que tiene el contenido específico para esta vista
        session: req.session // Neesario para (entre otras cosas) utilizarlo en mostrarSaludo de cabecera.ejs
    }

    // Renderiza la vista del formulario de login
    res.render('pagina', params);
}

export function doLogin(req, res) 
{
    body('username').escape(); // Se asegura que eliminar caracteres problemáticos
    body('password').escape(); // Se asegura que eliminar caracteres problemáticos
    
    const {username, password} = req.body;  //body tiene la info del formulario (nombre usuario + password)

    const validUsers = 
    {
        'user':
        {
            password: 'userpass',
            role: 'Usuario'
        },

        'admin':
        {
            password: 'adminpass',
            role: 'Administrador'
        }
    }

    // Check if the username exists and password matches
    if (validUsers[username] && validUsers[username].password === password) {
        // Valid user - set session variables
        req.session.login = true;
        req.session.nombre = validUsers[username].role;
        
        if (username === 'admin') {
            req.session.esAdmin = true;
        }

        const params = {
            contenido: 'paginas/registrado', 
            session: req.session,
        };

        res.render('pagina', params);
    } else {
        const params = {
            contenido: 'paginas/errorLogin',
            session: req.session,
        };

        // Render login page with error message
        res.render('pagina', params);
    }
}

export function doLogout(req, res, next) {
    //https://expressjs.com/en/resources/middleware/session.html

 // Eliminar variables de sesión individualmente
 delete req.session.login;
 delete req.session.nombre;

 //si existe la variable esAdmin
 if (req.session.esAdmin) {
     delete req.session.esAdmin;
 }

 // Parámetros para la vista de despedida
 const params = {
     contenido: 'paginas/logOut', 
     session: req.session,
 };

 // Renderizar la página de despedida
 res.render('pagina', params);
    
}
