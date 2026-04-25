-- ============================================================
-- SakeFind: sakes テーブル作成 & サンプルデータ投入
-- Supabase SQL Editor でそのまま実行してください
-- ============================================================

-- 1. テーブル作成
create table if not exists sakes (
  id                bigserial primary key,
  name              text not null,
  brewery           text,
  prefecture        text,
  type              text,
  taste_profile     jsonb,
  description       text,
  image_url         text,
  ec_url            text,
  is_small_brewery  boolean default true,  -- 年間200石以下の小規模蔵元フラグ
  created_at        timestamptz default now()
);

-- 既存データをいったん削除（再実行時の重複防止）
truncate table sakes restart identity;

-- 2. インデックス（フィルター・味わい検索の高速化）
create index if not exists idx_sakes_type         on sakes(type);
create index if not exists idx_sakes_prefecture   on sakes(prefecture);
create index if not exists idx_sakes_taste_profile on sakes using gin(taste_profile);

-- 3. RLS: 読み取りはパブリックに開放
alter table sakes enable row level security;

drop policy if exists "Public read" on sakes;
create policy "Public read" on sakes
  for select using (true);

-- ============================================================
-- 4. サンプルデータ（8銘柄 / すべて架空）
-- 年間200石以下の小規模蔵元をイメージした架空の銘柄
-- taste_profile: umami旨味 / acid酸味 / sweet甘み / bitter苦味 / rich濃醇
-- 各項目 1〜5 のスコア
-- ============================================================
insert into sakes (name, brewery, prefecture, type, taste_profile, description, image_url, ec_url, is_small_brewery) values

('雪むすめ',
 '白嶺酒造', '山形県', '純米大吟醸',
 '{"umami":2,"acid":2,"sweet":5,"bitter":1,"rich":2}',
 '出羽三山の伏流水と地元農家が育てた「雪化粧」を45%まで磨いて仕込む。口に含んだ瞬間に広がる白桃のような甘みとほのかな花の香りが特徴。年間仕込み量わずか80石の小蔵が、冬季限定で醸す一本。',
 null, null, true),

('霧の番人',
 '笹倉酒造', '長野県', '純米吟醸',
 '{"umami":4,"acid":3,"sweet":3,"bitter":2,"rich":3}',
 '標高900メートルの山村に佇む蔵が、早朝の霧に包まれながら醸す純米吟醸。地元産「美山錦」を55%精米し、低温でゆっくり発酵させた。穏やかな吟醸香と柔らかな旨みが余韻まで続く食中酒。',
 null, null, true),

('土佐の碧',
 '月ノ浦酒造', '高知県', '純米',
 '{"umami":3,"acid":4,"sweet":2,"bitter":3,"rich":3}',
 '土佐湾を望む崖沿いの小蔵が地下100メートルから汲み上げる硬水で醸す。酵母無添加の山廃仕込みで生まれる乳酸由来のキレのある酸味と、黒麹ならではのコクが特徴。炭火焼きの魚介との相性が群を抜く。',
 null, null, true),

('朝靄 特別純米',
 '奥出雲杜氏の宿', '島根県', '特別純米',
 '{"umami":5,"acid":2,"sweet":3,"bitter":2,"rich":4}',
 '奥出雲の棚田米「仁多米コシヒカリ」を60%精米。蔵人が全員地元出身という小所帯の蔵で、昔ながらの木桶仕込みを守り続ける。炊き立てご飯を思わせる濃厚な旨みと、燗にすると一段と膨らむ奥行きが魅力。',
 null, null, true),

('鷹の目',
 '岩鷹酒造', '岩手県', '本醸造',
 '{"umami":3,"acid":2,"sweet":1,"bitter":4,"rich":3}',
 '北上山地の伏流水を使い、南部杜氏の技法を忠実に受け継ぐ老舗小蔵の定番酒。精米歩合65%の本醸造ながら雑味のないすっきりした辛口に仕上がり、冷やしても燗にしても鋭いキレを保つ。地元飲食店の定番として長年愛用される。',
 null, null, true),

('深緑 純米吟醸',
 '御嶽小蔵', '岐阜県', '純米吟醸',
 '{"umami":4,"acid":3,"sweet":3,"bitter":2,"rich":4}',
 '御嶽山麓の湧水と飛騨産「ひだほまれ」を50%まで磨いて醸す。果実感と旨みが重なり合うふくよかな味わいで、燗酒にすると旨みがさらに開く。年間仕込み量130石、県内数軒の酒屋のみで扱う希少な一本。',
 null, null, true),

('朧 純米',
 '千峰酒造', '兵庫県', '純米',
 '{"umami":4,"acid":4,"sweet":2,"bitter":3,"rich":4}',
 '播磨平野の酒米産地に位置しながら、あえて地元農家契約栽培の「兵庫北錦」70%精米で勝負する。生酛造りで仕込んだ乳酸の骨格ある酸と、深みのある旨みが拮抗するドライな純米。年間100石未満、蔵出し量が極めて少ない。',
 null, null, true),

('夕凪ひと吹き',
 '浦波酒造', '愛媛県', '純米大吟醸',
 '{"umami":2,"acid":3,"sweet":4,"bitter":1,"rich":2}',
 '瀬戸内海に面した小港町の蔵が、海風の通り抜ける蔵内で低温熟成させる純米大吟醸。松山三井を40%まで磨き、柑橘を思わせる爽やかな香りと透明感のある甘みを引き出した。年間仕込み量70石、地元限定流通の幻の一本。',
 null, null, true);
