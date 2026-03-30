# Freshinnov Labs — Official Company Website

> **Freshinnov Labs (Private) Limited** — Innovation & IT Solutions · Zimbabwe 🇿🇼

## 🌐 Live Site
Deploy instructions below — live at your custom domain or GitHub Pages.

---

## 📁 Project Structure

```
freshinnov-labs/
├── index.html              # Main HTML
├── css/
│   └── style.css           # All styles (dark luxury theme)
├── js/
│   └── main.js             # Particles, magnetic buttons, animations
├── .github/
│   └── workflows/
│       └── deploy.yml      # Auto-deploy to GitHub Pages
└── README.md
```

## 🚀 Deploy to GitHub (3 steps)

### 1. Create GitHub Repo
- Go to **github.com → New Repository**
- Name: `freshinnov-labs`
- Leave it empty (no README, no .gitignore)

### 2. Push Code
```bash
# Extract the ZIP, then:
cd freshinnov-labs
git remote add origin https://github.com/YOUR_USERNAME/freshinnov-labs.git
git push -u origin main
```

### 3. Enable GitHub Pages
- Go to repo **Settings → Pages**
- Source: **GitHub Actions**
- Site goes live at: `https://YOUR_USERNAME.github.io/freshinnov-labs`

### Custom Domain (optional)
- Add a `CNAME` file containing your domain (e.g. `freshinnovlabs.co.zw`)
- Point your domain DNS → GitHub Pages IPs

---

## 🎨 Features

| Feature | Details |
|---------|---------|
| **Particle Canvas** | Animated network in hero background |
| **Custom Cursor** | Glowing cursor with hover states |
| **Magnetic Buttons** | Buttons attract to mouse on hover |
| **3D Device Tilt** | Phone mockup responds to mouse movement |
| **Scroll Animations** | Staggered reveal on all sections |
| **Counter Animation** | Stats animate up when in view |
| **Marquee Ticker** | Scrolling services band |
| **Mobile Menu** | Animated hamburger + overlay menu |
| **Active Nav** | Nav links highlight on scroll |
| **Noise Texture** | Subtle grain overlay for premium feel |
| **Contact Form** | Client-side with success state |

---

## ✏️ Customisation

### Update contact info
Already set in `index.html`:
- Phone: `+263 77 536 4959`  
- Email: `freshinnovlabs@gmail.com`
- WhatsApp: `https://wa.me/263775364959`

### Add real form submission
In `js/main.js`, find the `contactForm` event listener and replace the `setTimeout` with a real API call (Formspree, EmailJS, etc.):

```js
// Replace this block with:
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
});
```

---

## 📱 Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, animations, glassmorphism
- **Vanilla JS** — zero dependencies, fast load
- **Google Fonts** — Cormorant Garamond + Outfit
- **GitHub Actions** — CI/CD auto-deploy

---

## 📞 Contact

**Freshinnov Labs (Private) Limited**  
Harare, Zimbabwe  
📱 +263 77 536 4959  
✉️ freshinnovlabs@gmail.com

© 2026 Freshinnov Labs (Pvt) Ltd
