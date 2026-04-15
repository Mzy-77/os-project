const express = require("express");
const cors = require("cors");

const application = express();

application.use(cors());
application.use(express.json());

function priorityScheduling(processList) {
    const totalProcesses = processList.length;

    let currentTime = 0;
    let completed = 0;
    let timeline = [];

    let processes = processList.map((p) => ({
        ...p,
        remaining: p.burst,
        start: -1,
        finish: 0
    }));

    while (completed < totalProcesses) {

        let available = processes.filter(
            (p) => p.arrival <= currentTime && p.remaining > 0
        );

        if (available.length === 0) {
            currentTime++;
            continue;
        }

        available.sort((a, b) => {
            if (a.priority === b.priority) {
                return a.arrival - b.arrival;
            }
            return a.priority - b.priority;
        });

        let current = available[0];

        if (current.start === -1) {
            current.start = currentTime;
        }

        timeline.push(current.id);

        current.remaining--;
        currentTime++;

        if (current.remaining === 0) {
            current.finish = currentTime;
            completed++;
        }
    }

    let results = processes.map((p) => {
        let turnaround = p.finish - p.arrival;
        let waiting = turnaround - p.burst;
        let response = p.start - p.arrival;

        return {
            id: p.id,
            arrival: p.arrival,
            burst: p.burst,
            priority: p.priority,
            start: p.start,
            finish: p.finish,
            turnaround,
            waiting,
            response
        };
    });

    return { timeline, results };
}

function srtf(processList) {
    const totalProcesses = processList.length;

    let currentTime = 0;
    let completed = 0;
    let timeline = [];

    let processes = processList.map((p) => ({
        ...p,
        remaining: p.burst,
        start: -1,
        finish: 0
    }));

    while (completed < totalProcesses) {

        let available = processes.filter(
            (p) => p.arrival <= currentTime && p.remaining > 0
        );

        if (available.length === 0) {
            currentTime++;
            continue;
        }

        available.sort((a, b) => a.remaining - b.remaining);

        let current = available[0];

        if (current.start === -1) {
            current.start = currentTime;
        }

        timeline.push(current.id);

        current.remaining--;
        currentTime++;

        if (current.remaining === 0) {
            current.finish = currentTime;
            completed++;
        }
    }

    let results = processes.map((p) => {
        let turnaround = p.finish - p.arrival;
        let waiting = turnaround - p.burst;
        let response = p.start - p.arrival;

        return {
            id: p.id,
            arrival: p.arrival,
            burst: p.burst,
            start: p.start,
            finish: p.finish,
            turnaround,
            waiting,
            response
        };
    });

    return { timeline, results };
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