# franklinharvey.github.io

Personal site: [Eleventy](https://www.11ty.dev/) static site, deployed to GitHub Pages.

## Local development

```bash
yarn install
yarn start
```

Build output is written to `_site/`.

```bash
yarn build
```

## GitHub Pages

This repo uses **GitHub Actions** to build and deploy (Eleventy is not Jekyll). After pushing to `master`:

1. In the repository **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. The workflow in `.github/workflows/deploy.yml` runs `yarn install --frozen-lockfile`, `yarn build`, and publishes `_site`.

The [`src/CNAME`](src/CNAME) file is copied into the build so the custom domain keeps working.

## Blog (including photo posts)

Add Markdown under [`src/blog/posts/`](src/blog/posts/). Directory data in [`posts.json`](src/blog/posts/posts.json) sets layout and permalinks. Front matter: `title`, `date` (ISO `YYYY-MM-DD`).

For a post with images, use a folder next to the file or put assets in a subfolder, then reference them with the `image` shortcode (paths are relative to the `.md` file):

```markdown
{% image "./my-photo.jpg", "Alt text for accessibility" %}

*Visible caption in markdown below the image.*
```

You can also use HTML `<figure>` / `<figcaption>` around the shortcode if you prefer.

Images are processed at build time by [`@11ty/eleventy-img`](https://www.11ty.dev/docs/plugins/image/) (responsive AVIF/WebP/JPEG, lazy loading).

## Repo size

Large originals inflate the repo and slow clones. Prefer reasonable JPEG exports in-repo; keep RAW masters elsewhere or use Git LFS if you must version huge sources.
