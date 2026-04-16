import { useState } from "react";
import axios from "axios";
import InputPanel from "./components/InputPanel";
import GanttChart from "./components/Gantt";
import ResultsTable from "./components/Table";
import ComparisonSummary from "./components/Summary";

export default function App() {
  const [data, setData] = useState(null);
  const runSimulation = async (processes) => {
    const response = await axios.post("http://localhost:3000/simulate", {
      processes: processes
    });

    setData(response.data);
  };
  return (
      <div>
        <h1>CPU Scheduling Simulator</h1>
        <InputPanel onRunSimulation={runSimulation} />
        {data && (
            <>
              <h2>Priority Scheduling</h2>
              <GanttChart data={data.priority.timeline} />
              <ResultsTable data={data.priority.results} />
              <h2>Shortest Remaining Time First</h2>
              <GanttChart data={data.srtf.timeline} />
              <ResultsTable data={data.srtf.results} />
              <ComparisonSummary
                  priorityData={data.priority}
                  srtfData={data.srtf}
              />
              <button className="resetBtn" onClick={() => setData(null)}>Reset</button>
            </>
        )}
      </div>
  );
}