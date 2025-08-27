import React from 'react';

const Home = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'auto',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      {/* Background Animation */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        zIndex: 1
      }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: `float ${20 + i * 2}s infinite ease-in-out`,
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            left: `${10 + i * 15}%`,
            animationDelay: `${i * 2}s`,
            top: `${10 + i * 10}%`
          }} />
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        color: 'white',
        zIndex: 2,
        maxWidth: '1200px',
        padding: '2rem'
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: '2rem',
          animation: 'fadeInUp 1s ease-out'
        }}>
          
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #fff, #e0e7ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'fadeInUp 1s ease-out 0.2s both'
        }}>
          Your Contact Saver App
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '1rem',
          opacity: 0.9,
          animation: 'fadeInUp 1s ease-out 0.4s both'
        }}>
          Your Digital Contact Management Solutions
        </p>

        {/* Description */}
        <p style={{
          fontSize: '1.1rem',
          marginBottom: '2.5rem',
          opacity: 0.8,
          lineHeight: 1.6,
          animation: 'fadeInUp 1s ease-out 0.6s both'
        }}>
          Now you can easily manage your contacts with our intuitive and user-friendly interface. Save, organize, and access your contacts seamlessly across all devices. Experience the future of contact management today!
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fadeInUp 1s ease-out 0.8s both'
        }}>
          <button 
            onClick={() => window.location.href='/auth'}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Get Started
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>

          <button 
            onClick={() => window.location.href='/dashboard'}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Dashboard
          </button>
        </div>

        
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) rotate(120deg);
          }
          66% {
            transform: translateY(30px) rotate(240deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        body {
          margin: 0;
          padding: 0;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default Home;
