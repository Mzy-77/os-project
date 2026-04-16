import { useState } from "react";

export default function InputPanel({ onRunSimulation }) {
    const [processes, setProcesses] = useState([]);
  
    const addProcess = () => {
        setProcesses(prev => [
            ...prev,
            {
                id: prev.length + 1,
                arrival: 0,
                burst: 1,
                priority: 1
            }
        ]);
    };
    const update = (index, field, value) => {
        setProcesses(prev => {
            const copy = [...prev];
            copy[index] = {
                ...copy[index],
                [field]: Number(value)
            };
            return copy;
        });
    };

    const deleteProcess = () => {
        setProcesses(prev => prev.filter((_, i) => i !== prev.length - 1));
    };

    return (
        <div className="input-panel">
            <button onClick={addProcess}>Add Process</button>
            <button onClick={deleteProcess}>Delete Process</button>
            {processes.map((p, i) => ( 
                <div key={p.id}>
                    <span>Process {p.id}</span>
                    <input
                        placeholder="Arrival Time"
                        value={p.arrival}
                        onChange={(e) => update(i, "arrival", e.target.value)}
                    />
                    <input
                        placeholder="Burst Time"
                        value={p.burst}
                        onChange={(e) => update(i, "burst", e.target.value)}
                    />
                    <input
                        placeholder="Priority"
                        value={p.priority}
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