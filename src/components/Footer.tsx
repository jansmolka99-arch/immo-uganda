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
    <footer className="bg-white" style={{ borderTop: '1px solid #E9ECEF' }}>
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {cols.map(col => (
            <div key={col.title}>
              <h4 className="text-[12px] font-bold uppercase mb-4" style={{ color: '#212529', letterSpacing: '1px' }}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><Link href="#" className="text-[13px] transition-colors"
                    style={{ color: '#6C757D' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#133DBD')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6C757D')}
                  >{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #E9ECEF' }}>
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L2 14h4v14h8v-8h4v8h8V14h4L16 2z" fill="#133DBD"/>
            </svg>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>
              <span style={{ color: '#133DBD' }}>Immo</span><span style={{ color: '#212529' }}>Uganda</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {['F', 'X', 'in'].map(letter => (
              <a key={letter} href="#" className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                style={{ border: '1px solid #DEE2E6', color: '#ADB5BD' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#133DBD'; e.currentTarget.style.color = '#133DBD'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#DEE2E6'; e.currentTarget.style.color = '#ADB5BD'; }}
              >
                <span className="text-[10px] font-bold">{letter}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E9ECEF', background: '#F8F9FA' }}>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]" style={{ color: '#ADB5BD' }}>
          <div className="flex flex-wrap items-center gap-3">
            {['Terms of use', 'Cookie settings', 'Privacy policy', 'Ranking rules'].map((l, i) => (
              <span key={l} className="flex items-center gap-3">
                {i > 0 && <span style={{ color: '#DEE2E6' }}>|</span>}
                <a href="#">{l}</a>
              </span>
            ))}
          </div>
          <span>ImmoUganda &copy; 2026 &ndash; All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
