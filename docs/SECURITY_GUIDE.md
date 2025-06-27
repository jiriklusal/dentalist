# 🛡️ Dentalist - Security Configuration

This document explains how to protect your Dentalist website from unauthorized access to sensitive files and directories.

## 📁 Protected Files and Directories

### 🚫 **Blocked Files**
- `config.js` - Configuration file with sensitive data
- `script.js` - Main JavaScript functionality
- `sw.js` - Service worker file
- `.htaccess` - Server configuration
- `*.md` - Documentation files
- `*.txt` - Text files (except robots.txt)
- `*.log` - Log files
- `*.json` - JSON configuration files

### 🚫 **Blocked Directories**
- `/docs/` - Documentation folder
- `/.git/` - Git repository data
- `/node_modules/` - Node.js dependencies

### ✅ **Allowed Files**
- `index.html` - Main website file
- `style.css` - Stylesheet
- `/img/*` - Images and assets
- `sitemap.xml` - SEO sitemap
- `robots.txt` - Search engine instructions

## 🔧 Implementation Methods

### 1. **Apache Server (.htaccess)**
```apache
# Place in root directory
# Automatically blocks sensitive files
# Redirects unauthorized requests to index.html
```

### 2. **PHP Server (index.php)**
```php
# Alternative for PHP hosting
# Provides server-side protection
# Handles file access control
```

### 3. **JavaScript Protection (config.js)**
```javascript
# Client-side redirect
# Prevents direct access to config file
# Automatically redirects to index.html
```

### 4. **Search Engine Protection (robots.txt)**
```plaintext
# Prevents search engines from indexing sensitive files
# Blocks crawler access to protected directories
```

## 🚀 Deployment Instructions

### **For Apache Hosting:**
1. Upload `.htaccess` file to root directory
2. Ensure mod_rewrite is enabled
3. Test protected URLs

### **For PHP Hosting:**
1. Upload `index.php` file to root directory
2. Configure server to use index.php as default
3. Test file access protection

### **For Static Hosting (GitHub Pages, Netlify):**
1. Use `_redirects` file (Netlify) or GitHub Pages configuration
2. JavaScript protection in config.js provides basic protection
3. robots.txt prevents search engine indexing

## 🧪 Testing Protection

### **Test These URLs Should Be Blocked:**
- `yoursite.com/config.js` → Should redirect to index.html
- `yoursite.com/docs/` → Should return 403 or redirect
- `yoursite.com/script.js` → Should be blocked
- `yoursite.com/README.md` → Should be blocked

### **Test These URLs Should Work:**
- `yoursite.com/` → Should load index.html
- `yoursite.com/style.css` → Should load stylesheet
- `yoursite.com/img/logo.png` → Should load images
- `yoursite.com/sitemap.xml` → Should load sitemap

## ⚠️ Important Notes

1. **Server Configuration**: Protection level depends on your hosting provider
2. **Client-Side Limits**: JavaScript protection can be bypassed
3. **Server-Side Best**: Use .htaccess or index.php for strongest protection
4. **Regular Testing**: Verify protection after each deployment

## 🔍 Security Headers

Additional security headers included:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📞 Support

For security questions or issues:
- Check your hosting provider's documentation
- Test protection methods after deployment
- Monitor access logs for unauthorized attempts
