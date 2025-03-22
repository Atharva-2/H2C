const Threat = require("../models/threat");

exports.reportThreat = async (req, res) => {
  try {
    const { type, description, location, severity } = req.body;
    const newThreat = new Threat({ type, description, location, severity });

    await newThreat.save();
    res.status(201).json({
      success: true,
      message: "Threat reported successfully",
      newThreat,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error reporting threat", error });
  }
};

exports.getThreats = async (req, res) => {
  try {
    const threats = await Threat.find();
    res.status(200).json({ success: true, threats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching threats", error });
  }
};
