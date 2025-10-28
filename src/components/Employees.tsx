import { Form } from "react-bootstrap";

type Props = {
  name: string;
  title: string;
};

function Employees({ name, title }: Props) {
  return (
    <div style={{ width: "250px", flex: "0 0 auto" }} className="p-1">
      <Form.Control
        placeholder="Employee"
        value={name + (title === "Supervisor" ? ` (${title})` : "")}
        readOnly
        style={
          title === "Supervisor"
            ? {
                textAlign: "center",
                fontWeight: "bold",
                color: "blue",
                borderBottom: "1px solid blue",
              }
            : { textAlign: "center", fontWeight: "normal", color: "black" }
        }
      />
    </div>
  );
}

export default Employees;
