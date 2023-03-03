# E-commerce. Por [Matías Bianchi](www.linkedin.com/in/matiasbianchi)

# [![CSS](https://img.shields.io/badge/Link%20al%20sitio-blueviolet)](https://matibian.github.io/mat-Ecommerce/)


# [AliArg - App con React.js](https://matibian.github.io/mat-Ecommerce)

## Frameworks , libraries y tools con sus versiones

[![Node](https://img.shields.io/badge/node-%2016.14.2-success)](https://reactjs.org/blog/2020/10/20/react-v17.html)

[![Node](https://img.shields.io/badge/npm-%208.5.0-success)](https://reactjs.org/blog/2020/10/20/react-v17.html)

[![React](https://img.shields.io/badge/react-%2018.2.0-success)](https://reactjs.org/blog/2020/10/20/react-v17.html)


[![React-Icons](https://img.shields.io/badge/react--icons-%5E5.8.4-success)](https://react-icons.github.io/react-icons/)

[![React-Router](https://img.shields.io/badge/react--router--dom-%5E6.4.0-success)](https://www.w3schools.com/react/react_router.asp)

[![Firebase](https://img.shields.io/badge/firebase-%5E8.9.1-success)](https://firebase.google.com/)

[![JS](https://img.shields.io/badge/JavaScript-ES6-success)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![CSS](https://img.shields.io/badge/CSS-success)](https://developer.mozilla.org/en-US/docs/Web/CSS)

## COMANDOS

Create a new React app
`npx create-react-app name`

Develop mode
` npm start`

React Router Dom
`npm install react-router-dom`

React Icons
`npm install react-icons --save`

Firebase v 8.9.1
`npm install firebase@9.10.0`

React-hook-form v 7.36.1
`npm install react-hook-form`

React-multi-carousel v 2.8.2
`npm install react-multi-carousel`


Deploy
`npm run build`

## Descripción

AliArg es un proyecyo ecommerce realizado en React.js de venta de productos informáticos. Los productos y la orden de compra con los pedidos se almacenan en firebase.

### Categorías

La web consta de una página principal donde se puede ver una presentación y un link de "Shop" donde se ingresa a visualizar la totalidad de los productos. En la barra de navegación se puede elegir entre las cuatro categorías de productos para visualizar. El logo de Home lleva a la visualización de todos los productos 

![Alt Text](https://i.postimg.cc/VvD2mMRp/AliArg1.gif)


Abajo de la presentación se puede ver un carrousel de productos correspondientes a los productos más nuevos. 

![Alt Text](https://i.postimg.cc/Dyn1hRWh/AliArg2.gif)


Además se pueden buscar los productos en la barra de búsqueda del NavBar. 

![Alt Text](https://i.postimg.cc/28FH4Pb9/Ali-Arg-Form.gif)


### Items

Cada card de productos muestra una imagen, el nombre del producto y tiene un botón que lleva a un modal que muestra una breve información y calificación del producto. El modal lleva a la pagina de descripcion del producto donde se puede agregar al carrito. Además la card de producto tiene un ícono desde el cual se puede agregarl al carro directamente. Todas las formas de agregar el producto cuentan con un control de stock y un cartel que muestra cuando se llega al límite.
El id del producto es agregado automaticamente por firebase.

### Carrito

El carrito muestra la totalidad de los productos elegidos y dispone de un contador para agregar o quitar cantidades del producto. Tiene un máximo según stock del producto y cuando se disminuye a cero, el producto se elimina del carrito. Además tiene botones para borrar individualmente los productos y la totalidad.
Cuenta con un select de opciones para sumar el valor del envío al total. 

![Alt Text](https://i.postimg.cc/44WX4Fwt/Ali-Arg-Cart1.gif)

Además puede usarse el codigo de descuento aliarg10 para obtener un descuento del 10%. En la orden luego se muestra el tipo de descuento al cual se accede

![Alt Text](https://i.postimg.cc/gkPzD5hT/Ali-Argdiscount.gif)

### Formulario

El formulario de generación de la orden consta con una validación completa, donde no se pueden dejar secciones vacías, introducir letras en el numero de telefono o numeros en los nombres. Además el mail debe si o si tener la estructura de un mail real para poder validarse. Todos los campos responden con un error si se introduce información inválida.

Al introducir correctamente la información, se muestra un cartel de éxito en la compra con la id del pedido, otorgada automaticamente por firebase.

![Alt Text](https://i.postimg.cc/28FH4Pb9/Ali-Arg-Form.gif)



### Mis pedidos
En la pestaña mis pedidos se puede ingresar el id de compra otorgado en el formulario para verificar el estado de la orden y el total del pedido.

![Alt Text](https://i.postimg.cc/wMGs14K5/Ali-Arg-Orders.gif)


## Librerías utilizadas

### React-multi-carousel v 2.8.2
Añade la funcionalidad de carrousel de los productos de "Novedades". Se agrega un valor de true o false dentro de las propiedades de los productos para que aparezcan en dicha sección. 

### Material UI v5
Casi la totalidad del proyecto fue armada con las herramientas que brinda esta librería. Para lograr un estilo acabado y completo con coherencia a traves de toda la experiencia de navegación. 

### Bootstrap v5.2
El único espacio creado con esta librería es el carrito. Buscando ejemplos como inspiración para crear el propio del proyecto, encontré uno que me gustó mucho, pero tenía mucho trabajo para cambiarlo. Así que aproveché la oportunidad de probar y practicar tambien esta librería que ya había utilizado en otros proyectos anteriores pero que no eran de React. Intenté igualmente hacerlo de manera que no chocara mucho con el estilo del resto de la proyecto. 

### React-hook-form v7.36.1
Utilicé esta librería para darle un tipo de valoración más profesional al formulario de orden del carrito. 









#### TO-DO

| Funcionalidades             | descripción                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| Login                       | Crear un login para verificar usuarios                                                               |
| Stock                       | Reducir la cantidad de stock de la base de datos al concluir una compra |
| Favoritos                   | Añadir una lista de favoritos generada por cada usuario. (Asociada al Login)                         |
