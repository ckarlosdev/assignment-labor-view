const base = "https://checklist-api-8j62.onrender.com/api/v1";

export const getJobsURL = () => `${base}/job`;
export const getEmployeesURL = () => `${base}/employee`;
export const searchAssignURL = (id: number) => `${base}/assignment/${id}`;
