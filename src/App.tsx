import './styles/global.css';
import { Timeline } from './components/Timeline';
import { ChatInterface } from './components/ChatInterface';
import { Vote } from 'lucide-react';

function App() {
  return (
    <div className="container">
      <header className="app-header">
        <div className="logo-section">
          <Vote size={32} color="var(--primary)" />
          <h1>Voter Guide 2026</h1>
        </div>
        <p className="subtitle">Empowering first-time voters with clear, non-partisan guidance.</p>
      </header>

      <main className="main-content">
        <div className="content-grid">
          <div className="left-column">
            <Timeline />
            <div className="info-card card">
              <h3>Quick Tips</h3>
              <ul>
                <li>Check your registration 30 days before election day.</li>
                <li>Verify your polling place locally.</li>
                <li>Bring a valid photo ID (depending on your state).</li>
              </ul>
            </div>
          </div>
          <div className="right-column">
            <ChatInterface />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2026 Election Process Education Assistant. Built with Google Gemini.</p>
        <p>Information is for educational purposes. Always verify with official sources.</p>
      </footer>

      <style>{`
        .app-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .logo-section h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.025em;
        }
        .subtitle {
          color: var(--text-muted);
          font-size: 1.125rem;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        .info-card {
          padding: 1.5rem;
          margin-top: 1rem;
        }
        .info-card h3 {
          margin-bottom: 1rem;
          font-size: 1.125rem;
        }
        .info-card ul {
          list-style-type: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .info-card li {
          font-size: 0.875rem;
          color: var(--text-muted);
          padding-left: 1.5rem;
          position: relative;
        }
        .info-card li::before {
          content: "•";
          color: var(--primary);
          position: absolute;
          left: 0;
          font-weight: bold;
        }
        .app-footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
