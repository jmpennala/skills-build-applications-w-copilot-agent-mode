import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace ? `https://${codespace}-8000.app.github.dev/api/workouts/` : '';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (API_URL) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          const results = data.results || data;
          setWorkouts(results);
          console.log('Workouts API endpoint:', API_URL);
          console.log('Fetched workouts:', results);
        });
    } else {
      console.error('REACT_APP_CODESPACE_NAME is not set. Cannot fetch workouts.');
    }
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={workout.id || idx}>
                <th scope="row">{idx + 1}</th>
                <td>{workout.name || '-'}</td>
                <td>{workout.type || '-'}</td>
                <td>{workout.details || JSON.stringify(workout)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
