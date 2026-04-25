# CPU Scheduling Simulator — Priority vs SRTF

A React + Node.js application comparing Priority Scheduling and Shortest Remaining Time First algorithms.

## Project Structure

```
scheduler/
├── backend/
│   ├── index.js          # Express server with Priority & SRTF algorithms
│   
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   │   │  ├── colors.js            # Color palette helper
│   │   │   │  └── scenarios.js         # Scenario datasets
│   │   │   ├── Header.jsx           # Page header with priority rule
│   │   │   ├── ScenarioBar.jsx      # Load preset scenarios
│   │   │   ├── InputPanel.jsx       # Process input & management
│   │   │   ├── GanttChart.jsx       # Visual timeline
│   │   │   ├── ResultsTable.jsx     # Process metrics table
│   │   │   ├── ResultsPanel.jsx     # Tabs + Gantt + Table
│   │   │   └── ComparisonSummary.jsx # Analysis & conclusion
│   │   │
│   │   ├── App.jsx                  # Main component
│   │   ├── index.css                # All styles
│   │   └── main.jsx                 # React entry point
│   │
└── package.json
```

## Installation

### Backend

```bash

npm install
npm run ser
```
Runs on **http://localhost:3001**

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs on **http://localhost:5173** (or shown in console)

## Features

- **Input Panel** — Add/edit/remove processes dynamically
- **Validation** — Catches invalid inputs before simulation
- **4 Scenarios** — A (basic), B (conflict), C (starvation), D (validation demo)
- **Gantt Charts** — Visual representation with preemption points marked
- **Results Tables** — WT, TAT, RT metrics for each process
- **Comparison Summary** — Side-by-side metrics, analysis questions, conclusion

## Algorithms

**Priority Scheduling (Preemptive)**
- Lower priority number = higher priority (P1 served before P3)
- Ties broken by earliest arrival time

**SRTF (Shortest Remaining Time First)**
- Always picks the process with shortest remaining burst time
- Preempts immediately when a shorter job arrives

## How to Use

1. Start backend and frontend servers
2. Click a scenario button or manually enter processes
3. Click "RUN SIMULATION"
4. Review Gantt charts, tables, and comparison analysis

## Class Names Reference

### Components
- `.header` — Page header
- `.panel` — Card-style container
- `.process-row` — Single process input row
- `.gantt-bar` — Timeline visualization
- `.results-table` — Metrics table
- `.summary` — Comparison section

### Utilities
- `getColor(id, allIds)` — Returns color for process ID
- `SCENARIOS` — Predefined workloads

## CSS

All styling is in `index.css`. No inline styles except:
- Dynamic `background` color for process cells (from `colors.js`)
- Dynamic `width` for Gantt segments (calculated from timeline)
- Dynamic `borderRight` for preemption markers
