import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace ? `https://${codespace}-8000.app.github.dev/api/activities/` : '';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (API_URL) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          const results = data.results || data;
          setActivities(results);
          console.log('Activities API endpoint:', API_URL);
          console.log('Fetched activities:', results);
        });
    } else {
      console.error('REACT_APP_CODESPACE_NAME is not set. Cannot fetch activities.');
    }
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Activities</h2>
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
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                <th scope="row">{idx + 1}</th>
                <td>{activity.name || '-'}</td>
                <td>{activity.type || '-'}</td>
                <td>{activity.details || JSON.stringify(activity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
