import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyGrid } from './components/PropertyGrid';
import { ChatWidget } from './components/ChatWidget';
import { Sparkles, ShieldCheck, HeartHandshake, PhoneCall, HelpCircle, ChefHat } from 'lucide-react';
import './App.css';

function App() {
  const [webhookConnected, setWebhookConnected] = useState(true);
  const [openChatTrigger, setOpenChatTrigger] = useState(false);
  const [prefilledPrompt, setPrefilledPrompt] = useState('');

  // Perform a silent background connectivity check on the n8n webhook on startup
  useEffect(() => {
    const testConnection = async () => {
      try {
        await fetch('https://n8n.propwiseai.in/', {
          method: 'HEAD',
          mode: 'no-cors' // Prevent local CORS preflight blocking the health ping
        });
        setWebhookConnected(true);
        console.log("n8n HMS Restraunt Webhook connectivity established.");
      } catch (err) {
        // If ping fails, our robust fallback simulator handles queries gracefully
        setWebhookConnected(false);
        console.warn("n8n Webhook connection ping failed; local HMS Restraunt Assistant simulation is active.", err);
      }
    };
    testConnection();
  }, []);

  const handleAskQuestion = (prompt: string) => {
    setPrefilledPrompt(prompt);
  };

  const handleAskAboutFood = (foodId: string) => {
    setPrefilledPrompt(foodId);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      {/* Premium Header */}
      <Header webhookConnected={webhookConnected} />

      {/* Hero Welcome banner */}
      <Hero 
        onOpenChat={() => setOpenChatTrigger(true)} 
        onAskQuestion={handleAskQuestion} 
      />

      {/* Main Details and Widgets */}
      <main style={{ flex: 1, paddingBottom: '80px' }}>
        
        {/* Features Spotlight */}
        <section id="services" style={{ padding: '20px 24px 40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              HMS AI SUITE
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '4px', letterSpacing: '-0.5px', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              Intelligent Culinary Dining
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {/* Service 1 */}
            <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}>
              <div style={{ color: 'var(--accent-orange)', marginBottom: '16px' }}><Sparkles size={32} /></div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>AI Assistant Suggestions</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Submit dining queries in plain English. Our Assistant dynamically maps food profiles, pairs items, and audits organic ingredients.
              </p>
            </div>

            {/* Service 2 */}
            <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}>
              <div style={{ color: 'var(--accent-orange)', marginBottom: '16px' }}><ShieldCheck size={32} /></div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Organic Sourcing Audits</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Ensure absolute dietary safety. The Assistant audits precise allergen components, customizes Swiss toppings, and logs calories.
              </p>
            </div>

            {/* Service 3 */}
            <div className="glass-panel" style={{ padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)' }}>
              <div style={{ color: 'var(--accent-orange)', marginBottom: '16px' }}><HeartHandshake size={32} /></div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Direct Kitchen Customization</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Converse directly with our active kitchen pipeline. Instruct specific seasoning, request pizza toppings, or swap bread slices.
              </p>
            </div>
          </div>
        </section>

        {/* Property Grid showcase */}
        <PropertyGrid onAskAboutProperty={handleAskAboutFood} />

        {/* Live Support Banner */}
        <section style={{ padding: '20px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div className="glass-panel" style={{
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(234, 88, 12, 0.03))',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 10px 30px rgba(92, 83, 74, 0.03)'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{
                background: 'rgba(234, 88, 12, 0.05)',
                padding: '12px',
                borderRadius: '50%',
                color: 'var(--accent-orange)'
              }}>
                <PhoneCall size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Need Custom Table Reservations?</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Our Assistant team is ready to organize custom event catering menus or active table checkouts.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => handleAskQuestion("Are the items seared fresh and available?")}
                className="btn-secondary"
              >
                <HelpCircle size={16} />
                Dietary FAQs
              </button>
              <a 
                href="tel:+18005550177" 
                className="btn-primary" 
                style={{ 
                  background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-gold))',
                  textDecoration: 'none',
                  color: '#ffffff'
                }}
              >
                Contact Dining Desk
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Chat Widget Overlay */}
      <ChatWidget 
        openTrigger={openChatTrigger}
        setOpenTrigger={setOpenChatTrigger}
        prefilledPrompt={prefilledPrompt}
        clearPrefilledPrompt={() => setPrefilledPrompt('')}
      />

      {/* Premium Footer */}
      <footer style={{
        borderTop: '1px solid var(--glass-border)',
        padding: '30px 24px',
        textAlign: 'center',
        background: '#ffffff'
      }}>
        <div style={{ display: 'flex', justifySelf: 'center', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <ChefHat size={16} color="var(--accent-orange)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1.5px', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)' }}>
            HMS RESTRAUNT CULINARY SYSTEM
          </span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} HMS Restraunt Solutions. Verified n8n Pipeline active.
        </p>
      </footer>
    </div>
  );
}

export default App;
