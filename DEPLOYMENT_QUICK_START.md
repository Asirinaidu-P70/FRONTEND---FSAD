# 🚀 Complete Deployment Guide: Frontend + Spring Boot Backend on Render

## 📊 Your Setup

You have **two separate repositories**:

| Component | Repository | Technology |
|-----------|-----------|-----------|
| **Frontend** | `FSAD---FRONTEND` | React + Vite + JavaScript |
| **Backend** | `FSAD---BACKEND` | Spring Boot 4.0.5 + Java 17 + MySQL |

Both are ready for Render deployment!

---

## 📋 Prerequisites Checklist

Before deploying, ensure you have:

- ✅ **GitHub Account** with both repos pushed
- ✅ **Render Account** (https://render.com) - Free tier works
- ⚠️ **MySQL Database** - You MUST set this up (see below)
- ✅ **Backend repo URL**: `https://github.com/Asirinaidu-P70/FSAD---BACKEND.git`
- ✅ **Frontend repo URL**: `https://github.com/Asirinaidu-P70/FSAD---FRONTEND.git`

---

## 🗄️ STEP 1: Create MySQL Database (CRITICAL!)

Your Spring Boot backend **requires a MySQL database**. Choose one:

### Option A: AWS RDS (Recommended - Free Tier Available)

1. Go to https://aws.amazon.com/rds/
2. Click **"Create Database"**
3. Select:
   - **Engine**: MySQL 8.0.x
   - **Instance Class**: `db.t3.micro` (Free tier)
   - **Identifier**: `workshop-db`
   - **Master Username**: `admin`
   - **Password**: Create a secure password (save it!)
4. Click **"Create Database"**
5. Wait 5-10 minutes for database to be available
6. Click on the database and note:
   - **Endpoint** (e.g., `workshop-db.abc123.us-east-1.rds.amazonaws.com`)
   - **Port** (3306)
   - **Database Name** (keep default: `workshopdb` or create one)

**Connection String:**
```
jdbc:mysql://workshop-db.abc123.us-east-1.rds.amazonaws.com:3306/workshopdb
```

### Option B: DigitalOcean Managed MySQL

1. Go to https://www.digitalocean.com/products/managed-databases/
2. Create MySQL Cluster
3. Copy connection details
4. Add your Render IP to firewall (Render will tell you which one)

### Option C: Local MySQL (Development Testing Only)

```bash
# Install MySQL locally
# Create database
mysql -u root -p
CREATE DATABASE workshopdb;
```

**👉 For production on Render, you MUST use Option A or B!**

---

## 🔧 STEP 2: Deploy Backend to Render

### 2.1 Go to Render Dashboard

1. Open https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**

### 2.2 Connect Backend Repository

1. Click **"Connect account"** if needed
2. Select your **`FSAD---BACKEND`** repository
3. Configure:
   - **Name**: `workshop-backend`
   - **Environment**: `Docker`
   - **Build Command**: (leave empty)
   - **Start Command**: (leave empty)

### 2.3 Add Environment Variables

Click **"Advanced"** and add these:

| Key | Value | Example |
|-----|-------|---------|
| `SPRING_DATASOURCE_URL` | Your JDBC URL from Step 1 | `jdbc:mysql://workshop-db.abc123.us-east-1.rds.amazonaws.com:3306/workshopdb` |
| `SPRING_DATASOURCE_USERNAME` | DB username | `admin` |
| `SPRING_DATASOURCE_PASSWORD` | DB password | Your actual password |
| `PORT` | `8081` | `8081` |

### 2.4 Deploy

Click **"Create Web Service"**

⏳ **Wait 7-10 minutes** while Render builds and deploys

Once complete, you'll see a URL like:
```
https://workshop-backend.onrender.com
```

### 2.5 Test Backend

```bash
# Verify backend is running
curl https://workshop-backend.onrender.com/api/workshops

# Should return:
# [] or {"data": [...]}
```

---

## 🎨 STEP 3: Deploy Frontend to Render

### 3.1 Go to Render Dashboard

1. Click **"New +"** → **"Static Site"**

### 3.2 Connect Frontend Repository

1. Select your **`FSAD---FRONTEND`** repository
2. Configure:
   - **Name**: `workshop-platform`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### 3.3 Add Environment Variables

Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_BASE_URL` | `https://workshop-backend.onrender.com/api` |

### 3.4 Deploy

Click **"Create Static Site"**

⏳ **Wait 3-5 minutes** for deployment

You'll get a URL like:
```
https://workshop-platform.onrender.com
```

---

## ✅ STEP 4: Verify Everything Works

### 4.1 Test Frontend

1. Open `https://workshop-platform.onrender.com` in browser
2. You should see your workshop app loaded

### 4.2 Test API Connection

1. Open browser **DevTools** (F12)
2. Go to **Network** tab
3. Try logging in or creating a workshop
4. Watch the Network tab - you should see API calls to:
   ```
   https://workshop-backend.onrender.com/api/...
   ```

### 4.3 Test Endpoints

```bash
# Test user registration
curl -X POST https://workshop-backend.onrender.com/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Test get workshops
curl https://workshop-backend.onrender.com/api/workshops
```

---

## 🔄 Update Flow (For Future Changes)

### Update Backend Code

```bash
cd workshop-backend
# Make changes...
git add .
git commit -m "Your message"
git push
# Render auto-redeploys in 2-3 minutes
```

### Update Frontend Code

```bash
cd frontend (NEW WEB)
# Make changes...
git add .
git commit -m "Your message"
git push
# Render auto-redeploys in 1-2 minutes
```

### Update Environment Variables

1. Go to Render Dashboard
2. Select the service (backend or frontend)
3. Click **"Settings"**
4. Edit environment variables
5. Click **"Save"** - auto-redeploys

---

## 🐛 Troubleshooting

### Backend won't start
**Error**: "Cannot connect to database"
```
✅ Solution:
- Verify SPRING_DATASOURCE_URL is correct
- Check username/password are exact
- Ensure MySQL database is running
- Check Render logs for detailed error
```

### Frontend can't connect to backend
**Error**: Network request fails, no response from `/api/`
```
✅ Solution:
- Check VITE_API_BASE_URL is set correctly
- Verify backend service is running
- Check Network tab in DevTools to see actual request
- Ensure CORS is enabled (it is by default)
```

### CORS blocked
**Error**: "Access to XMLHttpRequest blocked by CORS policy"
```
✅ Solution:
The backend already allows:
- http://localhost:5173 (dev)
- http://localhost:3000
- https://workshop-platform.onrender.com (prod)

If deploying to different URL, update CrosConfig.java
```

### Free tier sleep
**Note**: Free Render services sleep after 15 mins of inactivity
```
✅ Solution:
First request might take 10-30 seconds to wake up
Upgrade to paid plan to avoid this
```

---

## 📊 Monitoring & Logs

### View Backend Logs

1. Go to Render Dashboard
2. Select `workshop-backend`
3. Click **"Logs"** tab
4. See real-time logs

### View Frontend Logs

1. Go to Render Dashboard
2. Select `workshop-platform`
3. Click **"Logs"** tab

### View Database Logs

AWS RDS Dashboard shows connection history, slow queries, etc.

---

## 🔒 Security Notes (For Production)

⚠️ **Important**: This setup is good for learning/development. For production:

1. **Change JWT Secret** - Update in backend code
2. **Use Strong Passwords** - Database credentials should be complex
3. **Enable HTTPS** - Render handles this by default
4. **Restrict CORS** - Only allow your frontend domain
5. **Add API Authentication** - Consider JWT tokens
6. **Backup Database** - Set up AWS RDS automated backups

---

## 📚 Backend API Endpoints

All endpoints start with: `https://workshop-backend.onrender.com/api`

### Available Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/registrations` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/workshops` | Get all workshops |
| POST | `/workshops` | Create workshop |
| PUT | `/workshops/{id}` | Update workshop |
| DELETE | `/workshops/{id}` | Delete workshop |
| POST | `/contact-messages` | Submit contact form |

---

## 🎓 Final Checklist

- [ ] MySQL database created (AWS RDS or DigitalOcean)
- [ ] Backend deployed to Render
- [ ] Backend URL received (e.g., https://workshop-backend.onrender.com)
- [ ] Backend environment variables configured
- [ ] Backend tested with curl requests
- [ ] Frontend deployed to Render
- [ ] Frontend environment variables configured
- [ ] Frontend loads without 404 errors
- [ ] API calls from frontend reach backend
- [ ] User registration works
- [ ] Workshops can be viewed/created
- [ ] Can view logs for debugging

---

## 🆘 Need Help?

### Render Support
- Docs: https://render.com/docs
- Dashboard: https://dashboard.render.com
- Status: https://status.render.com

### Spring Boot Docs
- Docs: https://spring.io/projects/spring-boot
- Properties: https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html

### MySQL Docs
- Docs: https://dev.mysql.com/doc/

### Your Deployment Files
- Backend guide: `/workshop-backend/RENDER_DEPLOYMENT.md`
- Frontend guide: `/NEW WEB/FULL_DEPLOYMENT_GUIDE.md`
- Frontend config: `/NEW WEB/render.yaml`

---

## 📞 Contact Your Educator

If you have issues, your educator can help with:
- Spring Boot backend configuration
- MySQL database setup
- API endpoint design
- Frontend-backend integration

Good luck! 🚀
