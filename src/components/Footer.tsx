'use client';

import Link from 'next/link';

const cols = [
  { title: 'Services', links: ['Advanced search', 'Estimate property', 'Place a classified', 'Mortgage calculator'] },
  { title: 'About', links: ['About ImmoUganda', 'Press', 'Careers', 'Partner with us'] },
  { title: 'Tools', links: ['Property estimation', 'Mortgage with Stanbic', 'Home insurance', 'Moving services'] },
  { title: 'Help', links: ['FAQ', 'Report fraud', 'Contact us', 'Safety tips'] },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #E9ECEF', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#212529', marginBottom: '16px' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map(l => (
                  <li key={l} style={{ marginBottom: '10px' }}>
                    <Link href="#" style={{ fontSize: '13px', color: '#6C757D', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#133DBD')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#6C757D')}
                    >{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #E9ECEF', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none"><path d="M16 2L2 14h4v14h8v-8h4v8h8V14h4L16 2z" fill="#133DBD"/></svg>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>
              <span style={{ color: '#133DBD' }}>Immo</span><span style={{ color: '#212529' }}>Uganda</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {['F', 'X', 'in'].map(letter => (
              <a key={letter} href="#" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #DEE2E6', color: '#ADB5BD', fontSize: '10px', fontWeight: 700, transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#133DBD'; e.currentTarget.style.color = '#133DBD'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#DEE2E6'; e.currentTarget.style.color = '#ADB5BD'; }}
              >{letter}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E9ECEF', background: '#F8F9FA' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px 16px', fontSize: '11px', color: '#ADB5BD', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '6px 12px' }}>
            {['Terms of use', 'Cookie settings', 'Privacy policy', 'Ranking rules'].map((l, i) => (
              <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {i > 0 && <span style={{ color: '#DEE2E6' }}>|</span>}
                <a href="#" style={{ color: '#ADB5BD' }}>{l}</a>
              </span>
            ))}
          </div>
          <span>ImmoUganda &copy; 2026 &ndash; All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
