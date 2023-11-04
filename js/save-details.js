const util = require("util");
const { dbconfig } = require("./mysql-config");

// Connect to the database
dbconfig.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    console.log("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

const beginTransaction = util.promisify(dbconfig.beginTransaction).bind(dbconfig);
const commit = util.promisify(dbconfig.commit).bind(dbconfig);
const rollback = util.promisify(dbconfig.rollback).bind(dbconfig);

// Common function for inserting data into tables
const insertData = async (query, values) => {
  const result = await util.promisify(dbconfig.query).bind(dbconfig)(
    query,
    values
  );
  if (result.affectedRows < 1) {
    console.log(`Error inserting data: ${query}`);
    throw new Error(`Error inserting data: ${query}`);
  }
};

// Save data to database
async function saveDataToDatabase(req, res) {
  try {
    const {
      first_name,
      middle_name,
      last_name,
      gender,
      marital_status,
      blood_group,
      address,
      city,
      state,
      pincode,
      dob,
      phone_number,
      email,
      emergency_contact_name,
      emergency_contact_number,
      emergency_contact_relation,
      aadhaar_no,
      pan_no,
    } = req.body;
    const { degree, university, year, percentage } = req.body;
    const { org_name, position, from_date, to_date, last_drawn_salary } =
      req.body;

    await beginTransaction();

    const personal_details_query =
      "INSERT INTO `personal_details`(`FIRSTNAME`, `MIDDLENAME`, `LASTNAME`, `GENDER`, `MARITAL_STATUS`, `BLOOD_GROUP`, `ADDRESS`, `CITY`, `STATE`, `PINCODE`, `DATE_OF_BIRTH`, `PHONE_NUMBER`, `EMAIL`, `EMERGENCY_CONTACT_NAME`, `EMERGENCY_CONTACT_NUMBER`, `RELATION_WITH_EMPLOYEE`, `AADHAAR_NUMBER`, `PAN_NUMBER`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)";
    const personal_details_values = [
      first_name,
      middle_name,
      last_name,
      gender,
      marital_status,
      blood_group,
      address,
      city,
      state,
      pincode,
      dob,
      phone_number,
      email,
      emergency_contact_name,
      emergency_contact_number,
      emergency_contact_relation,
      aadhaar_no,
      pan_no,
    ];

    const personal_details_result = await util.promisify(dbconfig.query).bind(dbconfig)(personal_details_query, personal_details_values);
    if (personal_details_result.affectedRows === 1) {
      const person_id = personal_details_result.insertId;
      // Insert data into qualification_details table
      // Check if degree is an array (multiple qualifications)
      if (Array.isArray(degree)) {
        var qualification_details_multipleValues = degree.map((degree, index) => [
          person_id, degree, university[index], year[index], percentage[index]
        ]);

        var qualification_details_values = [].concat(
          ...qualification_details_multipleValues
        );
        var qualification_details_query = `INSERT INTO qualification_details (PERSON_ID, DEGREE, UNIVERSITY, YEAR_OF_PASSING, PERCENTAGE) VALUES ${qualification_details_multipleValues
          .map(() => "(?, ?, ?, ?, ?)")
          .join(", ")}`;
      } else {
        // For single education
        qualification_details_values = [
          person_id,
          degree,
          university,
          year,
          percentage,
        ];
        qualification_details_query =
          "INSERT INTO qualification_details (PERSON_ID, DEGREE, UNIVERSITY, YEAR_OF_PASSING, PERCENTAGE) VALUES (?, ?, ?, ?, ?)";
      }

      await insertData(qualification_details_query, qualification_details_values);

      // Insert data into professional_details table
      // Check if org name is an array (multiple experience)
      if (Array.isArray(org_name)) {
        var professional_details_multipleValues = org_name.map((org_name, index) => [
          person_id, org_name, position[index], from_date[index], to_date[index], last_drawn_salary[index]
        ]);

        var professional_details_values = [].concat(
          ...professional_details_multipleValues
        );
        var professional_details_query = `INSERT INTO professional_details(PERSON_ID,ORGANISATION_NAME, POSITION_HELD, FROM_DATE, TO_DATE, LAST_DRAWN_SALARY) VALUES ${professional_details_multipleValues
          .map(() => "(?, ?, ?, ?, ?, ?)")
          .join(", ")}`;
      } else {
        // For single experience
        professional_details_values = [
          person_id,
          org_name,
          position,
          from_date,
          to_date,
          last_drawn_salary,
        ];
        professional_details_query =
          "INSERT INTO professional_details (PERSON_ID, ORGANISATION_NAME, POSITION_HELD, FROM_DATE, TO_DATE, LAST_DRAWN_SALARY) VALUES (?, ?, ?, ?, ?, ?)";
      }
      await insertData(professional_details_query, professional_details_values);
      // If all data was successfully inserted, commit the transaction
      await commit();
      return true;
    } else {
      console.log("Error inserting data into personal_details table");
      throw new Error("Error inserting data into personal_details table");
    }
  } catch (error) {
    console.error("Error saving data into db:", error);
    console.log("Error saving data into db:", error);
    await rollback();
    return false;
  }
}

module.exports = { saveDataToDatabase };
