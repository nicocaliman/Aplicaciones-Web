import { notFound, estatico } from "./controladores.mjs";
import { baseUrl } from './config.mjs';

export function requestListener(req, res) {
    let handler = null;

    // procesa URLs que hacen referencia a ficheros / directorios que están dentro del directorio static
    if (estatico(req, res)) {
        return;
    }

    const url = new URL(`${baseUrl}${req.url}`);
    const path = url.pathname;
    switch(path) {
        case "/saludos.php":
            handler = saludo;
            break;    
        default:
            handler = notFound;
            break;
    }
    handler(req, res);
}


function saludo(req, res) {
    const url = new URL(`${baseUrl}${req.url}`);

    const params = url.searchParams;
    const num = parseInt(params.get("num")) || 0;
    
    let saludo = "";

    if(num == 42)
    {
        saludo = `<p>En realidad, esa es la pregunta final sobre <strong> la vida, el universo y todo lo demás.</strong></p>`;
    }

    else
    {
        for(let i = 0; i < num; ++i)
        {        
            saludo += `<p>${i} - ¡Hola Mundo!</p>`;
        }
    }

    res.setHeader("Content-Type", "text/html");
     res.writeHead(200);
 res.end(`<!DOCTYPE html>
 <html>
 <head>
    <title>
        PHP
    </title>
    <meta charset="UTF-8">
 </head>
 <body>
 <h1>
    Me has pedido que te salude ${num} veces. 
 </h1>
 <p>
    Pulsa en <a href = "index.html"> inicio</a> para volver al ejercicio.
 </p>  
 ${saludo}
 </body>
</html>
 `);
};