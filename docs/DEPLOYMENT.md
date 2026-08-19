# Deployment Guide - NyayaSetu Prototype

## 1. Quick Local Development

### Prerequisites
- Node.js 18+ / 20+
- npm or yarn
- Python 3.11+ (Optional, if running Python backend)

### Steps
```bash
# 1. Install frontend dependencies
npm install

# 2. Run local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Production Build

```bash
# Build optimized static bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 3. Deployment to Vercel

1. Connect your GitHub repository `https://github.com/Hix-001/SIH-2026.git` to Vercel.
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Deploy!

---

## 4. Deployment to GitHub Pages

1. In `vite.config.ts`, verify the base path: `base: '/SIH-2026/'` (if deploying to repo subpath) or `'/'` for custom domain.
2. Run:
```bash
npm run build
```
3. Push `dist/` directory or use GitHub Actions workflow for automatic deployment.

---

## 5. Running FastAPI Backend with Docker

```bash
cd backend
docker-compose up --build -d
```
Backend API will be accessible on `http://localhost:8000`.
