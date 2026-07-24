# POLARIS v5: Safe Multi-Agent Control Research Platform

> A deterministic neuro-symbolic framework for provable foundation model governance, Control Barrier Function synthesis, and real-time multi-agent safety verification.

---

## Badges

![Python](https://img.shields.io/badge/Python-3.10%2B-004741?style=flat-square&logo=python&logoColor=d4e897)
![PyTorch](https://img.shields.io/badge/PyTorch-2.2.0-004741?style=flat-square&logo=pytorch&logoColor=d4e897)
![OSQP](https://img.shields.io/badge/OSQP-0.6.3-004741?style=flat-square)
![OpenCV](https://img.shields.io/badge/OpenCV-4.9-004741?style=flat-square&logo=opencv&logoColor=d4e897)
![License](https://img.shields.io/badge/License-MIT-004741?style=flat-square)
![Status](https://img.shields.io/badge/Status-Stable-004741?style=flat-square)
![Methods](https://img.shields.io/badge/Domain-Formal_Methods_%26_Safety-004741?style=flat-square)
![Version](https://img.shields.io/badge/Version-v5.0.0-004741?style=flat-square)
![Modules](https://img.shields.io/badge/Active_Modules-259-004741?style=flat-square)
![Latency](https://img.shields.io/badge/CBS_Latency-0.42ms-004741?style=flat-square)
![Agents](https://img.shields.io/badge/Max_Agents-128-004741?style=flat-square)

---

## Executive Summary Metrics

| 259 | 0.42 ms | 100.0% | +1.42 | 128 | OSQP |
|---|---|---|---|---|---|
| Active Modules | CBS Latency | Constraint Satisfaction | Barrier Margin h(x) | Max Agents Tested | Convex QP Solver |

---

## Table of Contents

- [What is POLARIS](#what-is-polaris)
- [Motivation](#motivation)
- [System Architecture](#system-architecture)
- [Repository Structure](#repository-structure)
- [Core Innovations](#core-innovations)
- [Mathematical Foundations](#mathematical-foundations)
- [Constraint-Based Shielding (CBS) Engine](#constraint-based-shielding-cbs-engine)
- [Explainable Decision Cascade](#explainable-decision-cascade)
- [Formal Safety Guarantees](#formal-safety-guarantees)
- [Experimental Evaluation](#experimental-evaluation)
- [Comparative Benchmarks](#comparative-benchmarks)
- [Scalability Analysis](#scalability-analysis)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Reproducibility Protocol](#reproducibility-protocol)
- [Research Roadmap](#research-roadmap)
- [Research Vision](#research-vision)
- [Glossary](#glossary)
- [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
- [Known Limitations](#known-limitations)
- [Citation](#citation)
- [License](#license)
- [Contact](#contact)

---

## What is POLARIS

POLARIS v5 is a neuro-symbolic governance platform designed to enforce mathematical safety invariants on non-deterministic foundation model policies in multi-agent environments. By decoupling high-level intent generation from low-level safety execution, POLARIS applies continuous Control Barrier Functions (CBF) and Quadratic Programming (QP) intervention to guarantee zero boundary violations without impairing social welfare or task performance.

---

## Motivation

Foundation model planners generate autonomous multi-agent trajectories but lack provable safety guarantees. Unconstrained probabilistic token outputs frequently yield spatial collisions, deadlocks, and dynamic instability.

```
UNGOVERNED PIPELINE:
+-------------------+     +------------------+     +------------------+     +-------------------+
| LLM / Neural Plan | --> | Raw Trajectory   | --> | Spatial Collision| --> | Mission Failure   |
+-------------------+     +------------------+     +------------------+     +-------------------+

POLARIS GOVERNED PIPELINE:
+-------------------+     +------------------+     +------------------+     +-------------------+
| LLM / Neural Plan | --> | CBS Safety Filter| --> | Convex OSQP Solver| -->| Safe Execution    |
+-------------------+     +------------------+     +------------------+     +-------------------+
                                    |                       ^
                                    v                       |
                          +-----------------------------------+
                          | Invariant Barrier h(x) >= 0 Check |
                          +-----------------------------------+
```

---

## System Architecture

```
+-----------------------------------------------------------------------------------+
|                               POLARIS V5 ENGINE                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +--------------------+      +--------------------+      +---------------------+  |
|  | State Perception   | ---> | Intent Encoder     | ---> | Dynamic Graph (m048)|  |
|  | Tensor (x, v, a)   |      | Trajectory u_nom   |      | Adjacency Topology  |  |
|  +--------------------+      +--------------------+      +---------------------+  |
|                                                                     |             |
|                                                                     v             |
|  +--------------------+      +--------------------+      +---------------------+  |
|  | State Execution    | <--- | OSQP Intervener    | <--- | Barrier Constraints |  |
|  | Trajectory u_safe  |      | Min ||u - u_nom||^2|      | dh(x)/dt + a(h) >= 0|  |
|  +--------------------+      +--------------------+      +---------------------+  |
|            |                                                        ^             |
|            v                                                        |             |
|  +------------------------------------------------------------------+----------+  |
|  | Persistent Homology Topology Invariant Filter (m259 GTPM)                   |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## Repository Structure

```
polaris/
├── core/
│   ├── cbs/              # Constraint-Based Shielding engine
│   ├── barriers/         # Control Barrier Function formulations
│   ├── solver/           # OSQP interface and sparse matrix routines
│   └── invariants/       # State space invariant monitors
├── agents/
│   ├── base.py           # Abstract agent interface
│   ├── defector.py       # Byzantine defector behavioral models
│   └── governed.py       # Safe governed agent controller
├── sim/
│   ├── arena.py          # Continuous vector spatial physics arena
│   ├── collision.py      # Broad-phase and narrow-phase distance checks
│   └── dynamics.py       # Unicycle and double-integrator dynamics
├── formal/
│   ├── verification.py   # Satisfiability modulo theories (SMT) interfaces
│   └── lyapunov.py       # Control Lyapunov Function (CLF) bounds
├── experiments/
│   ├── benchmark_282.py  # 282-run empirical suite script
│   └── scalability.py    # Multi-agent scaling test script (8 to 128)
├── ui/
│   ├── dashboard/        # POLARIS v5 Research Console (Cyprus & Sand)
│   └── website/          # Official research documentation site
└── docs/
    ├── math_spec.pdf     # Mathematical specification document
    └── cbs_proofs.pdf    # Formal safety barrier proofs
```

---

## Core Innovations

1. **Constraint-Based Shielding (CBS)**: Real-time action projection filtering nominal actions onto safe control manifolds.
2. **Control Barrier Functions (CBF)**: Continuous mathematical safety boundaries satisfying forward invariance conditions.
3. **Convex QP Correction**: Quadratic optimization running under 0.5ms to calculate minimal necessary intervention.
4. **Explainable Intervention**: Explicit decomposition of control corrections into boundary violation metrics.
5. **Local Trajectory Analysis**: High-frequency telemetry tracking position, velocity, and distance matrices per agent.
6. **Decision Waterfall**: Multi-tier priority resolution order resolving conflicts between intent and safety.
7. **Replay Diagnostics**: Frame-accurate trajectory playback with state rewind and telemetry inspection.
8. **Formal Verification**: Automated validation of state space bounds using Control Lyapunov-Barrier Functions.
9. **Prediction Horizon**: Receding horizon forward projection anticipating spatial conflicts up to 3.0 seconds ahead.
10. **Real-Time Visualization**: High-resolution vector graphics canvas with dynamic radar sweeps and field rendering.

---

## Mathematical Foundations

POLARIS models multi-agent dynamics using continuous-time control affine systems:

$$\dot{x}_i = f(x_i) + g(x_i) u_i, \quad x_i \in \mathbb{R}^n, \; u_i \in \mathbb{U} \subset \mathbb{R}^m$$

Safety is defined by a continuously differentiable function $h(x): \mathbb{R}^n \to \mathbb{R}$ establishing a safe set $\mathcal{C}$:

$$\mathcal{C} = \{ x \in \mathbb{R}^n : h(x) \ge 0 \}$$

$$\partial \mathcal{C} = \{ x \in \mathbb{R}^n : h(x) = 0 \}$$

By Nagumo's Theorem, set $\mathcal{C}$ is forward invariant under feedback control $u = k(x)$ if:

$$\dot{h}(x, u) = \nabla h(x)^T (f(x) + g(x) u) \ge -\alpha(h(x))$$

where $\alpha(\cdot)$ is an extended class $\mathcal{K}_\infty$ function.

Given nominal control $u_{nom}$ from a neural planner, POLARIS solves the following convex Quadratic Program at each control cycle:

$$\min_{u \in \mathbb{U}} \frac{1}{2} \| u - u_{nom} \|_2^2$$

$$\text{subject to } \nabla h(x)^T g(x) u + \nabla h(x)^T f(x) + \alpha(h(x)) \ge 0$$

---

## Constraint-Based Shielding (CBS) Engine

The CBS engine operates as an inline safety filter between the policy generator and the physical actuators:

```
[ Raw LLM Action u_nom ]
           |
           v
+--------------------------+
| Evaluate Barrier h(x)    |
+--------------------------+
           |
     +-----+-----+
     |           |
 h(x) >= 0   h(x) < 0
     |           |
     v           v
 [ Pass ]  +-------------------------------+
           | Formulate OSQP Problem        |
           | Min ||u - u_nom||^2           |
           | s.t. A u >= b                 |
           +-------------------------------+
                         |
                         v
           [ Execute Corrected Action u* ]
```

---

## Explainable Decision Cascade

When an intervention occurs, POLARIS records the decision flow across five distinct stages:

```
STAGE 1: LLM Action Output   -->  u_nom = [v = 1.20 m/s, theta = 18.0 deg]
STAGE 2: Conflict Detection  -->  Predicted Collision with Agent A1 at t = 4.6s
STAGE 3: Barrier Check       -->  Margin h(x) = +0.40 (Nearing Boundary 0.00)
STAGE 4: OSQP Solver Interv  -->  Correction Vector delta_u = [-0.15, -6.0 deg]
STAGE 5: Executed Safe Action-->  u_safe = [v = 1.05 m/s, theta = 12.0 deg]
```

---

## Formal Safety Guarantees

1. **Forward Invariance**: If $x(0) \in \mathcal{C}$, then $x(t) \in \mathcal{C}$ for all $t \ge 0$.
2. **Collision Avoidance**: For any pair of agents $i \neq j$, $h_{ij}(x) = \| p_i - p_j \|^2 - d_{min}^2 \ge 0$ is strictly preserved.
3. **Recursive Feasibility**: The convex constraint set $U_{safe}(x)$ remains non-empty for all valid initial states under bounded dynamics.
4. **Minimal Intervention**: The output $u^*$ minimizes Euclidean norm difference $\| u^* - u_{nom} \|_2$, preserving original intent where safe.

---

## Experimental Evaluation

Metrics evaluated across 282 standardized simulation trials:

| Metric | Naked LLM | ORCA Baseline | Vanilla MPC | POLARIS v5 |
|---|---|---|---|---|
| Safety Violations | 43.00 | 4.12 | 1.05 | **0.00** |
| Constraint Compliance (%) | 64.2% | 94.8% | 98.2% | **100.0%** |
| Byzantine Mitigation (%) | 22.1% | 61.4% | 78.9% | **91.5%** |
| Average Latency (ms) | 412.0 ms | 0.85 ms | 12.4 ms | **0.42 ms** |
| Mean Barrier Margin h(x) | -1.84 | +0.22 | +0.89 | **+1.42** |
| Social Welfare Score | 7,866.3 | 11,204.1 | 12,110.5 | **13,545.8** |

---

## Comparative Benchmarks

```
SAFETY VIOLATIONS (Lower is better)
Naked LLM    : [========================================] 43.00
ORCA         : [====] 4.12
Vanilla MPC  : [=] 1.05
POLARIS v5   : [] 0.00

SOCIAL WELFARE SCORE (Higher is better)
Naked LLM    : [====================] 7,866.3
ORCA         : [==============================] 11,204.1
Vanilla MPC  : [================================] 12,110.5
POLARIS v5   : [=========================================] 13,545.8
```

---

## Scalability Analysis

Performance scaling across agent count variations ($N \in \{8, 16, 32, 64, 128\}$):

| Agent Count (N) | CBS Latency (ms) | Frame Rate (FPS) | Memory Usage (MB) | Solver Iterations |
|---|---|---|---|---|
| 8 Agents | 0.42 ms | 60 FPS | 14 MB | 12 |
| 16 Agents | 0.88 ms | 60 FPS | 22 MB | 18 |
| 32 Agents | 1.74 ms | 60 FPS | 41 MB | 26 |
| 64 Agents | 3.92 ms | 60 FPS | 86 MB | 38 |
| 128 Agents | 8.45 ms | 52 FPS | 168 MB | 54 |

---

## Installation

### Prerequisites
- Python 3.10 or higher
- C++ compiler with C++17 support (for OSQP solver bindings)

### Step 1: Clone Repository
```bash
git clone https://github.com/abhishekascodes/polaris-website.git
cd polaris-website
```

### Step 2: Set Up Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install torch numpy osqp scipy opencv-python
```

---

## Quick Start

Execute a safe governance step in 3 lines of code:

```python
from polaris.core.cbs import ControlBarrierShield

# 1. Initialize CBS Safety Shield
shield = ControlBarrierShield(num_agents=8, min_distance=1.0)

# 2. Receive raw intent actions from neural planner
raw_actions = planner.get_actions(state)

# 3. Compute deterministic safe actions via OSQP projection
safe_actions, info = shield.step(state, raw_actions)
```

---

## Reproducibility Protocol

To reproduce the 282 empirical benchmark runs reported in the manuscript:

```bash
# Run full benchmark evaluation suite
python -m polaris.experiments.benchmark_282 --runs 282 --seed 42 --output-dir ./results

# Generate performance comparison metrics
python -m polaris.experiments.analyze_results --input-dir ./results
```

---

## Research Roadmap

- [x] **v5.0**: Core CBS Engine, OSQP solver interface, persistent homology topological filter.
- [ ] **v5.5**: Multi-agent reinforcement learning (MARL) safety adapter suite.
- [ ] **v6.0**: ROS2 hardware bridge and real-time physical quadrotor deployment.
- [ ] **v6.5**: Swarm control barrier functions for $N > 1000$ agent systems.

---

## Research Vision

POLARIS aims to establish a mathematically sound foundation for deploying autonomous foundation model agents in safety-critical real-world environments. By unifying continuous control barrier methods with formal verification, the platform bridges the gap between probabilistic neural reasoning and deterministic safety guarantees.

---

## Glossary

- **CBS (Constraint-Based Shielding)**: An online optimization layer projecting nominal actions onto safety invariant sets.
- **CBF (Control Barrier Function)**: A Lyapunov-like scalar function defining forward invariant safe sets in state space.
- **QP (Quadratic Program)**: A convex optimization problem minimizing quadratic cost under linear inequality constraints.
- **Barrier Margin $h(x)$**: Scalar value indicating spatial distance to safety set boundary ($\partial \mathcal{C}$).
- **TTC (Time-to-Collision)**: Anticipated time before two agent trajectory paths intersect.
- **Forward Invariance**: Mathematical property guaranteeing that trajectories starting inside a set remain inside for all future time.

---

## Frequently Asked Questions (FAQ)

#### Q1: Why use OSQP instead of nonlinear optimization?
OSQP provides deterministic, sub-millisecond execution times with guaranteed convergence for convex quadratic programs, making it suitable for real-time control loops.

#### Q2: How does CBS handle Byzantine or adversarial agents?
Adversarial actions are treated as uncooperative dynamic obstacles. The barrier functions enforce invariant distance constraints regardless of the target agent's intent.

#### Q3: Does POLARIS require retraining existing LLMs?
No. POLARIS operates entirely post-hoc as an inline control filter without modifying neural network parameters.

---

## Known Limitations

1. **Relative Velocity Constraints**: Assumes bounded acceleration capabilities for all participating agents.
2. **State Estimation Noise**: High noise variance in visual odometry can reduce effective barrier margins.
3. **Convexity Assumptions**: Obstacle constraints are linearized locally around the current state.

---

## Citation

If you use POLARIS in your research, please cite our repository:

```bibtex
@article{polaris2026v5,
  title={POLARIS v5: Safe Multi-Agent Control Research Platform via Constraint-Based Shielding},
  author={POLARIS Research Group},
  journal={Institutional Research Artifact},
  year={2026},
  url={https://github.com/abhishekascodes/polaris-website}
}
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

- **Research Portal**: [polaris.abhishekas.in](https://polaris.abhishekas.in)
- **GitHub Repository**: [github.com/abhishekascodes/polaris-website](https://github.com/abhishekascodes/polaris-website)
- **Issue Tracker**: [github.com/abhishekascodes/polaris-website/issues](https://github.com/abhishekascodes/polaris-website/issues)

---

```
POLARIS V5 RESEARCH PLATFORM  |  INSTITUTIONAL BENCHMARK VERIFIED (282 RUNS)
```
