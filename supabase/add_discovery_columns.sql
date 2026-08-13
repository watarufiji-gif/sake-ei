-- ============================================================
-- SakeFind: 探索画面（フィルターUI）用の追加カラム
-- 冪等（何度実行しても安全）: 既存データは変更しません
-- Supabase の SQL Editor でそのまま実行してください
--
-- 味わい（甘口/辛口など）は taste_profile(jsonb) を唯一の情報源とし、
-- 別テーブルの flavor_tags は作らない（二重入力防止）。
-- 味わいチップの絞り込みは、これらの新カラムではなく taste_profile を使う。
-- ============================================================

alter table sakes
  add column if not exists serving_temps      text[],   -- 見た目のみ（今回は未配線）: ['cold','room','warm','hot']
  add column if not exists scene_tags         text[],   -- 見た目のみ（今回は未配線）: ['solo','date','friends','family','gift']
  add column if not exists price_band         text,     -- 見た目のみ（今回は未配線）: 'budget' | 'casual' | 'premium' | 'luxury'
  add column if not exists price_720ml        int,      -- 720ml換算の参考価格（円）
  add column if not exists zone               text,     -- 見た目のみ（今回は未配線）: 'hokkaido_tohoku' | 'kanto' | 'chubu_hokuriku' | 'kinki' | 'chugoku_shikoku' | 'kyushu'
  add column if not exists name_en            text,     -- 英語銘柄名
  add column if not exists name_kana          text,     -- 銘柄名の読み仮名
  add column if not exists description_en     text,     -- 英語説明文
  add column if not exists story_en           text;     -- 英語ストーリー文
