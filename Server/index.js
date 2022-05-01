const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

app.use(express.json());
app.use(cors());

app.listen(3001, () => {
  console.log("server online");
});

app.get("/", cors(), async (req, res) => {
  res.send("Yah boi is workin");
});

//Connecting the Database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mypass",
  database: "websitedb",
});

app.get("/id", async (req, res) => {
  const query = `SELECT * from company`;
  try {
    db.query(query, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/idJob", async (req, res) => {
  const query = `SELECT * from job`;
  try {
    db.query(query, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/allJ", async (req, res) => {
  const query = `select NAME from JobName`;
  try {
    db.query(query, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/all/:jobName", async (req, res) => {
  const { jobName } = req.params;
  const query = `select USER_COMPANY_NAME, USER_JOB_NAME, YEARS_WORKING, YEARS_AT_COMPANY, SALARY, NEGOTIATED from user_input where USER_JOB_NAME = ?;`;
  try {
    db.query(query, [jobName], (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/allD/:jobName", async (req, res) => {
  const { jobName } = req.params;
  const query = `       select USER_COMPANY_NAME, USER_JOB_NAME, YEARS_WORKING, YEARS_AT_COMPANY, SALARY, NEGOTIATED, JOB.JOB_COMMITMENT, JOB_LEVEL, JOB.JOB_LOCATION_TYPE, JOB.JOB_FIELD
        FROM JOB, USER_INPUT where JOB.JOB_NAME = USER_JOB_NAME and JOB.JOB_ID = USER_JOB_ID and USER_JOB_NAME = ?;`;
  try {
    db.query(query, [jobName], (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// Returns the users account data, tested
app.get("/all", async (req, res) => {
  const query = `select NAME from CompanyName`;
  try {
    db.query(query, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/allC/:companyName", async (req, res) => {
  const { companyName } = req.params;
  const query = `select * from company,job,user_input where Company.COMPANY_ID = USER_COMPANY_ID and Job.JOB_ID = USER_JOB_ID and COMPANY_NAME = ?;`;
  try {
    db.query(query, [companyName], (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/users", async (req, res) => {
  const query = `SELECT * FROM user_input`;
  try {
    db.query(query, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/company", async (req, res) => {
  const query = `SELECT COMPANY_ID, COMPANY_NAME From Company;`;
  try {
    db.query(query, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/jobs", async (req, res) => {
  const query = `select JOB_ID,JOB_NAME From Job`;
  try {
    db.query(query, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      } else {
        console.log(result);
        res.json({
          status: "success",
          result: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/JobName", (req, res) => {
  const { jobName } = req.body;

  console.log("POST REQUEST RECEIVED: /Field");
  console.log("Express received: ", { jobName });

  db.query(
    "INSERT IGNORE INTO JobName (Name) VALUES (?)",
    [jobName],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Job name insertion failed",
          error: true,
        });
      } else {
        res.send({
          message: "Job name inserted",
          error: false,
        });
      }
    }
  );
});

app.post("/CompanyName", (req, res) => {
  const { companyName } = req.body;

  console.log("POST REQUEST RECEIVED: /CompanyName");
  console.log("Express received: ", { companyName });


  db.query(
    "INSERT IGNORE INTO CompanyName (Name) VALUES (?)",
    [companyName],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Company name insertion failed",
          error: true,
        });
      } else {
        res.send({
          message: "Company name inserted",
          error: false,
        });
      }
    }
  );
});

app.post("/JobField", (req, res) => {
  const { jobField } = req.body;

  console.log("POST REQUEST RECEIVED: /JobField");
  console.log("Express received: ", { jobField });


  db.query(
    "INSERT IGNORE INTO Field (Name) VALUES (?)",
    [jobField],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Job field insertion failed",
          error: true,
        });
      } else {
        res.send({
          message: "Job field inserted",
          error: false,
        });
      }
    }
  );
});

app.post("/Field", (req, res) => {
  const { companyField } = req.body;

  console.log("POST REQUEST RECEIVED: /Field");
  console.log("Express received: ", { companyField });


  db.query(
    "INSERT IGNORE INTO Field (Name) VALUES (?)",
    [companyField],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Company field insertion failed",
          error: true,
        });
      } else {
        res.send({
          message: "Company field inserted",
          error: false,
        });
      }
    }
  );
});

app.post("/Location", (req, res) => {
  const { companyCountry, companyState } = req.body;

  console.log("POST REQUEST RECEIVED: /Location");
  console.log("Express received: ", { companyCountry }, { companyState });

  
  db.query(
    "INSERT IGNORE INTO Location (country, state) VALUES (?,?)",
    [companyCountry, companyState],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Location insertion failed",
          error: true,
        });
      } else {
        res.send({
          message: "Location inserted",
          error: false,
        });
      }
    }
  );
});

app.post("/Job", (req, res) => {
  const { jobName, jobLevel, jobCommitment, shift, locationType, jobField } =
    req.body;

  console.log("POST REQUEST RECEIVED: /Job");
  console.log(
    "Express received: ",
    { jobName },
    { jobLevel },
    { jobCommitment },
    { shift },
    { locationType },
    { jobField }
  );

  
  db.query(
    "INSERT IGNORE INTO JOB (JOB_NAME, JOB_LEVEL, JOB_COMMITMENT, JOB_SHIFT_TIME, JOB_LOCATION_TYPE, JOB_FIELD) VALUES (?,?,?,?,?,?)",
    [jobName, jobLevel, jobCommitment, shift, locationType, jobField],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Job insertion failed",
          error: true,
        });
      } else {
        res.send({
          message: "Job inserted",
          error: false,
        });
      }
    }
  );
});

app.post("/Company", (req, res) => {
  const {
    companyName,
    companyStanding,
    companyCountry,
    companyState,
    companyField,
  } = req.body;

  console.log("POST REQUEST RECEIVED: /Company");
  console.log(
    "Express received: ",
    { companyName },
    { companyStanding },
    { companyCountry },
    { companyState },
    { companyField }
  );

  db.query(
    "INSERT IGNORE INTO COMPANY (COMPANY_STANDING, COMPANY_NAME, COMPANY_COUNTRY, COMPANY_STATE, COMPANY_FIELD ) VALUES (?,?,?,?,?)",
    [companyName, companyStanding, companyCountry, companyState, companyField],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "Company insertion failed",
          error: true,
        });
      } else {
        console.log(result.insertId);
        res.send({
          message: "Company inserted",
          error: false,
        });
      }
    }
  );
});

app.post("/Data", (req, res) => {
  const {
    companyID,
    jobID,
    companyName,
    companyStanding,
    companyCountry,
    companyState,
    companyField,
    jobName,
    jobLevel,
    jobCommitment,
    shift,
    locationType,
    jobField,
    yearsW,
    yearsC,
    salary,
    negotiated,
    jobCountry,
    jobState,
  } = req.body;

  console.log("POST REQUEST RECEIVED: /Data");
  console.log(
    "Express received: ",
    { companyID },
    { jobID },
    { companyName },
    { companyStanding },
    { companyCountry },
    { companyState },
    { companyField },
    { jobName },
    { jobLevel },
    { jobCommitment },
    { shift },
    { locationType },
    { jobField },
    { yearsW },
    { yearsC },
    { salary },
    { negotiated },
    { jobCountry },
    { jobState }
  );

  db.query(
    "INSERT INTO USER_INPUT (USER_COMPANY_ID, USER_JOB_ID, USER_COMPANY_NAME, USER_JOB_NAME, YEARS_WORKING, YEARS_AT_COMPANY, SALARY, NEGOTIATED, USER_COUNTRY, USER_STATE) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      companyID,
      jobID,
      companyName,
      jobName,
      yearsW,
      yearsC,
      salary,
      negotiated,
      jobCountry,
      jobState,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({
          message: "User insertion failed",
          error: true,
        });
      } else {
        res.send({
          message: "User inserted",
          error: false,
        });
      }
    }
  );
});
