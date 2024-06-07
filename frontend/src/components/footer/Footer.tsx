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
              to={"https://github.com/bghook"}
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
