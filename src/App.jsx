import { useState } from 'react';

const highlights = [
  'Residential and commercial service',
  'Reliable timelines and clean workmanship',
  'Detail-focused drywall finishing',
  'Built for contractors, developers, and homeowners',
];

const services = [
  {
    title: 'Drywall',
    text: 'Professional drywall installation for residential, commercial, and renovation projects with clean execution and dependable timelines.',
    bullets: [
      'Board installation',
      'Drywall repairs and patchwork',
      'Residential and commercial interiors',
      'Clean jobsite standards',
    ],
  },
  {
    title: 'Framing',
    text: 'Accurate structural and interior framing solutions designed to support efficient builds and high-quality finishes.',
    bullets: ['Steel stud framing', 'Wood framing', 'Bulkheads and partitions', 'Layout precision'],
  },
  {
    title: 'Finishing',
    text: 'Smooth taping, mudding, sanding, and final finishing work that prepares your space for paint and occupancy.',
    bullets: ['Taping and mudding', 'Level finish preparation', 'Sanding and touch-ups', 'Ready-for-paint delivery'],
  },
];

const aboutPoints = [
  'Clear communication from estimate to completion',
  'Quality-first workmanship on every detail',
  'Flexible support for residential and commercial projects',
  'A professional finish that reflects the standard of your build',
];

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    fetch('https://formsubmit.co/ajax/info@primexdrywall.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: 'New Inquiry from Primex Dry Wall Website',
        _captcha: 'false',
        _template: 'table',
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setStatus('error');
      });
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <div>
            <div className="brand-name">Primex Dry Wall</div>
            <div className="brand-subtitle">Drywall • Framing • Finishing</div>
          </div>
          <a href="#contact" className="button button-primary">
            Get a Quote
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Toronto Interior Construction Specialists</div>
              <h1>Drywall, framing, and finishing done right the first time.</h1>
              <p>
                Primex Dry Wall supports builders, homeowners, and property managers with dependable interior construction services.
                We focus on disciplined workmanship, clean sites, and polished final results.
              </p>
              <div className="button-row">
                <a href="#contact" className="button button-primary">
                  Request a Quote
                </a>
                <a href="#services" className="button button-secondary">
                  Explore Services
                </a>
              </div>
            </div>

            <div className="highlight-grid">
              {highlights.map((item) => (
                <div key={item} className="glass-card compact-card">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="container">
            <div className="section-intro">
              <div className="section-label">Our Services</div>
              <h2>Core services for contractors, developers, and homeowners</h2>
              <p>
                Primex Dry Wall specializes in the interior stages of construction that define structure, flow, and finish quality.
              </p>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article key={service.title} className="glass-card service-card">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <ul>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section-block section-muted">
          <div className="container about-grid">
            <div>
              <div className="section-label">About Primex Dry Wall</div>
              <h2>Focused on craftsmanship, communication, and clean execution</h2>
              <p>
                Primex Dry Wall is a construction company specializing in drywall, framing, and finishing. We support builders,
                homeowners, property managers, and contractors with dependable trade work that keeps projects moving and delivers
                polished results.
              </p>
            </div>

            <div className="stack-grid">
              {aboutPoints.map((item) => (
                <div key={item} className="glass-card compact-card">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-block">
          <div className="container contact-grid">
            <div>
              <div className="section-label">Contact</div>
              <h2>Tell us about your project</h2>
              <p>
                Reach out to discuss your project. Fill in the form and we'll get back to you promptly.
              </p>
            </div>

            <div className="contact-card">
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Project details"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="button button-primary button-full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                </button>
                {status === 'success' && (
                  <p className="form-status form-success">Thank you! Your inquiry has been sent.</p>
                )}
                {status === 'error' && (
                  <p className="form-status form-error">Something went wrong. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
