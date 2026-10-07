const projects = {
  openmanipulator: {index:'03',type:'Robotics · Control',title:'OpenManipulator-X Control Pipeline',dek:'A complete ROS 2 control stack that turns Cartesian intent into precise joint motion for a four-degree-of-freedom robotic arm.',image:'openmanipulator.jpeg',alt:'OpenManipulator-X robotic arm',year:'2025',role:'Robotics software engineer',stack:'ROS 2 · C++ · Kinematics',challenge:'Create the mathematical and software bridge between a desired end-effector pose and repeatable physical arm motion.',story:['Implemented forward kinematics from the manipulator geometry and validated the computed pose across representative joint configurations.','Developed analytical inverse kinematics and Jacobian-based velocity kinematics for responsive Cartesian control.','Connected the pipeline to ROS 2 interfaces and added trajectory execution that respects the arm’s physical constraints.'],outcome:'A reusable control pipeline spanning robot geometry, numerical methods, ROS 2 communication, and hardware-oriented trajectory execution.',next:'virtual-lab'},
  'quadrotor-control': {index:'02',type:'Aerial Robotics · Controls',title:'Quadrotor Control & Trajectory Tracking',dek:'Designing feedback controllers that keep a highly dynamic aerial system stable while following aggressive spatial trajectories.',image:'quadrotor.png',alt:'Quadrotor control trajectory plots',year:'2025',role:'Controls engineer',stack:'MATLAB · PD · LQR',challenge:'Balance stability, control authority, and trajectory accuracy for a nonlinear underactuated aerial vehicle.',story:['Modelled the vehicle dynamics and built a simulation environment for repeatable controller evaluation.','Designed and tuned PD and LQR controllers, comparing transient response and tracking error across flight conditions.','Generated polynomial trajectories and evaluated the pipeline with hardware constraints and disturbance response in mind.'],outcome:'A control study connecting dynamics, state feedback, trajectory generation, and quantitative tracking analysis.',next:'openmanipulator'},
  'motion-planning': {index:'01',type:'Autonomy · Task and Motion Planning',title:'Task & Motion Planning for Robotic Assembly',dek:'An end-to-end manipulation pipeline that turns symbolic assembly goals into collision-free robot trajectories in the Genesis physics simulator.',image:'motion-planning.png',alt:'Robot assembling colored blocks in the Genesis simulator',year:'2025',role:'Robotics software engineer · Team 5',stack:'Python · Genesis · Pyperplan · PDDL · OMPL',challenge:'Bridge symbolic reasoning and geometric motion so a Franka arm can rearrange noisy, physics-driven block scenes into towers and non-uniform structures—while recovering when execution does not match the plan.',headings:['Lift the world state','Plan and ground actions','Execute, verify, and replan'],story:['Built scene predicates such as ON, ONTABLE, CLEAR, HOLDING, and HANDEMPTY from continuous object poses, then encoded assembly objectives as STRIPS-style PDDL goals for Pyperplan.','Mapped PICK-UP, UNSTACK, STACK, and PUT-DOWN actions to robot motion primitives. Each primitive computes inverse kinematics, checks reachability and collisions, and requests an RRT-Connect path from OMPL.','Executed arm and gripper trajectories in Genesis, allowed the physics to settle, re-extracted the scene state, and replanned after each action. The same pipeline supports ordered towers, a tallest-tower challenge, and custom nine-block structures.'],outcome:'A complete task-and-motion planning architecture that closes the loop from perception-derived predicates to symbolic planning, collision-free manipulation, execution, and recovery.',links:[['View source on GitHub','https://github.com/AnirudhN-30/RBE550_final_project']],next:'quadrotor-control'},
  'virtual-lab': {index:'04',type:'Embedded Systems · Education',title:'Virtual Microcontroller Lab',dek:'A browser-based laboratory that makes embedded fundamentals explorable without requiring physical development hardware.',image:'virtual-lab.png',alt:'Virtual microcontroller laboratory interface',year:'2023',role:'Developer & system designer',stack:'Web · PIC · Embedded systems',challenge:'Translate hardware-centric microcontroller concepts into interactive experiments that remain technically meaningful.',story:['Designed guided experiments for clock configuration, GPIO, PWM, and analog-to-digital conversion.','Built visual feedback that connects register-level decisions to observable system behavior.','Structured the experience for independent learning and repeatable classroom demonstrations.'],outcome:'A lower-friction way for students to build intuition about microcontroller peripherals before moving to physical boards.',next:'robocon-2022'},
  'robocon-2022': {index:'05',type:'Competition Robotics',title:'Lagori Playing Robots · ROBOCON 2022',dek:'A 35 kg semi-autonomous competition robot designed to navigate, manipulate game objects, and perform under pressure.',image:'robocon2022.jpeg',alt:'ROBOCON 2022 Lagori robot',year:'2022',role:'Controls & hardware team',stack:'Omni drive · PCB · Manipulation',challenge:'Coordinate locomotion, manipulation, embedded electronics, and driver control in a strict competition environment.',story:['Automated a four-omniwheel drivetrain for responsive movement in any planar direction.','Designed a three-degree-of-freedom gripper arm for reliable game-object manipulation.','Contributed to custom PCB control hardware and integrated the subsystems into a competition-ready platform.'],outcome:'A robust multidisciplinary robot that combined custom mechanics, embedded electronics, controls, and team execution.',links:[['Watch project video','https://www.youtube.com/watch?v=Kln2yU7G_Gs']],next:'robocon-2023'},
  'robocon-2023': {index:'06',type:'Competition Robotics · Leadership',title:'Casting Flowers Over Angkor Wat · ROBOCON 2023',dek:'Two purpose-built competition robots, coordinated through embedded control and shaped by a season of fast iteration.',image:'robocon2023.jpeg',alt:'ROBOCON 2023 competition robot',year:'2023',role:'Controls lead',stack:'Embedded C · Controls · Integration',challenge:'Build dependable control software for two distinct robots while coordinating a multidisciplinary team on a fixed deadline.',story:['Designed control algorithms and embedded firmware for the season’s paired robot system.','Iterated mechanisms and software through repeated field testing and failure analysis.','Helped lead technical integration and competition preparation across the team.'],outcome:'A fifth-place national finish—and a practical lesson in building reliable robots through disciplined iteration and teamwork.',next:'hubot'},
  hubot: {index:'07',type:'Research · Humanoid Robotics',title:'Hubot 2.0',dek:'A simulated humanoid torso with two articulated arms balanced on a two-wheeled mobile base.',image:'openmanipulator.jpeg',alt:'Robotic arm representing the Hubot manipulation research',year:'2021',role:'Robotics researcher',stack:'ROS · Gazebo · PD control',challenge:'Maintain balance and commanded motion while adding the changing dynamics of two five-degree-of-freedom arms.',story:['Created the robot model and simulation environment in ROS and Gazebo.','Developed PD control for base balance and motion while accounting for upper-body movement.','Connected the work to research on an arm manipulator mounted on a self-balancing mobile robot.'],outcome:'A research platform for exploring the interaction between manipulation, mobile balance, and whole-body control.',links:[['Read the publication','https://www.researchgate.net/publication/358211858_Development_of_Robotic_Arm_Manipulator_mounted_on_Self_Balancing_Two_Wheeled_Mobile_Robot']],next:'openmanipulator'}
};

Object.assign(projects, {
  "payload-control": {
    "index": "08",
    "type": "Robotics · Research & Projects",
    "title": "Cable-Suspended Payload Control",
    "dek": "GPU-accelerated learning for quadrotors carrying suspended loads.",
    "year": null,
    "role": "Research & development",
    "stack": "MuJoCo · NVIDIA Newton · PPO",
    "challenge": "Model coupled vehicle–payload dynamics and learn robust waypoint control.",
    "story": [
      "Built a MuJoCo/Newton simulation and validated GPU dynamics against the CPU reference.",
      "Parallelized PPO across 2,048 environments at approximately 33K transitions/s, achieving about 30× speedup.",
      "Designed a five-stage curriculum and randomized initial conditions and task parameters."
    ],
    "outcome": "A scalable training platform for payload stabilization and waypoint-control research.",
    "next": "indi-flight"
  },
  "indi-flight": {
    "index": "09",
    "type": "Robotics · Research & Projects",
    "title": "INDI Flight Control & Benchmarking",
    "dek": "Low-level flight control validated in real-world quadrotor experiments.",
    "year": "Feb–May 2026",
    "role": "Research & development",
    "stack": "Betaflight 4.5 · INDI · DQ-NMPC · UART / Pi protocol",
    "challenge": "Compare tracking accuracy and robustness as flight trajectories become more aggressive.",
    "story": [
      "Integrated INDI into Betaflight and benchmarked high-level DQ-NMPC, NMPC, and geometric controllers.",
      "Compared controller combinations across seven trajectories with increasing speed and spatial constraints.",
      "Demonstrated DQ-NMPC + INDI at up to 9 m/s and 5g in a 3 m × 8 m flight space, with approximately 0.20 m RMSE."
    ],
    "outcome": "Geometric control + INDI achieved approximately 0.06 m RMSE on trajectories up to 3 m/s and 2g.",
    "next": "hubot-3"
  },
  "hubot-3": {
    "index": "10",
    "type": "Robotics · Research & Projects",
    "title": "HuBot 3.0",
    "dek": "Balancing, manipulation, and reinforcement learning on a two-wheeled mobile robot.",
    "year": "Jun 2026 — Present",
    "role": "Research & development",
    "stack": "MuJoCo · LQR · PPO",
    "challenge": "Control a free-floating chassis and dual manipulators with hardware-oriented sensing and actuation.",
    "story": [
      "Modeled wheel contact, passive dynamics, and motor torque limits in MuJoCo.",
      "Developed cascaded PD and discrete-time LQR with noisy IMU measurements and quantized encoders.",
      "Implemented damped least-squares inverse kinematics and PPO training with randomized disturbances."
    ],
    "outcome": "An ongoing simulation platform combining base balance, dual-arm kinematics, and learned control.",
    "next": "rocket-league"
  },
  "rocket-league": {
    "index": "11",
    "type": "Robotics · Research & Projects",
    "title": "Curriculum RL for Rocket League",
    "dek": "An interception policy trained through progressively harder driving and ball-control tasks.",
    "year": null,
    "role": "Research & development",
    "stack": "PPO · Curriculum Learning",
    "challenge": "Learn reliable interception while preventing reward hacking and skill regression.",
    "story": [
      "Built a factorized MultiDiscrete controller with 21 logits representing 1,944 control combinations.",
      "Transferred checkpoints across changing observation and action spaces.",
      "Evaluated stationary through fast-ball scenarios over 1,000 unseen episodes."
    ],
    "outcome": "Achieved 97.8–98.2% interception success across evaluated scenarios and approximately 94% on hard challenges.",
    "next": "einsteinvision"
  },
  "einsteinvision": {
    "index": "12",
    "type": "Robotics · Research & Projects",
    "title": "EinsteinVision",
    "dek": "Multi-camera perception for autonomous-driving scene understanding.",
    "year": null,
    "role": "Research & development",
    "stack": "YOLO · UniDepth · DINOv2",
    "challenge": "Fuse synchronized front, rear, left, and right views into a unified 3D ego-vehicle frame.",
    "story": [
      "Combined object detection, metric depth, tracking, and lane segmentation.",
      "Estimated object motion with optical flow and epipolar geometry, then predicted time to collision.",
      "Trained a DINOv2 vehicle classifier on approximately 20.8K VLM-labeled crops."
    ],
    "outcome": "Vehicle classification reached 88.9% accuracy with 3–6 ms GPU inference.",
    "next": "visual-inertial-odometry"
  },
  "visual-inertial-odometry": {
    "index": "13",
    "type": "Robotics · Research & Projects",
    "title": "Classical & Learned Visual-Inertial Odometry",
    "dek": "Estimating motion by combining camera observations and inertial measurements.",
    "year": null,
    "role": "Research & development",
    "stack": "Stereo MSCKF · EKF · Deep VIO",
    "challenge": "Study geometric estimation and learned pose refinement, including domain-shift failure modes.",
    "story": [
      "Implemented error-state IMU propagation, RK4 integration, camera augmentation, and EKF updates.",
      "Designed CNN and BiLSTM fusion with residual SE(3) pose refinement.",
      "Used controlled ablations to diagnose motion-scale and pose-learning failures."
    ],
    "outcome": "Stereo MSCKF achieved approximately 0.07–0.21 m ATE across five EuRoC Machine Hall sequences.",
    "next": "reconstruction"
  },
  "reconstruction": {
    "index": "14",
    "type": "Robotics · Research & Projects",
    "title": "Structure-from-Motion & NeRF",
    "dek": "Classical geometry and neural rendering for 3D scene reconstruction.",
    "year": null,
    "role": "Research & development",
    "stack": "RANSAC · Bundle Adjustment · NeRF",
    "challenge": "Recover camera poses and scene structure from multiple images.",
    "story": [
      "Implemented incremental SfM with robust matching, pose estimation, and triangulation.",
      "Registered all five views and reconstructed 917 sparse points; post-bundle-adjustment mean reprojection errors were approximately 1.23–2.29 px.",
      "Implemented coarse-to-fine volumetric rendering with hierarchical sampling."
    ],
    "outcome": "NeRF evaluation across 200 Lego views achieved 24.46 dB mean PSNR and 0.857 mean SSIM.",
    "next": "payload-control"
  }
});

const id = document.body.dataset.project;
const project = projects[id];
if (project) {
  document.title = `${project.title} · Anirudh Nallawar`;
  document.querySelector('#project-index').textContent = project.index;
  document.querySelector('#project-type').textContent = project.type;
  document.querySelector('h1').textContent = project.title;
  document.querySelector('#project-dek').textContent = project.dek;
  const year = document.querySelector('#project-year');
  if (project.year) year.textContent = project.year;
  else year.parentElement.hidden = true;
  document.querySelector('#project-role').textContent = project.role;
  document.querySelector('#project-stack').textContent = project.stack;
  const image = document.querySelector('#project-image');
  if (project.image) {
    image.src = `../assets/${project.image}`;
    image.alt = project.alt;
  } else {
    image.closest("figure").hidden = true;
  }
  document.querySelector('#project-challenge').textContent = project.challenge;
  document.querySelector('#project-outcome').textContent = project.outcome;
  const stepHeadings = project.headings || ['Understand the system','Build the pipeline','Validate in context'];
  document.querySelector('#project-steps').innerHTML = project.story.map((text, index) => `<div class="step"><span>0${index + 1}</span><div><h3>${stepHeadings[index]}</h3><p>${text}</p></div></div>`).join('');
  if (project.links) document.querySelector('#external-links').innerHTML = project.links.map(([label,url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join('');
  const next = projects[project.next];
  const nextLink = document.querySelector('#next-project');
  nextLink.href = `${project.next}.html`;
  nextLink.querySelector('strong').textContent = next.title;
}
