import { useEffect, useState } from 'react';
import { fetchAPI } from '../config/api';

// API endpoint: https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts
export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAPI('/api/workouts')
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading workouts...</p></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="row">
        {workouts.length === 0 ? (
          <p>No workouts found</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="card-text">
                    <span className="badge bg-info">{workout.difficulty}</span>
                  </p>
                  {workout.suggestedFor && workout.suggestedFor.length > 0 && (
                    <p className="card-text small">
                      Suggested for {workout.suggestedFor.length} user(s)
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
