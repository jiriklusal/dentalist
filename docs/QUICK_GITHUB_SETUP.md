# ⚡ Rychlý návod - GitHub Pages nasazení

## 🚀 Krok za krokem

### 1. Nahrajte projekt na GitHub
```bash
git init
git add .
git commit -m "Initial commit - Dentalist website"
git branch -M main
git remote add origin https://github.com/VASE_UZIVATELSKE_JMENO/dentalist.git
git push -u origin main
```

### 2. Aktivujte GitHub Pages
1. Jděte na váš GitHub repozitář
2. **Settings** → **Pages**
3. **Source**: "GitHub Actions" (ne "Deploy from branch")
4. Uložte

### 3. Automatické nasazení
- GitHub Actions workflow (`.github/workflows/deploy.yml`) se spustí automaticky
- Automaticky změní `DEBUG_MODE = true` na `DEBUG_MODE = false`
- Nasadí web na adresu: `https://VASE_UZIVATELSKE_JMENO.github.io/dentalist`

## ✅ Hotovo!

Web je nyní nasazen v produkčním módu s:
- ✅ reCAPTCHA aktivní
- ✅ Test tlačítko skryté  
- ✅ Debug zprávy vypnuté

## 🔄 Při dalších změnách

Stačí pushovat změny:
```bash
git add .
git commit -m "Update website"
git push origin main
```

GitHub Actions automaticky nasadí novou verzi v produkčním módu.
