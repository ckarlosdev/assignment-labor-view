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
      // console.log(urlAssignment);
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

  const formatToAMPM = (time24: string) => {
    if (!time24) return "07:00 AM";

    const [hours, minutes] = time24.split(":");
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h ? h : 12;
    const formattedHours = h.toString().padStart(2, "0");

    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const dataContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    fontSize: "0.85rem",
    marginTop: "8px",
    flexWrap: "wrap",
    width: "100%",
    textAlign: "center",
  };


  const hourStyle = {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#0984e3", // Un azul suave para resaltar la hora
    backgroundColor: "#e1f5fe",
    padding: "2px 6px",
    borderRadius: "4px",
  };

  const commentStyle = {
    fontStyle: "italic",
    // color: "#b2bec3",
    maxWidth: "250px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis", // Si el comentario es muy largo, pone "..."
  };

  const separatorStyle = {
    color: "#dfe6e9",
    fontWeight: "bold",
  };

  const addressLinkStyle: React.CSSProperties = {
    fontWeight: 600,
    color: "#0984e3", // Un azul que indique que es cliqueable
    textDecoration: "none", // Quitar subrayado feo
    cursor: "pointer",
    borderBottom: "1px dashed #74b9ff", // Una línea punteada sutil abajo
    transition: "all 0.2s ease",
  };

  return (
    <div className="text-center mx-auto" style={{ maxWidth: "80%" }}>
      <Title />
      <Dates assignmentDetail={assignmentDetail} />
      <div>
        <ListGroup >
          {assignmentDetail?.assignmentJobDtos.map((job) => {
            const jobData = jobsDetail.find(
              (jobD) => jobD.jobsId === job.jobsId,
            );
            const jobName = jobData ? jobData.name : "Nombre Desconocido";
            const jobNumber = jobData ? jobData.number : "0";
            const googleMapsUrl = jobData
              ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(jobData.address)}`
              : "";
            const jobAddress = jobData ? jobData.address : "";
            const jobHour = formatToAMPM(job.startTime);
            const jobComments = job.assignmentComment
              ? job.assignmentComment
              : "";
            return (
              <ListGroup.Item
                key={job.jobsId}
                as="li"
                className="d-flex align-items-center"
                style={{ borderBottom: "3px solid gray" }}
                action
                variant="dark"
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
                  <div style={dataContainerStyle}>
                    <a
                      href={googleMapsUrl}
                      target="_blank" // Abrir en pestaña nueva
                      rel="noreferrer" // Seguridad
                      style={addressLinkStyle}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#74b9ff")
                      } // Efecto hover
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#0984e3")
                      }
                    >
                      📍 {jobAddress}
                    </a>
                    <span style={separatorStyle}>•</span>
                    <span style={hourStyle}>🕒{jobHour}</span>
                    {jobComments && (
                      <>
                        <span style={separatorStyle}>•</span>
                        <span style={commentStyle}>"{jobComments}"</span>
                      </>
                    )}
                  </div>
                  <Container fluid className="p-0 mt-2">
                    <div className="d-flex flex-wrap justify-content-center">
                      {job.assignmentEmployeeDtos.map((employeeId) => {
                        const employee = employeesDetail.find(
                          (emp) => emp.employeesId === employeeId.employeesId,
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
