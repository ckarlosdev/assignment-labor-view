import { Badge, Container, ListGroup } from "react-bootstrap";
import "./App.css";
import Title from "./components/Title";
import Employees from "./components/Employees";
import Dates from "./components/Dates";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Assignment, Employee, Job } from "./types";
import useHttpsData from "./hooks/useHttpsData";
import { getEmployeesURL, getJobsURL, searchAssignURL } from "./hooks/urls";

function App() {
  const [searchParams] = useSearchParams();
  const assignmentId = searchParams.get("assigmentsId");

  const [employeesDetail, setEmployeesDetail] = useState<Employee[]>([]);
  const [jobsDetail, setJobsDetail] = useState<Job[]>([]);
  const [assignmentDetail, setAssignmentDetail] = useState<Assignment>();

  const { data: employeeData, search: searchEmployees } =
    useHttpsData<Employee[]>();
  const { data: jobData, search: searchJobs } = useHttpsData<Job[]>();
  const { data: assignmentData, search: searchAssignment } =
    useHttpsData<Assignment>();

  useEffect(() => {
    if (assignmentId) {
      const urlAssignment = searchAssignURL(Number(assignmentId));
      console.log(urlAssignment);
      searchAssignment(urlAssignment);
    } else {
      console.log("AssigmentsId not found in the URL.");
    }
  }, [assignmentId]);

  useEffect(() => {
    const urlJobs = getJobsURL();
    searchJobs(urlJobs);

    const urlEmp = getEmployeesURL();
    searchEmployees(urlEmp);
  }, []);

  useEffect(() => {
    if (employeeData) {
      setEmployeesDetail(employeeData);
    }
  }, [employeeData]);

  useEffect(() => {
    if (jobData) {
      setJobsDetail(jobData);
    }
  }, [jobData]);

  useEffect(() => {
    if (assignmentData) {
      setAssignmentDetail(assignmentData);
    }
  }, [assignmentData]);

  // console.log(assignmentDetail);

  return (
    <div className="text-center mx-auto" style={{ maxWidth: "80%" }}>
      <Title />
      <Dates assignmentDetail={assignmentDetail} />
      <div>
        <ListGroup as="ol">
          {assignmentDetail?.assignmentJobDtos.map((job) => {
            const jobData = jobsDetail.find(
              (jobD) => jobD.jobsId === job.jobsId
            );
            const jobName = jobData ? jobData.name : "Nombre Desconocido";
            const jobNumber = jobData ? jobData.number : "0";
            return (
              <ListGroup.Item
                key={job.jobsId}
                as="li"
                className="d-flex align-items-center"
                style={{ borderBottom: "3px solid gray" }}
              >
                <div
                  className="ms-2 me-auto text-center"
                  style={{ flexGrow: 1 }}
                >
                  <div className="fw-bold">
                    <span style={{ fontSize: "20px" }}>#{jobNumber} </span>
                    <span style={{ fontSize: "22px" }}>{jobName}</span>
                    <Badge bg="primary" pill className="ms-3">
                      {job.assignmentEmployeeDtos.length}
                    </Badge>
                  </div>
                  <Container fluid className="p-0 mt-2">
                    <div className="d-flex flex-wrap justify-content-center">
                      {job.assignmentEmployeeDtos.map((employeeId) => {
                        const employee = employeesDetail.find(
                          (emp) => emp.employeesId === employeeId.employeesId
                        );

                        const name =
                          employee?.firstName + " " + employee?.lastName;
                        const title = employee?.title;

                        return (
                          <Employees
                            key={employeeId.employeesId}
                            name={name}
                            title={title ? title : "labor"}
                          />
                        );
                      })}
                    </div>
                  </Container>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </div>
  );
}

export default App;
