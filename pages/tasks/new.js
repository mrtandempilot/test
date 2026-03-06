import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function NewTask() {
    const router = useRouter();
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('open');
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { data } = await supabase.from('customers').select('id, name');
            setCustomers(data || []);
            if (data && data.length > 0) setCustomerId(data[0].id);
        })();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from('tasks').insert([{ customer_id: customerId, title, status, due_date: dueDate, notes }]);

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            alert('Görev başarıyla kaydedildi');
            router.push('/');
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <header style={{ marginBottom: '20px' }}>
                <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>← Geri Dön</Link>
                <h1 style={{ marginTop: '10px' }}>Yeni Görev Ekle</h1>
            </header>

            <form onSubmit={onSubmit} className="card">
                <div className="form-group">
                    <label>İlgili Müşteri *</label>
                    <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Başlık *</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Durum</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="open">Açık</option>
                        <option value="in_progress">Devam Ediyor</option>
                        <option value="done">Tamamlandı</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Bitiş Tarihi</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Notlar</label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="4" />
                </div>
                <button type="submit" disabled={loading || customers.length === 0}>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
                {customers.length === 0 && <p style={{ color: 'red', marginTop: '10px' }}>Önce bir müşteri eklemelisiniz.</p>}
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
