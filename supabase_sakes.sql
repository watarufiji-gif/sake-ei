-- ============================================================
-- SakeFind: sakes テーブル作成 & 実在蔵元データ投入
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
  is_small_brewery  boolean default true,
  created_at        timestamptz default now()
);

-- 既存データをいったん削除（再実行時の重複防止）
truncate table sakes restart identity;

-- 2. インデックス（フィルター・味わい検索の高速化）
create index if not exists idx_sakes_type          on sakes(type);
create index if not exists idx_sakes_prefecture    on sakes(prefecture);
create index if not exists idx_sakes_taste_profile on sakes using gin(taste_profile);

-- 3. RLS: 読み取りはパブリックに開放
alter table sakes enable row level security;

drop policy if exists "Public read" on sakes;
create policy "Public read" on sakes
  for select using (true);

-- ============================================================
-- 4. 実在する精鋭酒蔵データ（8銘柄）
-- taste_profile: umami旨味 / acid酸味 / sweet甘み / bitter苦味 / rich濃醇
-- 各項目 1〜5 のスコア
-- ============================================================
insert into sakes (name, brewery, prefecture, type, taste_profile, description, image_url, ec_url, is_small_brewery) values

('射美 純米吟醸',
 '杉原酒造', '岐阜県', '純米吟醸',
 '{"umami":4,"acid":3,"sweet":4,"bitter":1,"rich":3}',
 '年間わずか20石、日本一小さな酒蔵として知られる杉原酒造の代表銘柄。杉原家が家族だけで醸す完全家族経営の蔵で、揖斐郡池田町産の酒米にこだわり少量仕込みを続ける。口当たりは柔らかく、果実のような甘みと穏やかな旨みが溶け合う。幻の酒として酒通の間で長年語り継がれる一本。',
 null, 'https://www.sugiharasake.jp/', true),

('御湖鶴 純米吟醸',
 '菱友醸造', '長野県', '純米吟醸',
 '{"umami":4,"acid":3,"sweet":3,"bitter":2,"rich":4}',
 '2017年に一度廃業した諏訪の老舗蔵が、地元有志の支援を得て諏訪御湖鶴酒造場として復活。「御湖鶴」ブランドを引き継ぎ、諏訪湖の澄んだ水と信州産酒米で少量醸造を続ける。復活の物語と共に注目を集め、旨みと酸のバランスが取れた端正な味わいが特徴。',
 null, 'https://www.mikotsuru.com/', true),

('よこやま SILVER',
 '重家酒造', '長崎県', '純米吟醸',
 '{"umami":3,"acid":3,"sweet":4,"bitter":1,"rich":3}',
 '壱岐島の重家酒造が、23年間途絶えていた日本酒醸造を2013年に復活させた銘柄。麦焼酎の名産地・壱岐で挑んだ日本酒は、島の清冽な水と温暖な気候が生む柔らかな甘みと爽やかな酸が調和した飲みやすい仕上がり。「SILVER」は純米吟醸の定番ライン。',
 null, 'https://www.omoyashuzo.com/', true),

('田光 純米吟醸',
 '早川酒造', '三重県', '純米吟醸',
 '{"umami":4,"acid":2,"sweet":3,"bitter":2,"rich":4}',
 '三重県菰野町の山間に佇む早川酒造は、父・弘文氏と息子・泰地氏が二人三脚で醸す純粋な家族経営の蔵。契約農家が育てた地元産米にこだわり、丁寧な少量仕込みで柔らかく深みのある旨みを引き出す。派手さはないが飲むほどに味わいの奥行きが感じられる食中酒。',
 null, 'https://hayakawa-syuzo.com/', true),

('石鎚 純米吟醸',
 '石鎚酒造', '愛媛県', '純米吟醸',
 '{"umami":3,"acid":2,"sweet":3,"bitter":2,"rich":3}',
 '西日本最高峰・石鎚山の伏流水が育む超軟水を用い、愛媛の地元杜氏が丹念に醸す純米吟醸。軟水仕込みならではのきめ細かで滑らかな口当たりと、料理の味を引き立てる穏やかな旨みが特徴。燗酒でも本領を発揮する万能な食中酒として県内外で根強い人気を誇る。',
 null, 'https://www.ishizuchi.co.jp/', true),

('伊予賀儀屋 純米',
 '成龍酒造', '愛媛県', '純米',
 '{"umami":4,"acid":3,"sweet":2,"bitter":2,"rich":4}',
 '愛媛県西条市の小蔵・成龍酒造が丁寧に醸す純米酒。地元・西条の湧き水「うちぬき」の超軟水を生かした繊細な口当たりと、米の旨みをじっくり引き出した奥深い味わいが身上。地域密着の経営のもと、地元酒米と地元の水で誠実に造り続ける愛媛を代表する精鋭酒蔵の一本。',
 null, 'https://www.seiryosyuzo.com/', true),

('大号令 純米',
 '馬上酒造', '広島県', '純米',
 '{"umami":5,"acid":2,"sweet":2,"bitter":3,"rich":5}',
 '130年以上の歴史を持ちながら廃業寸前まで追い込まれた馬上酒造が、地域の力を借りて復活を遂げた渾身の純米酒。広島の軟水を活かしながらもあえてどっしりとした旨みと濃醇な味わいを追求。燗で飲むと旨みと甘みが一段と膨らみ、料理を選ばずに寄り添う骨格のある酒。',
 null, null, true),

('光栄菊',
 '光栄菊酒造', '佐賀県', '純米',
 '{"umami":3,"acid":4,"sweet":4,"bitter":1,"rich":2}',
 '2019年に廃業した佐賀の老舗蔵を、酒造りの素人だった一般人が引き継ぎ復活させた異色の経歴を持つ蔵。フレッシュな果実味と心地よい酸が際立つ軽やかなスタイルは、日本酒初心者から愛好家まで広く支持される。インスタグラムを中心に情報発信し、SNS世代の日本酒ファンを開拓する新世代の精鋭酒蔵。',
 null, null, true);
