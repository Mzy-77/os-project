# CPU Scheduling Simulator — Priority vs SRTF

A React + Node.js application comparing Priority Scheduling and Shortest Remaining Time First algorithms.


## Algorithms Rules

**Priority Scheduling (Preemptive)**
- Lower priority number = higher priority (P1 served before P3).
- Ties are broken by earliest arrival time.

**SRTF (Shortest Remaining Time First)**
- Always picks the process with shortest remaining burst time.
- Preempts immediately when a shorter job arrives.
- Ties are broken by earliest arrival time.

## Input Validation
- Process ID can not be empty, and two processes can not have the same ID.
- Arrival Time can not be a negative number.
- Burst Time can not be zero or a negative number.
- Priority can not be zero or a negative number.

## Scenarios
### Scenario A
| PID |  Arrival | Burst | Priority |
| --- | --- | --- | --- |
| P1 | 0 | 6 | 3 |
| P2 | 2 | 4 | 1 |
| P3 | 4 | 2 | 4 |
| P4 | 6 | 5 | 2 |

#### 1. Priority Sheduling
##### Waiting Time (WT):
* **P1:** $(11 - 2) + (0 - 0) = 9$
* **P2:** $2 - 2 = 0$
* **P3:** $15 - 4 = 11$
* **P4:** $6 - 6 = 0$

**Average WT = $(9 + 0 + 11 + 0) / 4 = 20 / 4 = 5.0$**

##### Turnaround Time (TAT):
* **P1:** $15 - 0 = 15$
* **P2:** $6 - 2 = 4$
* **P3:** $17 - 4 = 13$
* **P4:** $11 - 6 = 5$

**Average TAT = $(15 + 4 + 13 + 5) / 4 = 37 / 4 = 9.25$**

##### Response Time (RT):
* **P1:** $0 - 0 = 0$
* **P2:** $2 - 2 = 0$
* **P3:** $15 - 4 = 11$
* **P4:** $6 - 6 = 0$

**Average RT = $(0 + 0 + 11 + 0) / 4 = 11 / 4 = 2.75$**

<img width="1320" height="808" alt="Screenshot from 2026-05-09 15-56-25" src="https://github.com/user-attachments/assets/95ce21a0-ff14-4a91-92ef-5107449ad3f9" />

---

#### 2. SRTF (Shortest Remaining Time First)

##### Waiting Time (WT):
* **P1:** $6 - 0 - 6 = 0$
* **P2:** $8 - 2 = 6$
* **P3:** $6 - 4 = 2$
* **P4:** $12 - 6 = 6$

**Average WT = $(0 + 6 + 2 + 6) / 4 = 14 / 4 = 3.50$**

##### Turnaround Time (TAT):
* **P1:** $6 - 0 = 6$
* **P2:** $12 - 2 = 10$
* **P3:** $8 - 4 = 4$
* **P4:** $17 - 6 = 11$

**Average TAT = $(6 + 10 + 4 + 11) / 4 = 31 / 4 = 7.75$**

##### Response Time (RT):
* **P1:** $0 - 0 = 0$
* **P2:** $8 - 2 = 6$
* **P3:** $6 - 4 = 2$
* **P4:** $12 - 6 = 6$

**Average RT = $(0 + 6 + 2 + 6) / 4 = 14 / 4 = 3.50$**

<img width="1320" height="808" alt="Screenshot from 2026-05-09 16-11-01" src="https://github.com/user-attachments/assets/3c0ba886-772a-4d83-9525-b2c884b60c88" />

#### Comparison Summary

<img width="1269" height="740" alt="Screenshot from 2026-05-09 17-20-07" src="https://github.com/user-attachments/assets/ee61b254-ab66-4d83-b1f6-94af1267c5d0" />

#### Conclusion

<img width="1269" height="589" alt="Screenshot from 2026-05-09 17-20-43" src="https://github.com/user-attachments/assets/bd09f908-733c-4bfc-a25e-2eb130e4cea0" />

---

### Scenario B
| PID |  Arrival | Burst | Priority |
| --- | --- | --- | --- |
| P1 | 0 | 10 | 1 |
| P2 | 1 | 2 | 4 |
| P3 | 2 | 1 | 5 |
| P4 | 3 | 3 | 3 |

#### 1. Priority Scheduling

##### Waiting Time (WT):
P1: $10 - 0 - 10 = 0$
P2: $13 - 1 - 0 = 12$
P3: $15 - 2 - 0 = 13$
P4: $10 - 3 - 0 = 7$

**Average WT = $(0 + 12 + 13 + 7) / 4 = 32 / 4 = 8.00$**

##### Turnaround Time (TAT):
* **P1:** $10 - 0 = 10$
* **P2:** $15 - 1 = 14$
* **P3:** $16 - 2 = 14$
* **P4:** $13 - 3 = 10$

**Average TAT = $(10 + 14 + 14 + 10) / 4 = 48 / 4 = 12.00$**

##### Response Time (RT):
* **P1:** $0 - 0 = 0$
* **P2:** $13 - 1 = 12$
* **P3:** $15 - 2 = 13$
* **P4:** $10 - 3 = 7$

**Average RT = $(0 + 12 + 13 + 7) / 4 = 32 / 4 = 8.00$**

<img width="1320" height="808" alt="Screenshot from 2026-05-09 16-36-14" src="https://github.com/user-attachments/assets/2d3f3dcf-902d-41e1-ba99-456ff88f83e3" />

---

#### 2. SRTF (Shortest Remaining Time First)

##### Waiting Time (WT):
* **P1:** $16 - 0 - 10 = 6$
* **P2:** $3 - 1 - 2 = 0$
* **P3:** $4 - 2 - 1 = 1$
* **P4:** $7 - 3 - 3 = 1$

**Average WT = $(6 + 0 + 1 + 1) / 4 = 8 / 4 = 2.00$**

##### Turnaround Time (TAT):
* **P1:** $16 - 0 = 16$
* **P2:** $3 - 1 = 2$
* **P3:** $4 - 2 = 2$
* **P4:** $7 - 3 = 4$

**Average TAT = $(16 + 2 + 2 + 4) / 4 = 24 / 4 = 6.00$**

##### Response Time (RT):
* **P1:** $0 - 0 = 0$
* **P2:** $1 - 1 = 0$
* **P3:** $3 - 2 = 1$
* **P4:** $4 - 3 = 1$

**Average RT = $(0 + 0 + 1 + 1) / 4 = 2 / 4 = 0.50$**

<img width="1324" height="812" alt="Screenshot from 2026-05-09 16-58-03" src="https://github.com/user-attachments/assets/7ac8fb09-c7d5-4600-8786-859de8e1fb9c" />

#### Comparison Summary

<img width="1270" height="741" alt="Screenshot from 2026-05-09 17-18-09" src="https://github.com/user-attachments/assets/8a2c13f2-6828-4363-9f04-d1d432b49d97" />

#### Conclusion

<img width="1270" height="591" alt="Screenshot from 2026-05-09 17-18-51" src="https://github.com/user-attachments/assets/849fff33-4654-4e8a-a152-4413a3cb2648" />

---

### Scenario C
| PID | Arrival | Burst | Priority |
| --- | --- | --- | --- |
| P1  | 0       | 3     | 1        |
| P2  | 1       | 3     | 1        |
| P3  | 2       | 3     | 1        |
| P4  | 0       | 8     | 5        |

#### 1. Priority Scheduling

##### Waiting Time (WT):
* **P1:** $3 - 0 - 3 = 0$
* **P2:** $6 - 1 - 3 = 2$
* **P3:** $9 - 2 - 3 = 4$
* **P4:** $17 - 0 - 8 = 9$

**Average WT = $(0 + 2 + 4 + 9) / 4 = 15 / 4 = 3.75$**

##### Turnaround Time (TAT):
* **P1:** $3 - 0 = 3$
* **P2:** $6 - 1 = 5$
* **P3:** $9 - 2 = 7$
* **P4:** $17 - 0 = 17$

**Average TAT = $(3 + 5 + 7 + 17) / 4 = 32 / 4 = 8.00$**

##### Response Time (RT):
* **P1:** $0 - 0 = 0$
* **P2:** $3 - 1 = 2$
* **P3:** $6 - 2 = 4$
* **P4:** $9 - 0 = 9$

**Average RT = $(0 + 2 + 4 + 9) / 4 = 15 / 4 = 3.75$**

<img width="1324" height="812" alt="Screenshot from 2026-05-09 17-00-44" src="https://github.com/user-attachments/assets/4771e7d0-b9c6-4dec-9755-62ad01004b2e" />

---

#### 2. SRTF (Shortest Remaining Time First)

##### Waiting Time (WT):
* **P1:** $3 - 0 - 3 = 0$
* **P2:** $6 - 1 - 3 = 2$
* **P3:** $9 - 2 - 3 = 4$
* **P4:** $17 - 0 - 8 = 9$

**Average WT = $(0 + 2 + 4 + 9) / 4 = 15 / 4 = 3.75$**

##### Turnaround Time (TAT):
* **P1:** $3 - 0 = 3$
* **P2:** $6 - 1 = 5$
* **P3:** $9 - 2 = 7$
* **P4:** $17 - 0 = 17$

**Average TAT = $(3 + 5 + 7 + 17) / 4 = 32 / 4 = 8.00$**

##### Response Time (RT):
* **P1:** $0 - 0 = 0$
* **P2:** $3 - 1 = 2$
* **P3:** $6 - 2 = 4$
* **P4:** $9 - 0 = 9$

**Average RT = $(0 + 2 + 4 + 9) / 4 = 15 / 4 = 3.75$**

<img width="1324" height="812" alt="Screenshot from 2026-05-09 17-00-57" src="https://github.com/user-attachments/assets/2194d0f8-6d30-47f9-b78d-640f02680921" />

#### Comparison Summary

<img width="1270" height="733" alt="Screenshot from 2026-05-09 17-14-48" src="https://github.com/user-attachments/assets/9a94a392-5004-4098-872b-bf7de3ccf470" />

#### Conclusion

<img width="1270" height="582" alt="Screenshot from 2026-05-09 17-16-28" src="https://github.com/user-attachments/assets/ad238a27-2767-4674-8a4a-d88c265114a2" />
