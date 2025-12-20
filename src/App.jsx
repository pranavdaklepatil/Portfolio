import React, { useState, useEffect } from 'react';

// --- Configuration & Data ---
const PROJECTS = [
  {
    title: "MedGrid: Hybrid CI/CD Pipeline",
    category: "DevOps",
    description: "Automated lifecycle from code commit to server deployment for a Hospital Management System.",
    points: ["Built hybrid pipeline with GitHub Actions & Jenkins.", "Integrated SonarQube quality gates.", "Managed artifact versioning via Nexus.", "Reduced manual overhead significantly."],
    stack: ["Jenkins", "SonarQube", "Nexus", "GitHub Actions"]
  },
  {
    title: "LLM Paraphrasing Tool",
    category: "AI/ML Infrastructure",
    description: "Scalable platform with FastAPI backend and Streamlit frontend.",
    points: ["Architected backend on EC2 with Docker.", "Multi-stage CI/CD pipelines.", "LoRA fine-tuning for 40% faster inference.", "Optimized AI signature reduction."],
    stack: ["FastAPI", "Docker", "S3", "CloudFront"]
  },
  {
    title: "Multi-Tier Web App Orchestration",
    category: "Cloud Native",
    description: "Containerized full-stack application managed on Kubernetes.",
    points: ["Dockerized Frontend, Backend, and DB.", "Kubernetes Services & Deployments for HA.", "Prometheus & Grafana monitoring setup.", "Zero-downtime rolling updates."],
    stack: ["Kubernetes", "Docker", "Prometheus", "Grafana"]
  },
  {
    title: "Codzy: AI Website Builder",
    category: "Major Project",
    description: "AI-driven static website generator using real-time prompt engineering.",
    points: ["FastAPI microservices architecture.", "Containerized deployment on AWS EC2.", "Nginx reverse proxy & SSL configuration.", "Vector search + embeddings integration."],
    stack: ["Python", "FastAPI", "LLMs", "Docker", "AWS"]
  },
  {
    title: "Cloud Portfolio Infrastructure",
    category: "Personal Brand",
    description: "This portfolio website, showcasing cloud hosting and DevOps best practices.",
    points: ["Automated build/deploy via GitHub Actions.", "AWS S3 + CloudFront CDN routing.", "Route53 HTTPS configuration.", "Global load time <100ms."],
    stack: ["React", "Vite", "AWS", "GitHub Actions"]
  }
];

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.reveal-on-scroll');
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-[#e8eaed] selection:bg-[#4285F4] selection:text-white transition-colors duration-300">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        :root {
          --bg-color: #121212;
          --text-main: #e8eaed;
          --dot-color: #333333;
          --grid-color: #1f1f1f;
          --card-bg: #1e1e1e;
          --card-border: #3c4043;
        }
        body {
          font-family: 'Google Sans', sans-serif;
          background-color: var(--bg-color);
          color: var(--text-main);
          margin: 0;
        }
        .mono { font-family: 'Roboto Mono', monospace; }
        .bg-pattern-dots {
          background-image: radial-gradient(var(--dot-color) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .bg-pattern-grid {
          background-image: linear-gradient(var(--grid-color) 1px, transparent 1px), 
                          linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .gradient-text {
          background: linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .tech-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tech-card:hover {
          border-color: #4285F4;
          box-shadow: 0 10px 25px -5px rgba(66, 133, 244, 0.2);
          transform: translateY(-5px);
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-content { animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        @media print { .no-print { display: none !important; } }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-gray-800 backdrop-blur-md bg-[#121212]/85 no-print">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="flex items-center space-x-3 hover:opacity-90 transition">
            <div className="w-8 h-8 flex flex-wrap transform rotate-45">
              <div className="w-1/2 h-1/2 bg-[#4285F4]"></div>
              <div className="w-1/2 h-1/2 bg-[#34A853]"></div>
              <div className="w-1/2 h-1/2 bg-[#FBBC05]"></div>
              <div className="w-1/2 h-1/2 bg-[#EA4335]"></div>
            </div>
            <span className="text-xl font-medium text-white">Pranav<span className="text-[#4285F4] font-bold italic">.Dakle</span></span>
          </a>
          <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
            <a href="#philosophy" className="text-gray-300 hover:text-white transition">Philosophy</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition">Projects</a>
            <a href="#stack" className="text-gray-300 hover:text-white transition">Stack</a>
            <button onClick={() => window.print()} className="bg-[#4285F4] text-white px-6 py-2 rounded-full font-medium shadow-md shadow-blue-500/20 hover:bg-blue-700 transition">Download Resume</button>
          </div>
        </div>
      </nav>

      <div className="bg-pattern-dots">
        {/* Hero Header */}
        <header id="home" className="pt-48 pb-32 px-6">
          <div className="max-w-5xl mx-auto text-center reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-[#34A853]/10 text-[#34A853] rounded-full text-xs font-bold tracking-widest uppercase no-print">
              <span className="w-2 h-2 bg-[#34A853] rounded-full"></span>
              Available for Freelance Projects and Full-time Roles
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-tight text-white">
              Engineering <span className="gradient-text">Scalability</span> <br className="hidden md:block" /> & Security.
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
              DevOps Enthusiast specializing in Cloud Infrastructure, Cyber Security, and AI-Driven Automation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 no-print">
              <a href="#projects" className="bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition shadow-xl">Explore My Work</a>
              <a href="mailto:hello@codzy.tech" className="bg-transparent border border-gray-700 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition">Hire Me as Freelancer</a>
            </div>
          </div>
        </header>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-24 px-6 bg-gray-900/50 border-y border-gray-800 bg-pattern-grid reveal-on-scroll">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6 text-white">Engineering Philosophy</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  I believe scalable systems are built by combining automation, security-first thinking,
                  and clean infrastructure design. My approach focuses on reliability before features
                  and prevention before recovery.
                </p>
                <ul className="space-y-4">
                  {[
                    { n: 1, color: "#4285F4", bg: "rgba(66, 133, 244, 0.1)", title: "DevSecOps Mindset:", desc: "Security is integrated into CI/CD pipelines, not added later." },
                    { n: 2, color: "#34A853", bg: "rgba(52, 168, 83, 0.1)", title: "Automation First:", desc: "If something is done twice, it should be automated." },
                    { n: 3, color: "#EA4335", bg: "rgba(234, 67, 53, 0.1)", title: "Scalable by Design:", desc: "Systems should grow without re-architecture." }
                  ].map((item) => (
                    <li key={item.n} className="flex items-start space-x-3">
                      <span 
                        style={{ backgroundColor: item.bg, color: item.color }}
                        className="mt-1 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0"
                      >
                        {item.n}
                      </span>
                      <span className="text-gray-300">
                        <strong>{item.title}</strong> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full no-print">
                <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#EA4335]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FBBC05]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#34A853]"></div>
                  </div>
                  <code className="text-blue-300 text-sm block mono leading-relaxed">
                    <span className="text-gray-500"># Infrastructure Principles</span><br />
                    <span className="text-green-400">$</span> uptime --target=99.9%<br />
                    <span className="text-green-400">$</span> security --shift-left<br />
                    <span className="text-green-400">$</span> automate --everything<br /><br />
                    <span className="text-white">✔ system stable</span>
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stack Section */}
        <section id="stack" className="py-24 px-6 bg-gray-900/20 reveal-on-scroll">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4 text-white">Technical Ecosystem</h2>
              <p className="text-gray-500">Professional-grade tools I use to build, secure, and scale.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StackCategory 
                title="Cloud & DevOps" 
                color="#4285F4" 
                items={[
                  { n: "AWS Infrastructure", s: "amazonaws" },
                  { n: "Kubernetes", s: "kubernetes" },
                  { n: "Docker Containers", s: "docker" },
                  { n: "Terraform IaC", s: "terraform" },
                  { n: "Jenkins Pipelines", s: "jenkins" }
                ]} 
              />
              <StackCategory 
                title="Security & Defense" 
                color="#EA4335" 
                items={[
                  { n: "SonarQube Static", s: "sonarqube" },
                  { n: "Nginx Security", s: "nginx" },
                  { n: "Hardened Linux", s: "linux" },
                  { n: "Prometheus Monitoring", s: "prometheus" }
                ]} 
              />
              <StackCategory 
                title="Programming" 
                color="#FBBC05" 
                items={[
                  { n: "Python (FastAPI)", s: "python" },
                  { n: "C++ Core", s: "cplusplus" },
                  { n: "JavaScript (React)", s: "javascript" },
                  { n: "Java Development", s: "oracle" }
                ]} 
              />
              <StackCategory 
                title="AI & IoT" 
                color="#34A853" 
                items={[
                  { n: "LLM Engineering", s: "openai" },
                  { n: "MQTT Protocols", s: "mqtt" },
                  { n: "Automated CI/CD", s: "githubactions" }
                ]} 
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 reveal-on-scroll">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4 text-white">Engineering Showcase</h2>
              <p className="text-gray-500">Hand-picked selection of technical deployments.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PROJECTS.map((project, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedProject(project)}
                  className="tech-card p-8 rounded-3xl cursor-pointer reveal-on-scroll"
                >
                  <div className="text-[#4285F4] font-bold text-xs uppercase mb-4">{project.category}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-800 text-[10px] rounded mono text-gray-400">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black pt-20 pb-10 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 flex flex-wrap transform rotate-45">
                  <div className="w-1/2 h-1/2 bg-[#4285F4]"></div>
                  <div className="w-1/2 h-1/2 bg-[#34A853]"></div>
                  <div className="w-1/2 h-1/2 bg-[#FBBC05]"></div>
                  <div className="w-1/2 h-1/2 bg-[#EA4335]"></div>
                </div>
                <span className="text-xl font-bold text-white">Pranav Patil</span>
              </div>
              <p className="text-gray-400 max-sm leading-relaxed mb-6">
                I build automated, secure, and self-healing digital ecosystems. Specializing in bridging the gap between development and mission-critical operations.
              </p>
              <div className="flex space-x-4">
                {['github', 'linkedin', 'twitter'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#4285F4] hover:text-white transition group">
                    <img src={`https://cdn.simpleicons.org/${social}`} className={`w-5 h-5 group-hover:invert invert`} alt={social} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#projects" className="hover:text-[#4285F4] transition">Case Studies</a></li>
                <li><a href="#stack" className="hover:text-[#4285F4] transition">Technical Stack</a></li>
                <li><button onClick={() => window.print()} className="hover:text-[#4285F4] transition text-left">Resume PDF</button></li>
                <li><a href="mailto:hello@codzy.tech" className="hover:text-[#4285F4] transition">Contact Direct</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Current Status</h4>
              <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800">
                <div className="flex items-center gap-2 text-xs font-bold text-[#34A853] mb-2 uppercase">
                  <span className="w-2 h-2 bg-[#34A853] rounded-full"></span>
                  Open for Hire
                </div>
                <p className="text-xs text-gray-500 mb-4">Interested in DevOps roles or custom freelance automation projects.</p>
                <a href="mailto:hello@codzy.tech" className="text-xs font-bold text-[#4285F4] hover:underline">Start a Conversation →</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>© 2025 Pranav Patil. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Built with Vite + React</span>
              <span>100% Automated Deployment</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300">
          <div className="modal-content bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[#4285F4] font-bold text-xs uppercase tracking-widest block mb-2">{selectedProject.category}</span>
                  <h2 className="text-3xl font-bold text-white leading-tight">{selectedProject.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="p-2 hover:bg-gray-800 rounded-full transition group"
                >
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="text-gray-300 mb-6">{selectedProject.description}</div>
              <ul className="space-y-3 mb-6 text-sm text-gray-400">
                {selectedProject.points.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-[#4285F4]/10 text-[#4285F4] rounded-full text-xs font-bold">{s}</span>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 flex justify-end">
              <button 
                onClick={() => setSelectedProject(null)} 
                className="px-6 py-2 rounded-full bg-[#4285F4] text-white font-medium hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const StackCategory = ({ title, color, items }) => (
  <div className="tech-card p-6 rounded-3xl reveal-on-scroll">
    <h3 style={{ color }} className="font-bold text-sm mb-6 uppercase tracking-wider">{title}</h3>
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2d2e31] shrink-0">
            <img src={`https://cdn.simpleicons.org/${item.s}`} className="w-5 h-5 invert" alt={item.n} />
          </div>
          <span className="text-sm font-medium text-gray-300">{item.n}</span>
        </div>
      ))}
    </div>
  </div>
);

export default App;