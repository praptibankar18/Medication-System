const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  database: "medication_system",
  port: 5432,
});

// pool
//   .query(
//     `ALTER TABLE ONLY public.medications
//     ADD CONSTRAINT fk_medication_patient FOREIGN KEY (patient_id) REFERENCES public.patients(patient_id) ON DELETE CASCADE;`
//   )
//   .then((Response) => {
//     console.log("Database created");
//     console.log(Response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool
//   .query(
//     `CREATE TABLE medications (
//       medication_id SERIAL PRIMARY KEY,
//       patient_id INTEGER NOT NULL REFERENCES patients(patient_id) ON DELETE CASCADE,
//       medication_name VARCHAR(255) NOT NULL,
//       dosage VARCHAR(255),
//       frequency VARCHAR(255),
//       instructions TEXT,
//       start_date DATE,
//       end_date DATE,
//       CONSTRAINT fk_medication_patient FOREIGN KEY (patient_id) REFERENCES patients(patient_id)
//     );
//   `
//   )
//   .then((Response) => {
//     console.log("Table created");
//     console.log(Response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool
//   .query(
//     `CREATE TABLE patients (
//       patient_id SERIAL PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       date_of_birth DATE,
//       gender CHAR(1),
//       phone_number VARCHAR(20),
//       email VARCHAR(255),
//       address TEXT,
//       city VARCHAR(100),
//       state VARCHAR(100),
//       zipcode VARCHAR(20),
//       country VARCHAR(100),
//       doctor_id INTEGER NOT NULL REFERENCES doctors(doctor_id),
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
//   `
//   )
//   .then((Response) => {
//     console.log("Table created");
//     console.log(Response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// pool
//   .query(
//     `CREATE TABLE doctors (
//       doctor_id SERIAL PRIMARY KEY,
//       name VARCHAR(100) NOT NULL,
//       email VARCHAR(100) UNIQUE NOT NULL,
//       password VARCHAR(100) NOT NULL,
//       specialization VARCHAR(100),
//       license_number VARCHAR(50),
//       phone VARCHAR(20),
//       address VARCHAR(255),
//       city VARCHAR(100),
//       state VARCHAR(100),
//       country VARCHAR(100),
//       postal_code VARCHAR(20),
//       bio TEXT
//   );
//   `
//   )
//   .then((Response) => {
//     console.log("Table created");
//     console.log(Response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = pool;
