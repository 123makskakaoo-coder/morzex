# MORZEX — сайт команды

**Сайт:** https://123makskakaoo-coder.github.io/morzex/

Одностраничный сайт киберспортивной команды MORZEX по Standoff 2.
Чистые HTML/CSS/JS без сборки — идеально для GitHub Pages.

## Структура

```
index.html           — вся страница
css/style.css        — стили
js/main.js           — звёздный фон, меню, анимации, заявка в Telegram
assets/logo.jpg      — логотип команды (аватар)
assets/players/      — фото игроков
```

## Локальный просмотр

Просто открой `index.html` в браузере или запусти локальный сервер:

```bash
python -m http.server 8080
```

и перейди на `http://localhost:8080`.

## Публикация на GitHub Pages

1. Создай на GitHub **публичный** репозиторий, например `morzex` (без README).
2. Загрузи в него все файлы сайта из этой папки (`index.html`, `css/`, `js/`, `assets/`).
3. Открой **Settings → Pages**.
4. В блоке **Build and deployment** выбери:
   - Source: **Deploy from a branch**
   - Branch: **main**, папка **/ (root)**
5. Нажми **Save** и подожди 1–2 минуты.

Сайт откроется по адресу:

```
https://<твой-ник>.github.io/morzex/
```

### Через git, если удобнее

```bash
git init
git add .
git commit -m "MORZEX team site"
git branch -M main
git remote add origin https://github.com/<твой-ник>/morzex.git
git push -u origin main
```

Дальше включи GitHub Pages как в шагах 3–5.

## Что менять, когда появится состав

### Игроки
В `index.html` найди секцию `id="roster"`. Каждая карточка — это:

```html
<article class="player reveal">
  <div class="player__avatar" aria-hidden="true">?</div>
  <h3 class="player__name">Свободный слот</h3>
  <p class="player__role">Капитан (IGL)</p>
  <span class="player__tag">Набор открыт</span>
</article>
```

Замени `Свободный слот` на ник, роль оставь или поменяй.
Если хочешь фото игрока — замени `<div class="player__avatar">?</div>` на
`<img class="player__avatar player__avatar--photo" src="assets/players/ник.jpg" alt="ник">`
(фото обрезается по кругу автоматически).

Занятый слот оформляется карточкой `player--filled` с ID, возрастом и контактами:

```html
<article class="player player--filled reveal">
  <div class="player__avatar" aria-hidden="true">K</div>  <h3 class="player__name">kyosuke</h3>
  <p class="player__role">Рифлер</p>
  <p class="player__meta">ID 85149861 · 14 лет · опыт 5 лет</p>
  <p class="player__links">
    <span>DS r_o_p_z</span>
    <a href="https://t.me/Dkdksiws123" target="_blank" rel="noopener">TG @Dkdksiws123</a>
  </p>
  <span class="player__tag player__tag--active">В составе</span>
</article>
```

### Контакты и заявки
Заявки уходят в Telegram **@wonnd2**: форма в секции `id="join"` собирает текст
(ник, ID, возраст, опыт, звание, роль, Discord, Telegram) и открывает чат
с готовым сообщением. Получатель задан в двух местах:

- `js/main.js` — `const url = "https://t.me/wonnd2?text=..."`
- `index.html` — ссылки `https://t.me/wonnd2` (форма и подвал)

Чтобы сменить получателя, замени `wonnd2` в этих местах.

### Матчи и клан
Расписание живёт в секции `id="matches"` (`index.html`): ближайший матч,
результаты и баннер клана. Когда появится соперник и дата — замени
`Дата TBA`, `Соперник TBA` и текст заметки.

Ссылка на клан в Standoff 2:
`https://link.standoff2.com/ru/clan/view/MZEX` — она стоит в хиро, в баннере
матчей и в подвале (`S2`). Меняй её во всех этих местах.

### Соцсети в подвале
В `footer` замени `<span class="social">TG</span>` на ссылки:

```html
<a class="social" href="https://t.me/ник" aria-label="Telegram">TG</a>
```

### Логотип
Замени `assets/logo.jpg` своим файлом (квадратное изображение).
Если формат другой (png/webp) — обнови путь в `index.html` и в `<link rel="icon">`.

## Примечания

- Шрифты (Unbounded, Rubik) подгружаются с Google Fonts — нужен интернет.
- Сайт адаптивный: телефон, планшет, десктоп.
- Кнопка «Отправить заявку в Telegram» работает без сервера: собирает текст
  из формы и открывает чат @wonnd2 с готовым сообщением — остаётся нажать «Отправить».
