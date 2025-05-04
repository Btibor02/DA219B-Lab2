import { use, useEffect, useState } from "react";

export default function Table() {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = () => {
            fetch("http://localhost:5000/api/project_assignments")
                .then((response) => response.json())
                .then((data) => {
                    console.log("Fetched assignments:", data); // Log the fetched data
                    const sortedData = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                    setAssignments(sortedData.slice(0, 5)); // Get the latest 5 assignments
                })
                .catch((error) => console.error("Error fetching assignments:", error));
        };

        fetchAssignments();
        const intervalId = setInterval(fetchAssignments, 60000); // Fetch every minute

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                </tr>
            </thead>
            <tbody>
                {assignments.map((assignment) => (
                    <tr key={assignment._id}>
                        <td>{assignment.employee_id}</td>
                        <td>{assignment.full_name}</td>
                        <td>{assignment.project_name}</td>
                        <td>{formatDate(assignment.startDate)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}