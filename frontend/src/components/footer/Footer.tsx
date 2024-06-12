import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 125,
        }}
      >
        <p
          style={{
            fontSize: "30px",
            textAlign: "center",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            color: "#F8F8FF",
            borderRadius: 20,
            boxShadow: "-5px -5px 105px #64f3d5",
          }}
        >
          Bryan Hooker
          <span>
            <Link
              style={{
                color: "blue",
                textDecoration: "underline",
                marginLeft: 35,
                borderRadius: 20,
                boxShadow: "-5px -5px 105px #64f3d5",
              }}
              className="nav-link"
              to={"https://bghook.github.io/bh-swe/"}
            >
              Website
            </Link>
          </span>
          <span>
            <Link
              style={{
                color: "blue",
                textDecoration: "underline",
                borderRadius: 20,
                boxShadow: "-5px -5px 105px #64f3d5",
              }}
              className="nav-link"
              to={"https://github.com/bghook"}
            >
              GitHub
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
