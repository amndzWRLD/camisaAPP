const express = require('express');
const router = express.Router();
const usuarioController = require('../controladores/usuarioControlador');

router.get('',usuarioController.obtenerusuarios);
router.get('/:id', usuarioController.obtenerusuariosporid);
router.get('/', usuarioController.crearusuarios);
router.get('/:id', usuarioController.actualizarusuarios);
router.get('/', usuarioController.eliminarusuarios);


module.export = router;
