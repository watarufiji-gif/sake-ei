// このファイルをコピーして config.js にリネームし、各キーを入力してください
// $ cp config.example.js config.js
// ※ config.js は .gitignore 済みです。キーを絶対に Git にコミットしないでください。
window.SAKEFIND_CONFIG = {

  // ── 必須 ─────────────────────────────────────────────
  // Supabase（おすすめ銘柄・タイムライン・マップ店舗リスト・ログイン）
  // 取得先: https://supabase.com/dashboard → プロジェクト → Settings → API Keys
  // 無料プランは一定期間アクセスがないと自動停止（Paused）します。
  // 「接続できません」エラーが出たらダッシュボードから Restore してください。
  SUPABASE_URL:        'https://your-project.supabase.co',
  SUPABASE_KEY:        'your-supabase-publishable-key', // publishable (anon) key

  // ── 任意（未設定でも該当機能以外は動作します）──────────
  // Google Maps（マップ表示。未設定でも店舗リストは利用可能）
  // 取得先: https://console.cloud.google.com/ → Maps JavaScript API
  // 必ず HTTP リファラ制限を設定してください。
  GOOGLE_MAPS_API_KEY: 'your-google-maps-api-key',

  // OpenAI（ラベルスキャン・メニュー解析。未設定時はスキャン機能が無効表示）
  // 取得先: https://platform.openai.com/api-keys
  OPENAI_API_KEY:      'your-openai-api-key',

  // Anthropic（将来の AI 診断強化用。現在の診断はクライアントサイドで完結）
  // 取得先: https://console.anthropic.com/
  ANTHROPIC_API_KEY:   'your-anthropic-api-key',

  // Perplexity（銘柄情報の補完。任意）
  // 取得先: https://www.perplexity.ai/settings/api
  PERPLEXITY_API_KEY:  'your-perplexity-api-key',
};
