export type Job = {
  address: string;
  contact: string;
  contractor: string;
  jobsId: number;
  name: string;
  number: string;
  status: string;
  type: string;
};

export type Employee = {
  employeesId: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  status: string;
  title: string;
};

export type Assignment = {
  assignmentsId: number;
  createdBy: string;
  startDate: string;
  endDate: string;
  assignmentJobDtos: jobApi[];
};

export type jobApi = {
  jobsId: number;
  assignmentEmployeeDtos: Employee[];
}
