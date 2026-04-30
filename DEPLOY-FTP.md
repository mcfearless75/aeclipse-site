# Deploying to AEclipse FTP / IIS

## What you need
- WinSCP (free, already installed based on the screenshot)
- These connection details from the client:
  - **Protocol:** FTP with TLS/SSL Explicit encryption
  - **Host:** `ft.aeclipse.co.uk`
  - **Port:** `21`
  - **User:** `FTPGuest`
  - **Password:** `A3cl1pse/*`
  - **Remote directory:** `/AEclipse.Marketing`

## Step-by-step (WinSCP)

1. **Open WinSCP** → New Session.
2. Punch in the details above and click **Login**.
   - If TLS prompts about the server certificate, click **Yes** (their host).
3. Once connected, on the right side navigate to `/AEclipse.Marketing/`.
4. On the left side navigate to:
   `C:\Users\LAPTOP80\Desktop\_Apps_Code\ALL APPS\aeclipse`
5. Select these and **only these** items, then drag them across to the right pane:
   - `index.html`
   - `platform.html`
   - `services.html`
   - `flexibility.html`
   - `pricing.html`
   - `team.html`
   - `testimonials.html`
   - `contact.html`
   - `jobs.html`
   - `privacy.html`
   - `modern-slavery.html`
   - `404.html`
   - `web.config`
   - `sitemap.xml`
   - `robots.txt`
   - `Aeclipselogo.png`
   - the entire `assets/` folder
6. **Skip** these (they shouldn't be uploaded):
   - `.git/`, `.gitignore`, `.gitattributes`
   - `.claude/`, `.claude-flow/`, `.swarm/`, `.hive-mind/`, `.superpowers/`
   - `docs/`
   - `node_modules/` (if it exists)
   - `README.md`, `DEPLOY-FTP.md` (these are for you, not the live site)
   - `.nojekyll` (GitHub Pages only)
7. Wait for the upload to finish.
8. Reply to the client: **"Files are uploaded to /AEclipse.Marketing/ — please point IIS to that folder."**

## Test it

The client said `www.foregate.co.uk` already points there (no SSL). Open that URL in a browser. You should see the AEclipse site live.

If something looks broken:
- White page or 500 error → IIS doesn't know about `web.config`. Ask them to enable IIS URL Rewrite + Static Compression modules.
- Images missing → Check the `assets/images/` folder uploaded fully.
- Fonts/CSS look default → Hard refresh (Ctrl+F5).

## After live URL is confirmed

Once the client confirms it works on `www.foregate.co.uk`, they'll point `www.aeclipse.co.uk` and `aeclipse.co.uk` at the same folder and arrange SSL.

## Future updates

When the client requests changes:
1. Make the edits locally + push to GitHub (already automated).
2. Open WinSCP, connect, drag the changed files across (overwrite).
3. Done.

## Pro-tip — sync with WinSCP

In WinSCP top menu: **Commands → Synchronize → Remote** with mode **"Local → Remote"**. Point it at this folder, exclude the dev directories listed above. It only uploads files that have changed. One click in future.
