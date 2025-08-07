const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/usuarioesquema');

// Obtener todos los usuarios
exports.obtenerusuarios = async (req, res) => {
try {
    const usuarios = await Usuario.find(); // Busca todos los documentos de usuarios en la BD
        res.json(usuarios); // Responde con la lista en formato JSON
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' }); // Error genérico en caso de fallo
    }
};

// Obtener un usuario por ID
exports.obtenerusuariosporid = async (req, res) => {
    try {
    const usuario = await Usuario.findById(req.params.id); // Busca usuario por el ID proporcionado
    if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' }); //Si no existe, 404
    }
    res.json(usuario); // Si existe, lo devolvemos en JSON
    } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
    }
};

// Crear un nuevo usuario
exports.crearusuarios = async (req, res) => {
  try {
    const { nombre, email, clave } = req.body;
    // 1. Generar un salt (semilla aleatoria) para el hash
    const salt = await bcrypt.genSalt(10);                  // 10 rondas de generación de salt
    // 2. Hashear la contraseña proporcionada usando el salt generado
    const hash = await bcrypt.hash(clave, salt);
    // 3. Crear y guardar el nuevo usuario con la contraseña hasheada
    const nuevoUsuario = new Usuario({ nombre, email, clave: hash });
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);             // Devuelve el usuario creado con codigo 201
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear usuario' }); //Posibles errores de validación
  }
};


// Actualizar un usuario existente
exports.actualizarusuarios = async (req, res) => {
try {
const datosActualizados = req.body;
const usuarioActualizado = await Usuario.findByIdAndUpdate(
req.params.id,
datosActualizados,
{ new: true } // opción new:true para obtener el documento actualizado
);
if (!usuarioActualizado) {
return res.status(404).json({ error: 'Usuario no encontrado' });
}
res.json(usuarioActualizado);
} catch (error) {
res.status(400).json({ error: 'Error al actualizar usuario' });
}
};
// Eliminar un usuario
exports.eliminarusuarios = async (req, res) => {
try {
const usuarioEliminado = await
Usuario.findByIdAndDelete(req.params.id);
if (!usuarioEliminado) {
return res.status(404).json({ error: 'Usuario no encontrado' });
}
res.json({ message: 'Usuario eliminado' });
} catch (error) {
res.status(500).json({ error: 'Error del servidor' });
}
};



// Login de usuario (autenticación)
exports.login = async (req, res) => {
  try {
    const { email, clave } = req.body;
    
    // 1. Buscar al usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' }); // No se encontró el email
    }
    // 2. Verificar la contraseña con bcrypt.compare
    const passwordOk = await bcrypt.compare(clave, usuario.clave);
    if (!passwordOk) {
      return res.status(401).json({ error: 'Credenciales inválidas' }); // Contraseña incorrecta
    }
    
    // 3. Credenciales válidas: Generar token JWT
    const datosToken = { id: usuario._id };            // Podemos incluir datos en el token (p.ej. el ID de usuario)
    const secreto = 'SECRETO_SUPER_SEGUR0';            // Clave secreta para firmar el token (en producción, mantener en una variable de entorno)
    const opciones = { expiresIn: '1h' };              // El token expirará en 1 hora
    const token = jwt.sign(datosToken, secreto, opciones);
    
    // 4. Enviar el token al cliente
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

