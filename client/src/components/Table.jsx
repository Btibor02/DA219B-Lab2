import { useCallback, useEffect, useState } from "react";

export default function Table() {
    const [assignments, setAssignments] = useState([]);
    const [sortConf, setSort] = useState({ key: 'startDate', direction: 'desc' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = () => {
            setLoading(true);
            fetch("http://localhost:5000/api/project_assignments")
                .then((response) => response.json())
                .then((data) => {
                    console.log("Fetched assignments:", data); // Log the fetched data
                    const sortedData = [...data].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                    setAssignments(sortedData.slice(0, 5)); // Get the latest 5 assignments
                    setLoading(false);
                })
                .catch((error) =>  {
                    console.error("Error fetching assignments:", error)
                    setError("Failed to fetch assignments. Please try again later.");
                    setLoading(false);});
        };

        fetchAssignments();
        const intervalId = setInterval(fetchAssignments, 60000); // Fetch every minute

        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const sort = useCallback((key) => {
        let direction = 'asc';
        if (sortConf.key === key && sortConf.direction === 'asc') {
            direction = 'desc';
        }
        setSort({ key, direction });
        const sortedAssignments = [...assignments].sort((a, b) => {
            if (direction === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
        setAssignments(sortedAssignments);
    }, [assignments, sortConf]);

    return (
        <div>
            {loading && <p>Loading assignments...</p>}
            {error && <p>{error}</p>}
            <table>
            <thead>
                <tr>
                    <th onClick={() => sort('employee_id')}>Employee ID</th>
                    <th onClick={() => sort('full_name')}>Employee Name</th>
                    <th onClick={() => sort('project_name')}>Project Name</th>
                    <th onClick={() => sort('startDate')}>Start Date</th>
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
        </div>
        
    );
}