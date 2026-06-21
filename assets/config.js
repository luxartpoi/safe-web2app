// ============================================================================
//  ВСТАВЬ СЮДА  (подробности — в FILL-IN.md)
//  Это единственный файл, который нужно отредактировать перед запуском рекламы.
// ============================================================================
window.SAFE_CONFIG = {
  // 1) Adjust-трекеры по платформе — переиспользованы ваши со страницы download
  //    (токены 1x693k60 / 1xnq8bwy), метка кампании заменена на web2app_phase1.
  ADJUST_IOS: "https://app.adjust.com/1x693k60?campaign=web2app_phase1&adgroup=landing&creative=fake_paywall&fallback=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fpasswords-passkeys-safe%2Fid895062927",
  ADJUST_ANDROID: "https://app.adjust.com/1xnq8bwy?campaign=web2app_phase1&adgroup=landing&creative=fake_paywall&fallback=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.safeincloud.free",

  // 2) Google Ads conversion (для оптимизации кампании под клик "Start Trial").
  //    Берётся при создании конверсии в Google Ads (Tools -> Conversions). См. FILL-IN.md шаг 3.
  GOOGLE_ADS_ID: "AW-XXXXXXXXXX",
  GOOGLE_ADS_LABEL: "XXXXXXXXXXXXXXXXXX",

  // 3) GA4 — отдельное свойство web2app (выдал Андрей 21.06). НЕ свойство основного сайта.
  GA4_ID: "G-KZWN24KFV7",

  // Fallback стор-ссылки (пока нет Adjust): кнопка ведёт в нужный стор по платформе.
  // ⚠️ Проверь, что это правильные (подписочные) приложения — есть и легаси «SafeInCloud 1».
  STORE_IOS: "https://apps.apple.com/app/id895062927",
  STORE_ANDROID: "https://play.google.com/store/apps/details?id=com.safeincloud.free",

  // Оффер на пейволе (можно поменять текст здесь же).
  PRICE_YEAR: "$79.99",
  PRICE_MONTH: "$6.67",
  TRIAL_DAYS: 14
};
