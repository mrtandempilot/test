import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewCustomer() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('lead');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from('customers').insert([{ name, company, email, phone, status, notes }]);

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            alert('Müşteri başarıyla kaydedildi');
            router.push('/');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <header style={{ marginBottom: '20px' }}>
                <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← Geri Dön</Link>
                <h1 style={{ marginTop: '10px' }}>Yeni Müşteri Ekle</h1>
            </header>

            <form onSubmit={onSubmit} className="card">
                <div className="form-group">
                    <label>İsim *</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Şirket</label>
                    <input value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>E-posta</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </div>
                <div className="form-group">
                    <label>Telefon</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Durum</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="lead">Lead</option>
                        <option value="contacted">İletişimde</option>
                        <option value="qualified">Nitelikli</option>
                        <option value="closed">Kapatıldı</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Notlar</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="4" />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </form>

            <style jsx>{`
        .card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }
        input, select, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
        }
        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          width: 100%;
        }
        button:disabled {
          background: #ccc;
        }
      `}</style>
        </div>
    );
}
