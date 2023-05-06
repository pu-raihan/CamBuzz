import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Link
        to="/faculties"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card">
          FACULTIES
        </div>
      </Link>
      <Link
        to="/faculties"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card">
          CLASSES
        </div>
      </Link>
      <Link
        to="/faculties"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card">
          RESOURCES
        </div>
      </Link>
      <Link
        to="/faculties"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card">
          ADMINS
        </div></Link>
    </div>
  );
};

export default Home;
