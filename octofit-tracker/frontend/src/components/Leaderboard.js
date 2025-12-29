import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace ? `https://${codespace}-8000.app.github.dev/api/leaderboard/` : '';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    if (API_URL) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          const results = data.results || data;
          setLeaders(results);
          console.log('Leaderboard API endpoint:', API_URL);
          console.log('Fetched leaderboard:', results);
        });
    } else {
      console.error('REACT_APP_CODESPACE_NAME is not set. Cannot fetch leaderboard.');
    }
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Leaderboard</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, idx) => (
              <tr key={leader.id || idx}>
                <th scope="row">{idx + 1}</th>
                <td>{leader.name || '-'}</td>
                <td>{leader.score || '-'}</td>
                <td>{leader.details || JSON.stringify(leader)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
