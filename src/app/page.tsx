import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { properties, cities, propertyTypes } from '@/data/properties';

export default function HomePage() {
  const popular = properties.filter(p => p.featured).slice(0, 4);
  const saleNew = properties.filter(p => p.transaction === 'sale').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);
  const rentNew = properties.filter(p => p.transaction === 'rent').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  return (
    <>
      {/* Search */}
      <section style={{ background: '#fff', padding: '48px 0 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>
              Find your property in Uganda
            </h1>
            <p style={{ fontSize: '15px', color: '#6C757D' }}>So many dreams, one address.</p>
          </div>
          <SearchBar variant="hero" />
        </div>
      </section>

      {/* Cities */}
      <section style={{ background: '#F8F9FA', padding: '40px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#212529' }}>Search by city for sale</h2>
            <Link href="/search?transaction=sale" style={{ fontSize: '13px', fontWeight: 600, color: '#133DBD' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
            {cities.map(c => (
              <Link key={c.name} href={`/search?transaction=sale&location=${c.name}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', background: '#fff', borderRadius: '8px',
                  border: '1px solid #DEE2E6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  textDecoration: 'none',
                }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#343A40' }}>{c.name}</span>
                <span style={{ fontSize: '11px', color: '#ADB5BD' }}>{c.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      <section style={{ background: '#fff', padding: '40px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#212529' }}>Most popular properties</h2>
            <Link href="/search" style={{ fontSize: '13px', fontWeight: 600, color: '#133DBD' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {popular.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* Newest Sale */}
      <section style={{ background: '#F8F9FA', padding: '40px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#212529' }}>Newest properties for sale</h2>
            <Link href="/search?transaction=sale" style={{ fontSize: '13px', fontWeight: 600, color: '#133DBD' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {saleNew.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* Newest Rent */}
      <section style={{ background: '#fff', padding: '40px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#212529' }}>Newest properties for rent</h2>
            <Link href="/search?transaction=rent" style={{ fontSize: '13px', fontWeight: 600, color: '#133DBD' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {rentNew.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section style={{ background: '#F8F9FA', padding: '40px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#212529', marginBottom: '20px' }}>Explore by property type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
            {propertyTypes.map(t => (
              <Link key={t.name} href={`/search?transaction=sale&type=${t.slug}`}
                style={{
                  background: '#fff', borderRadius: '8px', border: '1px solid #DEE2E6',
                  padding: '20px 12px', textAlign: 'center', textDecoration: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#343A40' }}>{t.name}</p>
                <p style={{ fontSize: '12px', color: '#ADB5BD', marginTop: '4px' }}>{t.count} listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#fff', padding: '48px 0', borderTop: '1px solid #E9ECEF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#212529', marginBottom: '8px' }}>Are you a property professional?</h2>
          <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '24px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
            Join Uganda&apos;s leading real estate platform. List your properties and grow your business.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <Link href="#" style={{ padding: '10px 24px', background: '#133DBD', color: '#fff', fontSize: '14px', fontWeight: 600, borderRadius: '8px', textDecoration: 'none' }}>
              List your property
            </Link>
            <Link href="#" style={{ padding: '10px 24px', color: '#133DBD', fontSize: '14px', fontWeight: 600, borderRadius: '8px', border: '1.5px solid #133DBD', textDecoration: 'none' }}>
              Learn more
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
