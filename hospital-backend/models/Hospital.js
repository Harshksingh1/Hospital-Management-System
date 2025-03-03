const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, required: true },
    speciality: [String],
    rating: { type: Number, required: true },
    description: { type: String },
    images: [String],
    numberOfDoctors: { type: Number },
    numberOfDepartments: { type: Number }
});

module.exports = mongoose.model('Hospital', HospitalSchema);
