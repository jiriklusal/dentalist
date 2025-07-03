# Dentalist - Deployment Guide

## Automatické nasazení z Private GitHub Repository

### 1. GitHub Pages (nejjednodušší)
1. Push kód do private GitHub repo
2. Settings → Pages → Source: Deploy from branch → main
3. Web dostupný na: `username.github.io/dentalist`

### 2. Netlify (doporučené)
1. [netlify.com](https://netlify.com) → New site → Import from Git
2. Vyberte private GitHub repo
3. Build settings: 
   - Build command: (prázdné)
   - Publish directory: `/` (root)
4. Deploy!

### 3. Vercel
1. [vercel.com](https://vercel.com) → New Project → Import Git Repository
2. Vyberte private repo
3. Framework Preset: Other
4. Deploy!

### 4. Cloudflare Pages
1. [pages.cloudflare.com](https://pages.cloudflare.com) → Create project
2. Connect to Git → GitHub → private repo
3. Framework preset: None
4. Deploy!

## Workflow
```bash
# Úprava kódu
git add .
git commit -m "Update website"
git push origin main

# → Automatické nasazení (30-60 sekund)
```

## ⚡ Build Requirements
**Vaše Dentalist stránky jsou statické HTML/CSS/JS soubory:**
- ❌ **ŽÁDNÉ BUILDOVÁNÍ** potřebné
- ✅ **Přímé nasazení** souborů na CDN
- ✅ **0 build minutes** spotřebováno
- ✅ **Rychlejší nasazení** (10-30 sekund)

### Build Minutes Usage:
| Platforma | Vaše spotřeba | Zdarma limit |
|-----------|---------------|--------------|
| GitHub Pages | 0 minut | ∞ |
| Netlify | 0 minut | 300/měsíc |
| Vercel | 0 sekund | 6000/měsíc |
| Cloudflare | 0 buildů | 500/měsíc |

**→ Nikdy nevyčerpáte free tier limity!**

## Custom Domain
Všechny platformy podporují vlastní doménu zdarma:
- Přidejte CNAME record: `www.dentalist.cz → platform-url`
- Nebo A record pro root doménu

## SSL Certificate
- ✅ Automaticky vygenerované na všech platformách
- ✅ Zdarma Let's Encrypt certifikáty
- ✅ Automatické obnovení
