const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

function validateProcesses(processList) {
    if (!Array.isArray(processList) || processList.length === 0)
        return "Process list must be a non-empty array.";
    if (processList.length > 20)
        return "Maximum 20 processes allowed.";

    const ids = new Set();
    for (let p of processList) {
        if (p.id === undefined || p.id === null || String(p.id).trim() === "")
            return "Each process must have a valid ID.";
        if (ids.has(p.id)) return `Duplicate process ID: ${p.id}`;
        ids.add(p.id);
        if (typeof p.arrival !== "number" || p.arrival < 0 || !Number.isInteger(p.arrival))
            return `Process ${p.id}: Arrival time must be a non-negative integer.`;
        if (typeof p.burst !== "number" || p.burst <= 0 || !Number.isInteger(p.burst))
            return `Process ${p.id}: Burst time must be a positive integer.`;
        if (typeof p.priority !== "number" || p.priority < 1 || !Number.isInteger(p.priority))
            return `Process ${p.id}: Priority must be a positive integer (1 = highest).`;
    }
    return null;
}

function priorityScheduling(processList) {
    const processes = processList.map(p => ({
        ...p,
        remaining: p.burst,
        firstStart: -1,
        finish: 0
    }));

    let time = 0;
    let completed = 0;
    const total = processes.length;
    const timeline = []; // { id, start, end }
    let lastId = null;
    let segStart = 0;

    while (completed < total) {
        const available = processes.filter(p => p.arrival <= time && p.remaining > 0);

        if (available.length === 0) {
            if (lastId !== null) {
                timeline.push({ id: lastId, start: segStart, end: time });
                lastId = null;
            }
            time++;
            segStart = time;
            continue;
        }

        // Sort: lower priority number = higher priority; tie → earlier arrival
        available.sort((a, b) =>
            a.priority !== b.priority ? a.priority - b.priority : a.arrival - b.arrival
        );

        const current = available[0];

        if (current.firstStart === -1) current.firstStart = time;

        // Detect preemption (context switch)
        if (lastId !== current.id) {
            if (lastId !== null) timeline.push({ id: lastId, start: segStart, end: time });
            segStart = time;
            lastId = current.id;
        }

        current.remaining--;
        time++;

        if (current.remaining === 0) {
            current.finish = time;
            completed++;
        }
    }

    if (lastId !== null) timeline.push({ id: lastId, start: segStart, end: time });

    const results = processes.map(p => {
        const turnaround = p.finish - p.arrival;
        const waiting = turnaround - p.burst;
        const response = p.firstStart - p.arrival;
        return { id: p.id, arrival: p.arrival, burst: p.burst, priority: p.priority, finish: p.finish, turnaround, waiting, response };
    });

    const avgWT = results.reduce((s, r) => s + r.waiting, 0) / results.length;
    const avgTAT = results.reduce((s, r) => s + r.turnaround, 0) / results.length;
    const avgRT = results.reduce((s, r) => s + r.response, 0) / results.length;

    // Detect preemption events for annotation
    const preemptions = [];
    for (let i = 1; i < timeline.length; i++) {
        if (timeline[i].id !== timeline[i - 1].id) {
            preemptions.push({ at: timeline[i].start, preempted: timeline[i - 1].id, by: timeline[i].id });
        }
    }

    return { timeline, results, avgWT, avgTAT, avgRT, preemptions };
}


function srtf(processList) {
    const processes = processList.map(p => ({
        ...p,
        remaining: p.burst,
        firstStart: -1,
        finish: 0
    }));

    let time = 0;
    let completed = 0;
    const total = processes.length;
    const timeline = [];
    let lastId = null;
    let segStart = 0;

    while (completed < total) {
        const available = processes.filter(p => p.arrival <= time && p.remaining > 0);

        if (available.length === 0) {
            if (lastId !== null) {
                timeline.push({ id: lastId, start: segStart, end: time });
                lastId = null;
            }
            time++;
            segStart = time;
            continue;
        }


        available.sort((a, b) =>
            a.remaining !== b.remaining ? a.remaining - b.remaining : a.arrival - b.arrival
        );

        const current = available[0];
        if (current.firstStart === -1) current.firstStart = time;

        if (lastId !== current.id) {
            if (lastId !== null) timeline.push({ id: lastId, start: segStart, end: time });
            segStart = time;
            lastId = current.id;
        }

        current.remaining--;
        time++;

        if (current.remaining === 0) {
            current.finish = time;
            completed++;
        }
    }

    if (lastId !== null) timeline.push({ id: lastId, start: segStart, end: time });

    const results = processes.map(p => {
        const turnaround = p.finish - p.arrival;
        const waiting = turnaround - p.burst;
        const response = p.firstStart - p.arrival;
        return { id: p.id, arrival: p.arrival, burst: p.burst, priority: p.priority, finish: p.finish, turnaround, waiting, response };
    });

    const avgWT = results.reduce((s, r) => s + r.waiting, 0) / results.length;
    const avgTAT = results.reduce((s, r) => s + r.turnaround, 0) / results.length;
    const avgRT = results.reduce((s, r) => s + r.response, 0) / results.length;

    const preemptions = [];
    for (let i = 1; i < timeline.length; i++) {
        if (timeline[i].id !== timeline[i - 1].id) {
            preemptions.push({ at: timeline[i].start, preempted: timeline[i - 1].id, by: timeline[i].id });
        }
    }

    return { timeline, results, avgWT, avgTAT, avgRT, preemptions };
}

app.post("/simulate", (req, res) => {
    const { processes } = req.body;
    const error = validateProcesses(processes);
    if (error) return res.status(400).json({ error });

    const priorityResult = priorityScheduling(JSON.parse(JSON.stringify(processes)));
    const srtfResult = srtf(JSON.parse(JSON.stringify(processes)));

    res.json({ priority: priorityResult, srtf: srtfResult });
});

app.get("/scenarios", (req, res) => {
    res.json({
        A: {
            name: "Scenario A — Basic Mixed Workload",
            description: "Normal workload with different arrival times, burst times, and priorities.",
            processes: [
                { id: "P1", arrival: 0, burst: 6, priority: 3 },
                { id: "P2", arrival: 2, burst: 4, priority: 1 },
                { id: "P3", arrival: 4, burst: 2, priority: 4 },
                { id: "P4", arrival: 6, burst: 5, priority: 2 }
            ]
        },
        B: {
            name: "Scenario B — Priority vs Burst Conflict",
            description: "High-priority long process vs low-priority short processes. The two algorithms behave very differently.",
            processes: [
                { id: "P1", arrival: 0, burst: 10, priority: 1 },
                { id: "P2", arrival: 1, burst: 2, priority: 4 },
                { id: "P3", arrival: 2, burst: 1, priority: 5 },
                { id: "P4", arrival: 3, burst: 3, priority: 3 }
            ]
        },
        C: {
            name: "Scenario C — Starvation Risk",
            description: "A low-priority process may starve while higher-priority processes keep arriving.",
            processes: [
                { id: "P1", arrival: 0, burst: 3, priority: 1 },
                { id: "P2", arrival: 1, burst: 3, priority: 1 },
                { id: "P3", arrival: 2, burst: 3, priority: 1 },
                { id: "P4", arrival: 0, burst: 8, priority: 5 }
            ]
        },
        D: {
            name: "Scenario D — Validation Case (Invalid Input)",
            description: "Contains intentionally invalid data to test input validation.",
            processes: [
                { id: "P1", arrival: -1, burst: 5, priority: 2 },
                { id: "P2", arrival: 0, burst: 0, priority: 1 }
            ]
        }
    });
});

app.listen(3001, () => console.log("Scheduler backend running on port 3001"));