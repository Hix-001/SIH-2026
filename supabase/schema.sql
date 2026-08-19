-- ============================================================================
-- NyayaSetu | Citizen Legal Triage & Rights Navigator
-- PostgreSQL Schema for Supabase (SIH 2026)
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Legal Disputes & Triage Records Table
CREATE TABLE IF NOT EXISTS public.triage_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    query_id TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    category_display_name TEXT NOT NULL,
    dispute_summary TEXT NOT NULL,
    redacted_query TEXT NOT NULL,
    risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'moderate', 'high', 'critical')),
    risk_reason TEXT,
    limitation_period TEXT,
    statutory_timeframe_notice TEXT,
    dispute_amount TEXT,
    incident_date DATE,
    state_or_city TEXT,
    language TEXT DEFAULT 'en',
    pii_entities_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Applicable Statutory Sections Mapped Table
CREATE TABLE IF NOT EXISTS public.mapped_statutes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    triage_record_id UUID REFERENCES public.triage_records(id) ON DELETE CASCADE,
    act TEXT NOT NULL,
    section TEXT NOT NULL,
    old_ipc_section TEXT,
    title TEXT NOT NULL,
    relevance_score FLOAT,
    punishment TEXT,
    is_cognizable BOOLEAN DEFAULT false,
    is_bailable BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Drafted Legal Demand Notices Table
CREATE TABLE IF NOT EXISTS public.drafted_notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    triage_record_id UUID REFERENCES public.triage_records(id) ON DELETE CASCADE,
    sender_name TEXT,
    receiver_name TEXT,
    notice_subject TEXT NOT NULL,
    statutory_notice_days INT DEFAULT 15,
    facts JSONB NOT NULL DEFAULT '[]'::jsonb,
    demands JSONB NOT NULL DEFAULT '[]'::jsonb,
    drafted_date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS) & Public Insert Policy
ALTER TABLE public.triage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mapped_statutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drafted_notices ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for citizen triage
CREATE POLICY "Allow public insert to triage_records" ON public.triage_records FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on triage_records" ON public.triage_records FOR SELECT USING (true);

CREATE POLICY "Allow public insert to mapped_statutes" ON public.mapped_statutes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on mapped_statutes" ON public.mapped_statutes FOR SELECT USING (true);

CREATE POLICY "Allow public insert to drafted_notices" ON public.drafted_notices FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on drafted_notices" ON public.drafted_notices FOR SELECT USING (true);
