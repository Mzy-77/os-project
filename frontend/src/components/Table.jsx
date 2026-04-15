export default function ResultsTable({ data }) {
    return (
        <table border="1">
            <thead>
            <tr>
                <th>Process ID</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Waiting</th>
                <th>Turnaround</th>
                <th>Response</th>
            </tr>
            </thead>

            <tbody>
            {data.map((p, i) => (
                <tr key={i}>
                    <td>{p.id}</td>
                    <td>{p.arrival}</td>
                    <td>{p.burst}</td>
                    <td>{p.waiting}</td>
                    <td>{p.turnaround}</td>
                    <td>{p.response}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}