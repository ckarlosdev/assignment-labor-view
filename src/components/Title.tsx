import hmbLogo from "../assets/hmbLogo.png";

type Props = {};

function Title({}: Props) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      <img style={{ width: "250px" }} src={hmbLogo} alt="" />
    </div>
  );
}

export default Title;
