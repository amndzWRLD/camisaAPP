const mongoose = require('mongoose'); // importamos la librería Mongoose
const path = require('path'); //Modulo para rutas absolutas
// URI de conexión a MongoDB (MongoDB Atlas en este caso).
// Reemplaza <usuario>, <password> y <tuBase> por tus datos reales.
const mongoURI = "mongodb+srv://unseenmr82:123@cluster0.lvehoih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Opciones recomendadas para evitar advertencias (según la versión de Mongoose)
const options = {
useNewUrlParser: true, // Usa el nuevo parser de URL Mongo
useUnifiedTopology: true // Usa el nuevo motor de manejo de topologías
};
// Conectarse a la base de datos:
mongoose.connect(mongoURI, options)
.then(() => console.log('✅ Conectado a MongoDB Atlas')) // Éxito en la conexión
.catch(err => console.error('❌ Error de conexión:', err)); // Manejo de error

const express = require('express');
const routes = require('./rutas/rutasUsuario');
const app = express();
app.use(express.json());
app.use('/api/rutasUsuario',routes);
// Middleware para parsear JSON en las peticiones (body-parser integrado)

//app.use(express.static(path.join(__dirname, 'public')));
app.get('/camiseta', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'camiseta.html'));
});

app.get('/registro', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('login', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT =process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
