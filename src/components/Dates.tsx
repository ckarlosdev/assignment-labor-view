import { FloatingLabel, Form } from "react-bootstrap";
import { Assignment } from "../types";

type Props = {
  assignmentDetail?: Assignment;
};

function Dates({ assignmentDetail }: Props) {
  return (
    <div
      style={{
        display: "flex", // Habilita Flexbox
        flexWrap: "wrap", // **Permite que los elementos salten de línea**
        justifyContent: "center", // Centra los elementos horizontalmente (en la línea)
        gap: "20px", // Espacio entre los elementos
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <FloatingLabel
        controlId="floatingInputGridStart"
        label="Start Date"
        style={{
          width: "250px",
          minWidth: "150px",
          flexGrow: 1,
          maxWidth: "100%",
        }}
      >
        <Form.Control
          type="date"
          style={{ textAlign: "center", fontWeight: "bold" }}
          readOnly
          value={assignmentDetail?.startDate}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInputGridEnd"
        label="End Date"
        style={{
          width: "250px",
          minWidth: "150px",
          flexGrow: 1,
          maxWidth: "100%",
        }}
      >
        <Form.Control
          type="date"
          style={{ textAlign: "center", fontWeight: "bold" }}
          readOnly
          value={assignmentDetail?.endDate}
        />
      </FloatingLabel>
    </div>
  );
}

export default Dates;
