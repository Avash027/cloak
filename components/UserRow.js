import { useState } from "react";
import { Switch } from "@mantine/core";
import { updateUser } from "../api/admin";
import { showNotification } from "@mantine/notifications";

const UserRow = ({ user }) => {
  const [verified, setVerified] = useState(user.verified);
  const [banned, setBanned] = useState(user.banned);
  const [admin, setAdmin] = useState(user.admin);

  const handleVerified = async () => {
    await updateUser(user.uid, !verified, banned, admin, showNotification);
    setVerified(!verified);
  };

  const handleBanned = async () => {
    await updateUser(user.uid, verified, !banned, admin, showNotification);
    setBanned(!banned);
  };

  const handleAdmin = async () => {
    await updateUser(user.uid, verified, banned, !admin, showNotification);
    setAdmin(!admin);
  };

  return (
    <tr>
      <td>{user.uid}</td>
      <td>
        <Switch checked={verified} onChange={handleVerified}></Switch>
      </td>
      <td>{user.verification_token}</td>
      <td>
        <Switch checked={banned} onChange={handleBanned}></Switch>
      </td>
      <td>{user.college_name}</td>
      <td>
        <Switch checked={admin} onChange={handleAdmin}></Switch>
      </td>
    </tr>
  );
};

export default UserRow;
