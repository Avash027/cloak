const CollegeRow = ({ college }) => {
  console.log(college);
  return (
    <tr>
      <td>{college.college_name}</td>
      <td>{college.domain_name}</td>
    </tr>
  );
};

export default CollegeRow;
