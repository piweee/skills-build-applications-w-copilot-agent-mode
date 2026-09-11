import { useEffect, useState } from 'react';
import { fetchAPI } from '../config/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAPI('/api/activities')
      .then((data) => {
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading activities...</p></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <div className="row">
        {activities.length === 0 ? (
          <p>No activities found</p>
        ) : (
          activities.map((activity) => (
            <div key={activity._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{activity.type}</h5>
                  <p className="card-text">User: {activity.user?.name || 'Unknown'}</p>
                  <p className="card-text">Duration: {activity.duration} minutes</p>
                  <p className="card-text">Calories Burned: {activity.caloriesBurned || 0}</p>
                  <p className="card-text small text-muted">
                    Date: {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
