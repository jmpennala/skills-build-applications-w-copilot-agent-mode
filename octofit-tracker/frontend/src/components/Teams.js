import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace ? `https://${codespace}-8000.app.github.dev/api/teams/` : '';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (API_URL) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          const results = data.results || data;
          setTeams(results);
          console.log('Teams API endpoint:', API_URL);
          console.log('Fetched teams:', results);
        });
    } else {
      console.error('REACT_APP_CODESPACE_NAME is not set. Cannot fetch teams.');
    }
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Teams</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Members</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id || idx}>
                <th scope="row">{idx + 1}</th>
                <td>{team.name || '-'}</td>
                <td>{team.members ? team.members.length : '-'}</td>
                <td>{team.details || JSON.stringify(team)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
