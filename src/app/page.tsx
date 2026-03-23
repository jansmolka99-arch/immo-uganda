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
          <SectionHeader title="Search by city for sale" href="/search?transaction=sale" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
            {cities.map(c => (
              <Link key={c.name} href={`/search?transaction=sale&location=${c.name}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#fff', borderRadius: '8px', border: '1px solid #DEE2E6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
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
          <SectionHeader title="Most popular properties" href="/search" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {popular.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* New Builds / Off-plan */}
      <section style={{ background: '#133DBD', padding: '48px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 300px' }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '11px', fontWeight: 600, borderRadius: '20px', marginBottom: '16px', letterSpacing: '0.5px' }}>NEW BUILDS</span>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                New construction projects
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '20px', lineHeight: '1.6' }}>
                Explore brand new developments across Uganda. From off-plan apartments in Kololo to housing estates in Kira &mdash; be the first to secure your unit.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                {[{ label: 'Planning Phase', color: '#FD7E14' }, { label: 'Under Construction', color: '#28A745' }, { label: 'Ready to Move', color: '#133DBD', bg: '#fff' }].map(s => (
                  <span key={s.label} style={{ padding: '4px 10px', background: s.bg || 'rgba(255,255,255,0.15)', color: s.bg ? s.color : '#fff', fontSize: '11px', fontWeight: 600, borderRadius: '4px' }}>
                    {s.label}
                  </span>
                ))}
              </div>
              <Link href="/search?new=true" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', background: '#fff', color: '#133DBD', fontSize: '14px', fontWeight: 600, borderRadius: '8px', textDecoration: 'none' }}>
                Explore all new builds &rarr;
              </Link>
            </div>
            <div style={{ flex: '2 1 500px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {newBuilds.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Newest Sale */}
      <section style={{ background: '#fff', padding: '40px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <SectionHeader title="Newest properties for sale" href="/search?transaction=sale" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {saleNew.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* Alert Signup */}
      <AlertSignup />

      {/* Newest Rent */}
      <section style={{ background: '#fff', padding: '40px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <SectionHeader title="Newest properties for rent" href="/search?transaction=rent" />
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
                style={{ background: '#fff', borderRadius: '8px', border: '1px solid #DEE2E6', padding: '20px 12px', textAlign: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
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
            <Link href="#" style={{ padding: '10px 24px', background: '#133DBD', color: '#fff', fontSize: '14px', fontWeight: 600, borderRadius: '8px' }}>List your property</Link>
            <Link href="#" style={{ padding: '10px 24px', color: '#133DBD', fontSize: '14px', fontWeight: 600, borderRadius: '8px', border: '1.5px solid #133DBD' }}>Learn more</Link>
          </div>
        </div>
      </section>

      {/* SEO Text About Uganda */}
      <section style={{ background: '#F8F9FA', padding: '40px 0', borderTop: '1px solid #E9ECEF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#212529', marginBottom: '16px' }}>Real Estate in Uganda</h2>
          <div style={{ columns: '2', columnGap: '40px', fontSize: '13px', color: '#6C757D', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              Uganda, often referred to as the &ldquo;Pearl of Africa,&rdquo; is one of the most dynamic real estate markets in East Africa.
              The capital city Kampala, home to over 3 million people, has seen tremendous growth in property development over the past two decades,
              transforming into a modern hub for business and residential living.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Premium neighborhoods like Kololo, Nakasero, and Muyenga feature luxury apartments and executive homes popular with diplomats
              and expatriates. Growing suburbs such as Kira, Naalya, Ntinda, and Kisaasi offer more affordable housing options for young families
              and professionals. Entebbe, located on Lake Victoria near the international airport, is known for its serene lakeside villas and cottages.
            </p>
            <p style={{ marginBottom: '12px' }}>
              Uganda&apos;s real estate market presents strong investment opportunities, with property values steadily appreciating across major cities.
              Land ownership follows a dual system of freehold (private mailo) and leasehold titles. Prices are typically quoted in Ugandan Shillings (UGX)
              or US Dollars, and land is measured in decimals (1 acre = 100 decimals) or acres.
            </p>
            <p>
              Whether you&apos;re looking for a family home in Kampala, investment land in Wakiso, a holiday villa in the Ssese Islands,
              or commercial space in the central business district &mdash; ImmoUganda connects you with verified listings and trusted agencies
              across the Pearl of Africa.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#212529' }}>{title}</h2>
      {href && <Link href={href} style={{ fontSize: '13px', fontWeight: 600, color: '#133DBD' }}>View all &rarr;</Link>}
    </div>
  );
}
