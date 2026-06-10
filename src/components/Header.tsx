import React from 'react';
import { ChefHat, Utensils, Timer } from 'lucide-react';

interface HeaderProps {
  webhookConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ webhookConnected }) => {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--glass-border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(92, 83, 74, 0.04)'
    }}>
      {/* Brand Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-gold))',
          color: '#ffffff',
          padding: '10px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)'
        }}>
          <ChefHat size={22} color="#ffffff" />
        </div>
        <div>
          <span style={{ 
            fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.5px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            display: 'block',
            lineHeight: 1.1
          }}>
            HMS <span style={{ color: 'var(--accent-orange)' }}>Restraunt</span>
          </span>
          <span style={{ 
            fontSize: 'clamp(0.55rem, 2vw, 0.62rem)', 
            fontWeight: 700, 
            color: 'var(--text-muted)', 
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: '2px'
          }}>
            Premium Artisan Delights
          </span>
        </div>
      </div>

      {/* Navigation menu */}
      <nav style={{
        display: 'flex',
        gap: '24px',
        alignItems: 'center'
      }} className="support-desk-indicator">
        <a href="#listings" style={{ textDecoration: 'none', color: 'var(--accent-orange)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Utensils size={15} />
          Browse Menu
        </a>
        <a href="#services" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', transition: 'var(--transition-smooth)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-orange)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          AI Gastronomy
        </a>
        <a href="#listings" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', transition: 'var(--transition-smooth)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-orange)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
          Seasonal Specials
        </a>
      </nav>

      {/* Status indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Webhook Connection Indicator */}
        <div 
          className="ai-status-indicator"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--glass-border)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            transition: 'var(--transition-smooth)'
          }}
        >
          <span 
            className="pulse-active"
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: webhookConnected ? 'var(--accent-emerald)' : 'var(--accent-amber)',
              display: 'inline-block',
              flexShrink: 0
            }}
          />
          <span className="status-text" style={{ whiteSpace: 'nowrap' }}>
            {webhookConnected ? 'Assistant Online' : 'Active Assistant'}
          </span>
        </div>

        {/* Kitchen Open */}
        <div 
          className="verified-badge-indicator"
          style={{
            background: 'rgba(234, 88, 12, 0.06)',
            border: '1px solid rgba(234, 88, 12, 0.15)',
            color: 'var(--accent-orange)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: 800,
            transition: 'var(--transition-smooth)'
          }}
        >
          <Timer size={14} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
          <span className="verified-text" style={{ whiteSpace: 'nowrap' }}>Kitchen Active</span>
        </div>
      </div>
    </header>
  );
};
