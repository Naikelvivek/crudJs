const express = require('express');
const router = express.Router();
const Alien = require('../models/alien'); // Adjust path as per your file structure

// GET all aliens
router.get('/', async (req, res) => {
    try {
        const aliens = await Alien.find();
        res.json(aliens);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// GET a specific alien by ID
router.get('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        if (!alien) {
            return res.status(404).send('Alien not found');
        }
        res.json(alien);
    } catch (err) {
        res.status(500).send('Error: ' + err);
    }
});

// POST a new alien
router.post('/', async (req, res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    });

    try {
        const savedAlien = await alien.save();
        res.json(savedAlien);
    } catch (err) {
        res.status(400).send('Error: ' + err);
    }
});

// PATCH/Update an existing alien by ID
router.patch('/:id', async (req, res) => {
    try {
        const alien = await Alien.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!alien) {
            return res.status(404).send('Alien not found');
        }
        res.json(alien);
    } catch (err) {
        res.status(400).send('Error: ' + err);
    }
});

// DELETE an alien by ID
router.delete('/:id', async (req, res) => {
    try {
        const alien = await Alien.findByIdAndDelete(req.params.id);
        if (!alien) {
            return res.status(404).send('Alien not found');
        }
        res.send('Alien deleted successfully');
    } catch (err) {
        res.status(400).send('Error: ' + err);
    }
});

module.exports = router;
