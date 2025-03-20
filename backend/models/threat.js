const mongoose = require('mongoose');

const ThreatSchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: { lat: Number, lon: Number }, required: true },
    reportedAt: { type: Date, default: Date.now },
    severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true }
});

module.exports = mongoose.model('Threat', ThreatSchema);
