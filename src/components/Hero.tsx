import React from 'react';
import { MessageSquare, Sparkles, Utensils } from 'lucide-react';
import gourmetDish from '../assets/gourmet_dish.png';

interface HeroProps {
  onOpenChat: () => void;
  onAskQuestion: (prompt: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenChat, onAskQuestion }) => {
  const suggestions = [
    "Show me Italian specialties",
    "Recommend fast food",
    "Add FD001 to my order",
    "Do you have healthy snacks?"
  ];

  return (
    <section style={{
      padding: '40px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      <div 
        className="glass-panel" 
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,249,246,0.8))',
          padding: 'clamp(20px, 5vw, 48px)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(234, 88, 12, 0.1)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(92, 83, 74, 0.05)'
        }}
      >
        {/* Left Welcome Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Badge */}
          <div style={{ display: 'flex' }}>
            <div style={{
              background: 'rgba(234, 88, 12, 0.05)',
              border: '1px solid rgba(234, 88, 12, 0.15)',
              color: 'var(--accent-orange)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              fontWeight: 800
            }}>
              <Sparkles size={14} color="var(--accent-orange)" />
              <span>Gourmet Bites, Redefined by AI</span>
            </div>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 850,
            lineHeight: 1.15,
            letterSpacing: '-1.5px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic'
          }}>
            Welcome to <br />
            <span className="text-gradient-orange">HMS Restraunt</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '520px'
          }}>
            Experience dining at its finest. Ask our advanced AI Culinary Assistant to recommend organic Italian pastas, flame-grilled burgers, or crisp artisan sandwiches. Customize ingredients and place orders instantly in real time.
          </p>

          {/* Call-to-actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '10px' }}>
            <button 
              onClick={onOpenChat} 
              className="btn-primary"
              style={{ padding: '14px 28px' }}
            >
              <MessageSquare size={18} />
              Consult Assistant
            </button>
            <a 
              href="#listings" 
              className="btn-secondary"
              style={{ 
                padding: '14px 28px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Utensils size={18} />
              Browse Menu
            </a>
          </div>

          {/* Suggested prompts list */}
          <div style={{ marginTop: '16px' }}>
            <span style={{ 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              color: 'var(--text-muted)', 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              display: 'block',
              marginBottom: '8px'
            }}>
              Suggested Questions (Click to Ask Assistant)
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {suggestions.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onAskQuestion(prompt)}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-orange)';
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right curved image card */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'scaleIn 0.5s ease forwards'
        }}>
          <div style={{
            width: '100%',
            aspectRatio: '16/10',
            maxHeight: '400px',
            overflow: 'hidden',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(92, 83, 74, 0.06)',
            border: '4px solid #ffffff'
          }}>
            <img 
              src={gourmetDish} 
              alt="Artisan Saffron Risotto gourmet dish" 
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                transform: 'scale(1.01)',
                transition: 'var(--transition-smooth)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
