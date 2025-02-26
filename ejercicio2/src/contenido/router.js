import express from 'express';
import session from 'express-session';

const contenidoRouter = express.Router();
    
contenidoRouter.get('/normal', (req, res) => {
    let contenido = 'paginas/noPermisos';
    if (req.session.login === true && req.session.nombre) {
        contenido = 'paginas/normal';
    }
    res.render('pagina', {
        contenido,
        session: req.session
    });
});

contenidoRouter.get('/admin', (req, res) => {
    let contenido = 'paginas/noPermisosAdmin'

    if (req.session.esAdmin) {
        contenido = 'paginas/admin';
    }

    res.render('pagina', {
        contenido,
        session: req.session
    });    
});

export default contenidoRouter;