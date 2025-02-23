// src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Loader from '../components/Loader';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5007/api/users/getAllusers')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error('Expected array of users but got:', data);
          setUsers([]); // Fallback to empty array
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setUsers([]); // Ensure users remains an array
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Users</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>isVerified</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAccountVerified ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;