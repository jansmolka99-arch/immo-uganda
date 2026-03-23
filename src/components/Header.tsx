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
      { label: 'Commercial for sale', href: '/search?transaction=sale&type=Commercial' },
    ],
  },
  {
    label: 'For rent',
    href: '/search?transaction=rent',
    children: [
      { label: 'Apartment for rent', href: '/search?transaction=rent&type=Apartment' },
      { label: 'House for rent', href: '/search?transaction=rent&type=House' },
      { label: 'Studio for rent', href: '/search?transaction=rent&type=Studio' },
      { label: 'Commercial for rent', href: '/search?transaction=rent&type=Commercial' },
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
    { label: 'Find a surveyor', href: '#' },
  ]},
  { label: 'Services', href: '#', children: [
    { label: 'Mortgage calculator', href: '#' },
    { label: 'Insurance', href: '#' },
    { label: 'Moving services', href: '#' },
  ]},
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #E9ECEF', boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L2 14h4v14h8v-8h4v8h8V14h4L16 2z" fill="#133DBD"/>
            </svg>
            <span style={{ fontSize: '17px', fontWeight: 700 }}>
              <span style={{ color: '#133DBD' }}>Immo</span><span style={{ color: '#212529' }}>Uganda</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none' }} className="lg:!flex lg:items-center lg:gap-0">
            {navItems.map((item) => (
              <div
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.children.length > 0 && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href={item.href}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', fontSize: '14px', fontWeight: 500, color: openDropdown === item.label ? '#133DBD' : '#343A40', transition: 'color 0.15s' }}
                >
                  {item.label}
                  {item.children.length > 0 && <ChevronDown size={13} color="#CED4DA" />}
                </Link>

                {/* Desktop dropdown */}
                {item.children.length > 0 && openDropdown === item.label && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0,
                    background: '#fff', minWidth: '220px', borderRadius: '0 0 8px 8px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '4px 0', zIndex: 100,
                  }}>
                    {item.children.map(c => (
                      <Link key={c.label} href={c.href}
                        style={{ display: 'block', padding: '10px 20px', fontSize: '14px', color: '#495057' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="#" className="hidden sm:inline-flex"
              style={{ display: 'none', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#133DBD', color: '#fff', fontSize: '13px', fontWeight: 600, borderRadius: '8px' }}
            >
              <Plus size={14} /> Place a classified
            </Link>
            <button className="hidden sm:inline-flex" style={{ display: 'none', alignItems: 'center', gap: '6px', padding: '8px 12px', fontSize: '13px', fontWeight: 500, color: '#495057', background: 'none', border: 'none', cursor: 'pointer' }}>
              <User size={16} /> Log in
            </button>
            {/* Hamburger - always visible on mobile */}
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
              {mobileOpen ? <X size={22} color="#495057" /> : <Menu size={22} color="#495057" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ background: '#fff', borderTop: '1px solid #E9ECEF', maxHeight: 'calc(100vh - 56px)', overflowY: 'auto' }}>
          <div className="container" style={{ paddingTop: '8px', paddingBottom: '12px' }}>
            {navItems.map(item => (
              <div key={item.label}>
                {item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', padding: '12px 12px', fontSize: '15px', fontWeight: 500,
                        color: '#343A40', background: 'none', border: 'none', cursor: 'pointer',
                        borderRadius: '8px',
                      }}
                    >
                      {item.label}
                      <ChevronDown size={16} color="#ADB5BD"
                        style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <div style={{ paddingLeft: '12px', paddingBottom: '4px' }}>
                        {item.children.map(c => (
                          <Link key={c.label} href={c.href}
                            style={{ display: 'block', padding: '10px 12px', fontSize: '14px', color: '#6C757D', borderRadius: '6px' }}
                            onClick={() => setMobileOpen(false)}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href}
                    style={{ display: 'block', padding: '12px 12px', fontSize: '15px', fontWeight: 500, color: '#343A40', borderRadius: '8px' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA buttons */}
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E9ECEF', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="#" onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: '#133DBD', color: '#fff', fontSize: '14px', fontWeight: 600, borderRadius: '8px' }}>
                <Plus size={16} /> Place a classified
              </Link>
              <button
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: '#fff', color: '#495057', fontSize: '14px', fontWeight: 500, borderRadius: '8px', border: '1px solid #DEE2E6', cursor: 'pointer' }}>
                <User size={16} /> Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
