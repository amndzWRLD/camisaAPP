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
    console.log(req.body);
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al crear usuario:', error.message);
    res.status(500).json({ error: 'No se pudo crear el usuario' });
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