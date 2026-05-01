import { type FC } from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import type { ElectionStep } from '../types';

const steps: ElectionStep[] = [
  {
    title: "Registration",
    description: "Ensure you are registered to vote. Check your state's deadline.",
    status: 'completed',
    icon: 'registration'
  },
  {
    title: "Research",
    description: "Learn about the candidates and ballot measures.",
    status: 'current',
    icon: 'research'
  },
  {
    title: "Voting Plan",
    description: "Decide if you will vote by mail, early, or in-person.",
    status: 'upcoming',
    icon: 'plan'
  },
  {
    title: "Election Day",
    description: "Cast your ballot and make your voice heard!",
    status: 'upcoming',
    icon: 'vote'
  }
];

export const Timeline: FC = () => {
  return (
    <div className="timeline-container">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Your Voter Journey</h2>
      <div className="timeline-steps">
        {steps.map((step, index) => (
          <div key={index} className={`timeline-step ${step.status}`}>
            <div className="step-icon">
              {step.status === 'completed' && <CheckCircle2 size={24} color="var(--success)" />}
              {step.status === 'current' && <Clock size={24} color="var(--primary)" />}
              {step.status === 'upcoming' && <Circle size={24} color="var(--text-muted)" />}
            </div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index < steps.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>

      <style>{`
        .timeline-container {
          padding: 2rem;
          background: var(--surface);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          margin-bottom: 2rem;
        }
        .timeline-steps {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
        }
        .timeline-step {
          display: flex;
          gap: 1rem;
          position: relative;
        }
        .step-icon {
          background: white;
          z-index: 1;
        }
        .step-content h3 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        .step-content p {
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .step-line {
          position: absolute;
          left: 11px;
          top: 30px;
          bottom: -20px;
          width: 2px;
          background: var(--border);
        }
        .timeline-step.completed .step-content h3 {
          color: var(--success);
        }
        .timeline-step.current .step-content h3 {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
};
