# FILL-IN — что вставить перед запуском (5 минут)

Всё правится в одном файле: **`assets/config.js`**. До заполнения сайт живёт и шлёт события, но «Start Trial» не уводит в стор (demo-режим).

---

## Шаг 1. Включить GitHub Pages (1 раз, 2 клика)
Репозиторий → **Settings → Pages** → Source: **Deploy from a branch** → Branch **`main`**, папка **`/ (root)`** → **Save**.
Через ~1 минуту лендинг будет на: `https://luxartpoi.github.io/safe-web2app/`
(EN: `…/safe-web2app/en/`, DE: `…/safe-web2app/de/`)

---

## Шаг 2. Adjust tracker URL  →  `ADJUST_URL`
Это ссылка, которая ведёт в стор и фиксирует, что пользователь пришёл с нашей рекламы (атрибуция).

1. Adjust Dashboard → ваше приложение → **Campaign Lab → Custom Links** (старый UI: «Trackers») → **New link**.
2. Заполнить: **Network** = `google_web2app`, **Campaign** = `web2app_phase1` (adgroup/creative — опц.).
3. Включить редирект в оба стора (iOS → App Store, Android → Google Play) — «smart»/single link с fallback.
4. Скопировать ссылку вида `https://app.adjust.com/xxxxxxx?...` и вставить в `config.js` → `ADJUST_URL`.

💡 Быстрый путь для теста: на странице download у вас уже есть Adjust-ссылки — можно временно взять оттуда (атрибуция будет грубее, но сработает).

---

## Шаг 3. Google Ads conversion  →  `GOOGLE_ADS_ID` + `GOOGLE_ADS_LABEL`
Чтобы Google оптимизировал кампанию под клик «Start Trial» (а не под дешёвые клики).

1. Google Ads → **Tools → Conversions → New conversion → Website**.
2. Цель: **Submit lead form / Custom**; событие — наш `start_trial_click`. Можно «Use Google tag».
3. После создания Google покажет **Conversion ID** (`AW-XXXXXXXXXX`) и **Conversion label** — вставить в `config.js`.
4. (Google-тег у нас грузится автоматически из `app.js`, отдельный код на страницу клеить не нужно — только ID/label.)

> Нужен доступ в Google Ads (пока его нет ни у кого) — этот шаг делает CEO при запуске. До тех пор пейвол шлёт GA4-событие, и кампанию можно стартовать на оптимизацию по кликам.

---

## Итог: в `config.js` заменить
```
ADJUST_URL:        "https://app.adjust.com/…"   // шаг 2
GOOGLE_ADS_ID:     "AW-…"                        // шаг 3
GOOGLE_ADS_LABEL:  "…"                            // шаг 3
```
GA4 (`G-KZWN24KFV7` — отдельное свойство web2app) уже прошит. Оффер/цену при желании меняем там же (`PRICE_YEAR`, `TRIAL_DAYS`) и в тексте `en|de/index.html`.
