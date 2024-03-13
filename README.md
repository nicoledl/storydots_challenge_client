# storydots_challenge_server
# HI!Buy

## Descripción

En este proyecto se muestra un e-commerce donde muestra los productos que son ofrecidos por un administrador de la página.

## Funcionalidades

De parte del front end se puede ver que se desplegan los productos existentes en la base de datos, cada producto está exihbido en una carta y al ser clickeados se desplega un modal donde muestra más información sobre el producto.
Luego existen rutas privadas para el administrador de la página. En esta se pueden cargar nuevos productos y nuevas marcas, cada uno con su dashboard. Se tiene manejo de crear, editar y borrar productos y marcas. Además el dashboard de productos muestra la información completa al hacer click en su fila.

## Librerías utilizadas

En este proyecto se utilizó el framework Nextjs, para mi gusto al ser una página donde no vaya a tener mucho diseño por el tiempo que se le dió decidí hacer el diseño usando module.css/css.
En el front se utilizó como adicional solo la librería "react-icons".

## FrontEnd

Un adicional para mencionar sobre el frontend es la carpeta utils en donde se encuentran las funciones para traer datos del servidor.

## Cómo funciona el backend

Este lado del proyecto maneja la conexión a la base de datos, se usó cors para el manejo del origen del pedido. En la carpeta config se encuentra la configuración cors y la configuración para la conexión a la base de datos. En la carpeta db se encuentran los modelos, la relaciones de tablas y la función a la conexión a la base de datos. En la carpeta utils se encuentra la función jwt, y el middleware del mismo.

## Endpoints disponibles

En el backend existen cuatro rutas, estas son user, products y brands verify-token.
Existe el middleware "verifyToken" que verifica la validación del token que da acceso a algunos endpoint, por ejemplo de para creación, modificación y eliminar.

User tiene dos endpoints:
/user/...
	Post/ crea un usuario. Utiliza el middleware verifyToken.
	Post/ login genera un inicio de sesión del usuario y da accesó a usar otros endpoint. Utiliza el middleware verifyToken.

Products tiene 6 endpoints:
/products/...
	POST/ crea un producto. Utiliza el middleware verifyToken.
	GET/ trae todos los productos con todos los datos.
	GET/:id trae un producto basandose en id pasado por parametro.
	PUT/:id modifica un producto basandose en el id pasado por parametro. Utiliza el middleware verifyToken.
	DELETE/:id borra un producto basandose en el id pasado por parametro. Utiliza el middleware verifyToken.

Brands tiene 3 endpoints:
/brands/...
	POST/ crea una marca. Utiliza el middleware verifyToken.
	GET/ trae todas las marcas con sus datos.
	DELETE/:id borra una marca basandose en el id pasado por parametro. Utiliza el middleware verifyToken.

Existe un endpoint para la ruta principal "/", este lo cree para verificar si el token creado por el usuario al hacer login seguía siendo válido.
/verify-token/...
	GET/ devuelve un status 200 si pasó correctamente el middleware.

## Cómo levantar el proyecto en local

El proyecto está separado en dos repositorios.

1- Descargar los repositorios:
Frontend: https://github.com/nicoledl/storydots_challenge_client
Backend: https://github.com/nicoledl/storydots_challenge_server

2- Archivos .env
Frontend: se crea un archivo .env.local y se escribe "NEXT_PUBLIC_API_URL=http://localhost:3000/"
Backend: se crea un archivo .env y se escribe los datos de tu base de datos local, además de secret key de JWT y el puerto. Estos son los datos que deben estar: PORT, JWT_SECRET_KEY, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_HOST, DB_DIALECT.

3- Desde tu terminal
Abres una terminal dentro de la carpeta del cliente corres el comando "npm start"
Abres otra terminal y ahora estando dentro de la carpeta del servidor corres este comando "npm start"

4- Navegador
Abres tu navegador y en la barra de direcciónes escribes el localhost predeterminado.


## Deploy

Utilicé para deployar el frontend Vercel, y para le backend Render.
**Para logearse como administrador hay que usar el user "admin"(minuscula) y la constraseña "1234".**

Este es el link a la página:
https://storydots-challenge-client-git-main-nicoledl.vercel.app