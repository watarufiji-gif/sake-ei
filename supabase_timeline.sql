-- ============================================================
-- SakeFind: timeline_posts テーブル & Storage バケット設定
-- Supabase SQL Editor でそのまま実行してください
-- ============================================================

-- 1. timeline_posts テーブル
create table if not exists timeline_posts (
  id            bigserial primary key,
  user_id       text not null,
  user_name     text,
  sake_id       bigint references sakes(id) on delete set null,
  sake_name     text,
  photo_url     text not null,
  comment       text not null,
  location_type text check (location_type in ('restaurant', 'home')),
  location_name text,
  is_public     boolean default true,
  created_at    timestamptz default now()
);

-- 2. インデックス
create index if not exists idx_tl_user_id    on timeline_posts(user_id);
create index if not exists idx_tl_created_at on timeline_posts(created_at desc);
create index if not exists idx_tl_is_public  on timeline_posts(is_public);

-- 3. RLS
alter table timeline_posts enable row level security;

drop policy if exists "Allow all reads" on timeline_posts;
create policy "Allow all reads" on timeline_posts
  for select using (true);

drop policy if exists "Allow anon insert" on timeline_posts;
create policy "Allow anon insert" on timeline_posts
  for insert with check (true);

-- ============================================================
-- 4. Supabase Storage: timeline バケット
-- SQL では作成できません。Supabase Dashboard で以下を設定:
--   Storage → New bucket → 名前: "timeline" → Public: ON
--   Policies → INSERT: anon ロールに許可
-- ============================================================

-- 5. sakes テーブルに is_small_brewery カラムが未追加の場合
alter table sakes add column if not exists is_small_brewery boolean default true;
update sakes set is_small_brewery = true where is_small_brewery is null;
