# 🚀 Setup & Installation Guide

## Complete Step-by-Step Setup

### System Requirements
- **OS**: Windows, macOS, or Linux
- **Node.js**: v16 or higher
- **npm**: v8 or higher (comes with Node.js)
- **Disk Space**: ~500 MB for node_modules
- **RAM**: 2GB minimum

Verify installations:
```bash
node --version    # Should be v16+
npm --version     # Should be v8+
```

---

## Installation Steps

### Step 1: Prerequisites
If Node.js is not installed:
- **Windows**: Download from https://nodejs.org/ (LTS version)
- **macOS**: `brew install node`
- **Linux (Ubuntu/Debian)**: `sudo apt install nodejs npm`

### Step 2: Navigate to Project
```bash
cd /workspaces/PineMap
# or wherever your project is located
```

### Step 3: Install Dependencies
```bash
npm install
```

This reads `package.json` and installs:
- React 18.2.0
- Leaflet 1.9.4
- react-leaflet 4.2.1
- Vite 4.3.0 (dev dependency)

**Expected Output**:
```
added 200+ packages in ~45s
```

If you see dependency warnings, they're usually safe for development.

### Step 4: Start Development Server
```bash
npm run dev
```

**Expected Output**:
```
  VITE v4.3.x  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

The browser should open automatically at `http://localhost:5173`

If it doesn't, manually visit the URL above.

### Step 5: Verify Installation
You should see:
- ✅ A map centered on Bukidnon
- ✅ 8 colored farm markers
- ✅ Control panel on the right with filters
- ✅ Blue "+" FAB button in bottom-right
- ✅ No console errors

---

## Troubleshooting

### Issue: "npm: command not found"
**Solution**: Node.js not installed
```bash
# Install Node.js
# Visit https://nodejs.org/ or use package manager
node --version  # Verify
```

### Issue: Port 5173 already in use
**Solution**: Kill the process or use different port
```bash
# Kill existing process (macOS/Linux)
lsof -ti :5173 | xargs kill -9

# Kill existing process (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 5174
```

### Issue: "react is not defined" error
**Solution**: Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Map not showing / blank page
**Troubleshooting**:
1. Open DevTools (`F12`) → Console tab
2. Check for errors
3. Try hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
4. Clear cache: Settings → Clear browsing data

### Issue: localStorage not working
**Solution**: Private/Incognito mode disables localStorage
1. Use normal browsing mode
2. Or check browser privacy settings
3. Check that localStorage is enabled in DevTools → Application

### Issue: Markers not showing color
**Causes**: 
- SVG rendering issue (rare)
- CSS not loaded properly

**Solution**:
```javascript
// In browser console
localStorage.clear()
location.reload()
```

---

## First-Time Usage

### Add Your First Farm
1. Click the blue **+** button (bottom-right)
2. Button turns red and map shows "Click to add"
3. Click anywhere on the map
4. Fill in the form:
   - **Farm Name**: Required
   - **Description**: Required
   - **Status**: Choose from dropdown
   - **Dates**: Optional
5. Click **Add Farm**
6. New farm appears as colored marker

### Test Features
- **Filter**: Click "Active", "Harvesting", "Idle" to filter
- **Zoom**: Scroll wheel or +/- buttons
- **Pan**: Click and drag map
- **Popup**: Click any marker
- **Stats**: Panel shows Total vs Displayed farms

---

## Verification Checklist

Complete these checks after setup:

- [ ] npm install completed without major errors
- [ ] `npm run dev` starts server successfully
- [ ] Browser opens to http://localhost:5173
- [ ] Map displays with OSM tiles
- [ ] 8 farm markers visible (various colors)
- [ ] Control panel shows "8 Total Farms"
- [ ] Click filter button changes displayed farms
- [ ] Click marker shows popup with farm details
- [ ] Can add new farm (click + → click map → fill form)
- [ ] New farm persists after page refresh
- [ ] Console shows no errors (F12)

---

## Building for Production

### Create Optimized Build
```bash
npm run build
```

**What it does**:
- Minifies code (JavaScript, CSS)
- Optimizes bundle (~200KB)
- Creates `dist/` folder
- Ready for deployment

**Output**:
```
dist/
├── index.html
├── assets/
│   ├── index-abc123.js
│   └── index-def456.css
```

### Test Production Build Locally
```bash
npm run preview
```

Opens optimized version at http://localhost:4173

---

## Deployment Options

### Option 1: Vercel (Recommended - Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
# Follow prompts, select project folder
```

### Option 2: Netlify (Free)
```bash
# Build first
npm run build

# Upload 'dist' folder to Netlify Drop:
# https://app.netlify.com/drop
```

### Option 3: GitHub Pages
```bash
# Add to package.json
"build": "vite build --base=/PineMap/"

# Build
npm run build

# Deploy dist/ folder
```

### Option 4: Traditional Server
```bash
# Build
npm run build

# Copy dist/ to server
# Serve with any static server (nginx, Apache, Node express)
```

---

## Environment Setup for Teams

### .env Configuration (Optional)
Create `.env.local`:
```bash
VITE_APP_TITLE="Bukidnon Pineapple GIS"
VITE_MAP_DEFAULT_ZOOM=10
VITE_API_URL="http://localhost:3000"  # When backend ready
```

Then use in code:
```javascript
const title = import.meta.env.VITE_APP_TITLE
```

---

## Development Workflow

### Recommended Setup
1. **Code Editor**: VS Code
2. **Extensions** (optional):
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint
   - Thunder Client (for API testing later)

### Daily Development
```bash
# Start dev server (auto-reload)
npm run dev

# In another terminal, you can run scripts
npm run build      # Test production build
npm run preview    # Test built version
```

### Git Workflow
```bash
git status
git add .
git commit -m "Add new farm filters"
git push origin main
```

---

## Performance Optimization

### Check Bundle Size
```bash
npm run build
# Look at dist/assets files
```

### Slow Performance Tips
1. **Check Network**: DevTools → Network tab
2. **Check CPU**: DevTools → Performance tab
3. **Reduce markers**: Filter to specific status
4. **Clear cache**: `localStorage.clear()` in console

---

## Security Checklist

- ✅ No API keys exposed in code
- ✅ Data stored locally only (no server risks)
- ✅ No user authentication (MVP stage)
- ✅ CORS not needed (frontend-only)
- ✅ Valid SSL/TLS when deployed

---

## Next Steps

After successful setup:

1. **Explore Features**
   - Add/edit/delete farms
   - Test all filters
   - Check responsive layout (resize browser)

2. **Customize Data**
   - Edit `src/data/mockFarms.js`
   - Add your own farm locations
   - Modify status types

3. **Learn the Codebase**
   - Read through component files
   - Understand data flow in `App.jsx`
   - Experiment with map configuration

4. **Plan Enhancements**
   - Design database schema (for Phase 2)
   - Plan backend API
   - Consider mobile app

---

## Support Resources

- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Leaflet Docs**: https://leafletjs.com/
- **react-leaflet Docs**: https://react-leaflet.js.org/
- **OpenStreetMap**: https://www.openstreetmap.org/

---

## Rollback Commands

If something breaks:
```bash
# Reset to clean state
rm -rf node_modules dist package-lock.json
npm install
npm run dev

# Clear storage
# In browser console: localStorage.clear()
```

---

**Setup Complete! 🎉**

Your Bukidnon Pineapple GIS is ready. Happy mapping! 🍍🗺️
