
const db             = require('../../db');
const Inventory      = db.Inventory;
const BloodType      = db.BloodType;
const DonationCenter = db.DonationCenter;

exports.getInventory = async (req, res) => {
  console.log('→ getInventory called');
  try {
    const rows = await Inventory.findAll({
      include: [
        { model: BloodType, attributes: ['blood_type'] },
        { model: DonationCenter, attributes: ['center_id','center_name','location'] }
      ]
    });

    console.log('→ Raw rows count:', rows.length);
    const payload = rows.map(r => r.get({ plain: true }));
    console.log('→ Payload preview:', payload.slice(0,2));

    return res.json(payload);
  } catch (err) {
    console.error('getInventory error:', err);
    return res.status(500).json({ message: err.message });
  }
};
