// controllers/companyController.js
const { validationResult } = require('express-validator');
const Compania = require('../models/companyModel');

// Controlador para obtener todas las compañías
exports.getCompanias = async (req, res) => {
  try {
    const companias = await Compania.find();
    res.json(companias);
  } catch (error) {
    console.error('Error al obtener las compañías:', error);
    res.status(500).json({ error: 'Error al obtener las compañías' });
  }
};

// Controlador para obtener una compañía por su id
exports.getCompaniaById = async (req, res) => {
  const { id } = req.params;
  try {
    const compania = await Compania.findById(id);
    if (!compania) {
      return res.status(404).json({ error: 'Compañía no encontrada' });
    }
    res.json(compania);
  } catch (error) {
    console.error('Error al obtener la compañía:', error);
    res.status(500).json({ error: 'Error al obtener la compañía' });
  }
};

// Controlador para crear una nueva compañía
exports.createCompania = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { nombre, direccion, telefono } = req.body;
  try {
    const nuevaCompania = await Compania.create({ nombre, direccion, telefono });
    res.status(201).json(nuevaCompania);
  } catch (error) {
    console.error('Error al crear la compañía:', error);
    res.status(500).json({ error: 'Error al crear la compañía' });
  }
};

// Controlador para actualizar una compañía existente (utilizando patch)
exports.updateCompania = async (req, res) => {
  const { id } = req.params;
  try {
    const compania = await Compania.findByIdAndUpdate(id, req.body, { new: true });
    if (!compania) {
      return res.status(404).json({ error: 'Compañía no encontrada' });
    }

    res.json(compania);
  } catch (error) {
    console.error('Error al actualizar la compañía:', error);
    res.status(500).json({ error: 'Error al actualizar la compañía' });
  }
};

// Controlador para eliminar una compañía por su id
exports.deleteCompania = async (req, res) => {
  const { id } = req.params;
  try {
    const compania = await Compania.findByIdAndDelete(id);
    if (!compania) {
      return res.status(404).json({ error: 'Compañía no encontrada' });
    }

    res.json({ message: 'Compañía eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la compañía:', error);
    res.status(500).json({ error: 'Error al eliminar la compañía' });
  }
};
