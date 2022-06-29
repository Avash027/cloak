import { useState } from "react";
import { getAllUsers } from "../../api/admin";
import { Button, Table } from "@mantine/core";
import UserRow from "../../components/UserRow";

const users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    await getAllUsers(setUsers, setError, setLoading);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && error) {
    return <div>{error}</div>;
  }

  const rows = users.map((user) => {
    return <UserRow key={user.uid} user={user}></UserRow>;
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "5rem",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Button onClick={handle}>Get Users</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Verified</th>
            <th>Verification Token</th>
            <th>Banned</th>
            <th>College Name</th>
            <th>users</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default users;
