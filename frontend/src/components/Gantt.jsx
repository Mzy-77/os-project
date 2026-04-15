export default function GanttChart({ data }) {
    return (
        <div>
            {data.map((id, i) => (
                <span key={i}>
                    P{id} |
                </span>
            ))}
        </div>
    );
}