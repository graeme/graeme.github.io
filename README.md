# graeme.github.io

Personal site for [graemearthur.com](https://www.graemearthur.com). Static HTML/CSS/JS (no Jekyll).

## Local preview

From the repo root:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000/](http://localhost:8000/).

## Styles

Compiled CSS is committed at [`css/main.css`](css/main.css). Source lives in [`css/main.scss`](css/main.scss) and [`_sass/`](_sass/).

After editing Sass:

```bash
./build-css
```

Requires Node.js (`npx` downloads the Sass compiler on first run).

## Deploy

Pushed to `main` on this repo; GitHub Pages serves the files as-is (`.nojekyll` disables Jekyll). Custom domain via [`CNAME`](CNAME).
