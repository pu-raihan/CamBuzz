import "./home.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Link
        to="/faculties"
      >
        <div className="card">
          FACULTIES
        </div>
      </Link>
      <Link
        to="/classes"
      >
        <div className="card">
          CLASSES
        </div>
      </Link>
      <Link
        to="/resources"
      >
        <div className="card">
          RESOURCES
        </div>
      </Link>
    </div>
  );
};

export default Home;
