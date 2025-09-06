# Alex Forsyth's Portfolio Website

Source code for Alex Forsyth's portfolio website

[![Visit Live Site](https://img.shields.io/badge/Visit%20Live%20Site-222224?style=for-the-badge)](https://forsyth-os.github.io/)

### Source Information

This website is built with

- [SvelteKit (Frontend Framework)](https://kit.svelte.dev/)
- [Slickscroll (Scroll Effects)](https://github.com/alexforsyth1/slickscrolljs)
- [Anime (Animations)](https://github.com/juliangarnier/anime)
- [Three.js (3D Effects)](https://github.com/mrdoob/three.js/)
- [GitHub Pages (Hosting)](https://pages.github.com/)

### Developing

The site is just a regular SvelteKit project, with ssr disabled.

For development, start the vite development server:

```bash
npm run dev
```

*Note: Due to migration from Rollup, HMR breaks the site. You have to do a full reload if you modify any components or TS files.*

For production, build the site:

```bash
npm run build
```