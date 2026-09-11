import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { baseUrl } from './config/api';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              🐙 Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/users" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/teams" className="nav-link">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/activities" className="nav-link">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/workouts" className="nav-link">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/leaderboard" className="nav-link">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-light border-top mt-4 py-3">
          <div className="container text-center text-muted">
            <p>
              API Base URL: <code>{baseUrl}</code>
            </p>
            <small>Octofit Tracker - Multi-tier Application</small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="container mt-4">
      <section id="center" className="text-center">
        <h1>Welcome to Octofit Tracker</h1>
        <p className="lead">
          Track your fitness activities, join teams, and compete on the leaderboard!
        </p>
        <p>
          Use the navigation menu above to explore Users, Teams, Activities, Workouts, and the Leaderboard.
        </p>
      </section>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">👥 Users</h5>
              <p className="card-text">View and manage user profiles and team assignments.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">👨‍👩‍👧‍👦 Teams</h5>
              <p className="card-text">Explore teams and their members.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🏃 Activities</h5>
              <p className="card-text">Log and track your workout activities.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">💪 Workouts</h5>
              <p className="card-text">Get personalized workout suggestions.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">🏆 Leaderboard</h5>
              <p className="card-text">View team rankings and compete!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
