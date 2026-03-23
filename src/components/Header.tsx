'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, User, Plus } from 'lucide-react';

const navItems = [
  {
    label: 'For sale',
    href: '/search?transaction=sale',
    children: [
      { label: 'Apartment for sale', href: '/search?transaction=sale&type=Apartment' },
      { label: 'House for sale', href: '/search?transaction=sale&type=House' },
      { label: 'Villa for sale', href: '/search?transaction=sale&type=Villa' },
      { label: 'Land for sale', href: '/search?transaction=sale&type=Land' },
    ],
  },
  {
    label: 'For rent',
    href: '/search?transaction=rent',
    children: [
      { label: 'Apartment for rent', href: '/search?transaction=rent&type=Apartment' },
      { label: 'House for rent', href: '/search?transaction=rent&type=House' },
      { label: 'Studio for rent', href: '/search?transaction=rent&type=Studio' },
    ],
  },
  { label: 'New builds', href: '/search?new=true', children: [] },
  { label: 'Estimate', href: '#', children: [
    { label: 'Estimate my property', href: '#' },
    { label: 'Contact an agency', href: '#' },
  ]},
  { label: 'Professionals', href: '#', children: [
    { label: 'Find an agent', href: '#' },
    { label: 'Find a developer', href: '#' },
  ]},
  { label: 'Services', href: '#', children: [
    { label: 'Mortgage calculator', href: '#' },
    { label: 'Insurance', href: '#' },
  ]},
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50" style={{ borderBottom: '1px solid #E9ECEF', boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
      <div className="max-w-[1280px] mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between" style={{ height: '60px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L2 14h4v14h8v-8h4v8h8V14h4L16 2z" fill="#133DBD"/>
            </svg>
            <span style={{ fontSize: '18px', fontWeight: 700 }}>
              <span style={{ color: '#133DBD' }}>Immo</span><span style={{ color: '#212529' }}>Uganda</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div key={item.label} className="nav-item relative">
                <Link href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-[14px] font-medium transition-colors"
                  style={{ color: '#343A40' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#133DBD')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#343A40')}
                >
                  {item.label}
                  {item.children.length > 0 && <ChevronDown size={13} className="text-[#CED4DA]" />}
                </Link>
                {item.children.length > 0 && (
                  <div className="nav-dropdown-menu absolute top-full left-0 bg-white min-w-[240px] rounded-b-lg py-1 z-[100]"
                    style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)', opacity: 0, visibility: 'hidden', transform: 'translateY(-2px)', transition: 'all 0.15s ease' }}>
                    {item.children.map(c => (
                      <Link key={c.label} href={c.href}
                        className="block px-5 py-2.5 text-[14px] transition-colors"
                        style={{ color: '#495057' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#F0F4FF'; e.currentTarget.style.color = '#133DBD'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#495057'; }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link href="#"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-white text-[13px] font-semibold rounded-lg transition-colors"
              style={{ background: '#133DBD' }}
            >
              <Plus size={14} /> Place a classified
            </Link>
            <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium" style={{ color: '#495057' }}>
              <User size={16} /> Log in
            </button>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} style={{ color: '#495057' }} /> : <Menu size={22} style={{ color: '#495057' }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="lg:hidden bg-white" style={{ borderTop: '1px solid #E9ECEF' }}>
          <div className="max-w-[1280px] mx-auto px-4 py-3 space-y-0.5">
            {navItems.map(item => (
              <div key={item.label}>
                <Link href={item.href} className="block px-3 py-2.5 text-[14px] font-medium rounded-lg" style={{ color: '#495057' }}
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              </div>
            ))}
            <div className="pt-3" style={{ borderTop: '1px solid #E9ECEF' }}>
              <Link href="#" className="flex items-center justify-center gap-2 px-4 py-2.5 text-white text-[13px] font-semibold rounded-lg" style={{ background: '#133DBD' }}>
                <Plus size={14} /> Place a classified
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
