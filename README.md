# SafeInCloud — web2app MVP (лендинг + фейк-пейвол)

Первый эксперимент канала web-to-app (фаза 1). Копирует consumer-угол RoboForm: короткий лендинг → экран **«Try Safe for Free»** (как наш Adapty-пейвол) → клик **Start Trial** = веб-конверсия для Google Ads → переход в стор через Adjust.

**Зачем «фейк»-пейвол:** меряем спрос (жмут ли кнопку) на вебе, без мобильного кода / Paddle / Firebase. Кликнувший уходит в стор и видит настоящий пейвол уже в приложении.

## Структура
```
index.html        — редирект по языку браузера → /en/ или /de/
en/index.html      — лендинг + пейвол (English)
de/index.html      — лендинг + пейвол (Deutsch)
assets/style.css   — стили (mobile-first)
assets/app.js      — логика: пейвол, конверсия, переход в стор
assets/config.js   — ВСЕ настройки/ключи (единственный файл для правки)
FILL-IN.md         — что и куда вставить перед запуском
```

## Поток
Реклама (Google Search) → `/{lang}/` лендинг → «Start Free Trial» открывает пейвол → «Start My Free Trial»:
1. шлёт **Google Ads conversion** + GA4-событие `start_trial_click`;
2. редиректит в App Store / Google Play через **Adjust** (с атрибуцией).

## Деплой (GitHub Pages)
Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / `/ (root)` → Save.
Через ~1 мин сайт на `https://luxartpoi.github.io/safe-web2app/`.

## Перед запуском рекламы
Заполнить 2 ключа в `assets/config.js` — см. **FILL-IN.md**. До заполнения пейвол работает в demo-режиме (события шлёт, в стор не уводит).
