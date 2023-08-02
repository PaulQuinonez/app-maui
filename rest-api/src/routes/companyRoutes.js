const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  getCompanias,
  getCompaniaById,
  createCompania,
  updateCompania,
  deleteCompania,
} = require('../controllers/companyController');

/**
 * @swagger
 * tags:
 *   name: Compañías
 *   description: Endpoints para administrar compañías
 */

/**
 * @swagger
 * /companias:
 *   get:
 *     summary: Obtiene todas las compañías
 *     tags: [Compañías]
 *     responses:
 *       200:
 *         description: Lista de compañías obtenida exitosamente
 *       500:
 *         description: Error al obtener las compañías
 */
router.get('/companias', getCompanias);

/**
 * @swagger
 * /companias/{id}:
 *   get:
 *     summary: Obtiene una compañía por su ID
 *     tags: [Compañías]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la compañía
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compañía obtenida exitosamente
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error al obtener la compañía
 */
router.get('/companias/:id', getCompaniaById);

/**
 * @swagger
 * /companias:
 *   post:
 *     summary: Crea una nueva compañía
 *     tags: [Compañías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la compañía
 *                 example: Compañía ABC
 *               direccion:
 *                 type: string
 *                 description: Dirección de la compañía
 *                 example: Calle 123, Ciudad
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono de la compañía
 *                 example: +123456789
 *     responses:
 *       201:
 *         description: Compañía creada exitosamente
 *       422:
 *         description: Error de validación al crear la compañía
 *       500:
 *         description: Error al crear la compañía
 */
router.post('/companias', [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
  // Otras validaciones que desees incluir para los campos
], createCompania);

/**
 * @swagger
 * /companias/{id}:
 *   patch:
 *     summary: Actualiza una compañía existente por su ID
 *     tags: [Compañías]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la compañía
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre de la compañía (opcional)
 *               direccion:
 *                 type: string
 *                 description: Nueva dirección de la compañía (opcional)
 *               telefono:
 *                 type: string
 *                 description: Nuevo número de teléfono de la compañía (opcional)
 *     responses:
 *       200:
 *         description: Compañía actualizada exitosamente
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error al actualizar la compañía
 */
router.patch('/companias/:id', [
  body('nombre').optional(),
  // Otras validaciones que desees incluir para los campos que pueden actualizarse
], updateCompania);

/**
 * @swagger
 * /companias/{id}:
 *   delete:
 *     summary: Elimina una compañía por su ID
 *     tags: [Compañías]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la compañía
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compañía eliminada exitosamente
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error al eliminar la compañía
 */
router.delete('/companias/:id', deleteCompania);

module.exports = router;
