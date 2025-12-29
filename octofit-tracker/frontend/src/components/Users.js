import React, { useEffect, useState } from 'react';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const API_URL = codespace ? `https://${codespace}-8000.app.github.dev/api/users/` : '';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (API_URL) {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          const results = data.results || data;
          setUsers(results);
          console.log('Users API endpoint:', API_URL);
          console.log('Fetched users:', results);
        });
    } else {
      console.error('REACT_APP_CODESPACE_NAME is not set. Cannot fetch users.');
    }
  }, []);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4">Users</h2>
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <th scope="row">{idx + 1}</th>
                <td>{user.username || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{user.details || JSON.stringify(user)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
