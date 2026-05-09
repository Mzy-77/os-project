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

![alt text](blob:https://markdownviewer.pages.dev/9ef5d7b0-1012-4e5e-b4ec-c18a95a3f29c)

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

![alt text](blob:https://markdownviewer.pages.dev/8cc87bf8-3a07-4c3d-b0ad-f8ac2b73dec0)

#### Comparison Summary

![alt text](blob:https://markdownviewer.pages.dev/c86dfdd4-0aa4-43a7-9415-9ad3c5c3b7e6)

#### Conclusion

![alt text](blob:https://markdownviewer.pages.dev/a1422aeb-affa-460e-b3fe-b347b3c9a129)


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

![alt text](blob:https://markdownviewer.pages.dev/b80a1602-512e-415b-8e0b-2f84621879b7)

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

![alt text](blob:https://markdownviewer.pages.dev/35e04b19-e848-4b80-85b4-fb0f2020bf58)

#### Comparison Summary

 ![alt text](blob:https://markdownviewer.pages.dev/027dcae1-1640-44ea-b7ab-08f7a97a91bd)

#### Conclusion

![alt text](blob:https://markdownviewer.pages.dev/a6825c71-aeab-4ded-a92e-eb6c3f8a1705)

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

![alt text](blob:https://markdownviewer.pages.dev/5db44701-0d36-4f69-b35a-982804e195e5)

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

![alt text](blob:https://markdownviewer.pages.dev/54cdf92e-e9f4-4950-b6ad-648255b95efe)

#### Comparison Summary

![alt text](blob:https://markdownviewer.pages.dev/ed38d798-4020-4cf4-a750-cc7d374e2185) 

#### Conclusion

![alt text](blob:https://markdownviewer.pages.dev/f8dc8a77-e454-4245-a948-196bd4cdb208)
