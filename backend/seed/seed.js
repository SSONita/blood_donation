/**
 * Seed script — populates the database with realistic Cambodia-based sample data:
 * blood types, donation centers (real hospitals/blood banks), users, appointments,
 * blood requests, inventory levels, and history records.
 *
 * Usage:
 *   cd backend
 *   npm run seed
 *
 * WARNING: this truncates every table it seeds (history, donation, request,
 * inventory, user, donation_center, blood_type) and resets their ID sequences
 * before inserting fresh data. Do not run this against a database you care
 * about keeping.
 *
 * All seeded users share the same password so you can log in and try the app:
 *   password: Password123!
 */

require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../db');

const SEED_PASSWORD = 'Password123!';

async function seed() {
  await db.sequelize.authenticate();
  console.log('Connected to database.');

  // "user" is a reserved word in Postgres, hence the quotes.
  await db.sequelize.query(
    `TRUNCATE TABLE history, donation, request, inventory, "user", donation_center, blood_type RESTART IDENTITY CASCADE;`
  );
  console.log('Cleared existing data.');

  // ---------------------------------------------------------------------
  // 1. Blood types
  // ---------------------------------------------------------------------
  const bloodTypeNames = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const bloodTypes = await db.BloodType.bulkCreate(
    bloodTypeNames.map((blood_type) => ({ blood_type })),
    { returning: true }
  );
  const typeId = Object.fromEntries(bloodTypes.map((bt) => [bt.blood_type, bt.type_id]));
  console.log(`Seeded ${bloodTypes.length} blood types.`);

  // ---------------------------------------------------------------------
  // 2. Donation centers — real Cambodian hospitals / blood banks
  // ---------------------------------------------------------------------
  const centers = await db.DonationCenter.bulkCreate(
    [
      { center_name: 'National Blood Transfusion Centre', location: 'Street 92, Phnom Penh' },
      { center_name: 'Calmette Hospital Blood Bank', location: '3 Monivong Blvd, Phnom Penh' },
      { center_name: 'Khmer-Soviet Friendship Hospital', location: 'Russian Confederation Blvd, Phnom Penh' },
      { center_name: 'Preah Kossamak Hospital', location: 'Street 271, Phnom Penh' },
      { center_name: 'Sihanouk Hospital Center of HOPE', location: '674 Street 95, Phnom Penh' },
      { center_name: 'Siem Reap Provincial Referral Hospital', location: 'National Road 6, Siem Reap' },
      { center_name: 'Battambang Provincial Hospital', location: 'National Road 5, Battambang' },
      { center_name: 'Kampong Cham Provincial Hospital', location: 'National Road 7, Kampong Cham' },
      { center_name: 'Sihanoukville Provincial Hospital', location: 'Ekareach St, Sihanoukville' },
      { center_name: 'Kampot Provincial Hospital', location: 'National Road 3, Kampot' },
    ],
    { returning: true }
  );
  console.log(`Seeded ${centers.length} donation centers.`);

  // ---------------------------------------------------------------------
  // 3. Users — Cambodian names, phone numbers, mixed blood types
  // ---------------------------------------------------------------------
  const hashedPassword = await bcrypt.hash(SEED_PASSWORD, 10);
  const userSeed = [
    { first_name: 'Sokha', last_name: 'Chan', email: 'sokha.chan@example.com', phone_num: '+855 12 345 671', blood_type: 'O+' },
    { first_name: 'Dara', last_name: 'Pich', email: 'dara.pich@example.com', phone_num: '+855 92 345 672', blood_type: 'A+' },
    { first_name: 'Sophea', last_name: 'Long', email: 'sophea.long@example.com', phone_num: '+855 77 345 673', blood_type: 'B+' },
    { first_name: 'Vuthy', last_name: 'Heng', email: 'vuthy.heng@example.com', phone_num: '+855 70 345 674', blood_type: 'AB+' },
    { first_name: 'Chenda', last_name: 'Ros', email: 'chenda.ros@example.com', phone_num: '+855 89 345 675', blood_type: 'O-' },
    { first_name: 'Ratanak', last_name: 'Sok', email: 'ratanak.sok@example.com', phone_num: '+855 96 345 676', blood_type: 'A-' },
    { first_name: 'Bopha', last_name: 'Meas', email: 'bopha.meas@example.com', phone_num: '+855 12 456 781', blood_type: 'B-' },
    { first_name: 'Vanna', last_name: 'Kim', email: 'vanna.kim@example.com', phone_num: '+855 15 456 782', blood_type: 'AB-' },
    { first_name: 'Sreymom', last_name: 'Ly', email: 'sreymom.ly@example.com', phone_num: '+855 16 456 783', blood_type: 'O+' },
    { first_name: 'Pisach', last_name: 'Ung', email: 'pisach.ung@example.com', phone_num: '+855 69 456 784', blood_type: 'A+' },
    { first_name: 'Kunthea', last_name: 'Yim', email: 'kunthea.yim@example.com', phone_num: '+855 86 456 785', blood_type: 'O+' },
    { first_name: 'Panha', last_name: 'Chhim', email: 'panha.chhim@example.com', phone_num: '+855 87 456 786', blood_type: 'B+' },
    { first_name: 'Chanthou', last_name: 'Nov', email: 'chanthou.nov@example.com', phone_num: '+855 95 456 787', blood_type: 'O-' },
    { first_name: 'Sokunthea', last_name: 'Prak', email: 'sokunthea.prak@example.com', phone_num: '+855 98 456 788', blood_type: 'AB+' },
    { first_name: 'Rithy', last_name: 'Chea', email: 'rithy.chea@example.com', phone_num: '+855 99 456 789', blood_type: 'A+' },
  ];
  const users = await db.User.bulkCreate(
    userSeed.map((u) => ({
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      phone_num: u.phone_num,
      blood_type_id: typeId[u.blood_type],
      password: hashedPassword,
    })),
    { returning: true }
  );
  console.log(`Seeded ${users.length} users (password for all: "${SEED_PASSWORD}").`);

  // ---------------------------------------------------------------------
  // 4. Inventory — units on hand per center, per blood type
  // ---------------------------------------------------------------------
  const statusForUnits = (units) => {
    if (units <= 5) return 'Critical Need';
    if (units <= 15) return 'Low';
    return 'Safe';
  };
  const inventoryRows = [];
  // First 5 centers (major Phnom Penh hospitals) stock every blood type;
  // the provincial centers stock a smaller, more realistic subset.
  const majorCenters = centers.slice(0, 5);
  const provincialCenters = centers.slice(5);

  majorCenters.forEach((center) => {
    bloodTypeNames.forEach((bt) => {
      const units = Math.floor(Math.random() * 40) + 2; // 2-41
      inventoryRows.push({
        unit: units,
        status: statusForUnits(units),
        type_id: typeId[bt],
        center_id: center.center_id,
      });
    });
  });

  provincialCenters.forEach((center) => {
    ['O+', 'O-', 'A+', 'B+'].forEach((bt) => {
      const units = Math.floor(Math.random() * 20) + 1; // 1-20
      inventoryRows.push({
        unit: units,
        status: statusForUnits(units),
        type_id: typeId[bt],
        center_id: center.center_id,
      });
    });
  });

  const inventory = await db.Inventory.bulkCreate(inventoryRows, { returning: true });
  console.log(`Seeded ${inventory.length} inventory records.`);

  // ---------------------------------------------------------------------
  // 5. Donation appointments
  // ---------------------------------------------------------------------
  const donationSeed = [
    { user: 0, center: 0, bt: 'O+', date: '2026-08-10', time: '09:00:00', status: 'Approved', gender: 'Female', dob: '1998-03-14' },
    { user: 1, center: 1, bt: 'A+', date: '2026-08-11', time: '10:30:00', status: 'Pending', gender: 'Male', dob: '1995-07-22' },
    { user: 2, center: 5, bt: 'B+', date: '2026-08-12', time: '14:00:00', status: 'Approved', gender: 'Female', dob: '2000-01-05' },
    { user: 3, center: 3, bt: 'AB+', date: '2026-08-14', time: '11:15:00', status: 'Pending', gender: 'Male', dob: '1990-11-30' },
    { user: 4, center: 0, bt: 'O-', date: '2026-08-15', time: '08:45:00', status: 'Approved', gender: 'Female', dob: '1997-05-18' },
    { user: 8, center: 6, bt: 'O+', date: '2026-08-16', time: '13:00:00', status: 'Rejected', gender: 'Female', dob: '1993-09-09' },
    { user: 10, center: 8, bt: 'O+', date: '2026-08-18', time: '09:30:00', status: 'Pending', gender: 'Female', dob: '1999-02-27' },
  ];
  const donations = await db.Donation.bulkCreate(
    donationSeed.map((d) => ({
      dob: d.dob,
      gender: d.gender,
      past_donation: Math.random() > 0.5,
      medical_condition: null,
      medications: null,
      date: d.date,
      time: d.time,
      status: d.status,
      type_id: typeId[d.bt],
      user_id: users[d.user].user_id,
      center_id: centers[d.center].center_id,
    })),
    { returning: true }
  );
  console.log(`Seeded ${donations.length} donation appointments.`);

  // ---------------------------------------------------------------------
  // 6. Blood requests — from Cambodian hospitals
  // ---------------------------------------------------------------------
  const requestSeed = [
    { user: 5, bt: 'A-', hospital: 'Calmette Hospital', urgency: 'Emergency', units: 4, dateNeeded: '2026-08-05', gender: 'Male', dob: '1988-06-01' },
    { user: 6, bt: 'B-', hospital: 'Khmer-Soviet Friendship Hospital', urgency: 'Within 24h', units: 2, dateNeeded: '2026-08-07', gender: 'Female', dob: '1992-12-19' },
    { user: 7, bt: 'AB-', hospital: 'Preah Kossamak Hospital', urgency: 'Within 3 days', units: 3, dateNeeded: '2026-08-10', gender: 'Male', dob: '1985-04-11' },
    { user: 9, bt: 'A+', hospital: 'Siem Reap Provincial Referral Hospital', urgency: 'Not Urgent', units: 5, dateNeeded: '2026-08-20', gender: 'Male', dob: '1994-08-23' },
    { user: 11, bt: 'B+', hospital: 'Battambang Provincial Hospital', urgency: 'Emergency', units: 6, dateNeeded: '2026-08-04', gender: 'Female', dob: '1991-10-02' },
  ];
  const requests = await db.Request.bulkCreate(
    requestSeed.map((r) => ({
      dob: r.dob,
      gender: r.gender,
      unit_needed: r.units,
      urgency_level: r.urgency,
      hospital_name: r.hospital,
      date_needed: r.dateNeeded,
      type_id: typeId[r.bt],
      user_id: users[r.user].user_id,
    })),
    { returning: true }
  );
  console.log(`Seeded ${requests.length} blood requests.`);

  // ---------------------------------------------------------------------
  // 7. History — completed/deferred donation & request records
  // ---------------------------------------------------------------------
  const historyRows = [
    { user: 0, action_type: 'Donation', volume: 450, status: 'Completed', donation_id: donations[0].donation_id, request_id: null },
    { user: 4, action_type: 'Donation', volume: 450, status: 'Completed', donation_id: donations[4].donation_id, request_id: null },
    { user: 8, action_type: 'Donation', volume: 0, status: 'Deffered', donation_id: donations[5].donation_id, request_id: null },
    { user: 5, action_type: 'Request', volume: 4, status: 'Completed', donation_id: null, request_id: requests[0].request_id },
    { user: 6, action_type: 'Request', volume: 2, status: 'Completed', donation_id: null, request_id: requests[1].request_id },
    { user: 11, action_type: 'Request', volume: 6, status: 'Deffered', donation_id: null, request_id: requests[4].request_id },
  ];
  const history = await db.History.bulkCreate(
    historyRows.map((h) => ({
      action_type: h.action_type,
      volume: h.volume,
      status: h.status,
      user_id: users[h.user].user_id,
      donation_id: h.donation_id,
      request_id: h.request_id,
    })),
    { returning: true }
  );
  console.log(`Seeded ${history.length} history records.`);

  console.log('\nSeed complete.');
  console.log(`Log in with any seeded email above and password: ${SEED_PASSWORD}`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
