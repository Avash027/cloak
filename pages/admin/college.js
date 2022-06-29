import { useState } from "react";
import { Button, Table, TextInput } from "@mantine/core";
import { addCollege, getColleges } from "../../api/admin";
import CollegeRow from "../../components/CollegeRow";
import { showNotification } from "@mantine/notifications";

const college = () => {
  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [collegeName, setCollegeName] = useState("");
  const [collegeDomain, setCollegeDomain] = useState("");

  const handleColleges = async () => {
    await getColleges(setColleges, setError, setLoading);
  };

  const addNewCollege = async () => {
    setCollegeDomain("");
    setCollegeName("");
    await addCollege(collegeName, collegeDomain, showNotification, setColleges);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading && error) {
    return <div>{error + " Please refresh the page"}</div>;
  }

  const collegeRow = colleges.map((college) => {
    return (
      <CollegeRow key={college.college_name} college={college}></CollegeRow>
    );
  });

  collegeRow.push(
    <tr key={"newval"}>
      <td>
        <TextInput
          placeholder="College Name"
          value={collegeName}
          onChange={(e) => setCollegeName(e.currentTarget.value)}
        />
      </td>
      <td>
        <TextInput
          placeholder="College Domain"
          value={collegeDomain}
          onChange={(e) => setCollegeDomain(e.currentTarget.value)}
          rightSection={<Button onClick={addNewCollege}>Add</Button>}
        />
      </td>
    </tr>
  );

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
        <Button onClick={handleColleges}>Get Colleges</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>College Name</th>
            <th>College domain</th>
          </tr>
        </thead>
        <tbody>{collegeRow}</tbody>
      </Table>
    </div>
  );
};

export default college;
