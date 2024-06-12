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
            color: "#333",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Bryan Hooker
          <span>
            <Link
              style={{
                color: "blue",
                textDecoration: "underline",
                marginLeft: 35,
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
