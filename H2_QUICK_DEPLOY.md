# 🚀 Quick Start - Deploy to Render with H2 Database

## What I Just Set Up For You:

✅ **H2 Embedded Database** - No MySQL needed!  
✅ **File-based Storage** - Data saved in `./data/workshopdb.mv.db`  
✅ **Zero Configuration** - Works out of the box  
✅ **Ready for Render** - Can deploy immediately  

---

## 🎯 3 Steps to Deploy

### Step 1: Build Backend (Locally or on Render)

**Option A: Build locally first (Optional)**
```bash
cd workshop-backend
./mvnw.cmd clean package -DskipTests
```

If you get Java version error, that's okay - Render will build it!

### Step 2: Deploy Backend to Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Select repository: `FSAD---BACKEND`
4. Configure:
   - **Name**: `workshop-backend`
   - **Environment**: Docker
   - Leave Build/Start Commands empty
5. Click **"Advanced"** - NO environment variables needed! (H2 is built-in)
6. Click **"Create Web Service"**
7. Wait 7-10 minutes ⏳

**You'll get a URL like:** `https://workshop-backend.onrender.com`

### Step 3: Deploy Frontend to Render

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Static Site"**
3. Select repository: `FSAD---FRONTEND`
4. Configure:
   - **Name**: `workshop-platform`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Click **"Advanced"** and add:
   - `VITE_API_BASE_URL` = `https://workshop-backend.onrender.com/api`
6. Click **"Create Static Site"**
7. Wait 3-5 minutes ⏳

**You'll get a URL like:** `https://workshop-platform.onrender.com`

---

## ✅ Test It Works

```bash
# Test backend is running
curl https://workshop-backend.onrender.com/api/workshops

# Test H2 console (optional)
curl https://workshop-backend.onrender.com/h2-console
```

---

## 📊 Your Database

**Location**: `./data/workshopdb.mv.db`

**Access H2 Console** (optional):
- Local: http://localhost:8081/h2-console
- Render: https://workshop-backend.onrender.com/h2-console
- Username: `sa`
- Password: (blank)

---

## 🔄 Update Your Code

```bash
# Make changes to backend
git add .
git commit -m "Your message"
git push
# Render auto-redeploys!
```

---

## ✨ Benefits

- ✅ **No MySQL setup** - Zero database configuration!
- ✅ **No cloud account** - AWS, DigitalOcean not needed
- ✅ **One-click deploy** - Just push to GitHub
- ✅ **Data persists** - File-based storage survives restarts
- ✅ **Perfect for learning** - Great for development & testing

---

## 📈 Future (If Needed)

Later, if you want to switch to MySQL:
1. Create MySQL database (AWS RDS, DigitalOcean, etc.)
2. In Render environment, set `SPRING_PROFILES_ACTIVE=mysql`
3. Add MySQL connection environment variables
4. Done!

For now, **H2 is perfect for your project!**

---

## 🎯 You're Ready to Deploy!

**All files are committed and pushed to GitHub.** 

Just follow the 3 steps above to deploy to Render! 

**No MySQL needed anymore.** Your backend stores data using H2! 🚀
