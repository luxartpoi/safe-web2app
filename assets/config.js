// ============================================================================
//  ВСТАВЬ СЮДА  (подробности — в FILL-IN.md)
//  Это единственный файл, который нужно отредактировать перед запуском рекламы.
// ============================================================================
window.SAFE_CONFIG = {
  // 1) Умная Adjust-ссылка (сама редиректит в App Store / Google Play по платформе).
  //    Создаётся в Adjust: Campaign Lab -> Custom Links. См. FILL-IN.md шаг 2.
  ADJUST_URL: "PASTE_ADJUST_TRACKER_URL",

  // 2) Google Ads conversion (для оптимизации кампании под клик "Start Trial").
  //    Берётся при создании конверсии в Google Ads (Tools -> Conversions). См. FILL-IN.md шаг 3.
  GOOGLE_ADS_ID: "AW-XXXXXXXXXX",
  GOOGLE_ADS_LABEL: "XXXXXXXXXXXXXXXXXX",

  // 3) GA4 — уже ваш, менять не надо.
  GA4_ID: "G-MXRMB3HQKP",

  // Fallback стор-ссылки (пока нет Adjust): кнопка ведёт в нужный стор по платформе.
  // ⚠️ Проверь, что это правильные (подписочные) приложения — есть и легаси «SafeInCloud 1».
  STORE_IOS: "https://apps.apple.com/app/id895062927",
  STORE_ANDROID: "https://play.google.com/store/apps/details?id=com.safeincloud.free",

  // Оффер на пейволе (можно поменять текст здесь же).
  PRICE_YEAR: "$79.99",
  PRICE_MONTH: "$6.67",
  TRIAL_DAYS: 14
};
