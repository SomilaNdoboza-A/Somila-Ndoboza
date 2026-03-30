<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Somilando Boza — ICT Developer & IT Support</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    :root {
      --bg: #0a0a0f;
      --surface: #111118;
      --surface2: #1a1a24;
      --border: #2a2a3a;
      --accent: #5b6af0;
      --accent2: #00d4aa;
      --accent3: #f0a05b;
      --text: #e8e8f0;
      --text-muted: #7878a0;
      --text-dim: #4a4a65;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      line-height: 1.7;
      overflow-x: hidden;
    }

    /* ── Noise texture overlay ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 0;
      opacity: 0.4;
    }

    /* ── Grid background ── */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 60px 60px;
      opacity: 0.15;
      pointer-events: none;
      z-index: 0;
    }

    /* ── Glow blobs ── */
    .blob {
      position: fixed;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.12;
      pointer-events: none;
      z-index: 0;
    }
    .blob-1 { width: 600px; height: 600px; background: var(--accent); top: -200px; left: -200px; }
    .blob-2 { width: 400px; height: 400px; background: var(--accent2); bottom: 0; right: -100px; }

    /* ── Layout ── */
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 1;
    }

    /* ── NAV ── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 1.2rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      backdrop-filter: blur(20px);
      background: rgba(10,10,15,0.7);
      border-bottom: 1px solid var(--border);
    }

    .nav-logo {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      letter-spacing: 0.05em;
      color: var(--text);
      text-decoration: none;
    }

    .nav-logo span { color: var(--accent); }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
    }

    .nav-links a {
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-muted);
      text-decoration: none;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: color 0.2s;
    }

    .nav-links a:hover { color: var(--accent2); }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8rem 0 4rem;
    }

    .hero-tag {
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      color: var(--accent2);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      opacity: 0;
      animation: fadeUp 0.6s 0.2s forwards;
    }

    .hero h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(3rem, 8vw, 6.5rem);
      line-height: 1;
      letter-spacing: -0.03em;
      margin-bottom: 1.5rem;
      opacity: 0;
      animation: fadeUp 0.6s 0.35s forwards;
    }

    .hero h1 .line2 {
      color: transparent;
      -webkit-text-stroke: 1px var(--text-dim);
    }

    .hero h1 .highlight { color: var(--accent); }

    .hero-sub {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 560px;
      margin-bottom: 2.5rem;
      opacity: 0;
      animation: fadeUp 0.6s 0.5s forwards;
    }

    .hero-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
      opacity: 0;
      animation: fadeUp 0.6s 0.65s forwards;
    }

    .badge {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      letter-spacing: 0.05em;
      padding: 0.4rem 0.9rem;
      border-radius: 2px;
      border: 1px solid var(--border);
      color: var(--text-muted);
      background: var(--surface);
    }

    .badge.active {
      border-color: var(--accent);
      color: var(--accent);
      background: rgba(91,106,240,0.08);
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
      opacity: 0;
      animation: fadeUp 0.6s 0.8s forwards;
    }

    .btn {
      font-family: 'DM Mono', monospace;
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.9rem 2rem;
      text-decoration: none;
      border-radius: 2px;
      transition: all 0.2s;
      display: inline-block;
    }

    .btn-primary {
      background: var(--accent);
      color: #fff;
      border: 1px solid var(--accent);
    }

    .btn-primary:hover {
      background: transparent;
      color: var(--accent);
    }

    .btn-ghost {
      border: 1px solid var(--border);
      color: var(--text-muted);
    }

    .btn-ghost:hover {
      border-color: var(--accent2);
      color: var(--accent2);
    }

    /* ── SECTIONS ── */
    section {
      padding: 6rem 0;
      border-top: 1px solid var(--border);
    }

    .section-label {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      color: var(--accent2);
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }

    .section-title {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      letter-spacing: -0.02em;
      margin-bottom: 3rem;
    }

    /* ── ABOUT ── */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .about-text p {
      color: var(--text-muted);
      margin-bottom: 1.2rem;
      font-size: 0.95rem;
    }

    .about-text p strong { color: var(--text); font-weight: 500; }

    .about-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.9rem 1.2rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
    }

    .info-row .label {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      color: var(--text-dim);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .info-row .value {
      font-size: 0.85rem;
      color: var(--text);
    }

    /* ── SKILLS ── */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 0.75rem;
    }

    .skill-chip {
      padding: 0.75rem 1rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
      text-align: center;
      font-family: 'DM Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-muted);
      transition: all 0.2s;
      cursor: default;
    }

    .skill-chip:hover {
      border-color: var(--accent);
      color: var(--accent);
      background: rgba(91,106,240,0.08);
      transform: translateY(-2px);
    }

    .skills-category {
      margin-bottom: 2.5rem;
    }

    .skills-category h3 {
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      color: var(--accent3);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    /* ── EXPERIENCE ── */
    .timeline { position: relative; }

    .timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0; bottom: 0;
      width: 1px;
      background: var(--border);
    }

    .timeline-item {
      padding-left: 2.5rem;
      padding-bottom: 3rem;
      position: relative;
    }

    .timeline-item::before {
      content: '';
      position: absolute;
      left: -4px;
      top: 6px;
      width: 9px; height: 9px;
      border-radius: 50%;
      background: var(--accent);
      border: 2px solid var(--bg);
    }

    .timeline-item:last-child { padding-bottom: 0; }

    .tl-meta {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      color: var(--accent2);
      letter-spacing: 0.08em;
      margin-bottom: 0.4rem;
    }

    .tl-title {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1.15rem;
      margin-bottom: 0.25rem;
    }

    .tl-company {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .tl-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .tl-list li {
      font-size: 0.88rem;
      color: var(--text-muted);
      padding-left: 1.2rem;
      position: relative;
    }

    .tl-list li::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--accent);
      font-size: 0.8rem;
    }

    .tl-list li strong { color: var(--text); font-weight: 500; }

    .tl-note {
      margin-top: 1rem;
      padding: 0.8rem 1.2rem;
      border-left: 2px solid var(--accent3);
      background: rgba(240,160,91,0.05);
      font-size: 0.82rem;
      color: var(--accent3);
      border-radius: 0 4px 4px 0;
    }

    /* ── PROJECTS ── */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }

    .project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 1.8rem;
      transition: all 0.25s;
      position: relative;
      overflow: hidden;
    }

    .project-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(91,106,240,0.06) 0%, transparent 60%);
      opacity: 0;
      transition: opacity 0.25s;
    }

    .project-card:hover {
      border-color: var(--accent);
      transform: translateY(-4px);
    }

    .project-card:hover::before { opacity: 1; }

    .project-icon {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .project-title {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .project-desc {
      font-size: 0.83rem;
      color: var(--text-muted);
      margin-bottom: 1.2rem;
      line-height: 1.6;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .tag {
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      padding: 0.25rem 0.6rem;
      border-radius: 2px;
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--text-dim);
    }

    /* ── EDUCATION ── */
    .edu-grid {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .edu-card {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1.5rem;
      align-items: start;
      padding: 1.5rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      transition: border-color 0.2s;
    }

    .edu-card:hover { border-color: var(--accent2); }

    .edu-year {
      font-family: 'DM Mono', monospace;
      font-size: 0.7rem;
      color: var(--accent2);
      letter-spacing: 0.05em;
      white-space: nowrap;
      padding-top: 0.2rem;
    }

    .edu-qual {
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 0.95rem;
      margin-bottom: 0.2rem;
    }

    .edu-inst {
      font-size: 0.82rem;
      color: var(--text-muted);
    }

    /* ── REFLECTIVE ── */
    .reflect-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .reflect-card {
      padding: 2rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
    }

    .reflect-card h3 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 1rem;
      color: var(--accent);
    }

    .reflect-card ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .reflect-card li {
      font-size: 0.85rem;
      color: var(--text-muted);
      padding-left: 1.2rem;
      position: relative;
      line-height: 1.6;
    }

    .reflect-card li::before {
      content: '◆';
      position: absolute;
      left: 0;
      color: var(--accent2);
      font-size: 0.5rem;
      top: 0.4rem;
    }

    .reflect-card li strong { color: var(--text); font-weight: 500; }

    .quote-block {
      margin-top: 2rem;
      padding: 1.5rem 2rem;
      border-left: 3px solid var(--accent);
      background: rgba(91,106,240,0.05);
      border-radius: 0 6px 6px 0;
    }

    .quote-block p {
      font-family: 'Syne', sans-serif;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text);
      font-style: italic;
    }

    .quote-block cite {
      display: block;
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      color: var(--text-dim);
      margin-top: 0.5rem;
      font-style: normal;
    }

    /* ── CONTACT ── */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .contact-text p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }

    .contact-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .contact-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.2rem;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.2s;
    }

    .contact-link:hover {
      border-color: var(--accent);
      background: rgba(91,106,240,0.05);
    }

    .contact-link .icon {
      font-size: 1rem;
      width: 1.5rem;
      text-align: center;
    }

    .contact-link .detail { flex: 1; }

    .contact-link .cl-label {
      font-family: 'DM Mono', monospace;
      font-size: 0.65rem;
      color: var(--text-dim);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .contact-link .cl-value {
      font-size: 0.85rem;
      color: var(--text);
    }

    /* ── FOOTER ── */
    footer {
      border-top: 1px solid var(--border);
      padding: 2rem 0;
      text-align: center;
    }

    footer p {
      font-family: 'DM Mono', monospace;
      font-size: 0.72rem;
      color: var(--text-dim);
      letter-spacing: 0.05em;
    }

    footer span { color: var(--accent); }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s, transform 0.6s;
    }

    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 700px) {
      .about-grid,
      .reflect-grid,
      .contact-grid { grid-template-columns: 1fr; }
      .nav-links { display: none; }
      .hero h1 { font-size: 2.8rem; }
    }
  </style>
</head>
<body>

  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>

  <!-- NAV -->
  <nav>
    <a href="#" class="nav-logo">SB<span>.</span>dev</a>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <p class="hero-tag">// ICT Application Development · CPUT · Cape Town</p>
      <h1>
        Somilando<br>
        <span class="line2">Boza</span><span class="highlight">.</span>
      </h1>
      <p class="hero-sub">
        Final-year software development student with real-world IT support experience.
        I build things, fix things, and communicate clearly while doing both.
      </p>
      <div class="hero-badges">
        <span class="badge active">Available for Internships</span>
        <span class="badge">Cape Town Based</span>
        <span class="badge">Code 8 Licence</span>
        <span class="badge">CPUT GitHub Education</span>
      </div>
      <div class="hero-cta">
        <a href="mailto:somilandoboza53@gmail.com" class="btn btn-primary">Get In Touch</a>
        <a href="#projects" class="btn btn-ghost">View Projects</a>
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about">
    <div class="container">
      <p class="section-label reveal">// 01 · Profile</p>
      <h2 class="section-title reveal">About Me</h2>
      <div class="about-grid">
        <div class="about-text reveal">
          <p>
            I'm a <strong>final-year Diploma student in ICT Application Development</strong> at CPUT,
            having already completed my Higher Certificate in ICT in 2023. My studies have given me
            a strong foundation in Java, Python, SQL, web development, Linux, and networking.
          </p>
          <p>
            Beyond the classroom, I've worked as a <strong>Call Centre Agent on the British Gas campaign</strong>
            at WNS Global Services — handling 50+ daily queries, using CRM and ticketing systems, and
            consistently meeting SLAs. This is real 1st-line IT support experience, just in a different uniform.
          </p>
          <p>
            I'm driven by a desire to keep growing. I learn fast, communicate clearly, and take
            ownership of problems until they're solved. Currently seeking an
            <strong>IT internship or junior developer role</strong> in Cape Town.
          </p>
        </div>
        <div class="about-info reveal">
          <div class="info-row">
            <span class="label">Location</span>
            <span class="value">Cape Town, South Africa</span>
          </div>
          <div class="info-row">
            <span class="label">Phone</span>
            <span class="value">062 643 5889</span>
          </div>
          <div class="info-row">
            <span class="label">Email</span>
            <span class="value">somilandoboza53@gmail.com</span>
          </div>
          <div class="info-row">
            <span class="label">Driver's Licence</span>
            <span class="value">Code 8</span>
          </div>
          <div class="info-row">
            <span class="label">Status</span>
            <span class="value" style="color:var(--accent2)">✦ Open to Opportunities</span>
          </div>
          <div class="info-row">
            <span class="label">Graduation</span>
            <span class="value">Expected 2026</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SKILLS -->
  <section id="skills">
    <div class="container">
      <p class="section-label reveal">// 02 · Toolkit</p>
      <h2 class="section-title reveal">Skills & Tools</h2>

      <div class="skills-category reveal">
        <h3>Languages</h3>
        <div class="skills-grid">
          <div class="skill-chip">Java</div>
          <div class="skill-chip">JavaScript</div>
          <div class="skill-chip">Python</div>
          <div class="skill-chip">HTML5</div>
          <div class="skill-chip">CSS3</div>
          <div class="skill-chip">SQL</div>
        </div>
      </div>

      <div class="skills-category reveal">
        <h3>Systems & Platforms</h3>
        <div class="skills-grid">
          <div class="skill-chip">Linux CLI</div>
          <div class="skill-chip">Git</div>
          <div class="skill-chip">GitHub</div>
          <div class="skill-chip">MS Office</div>
          <div class="skill-chip">CRM Systems</div>
          <div class="skill-chip">Ticketing Tools</div>
        </div>
      </div>

      <div class="skills-category reveal">
        <h3>Soft Skills</h3>
        <div class="skills-grid">
          <div class="skill-chip">1st-Line Support</div>
          <div class="skill-chip">Communication</div>
          <div class="skill-chip">Empathy</div>
          <div class="skill-chip">SLA Adherence</div>
          <div class="skill-chip">Teamwork</div>
          <div class="skill-chip">Fast Learner</div>
        </div>
      </div>
    </div>
  </section>

  <!-- EXPERIENCE -->
  <section id="experience">
    <div class="container">
      <p class="section-label reveal">// 03 · Work History</p>
      <h2 class="section-title reveal">Experience</h2>
      <div class="timeline">

        <div class="timeline-item reveal">
          <p class="tl-meta">June 2025 – October 2025 · 5 months</p>
          <h3 class="tl-title">Call Centre Agent — British Gas Campaign</h3>
          <p class="tl-company">WNS Global Services · Cape Town</p>
          <ul class="tl-list">
            <li>Provided <strong>1st-line telephonic technical support</strong> for 50+ daily global user queries via CRM and ticketing systems</li>
            <li>Diagnosed and resolved <strong>billing and software issues</strong> with empathy and accuracy; escalated complex cases appropriately</li>
            <li>Consistently met <strong>SLAs for resolution speed and quality</strong> in a high-volume inbound environment</li>
            <li>Built hands-on skills in <strong>incident ownership, user satisfaction, and professional escalation workflows</strong></li>
          </ul>
          <div class="tl-note">
            💡 This role mirrors core IT Service Desk responsibilities — ticketing systems, escalation paths, SLA management, and resolving user issues under pressure.
          </div>
        </div>

        <div class="timeline-item reveal">
          <p class="tl-meta">November 2024 – February 2025 · 4 months</p>
          <h3 class="tl-title">Sales Associate</h3>
          <p class="tl-company">TFG Home Store (@home) · Cape Town</p>
          <ul class="tl-list">
            <li>Delivered empathetic, solutions-focused customer service in a fast-paced retail environment</li>
            <li>Managed customer inquiries and complaints effectively, demonstrating <strong>adaptability and teamwork</strong></li>
            <li>Worked rotational shifts, building <strong>resilience, consistency, and time management</strong> skills</li>
          </ul>
        </div>

      </div>
    </div>
  </section>

  <!-- PROJECTS -->
  <section id="projects">
    <div class="container">
      <p class="section-label reveal">// 04 · Built Things</p>
      <h2 class="section-title reveal">Academic Projects</h2>
      <div class="projects-grid">

        <div class="project-card reveal">
          <div class="project-icon">📱</div>
          <h3 class="project-title">Student Residence App</h3>
          <p class="project-desc">Mobile application to streamline student residence management with backend database integration and full error handling.</p>
          <div class="project-tags">
            <span class="tag">Java</span>
            <span class="tag">SQL</span>
            <span class="tag">Mobile UI</span>
            <span class="tag">Debugging</span>
          </div>
        </div>

        <div class="project-card reveal">
          <div class="project-icon">🗄️</div>
          <h3 class="project-title">Database Management System</h3>
          <p class="project-desc">Normalised SQL database built for efficient querying and data integrity. Resolved data retrieval and consistency issues systematically.</p>
          <div class="project-tags">
            <span class="tag">SQL</span>
            <span class="tag">Database Design</span>
            <span class="tag">Normalisation</span>
          </div>
        </div>

        <div class="project-card reveal">
          <div class="project-icon">🛒</div>
          <h3 class="project-title">E-Commerce Website</h3>
          <p class="project-desc">Fully functional e-commerce front-end with dynamic product listings, JavaScript interactivity, and responsive layout across devices.</p>
          <div class="project-tags">
            <span class="tag">HTML5</span>
            <span class="tag">CSS3</span>
            <span class="tag">JavaScript</span>
            <span class="tag">Responsive</span>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- EDUCATION -->
  <section id="education">
    <div class="container">
      <p class="section-label reveal">// 05 · Academic Background</p>
      <h2 class="section-title reveal">Education</h2>
      <div class="edu-grid">

        <div class="edu-card reveal">
          <div class="edu-year">2023 – 2026</div>
          <div>
            <p class="edu-qual">Diploma in ICT – Application Development <em style="color:var(--accent2);font-size:0.75rem;font-style:normal;">(Final Year)</em></p>
            <p class="edu-inst">Cape Peninsula University of Technology (CPUT) · Cape Town</p>
            <p style="font-size:0.8rem;color:var(--text-dim);margin-top:0.5rem;">
              Key Modules: Communication Networks · Linux · Application Development · Information Systems · Database Management
            </p>
          </div>
        </div>

        <div class="edu-card reveal">
          <div class="edu-year">Completed 2023</div>
          <div>
            <p class="edu-qual">Higher Certificate in ICT</p>
            <p class="edu-inst">Cape Peninsula University of Technology (CPUT) · Cape Town</p>
          </div>
        </div>

        <div class="edu-card reveal">
          <div class="edu-year">Completed 2022</div>
          <div>
            <p class="edu-qual">National Senior Certificate (Matric)</p>
            <p class="edu-inst">Kuilsriver Technical High School · Cape Town</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- REFLECTIVE PRACTICE -->
  <section id="reflective">
    <div class="container">
      <p class="section-label reveal">// 06 · Growth Mindset</p>
      <h2 class="section-title reveal">Reflective Practice</h2>
      <div class="reflect-grid">

        <div class="reflect-card reveal">
          <h3>What I've Learned</h3>
          <ul>
            <li><strong>Theory → Practice:</strong> Applied OOP, database normalisation, and networking concepts from class directly into project builds</li>
            <li><strong>IT Support Mindset:</strong> Good support is empathy first, technical skill second — listen, diagnose, resolve, escalate</li>
            <li><strong>Version Control:</strong> Git and GitHub changed how I think about collaboration and code ownership</li>
            <li><strong>Learning to Learn:</strong> Breaking unfamiliar problems into smaller parts using documentation and iteration</li>
          </ul>
        </div>

        <div class="reflect-card reveal">
          <h3>Who I'm Becoming</h3>
          <ul>
            <li><strong>Self-Awareness:</strong> I actively reflect on how I code, communicate, and collaborate — and improve from it</li>
            <li><strong>Personal Agency:</strong> I don't wait to be taught; I seek resources, build things, and take initiative</li>
            <li><strong>Self-Identity:</strong> A developer who bridges technical skill with strong human communication</li>
            <li><strong>Previous Experience:</strong> Every job, project, and challenge has shaped my professional identity</li>
          </ul>
        </div>

      </div>
      <div class="quote-block reveal">
        <p>"We do not learn from experience... we learn from reflecting on experience."</p>
        <cite>— John Dewey</cite>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact">
    <div class="container">
      <p class="section-label reveal">// 07 · Let's Talk</p>
      <h2 class="section-title reveal">Contact</h2>
      <div class="contact-grid">
        <div class="contact-text reveal">
          <p>I'm actively looking for <strong>IT internship opportunities and junior developer roles</strong> in Cape Town.</p>
          <p>Whether you're a recruiter, a fellow student, or a company with an opening — I'd love to hear from you.</p>
          <a href="mailto:somilandoboza53@gmail.com" class="btn btn-primary" style="margin-top:1rem;">Send Me an Email</a>
        </div>
        <div class="contact-links reveal">
          <a href="mailto:somilandoboza53@gmail.com" class="contact-link">
            <span class="icon">✉️</span>
            <div class="detail">
              <p class="cl-label">Email</p>
              <p class="cl-value">somilandoboza53@gmail.com</p>
            </div>
          </a>
          <a href="tel:0626435889" class="contact-link">
            <span class="icon">📞</span>
            <div class="detail">
              <p class="cl-label">Phone</p>
              <p class="cl-value">062 643 5889</p>
            </div>
          </a>
          <a href="https://github.com/somilandoboza" target="_blank" class="contact-link">
            <span class="icon">🐙</span>
            <div class="detail">
              <p class="cl-label">GitHub</p>
              <p class="cl-value">github.com/somilandoboza</p>
            </div>
          </a>
          <a href="https://linkedin.com/in/somilandoboza" target="_blank" class="contact-link">
            <span class="icon">💼</span>
            <div class="detail">
              <p class="cl-label">LinkedIn</p>
              <p class="cl-value">linkedin.com/in/somilandoboza</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>Built by <span>Somilando Boza</span> · Hosted on GitHub Pages · © 2025</p>
    </div>
  </footer>

  <script>
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  </script>
</body>
</html>
