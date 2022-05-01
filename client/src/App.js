import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // get data
  const [state, setState] = useState([]);
  const [company, setCompany] = useState([]);
  const [job, setJob] = useState([]);

  // post data
  const [companyName, setCompanyName] = useState(null);
  const [companyStanding, setCompanyStanding] = useState(null);
  const [companyCountry, setCompanyCountry] = useState(null);
  const [companyState, setCompanyState] = useState(null);
  const [companyField, setCompanyField] = useState(null);

  const [jobName, setJobName] = useState(null);
  const [jobLevel, setJobLevel] = useState(null);
  const [jobCommitment, setJobCommitment] = useState(null);
  const [shift, setShift] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [jobField, setJobField] = useState(null);
  const [yearsW, setYearsW] = useState(null);
  const [yearsC, setYearsC] = useState(null);
  const [salary, setSalary] = useState(null);
  const [negotiated, setNegotiated] = useState(null);
  const [jobCountry, setJobCountry] = useState(null);
  const [jobState, setJobState] = useState(null);
  const [companyID, setCompanyID] = useState(0);
  const [jobID, setJobID] = useState(0);
  const [companyHelper, setCompanyHelper] = useState([]);
  const [jobHelper, setJobHelper] = useState([]);
  const [jobDetailed, setJobDetailed] = useState([]);

  useEffect(() => {
    const urlJob = "http://localhost:3001/allJ";
    try {
      Axios.get(urlJob)
        .then((response) => {
          console.log("GET USER REQUEST: ", response.data.result);
          setJob(response.data.result);
        })
        .catch((error) => {
          console.log("Get Request Error: ", error);
          return;
        });
    } catch (error) {
      console.log("NP");
    }
  }, []);

  useEffect(() => {
    const urlJob = "http://localhost:3001/all";
    try {
      Axios.get(urlJob)
        .then((response) => {
          console.log("GET USER REQUEST: ", response.data.result);
          setCompany(response.data.result);
        })
        .catch((error) => {
          console.log("Get Request Error: ", error);
          return;
        });
    } catch (error) {
      console.log("NP");
    }
  }, []);

  useEffect(() => {
    const urlJob = "http://localhost:3001/idJob";
    try {
      Axios.get(urlJob)
        .then((response) => {
          console.log("GET USER REQUEST: ", response.data.result);
          setJobID(
            response.data.result[response.data.result.length - 1].JOB_ID
          );
        })
        .catch((error) => {
          console.log("Get Request Error: ", error);
          return;
        });
    } catch (error) {
      console.log("NP");
    }
  }, []);

  useEffect(() => {
    const urlCID = "http://localhost:3001/id";
    try {
      Axios.get(urlCID)
        .then((response) => {
          console.log(
            "Starting" +
              response.data.result[response.data.result.length - 1].COMPANY_ID
          );
          setCompanyID(
            response.data.result[response.data.result.length - 1].COMPANY_ID
          );
        })
        .catch((error) => {
          console.log("Get Request Error: ", error);
          return;
        });
    } catch (error) {
      console.log("NP");
    }
  }, []);

  //check If i have all get methods for job id and company id stuff, create getContent methods for these things,check for all url for gets
  //nest them toghter, call them using a button, create two states to hold info so we can use to print on screen using map
  // Posts username and password for login or create account to server
  const postAction = (e, action) => {
    e.preventDefault(); // prevent refresh and submission

    const urlLocation = "http://www.localhost:3001/Location";
    const urlFieldC = "http://www.localhost:3001/Field";
    const urlFieldJ = "http://www.localhost:3001/JobField";
    const urlCompanyName = "http://www.localhost:3001/CompanyName";
    const urlJobName = "http://www.localhost:3001/JobName";
    const urlJob = "http://www.localhost:3001/Job";
    const urlCompany = "http://www.localhost:3001/Company";
    const urlCID = "http://localhost:3001/id";
    const urlJID = "http://localhost:3001/idJob";
    const urlData = `http://localhost:3001/Data`;

    const enteredCompanyName = companyName;
    const enteredCompanyStanding = companyStanding;
    const enteredCompanyCountry = companyCountry;
    const enteredCompanyState = companyState;
    const enteredCompanyField = companyField;
    const enteredJobName = jobName;
    const enteredJobLevel = jobLevel;
    const enteredJobCommitment = jobCommitment;
    const enteredShift = shift;
    const enteredLocationType = locationType;
    const enteredJobField = jobField;
    const enteredYearsW = yearsW;
    const enteredYearsC = yearsC;
    const enteredSalary = salary;
    const enteredNegotiated = negotiated;
    const enteredJobCountry = jobCountry;
    const enteredJobState = jobState;

    try {
      Axios.all([
        Axios.get(urlCID).then((response) => {
          setCompanyID(
            () =>
              response.data.result[response.data.result.length - 1].COMPANY_ID +
              1
          );
        }),

        Axios.get(urlJID).then((response) => {
          setJobID(
            () =>
              response.data.result[response.data.result.length - 1].JOB_ID + 1
          );
        }),

        Axios.post(urlCompanyName, {
          companyName: enteredCompanyName,
        }),

        Axios.post(urlJobName, {
          jobName: enteredJobName,
        }),

        Axios.post(urlFieldC, {
          companyField: enteredCompanyField,
        }),
        Axios.post(urlFieldJ, {
          jobField: enteredJobField,
        }),
        Axios.post(urlLocation, {
          companyCountry: enteredCompanyCountry,
          companyState: enteredCompanyState,
        }),
        Axios.post(urlCompany, {
          companyName: enteredCompanyName,
          companyStanding: enteredCompanyStanding,
          companyCountry: enteredCompanyCountry,
          companyState: enteredCompanyState,
          companyField: enteredCompanyField,
        }),
        Axios.post(urlJob, {
          jobName: enteredJobName,
          jobLevel: enteredJobLevel,
          jobCommitment: enteredJobCommitment,
          shift: enteredShift,
          locationType: enteredLocationType,
          jobField: enteredJobField,
        }),
        Axios.post(urlData, {
          companyID: companyID,
          companyName: enteredCompanyName,
          companyStanding: enteredCompanyStanding,
          companyCountry: enteredCompanyCountry,
          companyState: enteredCompanyState,
          companyField: enteredCompanyField,
          jobID: jobID,
          jobName: enteredJobName,
          jobLevel: enteredJobLevel,
          jobCommitment: enteredJobCommitment,
          shift: enteredShift,
          locationType: enteredLocationType,
          jobField: enteredJobField,
          yearsW: enteredYearsW,
          yearsC: enteredYearsC,
          salary: enteredSalary,
          negotiated: enteredNegotiated,
          jobCountry: enteredJobCountry,
          jobState: enteredJobState,
        }),
      ])
        .then(
          Axios.spread(
            (
              data1,
              data2,
              CompanyN,
              JobN,
              FieldC,
              FieldJ,
              Locations,
              CompanyI,
              jobI,
              user
            ) => {
              console.log(
                "client response:",
                "data1",
                data1,
                "data2",
                data2,
                "CompanyN",
                CompanyN,
                "JobN",
                JobN,
                "FieldC",
                FieldC,
                "FieldJ",
                FieldJ,
                "Locations",
                Locations,
                "CompanyI",
                CompanyI,
                "jobI",
                jobI,
                "user",
                user
              );
            }
          )
        )
        .catch((error) => {
          console.log("Error from client: ", error);
        });
    } catch (error) {
      console.log("Bruhhh something went wrong: %s", error);
    }
  };

  const getScores = () => {
    const url = "http://localhost:3001/id";
    try {
      Axios.get(url)
        .then((response) => {
          console.log("GET USER REQUEST: ", response.data.result);
          console.log(
            response.data.result[response.data.result.length - 1].COMPANY_ID
          );
          setState(
            response.data.result[response.data.result.length - 1].COMPANY_ID
          );
        })
        .catch((error) => {
          console.log("Get Request Error: ", error);
          return;
        });
    } catch (error) {
      console.log("NP");
    }
  };

  const getall = () => {
    const urlCom = "http://localhost:3001/allC/" + companyName;
    try {
      Axios.get(urlCom)
        .then((response) => {
          console.log("GET USER REQUEST: ", response.data.result);
          setCompanyHelper(response.data.result);
        })
        .catch((error) => {
          console.log("Get Request Error: ", error);
          return;
        });
    } catch (error) {
      console.log("NP");
    }
  };

  const getallJob = () => {
    const urlJob = "http://localhost:3001/all/" + jobName;
    try {
      Axios.get(urlJob)
        .then((response) => {
          console.log("GET USER REQUEST: ", response.data.result);
          setJobHelper(response.data.result);
        })
        .catch((error) => {
          console.log("Get Request Error: ", error);
          return;
        });
    } catch (error) {
      console.log("NP");
    }
  };

  const getallDetailJob = () => {
    const urlJob = "http://localhost:3001/allD/" + jobName;
    try {
      Axios.get(urlJob)
        .then((response) => {
          console.log("GET USER REQUEST: ", response.data.result);
          setJobDetailed(response.data.result);
        })
        .catch((error) => {
          console.log("Get Request Error: ", error);
          return;
        });
    } catch (error) {
      console.log("NP");
    }
  };

  return (
    <div className="App">
      <div className="Company">
        <h1> Company Information </h1>
        <form>
          <input
            type="text"
            placeholder="Company Name"
            className="Mando"
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Company Standing"
            className="COMPANY_STANDING"
            onChange={(e) => setCompanyStanding(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            className="Mando"
            onChange={(e) => setCompanyCountry(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="Mando"
            onChange={(e) => setCompanyState(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Field"
            className="Mando"
            onChange={(e) => setCompanyField(e.target.value)}
            required
          />

          <div className="Job">
            <h1> Job Information </h1>

            <input
              type="text"
              placeholder="Job Name"
              className="Mando"
              onChange={(e) => setJobName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Job Level"
              className="JOB_LEVEL"
              onChange={(e) => setJobLevel(e.target.value)}
            />
            <input
              type="text"
              placeholder="Job Commitment"
              className="JOB_COMMITMENT"
              onChange={(e) => setJobCommitment(e.target.value)}
            />
            <input
              type="text"
              placeholder="Shift Time"
              className="JOB_SHIFT_TIME"
              onChange={(e) => setShift(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location Type"
              className="JOB_LOCATION_TYPE"
              onChange={(e) => setLocationType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Field"
              className="Mando"
              onChange={(e) => setJobField(e.target.value)}
              required
            />
          </div>

          <div className="User">
            <input
              type="text"
              placeholder="Years working"
              className="Mando"
              onChange={(e) => setYearsW(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Years at company"
              className="Mando"
              onChange={(e) => setYearsC(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Salary"
              className="Mando"
              onChange={(e) => setSalary(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Negotiated"
              className="Negotiated"
              onChange={(e) => setNegotiated(e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              className="Mando"
              onChange={(e) => setJobCountry(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="State"
              className="Mando"
              onChange={(e) => setJobState(e.target.value)}
              required
            />
          </div>

          <button className="AddContent" onClick={postAction}>
            {" "}
            Add content{" "}
          </button>
        </form>
      </div>

      <div className="Search">
        <h1> Search </h1>
        <h2>Full Job Report Search</h2>
        <div>
          <input
            type="text"
            placeholder="Company Name"
            className="View"
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <button className="Search" onClick={getall}>
            {" "}
            Search{" "}
          </button>

          {companyHelper.map((userr, i) => (
            <div key={`some-person-${i}`}>
              <div>
                {" "}
                {userr.COMPANY_NAME} {userr.COMPANY_STANDING}{" "}
                {userr.COMPANY_COUNTRY} {userr.COMPANY_STATE}{" "}
                {userr.COMPANY_FIELD} {userr.JOB_NAME} {userr.JOB_LEVEL}{" "}
                {userr.JOB_COMMITMENT} {userr.JOB_SHIFT_TIME}{" "}
                {userr.JOB_LOCATION_TYPE} {userr.JOB_FIELD}
                {userr.USER_COMPANY_NAME} {userr.USER_JOB_NAME}{" "}
                {userr.YEARS_WORKING} {userr.YEARS_AT_COMPANY} {userr.SALARY}{" "}
                {userr.NEGOTIATED} {userr.USER_COUNTRY} {userr.USER_STATE}
              </div>
            </div>
          ))}

          <h4>Company Names</h4>
          {company.map((userr, i) => (
            <div key={`some-person-${i}`}>
              <div> {userr.NAME}</div>
            </div>
          ))}

          <h2>Key Factor Job Report Search</h2>
          <input
            type="text"
            placeholder="Job Name"
            className="View"
            onChange={(e) => setJobName(e.target.value)}
            required
          />
          <button className="Search" onClick={getallJob}>
            {" "}
            Search{" "}
          </button>

          {jobHelper.map((userr, i) => (
            <div key={`some-person-${i}`}>
              <div>
                {" "}
                {userr.USER_COMPANY_NAME} {userr.USER_JOB_NAME}{" "}
                {userr.YEARS_WORKING} {userr.YEARS_AT_COMPANY} {userr.SALARY}{" "}
                {userr.NEGOTIATED}
              </div>
            </div>
          ))}

          <h4>Job Names</h4>
          {job.map((userr, i) => (
            <div key={`some-person-${i}`}>
              <div> {userr.NAME}</div>
            </div>
          ))}

          <h2>Detailed Key factor Job Report Search</h2>
          <input
            type="text"
            placeholder="Job Name"
            className="View"
            onChange={(e) => setJobName(e.target.value)}
            required
          />
          <button className="Search" onClick={getallDetailJob}>
            {" "}
            Search{" "}
          </button>

          {jobDetailed.map((userr, i) => (
            <div key={`some-person-${i}`}>
              <div>
                {" "}
                {userr.USER_COMPANY_NAME} {userr.USER_JOB_NAME}{" "}
                {userr.YEARS_WORKING} {userr.YEARS_AT_COMPANY} {userr.SALARY}{" "}
                {userr.NEGOTIATED} {userr.JOB_COMMITMENT} {userr.JOB_LEVEL}{" "}
                {userr.JOB_LOCATION_TYPE} {userr.JOB_FIELD}
              </div>
            </div>
          ))}

          <h4>Job Names</h4>
          {job.map((userr, i) => (
            <div key={`some-person-${i}`}>
              <div> {userr.NAME}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;