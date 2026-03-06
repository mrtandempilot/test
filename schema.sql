-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'lead',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    title TEXT NOT NULL, -- Uygulama kodunda 'title' kullanılıyor
    status TEXT DEFAULT 'open',
    due_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Recommended)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Simple "Allow all for anon" policy for MVP testing
CREATE POLICY "Allow anon insert" ON customers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon select" ON customers FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon insert" ON tasks FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon select" ON tasks FOR SELECT TO anon USING (true);
