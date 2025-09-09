const express = require('express');
const RolesController = require('../controllers/roles.controller');

const router = express.Router();
const rolesController = new RolesController();

// Rutas CRUD para roles
router.get('/', (req, res) => rolesController.obtenerRoles(req, res));
router.get('/:id', (req, res) => rolesController.obtenerRolPorId(req, res));
router.post('/', (req, res) => rolesController.agregarRol(req, res));
router.put('/:id', (req, res) => rolesController.actualizarRol(req, res));
router.delete('/:id', (req, res) => rolesController.eliminarRol(req, res));

module.exports = router;
