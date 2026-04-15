import { useState } from "react";

export default function InputPanel({ onRunSimulation }) {
    const [processes, setProcesses] = useState([]);

    const addProcess = () => {
        setProcesses([
            ...processes,
            {
                id: processes.length + 1,
                arrival: 0,
                burst: 1,
                priority: 1
            }
        ]);
    };

    const update = (index, field, value) => {
        const copy = [...processes];
        copy[index][field] = Number(value);
        setProcesses(copy);
    };

    return (
        <div>
            <button onClick={addProcess}>Add Process</button>

            {processes.map((p, i) => (
                <div key={i}>
                    <span>Process {p.id}</span>

                    <input
                        placeholder="Arrival Time"
                        onChange={(e) => update(i, "arrival", e.target.value)}
                    />

                    <input
                        placeholder="Burst Time"
                        onChange={(e) => update(i, "burst", e.target.value)}
                    />

                    <input
                        placeholder="Priority"
                        onChange={(e) => update(i, "priority", e.target.value)}
                    />
                </div>
            ))}

            <button onClick={() => onRunSimulation(processes)}>
                Run Simulation
            </button>
        </div>
    );
}