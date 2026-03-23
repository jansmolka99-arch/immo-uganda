import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import AlertSignup from '@/components/AlertSignup';
import { properties, cities, propertyTypes } from '@/data/properties';

export default function HomePage() {
  const popular = properties.filter(p => p.featured).slice(0, 4);
  const saleNew = properties.filter(p => p.transaction === 'sale').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
  const rentNew = properties.filter(p => p.transaction === 'rent').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
  const newBuilds = properties.filter(p => p.isNew && p.transaction === 'sale').slice(0, 3);

  return (
    <>
      {/* Search */}
      <section style={{ background: '#fff', padding: '32px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 700, color: '#212529', marginBottom: '6px' }}>
              Find your property in Uganda
            </h1>
            <p style={{ fontSize: '14px', color: '#6C757D' }}>So many dreams, one address.</p>
          </div>
          <SearchBar variant="hero" />
        </div>
      </section>

      {/* Cities */}
      <section style={{ background: '#F8F9FA', padding: '32px 0' }}>
        <div className="container">
          <SectionHeader title="Search by city for sale" href="/search?transaction=sale" />
          <div className="grid-cities">
            {cities.map(c => (
              <Link key={c.name} href={`/search?transaction=sale&location=${c.name}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#fff', borderRadius: '8px', border: '1px solid #DEE2E6' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#343A40' }}>{c.name}</span>
                <span style={{ fontSize: '11px', color: '#ADB5BD' }}>{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      <section style={{ background: '#fff', padding: '32px 0' }}>
        <div className="container">
          <SectionHeader title="Most popular properties" href="/search" />
          <div className="grid-cards">{popular.map(p => <PropertyCard key={p.id} property={p} />)}</div>
        </div>
      </section>

      {/* New Builds */}
      <section style={{ background: '#133DBD', padding: '40px 0' }}>
        <div className="container">
          <div className="newbuilds-flex">
            <div className="newbuilds-text">
              <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '11px', fontWeight: 600, borderRadius: '20px', marginBottom: '12px' }}>NEW BUILDS</span>
              <h2 style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>New construction projects</h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '16px', lineHeight: '1.6' }}>
                Explore brand new developments across Uganda. From off-plan apartments in Kololo to housing estates in Kira.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {[{ l: 'Planning', c: '#FD7E14' }, { l: 'Under Construction', c: '#28A745' }, { l: 'Ready to Move', c: '#fff', t: '#133DBD' }].map(s => (
                  <span key={s.l} style={{ padding: '3px 8px', background: s.t ? s.c : 'rgba(255,255,255,0.15)', color: s.t || '#fff', fontSize: '10px', fontWeight: 600, borderRadius: '4px' }}>{s.l}</span>
                ))}
              </div>
              <Link href="/search?new=true" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', background: '#fff', color: '#133DBD', fontSize: '13px', fontWeight: 600, borderRadius: '8px' }}>
                Explore all &rarr;
              </Link>
            </div>
            <div className="newbuilds-cards">
              <div className="grid-cards-3">{newBuilds.map(p => <PropertyCard key={p.id} property={p} />)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newest Sale */}
      <section style={{ background: '#fff', padding: '32px 0' }}>
        <div className="container">
          <SectionHeader title="Newest properties for sale" href="/search?transaction=sale" />
          <div className="grid-cards">{saleNew.map(p => <PropertyCard key={p.id} property={p} />)}</div>
        </div>
      </section>

      {/* Alerts */}
      <AlertSignup />

      {/* Newest Rent */}
      <section style={{ background: '#fff', padding: '32px 0' }}>
        <div className="container">
          <SectionHeader title="Newest properties for rent" href="/search?transaction=rent" />
          <div className="grid-cards">{rentNew.map(p => <PropertyCard key={p.id} property={p} />)}</div>
        </div>
      </section>

      {/* Property Types */}
      <section style={{ background: '#F8F9FA', padding: '32px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', marginBottom: '16px' }}>Explore by property type</h2>
          <div className="grid-types">
            {propertyTypes.map(t => (
              <Link key={t.name} href={`/search?transaction=sale&type=${t.slug}`}
                style={{ background: '#fff', borderRadius: '8px', border: '1px solid #DEE2E6', padding: '16px 10px', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#343A40' }}>{t.name}</p>
                <p style={{ fontSize: '12px', color: '#ADB5BD', marginTop: '4px' }}>{t.count} listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: '40px 0', borderTop: '1px solid #E9ECEF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>Are you a property professional?</h2>
          <p style={{ fontSize: '13px', color: '#6C757D', marginBottom: '20px', maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' }}>
            Join Uganda&apos;s leading real estate platform. List your properties and grow your business.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="#" style={{ padding: '10px 20px', background: '#133DBD', color: '#fff', fontSize: '13px', fontWeight: 600, borderRadius: '8px' }}>List your property</Link>
            <Link href="#" style={{ padding: '10px 20px', color: '#133DBD', fontSize: '13px', fontWeight: 600, borderRadius: '8px', border: '1.5px solid #133DBD' }}>Learn more</Link>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section style={{ background: '#F8F9FA', padding: '32px 0', borderTop: '1px solid #E9ECEF' }}>
        <div className="container">
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>Real Estate in Uganda</h2>
          <div className="seo-columns">
            <p style={{ marginBottom: '10px' }}>
              Uganda, often referred to as the &ldquo;Pearl of Africa,&rdquo; is one of the most dynamic real estate markets in East Africa.
              Kampala, home to over 3 million people, has seen tremendous growth in property development over the past two decades.
            </p>
            <p style={{ marginBottom: '10px' }}>
              Premium neighborhoods like Kololo, Nakasero, and Muyenga feature luxury apartments popular with diplomats
              and expatriates. Growing suburbs like Kira, Naalya, and Kisaasi offer affordable options for families.
              Entebbe is known for serene lakeside villas.
            </p>
            <p style={{ marginBottom: '10px' }}>
              Land ownership follows freehold (private mailo) and leasehold titles. Prices are quoted in UGX or USD.
              Land is measured in decimals (1 acre = 100 decimals) or acres.
            </p>
            <p>
              Whether you&apos;re looking for a family home, investment land, a holiday villa in the Ssese Islands,
              or commercial space &mdash; ImmoUganda connects you with verified listings across the Pearl of Africa.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529' }}>{title}</h2>
      {href && <Link href={href} style={{ fontSize: '13px', fontWeight: 600, color: '#133DBD' }}>View all &rarr;</Link>}
    </div>
  );
}
