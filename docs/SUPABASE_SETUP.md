# Supabase Setup Guide for ExamPrep

This guide details how to configure Supabase with the modern API keys (`sb_publishable_...` and `sb_secret_...`) and run database migrations.

---

## 1. Environment Configuration

In your project root `.env` file, configure your Supabase credentials:

```bash
# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Modern Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_..."
SUPABASE_SECRET_KEY="sb_secret_..."
```

### Key Differences:
- **`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`**: Client & Browser safe. Governed by Row Level Security (RLS). Replaces legacy `anon` key.
- **`SUPABASE_SECRET_KEY`**: Server & backend only (tRPC / Inngest / Admin). Bypasses RLS. Replaces legacy `service_role` key. **Never expose in browser**.

---

## 2. Apply Database Schema & Migrations

Open your Supabase Dashboard:
1. Navigate to **SQL Editor**.
2. Copy and paste the contents of `supabase/migrations/20260101000000_initial_schema.sql`.
3. Click **Run**.
4. (Optional) Run `supabase/seed.sql` to populate UGC NET Paper 1 and 10 practice questions.

---

## 3. Storage Buckets

In Supabase Dashboard under **Storage**:
1. Create a **Private** bucket named `papers` (for question PDF uploads).
2. Create a **Public** bucket named `question-images` (for diagram and question cropped figures).
