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
    title TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    due_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Optional, but recommended. For MVP without Auth, we can keep it open or add simple policies)
-- ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Simple "Allow all for anon" policy (if you want to use RLS but allow everything for MVP)
-- CREATE POLICY "Allow all for testing" ON customers FOR ALL TO anon USING (true);
-- CREATE POLICY "Allow all for testing" ON tasks FOR ALL TO anon USING (true);
