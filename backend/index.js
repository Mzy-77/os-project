const express = require("express");
const cors = require("cors");

const application = express();

application.use(cors());
application.use(express.json());

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

application.post("/simulate", (req, res) => {

    const processList = req.body.processes;

    if (!Array.isArray(processList)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    for (let p of processList) {
        if (p.arrival < 0 || p.burst <= 0 || p.priority < 1) {
            return res.status(400).json({ error: "Invalid process data" });
        }
    }

    const priorityResult = priorityScheduling(
        JSON.parse(JSON.stringify(processList))
    );

    const srtfResult = srtf(
        JSON.parse(JSON.stringify(processList))
    );

    res.json({
        priority: priorityResult,
        srtf: srtfResult
    });
});

application.listen(3000, () => {
    console.log("Server running on port 3000");
});