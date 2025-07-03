import { responseObject } from "../helpers/responseObject.js";
import { getConnection } from "../server.js";

// export const getlistData = async (req, res) => {
//   try {
//     console.log("Req.user: ", req.user);
//     const connection = await getConnection();
//     const [result] = await connection.query(
//       `select profilePicture from user where id = 2;`
//     );

//     // res.render("listing", {
//     //   name: `${req.user.firstName} ${req.user.lastName}`,
//     //   profilePicture: result[0].profilePicture,
//     // });
//     return res.status(200).json(responseObject({
//         firstName: req.user.firstName,
//         lastName: req.user.lastName
//     }, "User Login Successfully!"))
//   } catch (error) {
//     return res.status(400).json(responseObject(error, "Error while getting user Data!"))
//   }
// };

export const listPage = (req, res) => {
  res.render("listing");
};

export const getlistData = async (req, res) => {
  try {
    // console.log("Req.user: ", req.user);
    const connection = await getConnection();
    const [result] = await connection.query(
      `select job_application_id, first_name, last_name from personal_details where is_deleted = 0;`
    );
    // console.log("[result]: ", result);

    return res
      .status(200)
      .json(responseObject(result, "List Data Get Successfully!"));
  } catch (error) {
    return res
      .status(400)
      .json(responseObject(error, "Error while getting user Data!"));
  }
};

export const getCreatePage = (req, res) => {
  res.render("create");
};

export const createApplicant = async (req, res) => {
  console.log("body data usin formData: ", req.body);
  try {
    const connection = await getConnection();
    const [results] = await connection.query(
      `insert into personal_details(first_name, last_name, designation, email, phone, address1, address2, city, state, gender, zip_code, relationship_status, date_of_birth) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        req.body.firstName,
        req.body.lastName,
        req.body.designation,
        req.body.email,
        req.body.phone,
        req.body.address1,
        req.body.address2,
        req.body.city,
        req.body.state,
        req.body.gender,
        req.body.zipCode,
        req.body.relationshipStatus,
        req.body.dob,
      ]
    );
    console.log(results);

    let education_details_values = [];
    if (typeof req.body.courseName1 == "string") {
      education_details_values.push([
        results.insertId,
        req.body.courseName1,
        req.body.board_university1,
        req.body.passingYear1,
        req.body.percentage1,
      ]);
    } else {
      education_details_values = req.body.courseName1.map((_, i) => [
        results.insertId,
        req.body.courseName1[i],
        req.body.board_university1[i],
        req.body.passingYear1[i],
        req.body.percentage1[i],
      ]);
    }
    await connection.query(
      `insert into education_details(job_application_id, course_name, board_university, passing_year, percentage) values ?;`,
      [education_details_values]
    );

    let work_experience_values = [];
    if (typeof req.body.companyName1 == "string") {
      work_experience_values.push([
        results.insertId,
        req.body.companyName1,
        req.body.workExperienceDesignation1,
        req.body.fromDate1,
        req.body.toDate1,
      ]);
    } else {
      work_experience_values = req.body.companyName1.map((_, i) => [
        results.insertId,
        req.body.companyName1[i],
        req.body.workExperienceDesignation1[i],
        req.body.fromDate1[i],
        req.body.toDate1[i],
      ]);
    }
    await connection.query(
      `insert into work_experience(job_application_id, company_name, designation, from_date, to_date) values ?;`,
      [work_experience_values]
    );

    let language_known_values = [];
    ["Hindi", "English", "Gujarati"].forEach((language) => {
      language_known_values.push([
        results.insertId,
        language,
        typeof req.body[language] == "string"
          ? req.body[language] == "Read"
            ? true
            : false
          : typeof req.body[language] == "object"
          ? req.body[language].includes("Read")
            ? true
            : false
          : false,
        typeof req.body[language] == "string"
          ? req.body[language] == "Write"
            ? true
            : false
          : typeof req.body[language] == "object"
          ? req.body[language].includes("Write")
            ? true
            : false
          : false,
        typeof req.body[language] == "string"
          ? req.body[language] == "Speak"
            ? true
            : false
          : typeof req.body[language] == "object"
          ? req.body[language].includes("Speak")
            ? true
            : false
          : false,
      ]);
    });
    await connection.query(
      `insert into language_known(job_application_id, language, can_read, can_write, can_speak) values ?;`,
      [language_known_values]
    );

    let technology_known_values = [];
    ["PHP", "MySQL", "Laravel", "Oracle"].forEach((technology) => {
      technology_known_values.push([
        results.insertId,
        technology,
        req.body[technology],
      ]);
    });
    await connection.query(
      `insert into technology_known(job_application_id, technology, proficiency) values ?;`,
      [technology_known_values]
    );

    let reference_contact_values = [];
    if (typeof req.body.referenceContactName1 == "string") {
      reference_contact_values.push([
        results.insertId,
        req.body.referenceContactName1,
        req.body.contactNumber1,
        req.body.relation1,
      ]);
    } else {
      reference_contact_values = req.body.referenceContactName1.map((_, i) => [
        results.insertId,
        req.body.referenceContactName1[i],
        req.body.contactNumber1[i],
        req.body.relation1[i],
      ]);
    }
    await connection.query(
      `insert into reference_contact(job_application_id, name, contact_number, relation) values ?;`,
      [reference_contact_values]
    );

    let preferd_locations_values = [];
    if (typeof req.body.preferdLocation == "string") {
      preferd_locations_values.push([
        results.insertId,
        req.body.preferdLocation,
      ]);
    } else {
      preferd_locations_values = req.body.preferdLocation.map((_, i) => [
        results.insertId,
        req.body.preferdLocation[i],
      ]);
    }
    await connection.query(
      `insert into preferd_locations(job_application_id, location) values ?;`,
      [preferd_locations_values]
    );

    let preferances_values = [
      [
        results.insertId,
        req.body.noticePeriod,
        req.body.expactedCTC,
        req.body.currentCTC,
        req.body.department,
      ],
    ];
    await connection.query(
      `insert into preferances(job_application_id, notice_period, expacted_ctc, current_ctc, department) values ?;`,
      [preferances_values]
    );

    return res.status(200).json(
      responseObject(
        {
          success: true,
        },
        "Applicant Created Successfully!"
      )
    );
  } catch (error) {
    return res
      .status(400)
      .json(
        responseObject(
          { error: true, error: error },
          "Error Occured While Creating Applicant!"
        )
      );
  }
};

export const viewPage = (req, res) => {
  res.render("view");
};

// const getData = async (jobApplicantId) => {
//   let Strings = {};
//   let radioStrings = [];
//   let checkboxStrings = [];
//   let selectStrings = [];

//   try {
//     const data = await getSelectQueryData(jobApplicantId);
//     data.controlMaster = await connection.query(
//       `select * from control_master;`,
//       []
//     );
//     data.optionMaster = await connection.query(`select * from option_master;`, []);
//     data.controlMasterValues = await connection.query(
//       `select * from control_master_values;`,
//       []
//     );

//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

const getSelectQueryData = async (jobApplicantId) => {
  try {
    let data = {};
    const connection = await getConnection();
    const [personalResult] = await connection.query(
      `select * from personal_details where job_application_id = ?`,
      [jobApplicantId]
    );
    data.personal = personalResult; 

    const [educationResult] = await connection.query(
      `select * from education_details where job_application_id = ?`,
      [jobApplicantId]
    );
    data.education = educationResult;

    const [workExperienceResult] = await connection.query(
      `select * from work_experience where job_application_id = ?`,
      [jobApplicantId]
    );
    data.workExperience = workExperienceResult;

    const [languageKnownResult] = await connection.query(
      `select * from language_known where job_application_id = ?`,
      [jobApplicantId]
    );
    data.languageKnown = languageKnownResult;

    const [technologyKnownResult] = await connection.query(
      `select * from technology_known where job_application_id = ?`,
      [jobApplicantId]
    );
    data.technologyKnown = technologyKnownResult;

    const [referenceContactResult] = await connection.query(
      `select * from reference_contact where job_application_id = ?`,
      [jobApplicantId]
    );
    data.referenceContact = referenceContactResult;

    const [preferdLocationsResult] = await connection.query(
      `select * from preferd_locations where job_application_id = ?`,
      [jobApplicantId]
    );
    data.preferdLocations = preferdLocationsResult;

    const [preferancesResult] = await connection.query(
      `select * from preferances where job_application_id = ?`,
      [jobApplicantId]
    );
    data.preferances = preferancesResult;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const viewData = async (req, res) => {
  const jobApplicantId = req.params.id;
  try {
    const data = await getSelectQueryData(jobApplicantId);
    console.log(data);
    return res.status(200).json(responseObject(data, "get view data..."))
  } catch (error) {
    return res.status(400).json(responseObject(error, "Error Occured While getting view data from database!"))
  }
};
