const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');

// Create Hospital
router.post('/create', async (req, res) => {
    try {
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.status(201).json(hospital);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Hospitals by City
router.get('/', async (req, res) => {
    try {
        const { city } = req.query;
        const hospitals = await Hospital.find(city ? { city } : {});
        res.json(hospitals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Hospital Details by ID
router.get("/details", async (req, res) => {
    try {
        const hospitalId = req.query.id;

        if (!hospitalId) {
            return res.status(400).json({ error: "Hospital ID is required" });
        }

        const hospital = await Hospital.findById(hospitalId);

        if (!hospital) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        res.json(hospital);
    } catch (error) {
        console.error("Error fetching hospital:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Update Hospital
router.put('/update', async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "Hospital ID is required" });
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedHospital) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        res.json(updatedHospital);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Hospital
router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "Hospital ID is required" });
        }

        const deletedHospital = await Hospital.findByIdAndDelete(id);

        if (!deletedHospital) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        res.json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
