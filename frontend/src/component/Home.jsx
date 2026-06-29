import { useNavigate } from "react-router-dom";
import "../css/home.css";


function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-text">
          <h1>Manage Employees Smarter</h1>
          <p>
            EmployeeHub helps organizations manage employee records,
            registrations, and workflows efficiently in one place.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/login")}>Get Started</button>
            <button className="outline-btn">Learn More</button>
          </div>
        </div>

        <div className="hero-image">
          <img src="/hero.png" alt="Employee management" />
        </div>
      </section>
    </div>
  );
}

export default Home;