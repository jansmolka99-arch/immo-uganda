'use client';

import { useState } from 'react';
import { Bell, Mail, MessageCircle, Check } from 'lucide-react';

export default function AlertSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [method, setMethod] = useState<'email' | 'whatsapp'>('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section style={{ background: '#F0F4FF', padding: '40px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: '#fff', borderRadius: '12px', border: '1px solid #DEE2E6',
          padding: '32px', display: 'flex', alignItems: 'center', gap: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)', flexWrap: 'wrap',
        }}>
          {/* Icon */}
          <div style={{
            width: '56px', height: '56px', borderRadius: '12px',
            background: '#E8EDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Bell size={24} color="#133DBD" />
          </div>

          {/* Text */}
          <div style={{ flex: '1 1 200px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', marginBottom: '4px' }}>
              Get property alerts
            </h3>
            <p style={{ fontSize: '13px', color: '#6C757D' }}>
              Be the first to know about new listings matching your criteria. Receive alerts via email or WhatsApp.
            </p>
          </div>

          {/* Form */}
          <div style={{ flex: '1 1 360px' }}>
            {submitted ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d4edda', borderRadius: '8px' }}>
                <Check size={18} color="#28A745" />
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#155724' }}>
                  You&apos;re subscribed! We&apos;ll notify you of new listings.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Method toggle */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
                  <button type="button" onClick={() => setMethod('email')}
                    style={{
                      padding: '6px 14px', fontSize: '12px', fontWeight: 600, borderRadius: '6px',
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                      background: method === 'email' ? '#133DBD' : '#F1F3F5', color: method === 'email' ? '#fff' : '#6C757D',
                    }}>
                    <Mail size={13} /> Email
                  </button>
                  <button type="button" onClick={() => setMethod('whatsapp')}
                    style={{
                      padding: '6px 14px', fontSize: '12px', fontWeight: 600, borderRadius: '6px',
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                      background: method === 'whatsapp' ? '#25D366' : '#F1F3F5', color: method === 'whatsapp' ? '#fff' : '#6C757D',
                    }}>
                    <MessageCircle size={13} /> WhatsApp
                  </button>
                </div>
                {/* Input */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type={method === 'email' ? 'email' : 'tel'}
                    placeholder={method === 'email' ? 'Enter your email address' : 'Enter your WhatsApp number'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{
                      flex: 1, padding: '10px 14px', border: '1px solid #DEE2E6', borderRadius: '8px',
                      fontSize: '14px', outline: 'none',
                    }}
                  />
                  <button type="submit" style={{
                    padding: '10px 20px', background: method === 'email' ? '#133DBD' : '#25D366', color: '#fff',
                    fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: 'none', cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}>
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
