import React from "react";

export default function InformationPage() {
  return (
    <div style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
      <main className="info-container">
        <h2>About Me</h2>

        <p>
          Hi, I’m <strong>Anbu Selvan</strong> a passionate <strong>Computer Science and Engineering student</strong> at{" "}
          <em>Mahendra Institute of Engineering and Technology (Anna University, Namakkal)</em>.
        </p>

        <p>
          I’m on a mission to become a <strong>Software Development Engineer (SDE)</strong>, blending my knowledge of{" "}
          <strong>web technologies</strong> with a drive to build products that solve real-world problems.
        </p>
        <p>
          But here’s what really sets me apart: I don’t just code I <strong>create value</strong>.
          For me, technology isn’t about lines of code; it’s about shaping experiences, solving human problems,
          and leaving a mark.
        </p>

        <p>
          I realized early on that computers are more than machines they’re <strong>limitless canvases</strong>{" "}
          where creativity, logic, and imagination meet.
        </p>

        <h3>📚 Beyond Coding /Hobbies</h3>
        <p>
          Yes, I’m a developer. But I’m also someone who wants to <strong>understand people as much as I understand{" "}
          code</strong>.
          That’s why I love reading <strong>non-fiction books on psychology and personal growth</strong> they sharpen not{" "}
          just my technical skills,
          but also my ability to collaborate, lead, and empathize.
        </p>

        <p>
          I also spend time building <strong>side projects</strong> that automate tasks or solve niche problems.
          These projects aren’t just practice they’re proof of how I think, experiment, and create real-world impact even{" "}
          outside my curriculum.
        </p>

        <h3>Why ME?</h3>
        <p>
          If you’re looking for someone who codes with logic, creates with heart, and never stops improving you’ve found me.
        </p>

        {/* Education */}
        <h2>Education</h2>
        <div className="timeline">
          <div className="timeline-item">
            <img src="/img/miet.png" alt="Mahendra Institute Logo" />
            <div>
              <h3>Mahendra Institute of Engineering and technology,Namakkal</h3>
              <p>Bachelor of Engineering in Computer Science</p>
              <span className="date">sep 2022 – aug 2026</span>
            </div>
          </div>

          <div className="timeline-item">
            <img src="/img/svmss.png" alt="SVMSS Logo" />
            <div>
              <h3>Sri Vinayaga Matric Higher Secondary School,Kallakuruchi</h3>
              <p>12th Grade</p>
              <span className="date">2020-2022</span>
            </div>
          </div>

          <div className="timeline-item">
            <img src="/img/akt.png" alt="AKT Logo" />
            <div>
              <h3>A.K.T Matric Higher Secondary School, Kallakuruchi</h3>
              <p>10th Grade</p>
              <span className="date">2020</span>
            </div>
          </div>
        </div>

        {/* Courses & Certifications */}
        <h2>Courses & Certifications</h2>
        <div className="timeline">
          <div className="timeline-item">
            <img src="/img/PANTECH-AI.png" alt="Pantech AI Logo" />
            <div>
              <h3>Pantech AI</h3>
              <p>Full stack Web Development</p>
              <span className="date">Sep 2024 – Oct 2024</span>
              
              <div style={{ marginTop: "1.5rem" }}>
                <img src="/img/Qspiders.jpeg" alt="Qspiders Logo" style={{ display: "block", marginBottom: "0.5rem" }} />
                <h3>Qspiders</h3>
                <p>Java Full stack</p>
                <span className="date">Aug 2025 – Nov 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="resume-download">
          <a href="https://drive.google.com/file/d/1oNRSv2bMb68kEiEIjxi0pD1ea1ly6m18/view?usp=sharing" target="_blank" rel="noopener">
            Download Resume →
          </a>
        </div>
      </main>
    </div>
  );
}
