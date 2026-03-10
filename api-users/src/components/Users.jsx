import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Set the data and mark as loaded
        setUsers(data);
        setError(null);
      })
      .catch((error) => {
        // Handle any fetch errors
        setError(error.message || "Failed to fetch users");
        setUsers([]);
      })
      .finally(() => {
        // Set loading to false regardless of success or failure
        setLoading(false);
      });
  }, []);

  // Show loading message
  if (loading) {
    return <div className="loading"><p>Loading users...</p></div>;
  }

  // Show error message
  if (error) {
    return (
      <div className="error">
        <h2>⚠️ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="users-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-info">
                <strong className="user-name">{user.name}</strong>
                <span className="user-email">{user.email}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;