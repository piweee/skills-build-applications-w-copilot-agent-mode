import { useEffect, useState } from 'react';
import { fetchAPI } from '../config/api';

// API endpoint: https://${CODESPACE_NAME}-8000.app.github.dev/api/teams
export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAPI('/api/teams')
      .then((data) => {
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading teams...</p></div>;
  if (error) return <div className="container mt-4"><div className="alert alert-danger">Error: {error}</div></div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row">
        {teams.length === 0 ? (
          <p>No teams found</p>
        ) : (
          teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">Members: {team.members?.length || 0}</p>
                  {team.members && team.members.length > 0 && (
                    <ul className="list-sm">
                      {team.members.map((member) => (
                        <li key={member._id || member}>
                          {typeof member === 'string' ? member : member.name}
                        </li>
                      ))}
                    </ul>
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
