export const SCENARIOS = {
  A: {
    name: "A — Basic Mixed",
    processes: [
      { id: "P1", arrival: 0, burst: 6, priority: 3 },
      { id: "P2", arrival: 2, burst: 4, priority: 1 },
      { id: "P3", arrival: 4, burst: 2, priority: 4 },
      { id: "P4", arrival: 6, burst: 5, priority: 2 }
    ]
  },
  B: {
    name: "B — Priority vs Burst Conflict",
    processes: [
      { id: "P1", arrival: 0, burst: 10, priority: 1 },
      { id: "P2", arrival: 1, burst:  2, priority: 4 },
      { id: "P3", arrival: 2, burst:  1, priority: 5 },
      { id: "P4", arrival: 3, burst:  3, priority: 3 }
    ]
  },
  C: {
    name: "C — Starvation Risk",
    processes: [
      { id: "P1", arrival: 0, burst: 3, priority: 1 },
      { id: "P2", arrival: 1, burst: 3, priority: 1 },
      { id: "P3", arrival: 2, burst: 3, priority: 1 },
      { id: "P4", arrival: 0, burst: 8, priority: 5 }
    ]
  }
};