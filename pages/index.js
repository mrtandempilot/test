import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) {
        console.error('Error fetching customers:', error);
      } else {
        setCustomers(data || []);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>CRM Dashboard</h1>
        <nav>
          <Link href="/customers/new" style={{ marginRight: '15px', color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>+ Yeni Müşteri</Link>
          <Link href="/tasks/new" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>+ Yeni Görev</Link>
        </nav>
      </header>

      <section className="card">
        <h2>Müşteriler</h2>
        {loading ? (
          <p>Yükleniyor...</p>
        ) : customers.length === 0 ? (
          <p>Henüz müşteri bulunamadı.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {customers.map((c) => (
              <li key={c.id} style={{ padding: '15px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{c.name}</strong>
                  <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.9em' }}>{c.company || 'Şirket Belirtilmemiş'}</span>
                </div>
                <span className={`badge ${c.status}`}>{c.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <style jsx>{`
        .card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8em;
          text-transform: uppercase;
        }
        .lead { background: #e3f2fd; color: #1976d2; }
        .contacted { background: #fff3e0; color: #f57c00; }
        .qualified { background: #e8f5e9; color: #388e3c; }
        .closed { background: #fafafa; color: #616161; }
      `}</style>
    </div>
  );
}
