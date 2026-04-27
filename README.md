# AEclipse — Auto Enrolment Consultancy Website

Static site, GitHub Pages ready. No build step, no frameworks, no dependencies.

## Stack
- Pure HTML / CSS / vanilla JS
- Plus Jakarta Sans (Google Fonts)
- Formspree for contact forms (`https://formspree.io/f/maqazvan`)

## Pages
- `index.html` — Home
- `platform.html` — The Platform
- `services.html` — Services
- `flexibility.html` — Flexibility
- `pricing.html` — Pricing
- `team.html` — Our Team
- `testimonials.html` — Case studies
- `contact.html` — Contact + form
- `jobs.html` — Careers
- `privacy.html` — Privacy Policy
- `404.html` — Not found page

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `aeclipse-site`).
2. Initialise git locally and push:
   ```bash
   git init
   git add .
   git commit -m "feat: AEclipse site revamp"
   git branch -M main
   git remote add origin https://github.com/<your-username>/aeclipse-site.git
   git push -u origin main
   ```
3. In your GitHub repo, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, select **main** + **/ (root)**, and Save.
5. Wait ~1 minute. Site will be live at `https://<your-username>.github.io/aeclipse-site/`.

## Custom domain (`www.aeclipse.co.uk`)
1. In **Settings → Pages → Custom domain**, enter `www.aeclipse.co.uk` and Save.
2. At your DNS provider, add a `CNAME` record for `www` pointing to `<your-username>.github.io`.
3. Add four `A` records on the apex `aeclipse.co.uk` pointing to GitHub Pages IPs:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
4. Wait for DNS propagation (~10 min – 24 hr).
5. Tick **Enforce HTTPS** in repo settings.

## Files
- `assets/css/style.css` — Design system (CSS variables, components, utilities)
- `assets/js/main.js` — Vanilla JS (navbar, scroll reveal, stat counters, carousel, form handler)
- `assets/images/` — All site imagery (logos, team photos, payroll/pension/client logos, testimonial image)
- `assets/logos/` — Partner logos (AbsorbHR)
- `Aeclipselogo.png` — Master logo (also referenced from /assets/images/)
- `.nojekyll` — Tells GitHub Pages to skip Jekyll processing
- `sitemap.xml` / `robots.txt` — SEO basics

## Brand
- Deep purple gradient (`#1a0a2e → #3d1a6b → #5b2d8e`)
- Dark glassmorphism design language
- Plus Jakarta Sans typography
- Animations respect `prefers-reduced-motion`

## Image attributions
All images sourced from the original `aeclipse.co.uk` site.
