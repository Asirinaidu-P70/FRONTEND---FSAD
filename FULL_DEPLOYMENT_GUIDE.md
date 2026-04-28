# Complete Deployment Guide: Frontend + Spring Boot Backend + MySQL on Render

## 📋 Overview

This guide will help you deploy:
- ✅ **Frontend**: React/Vite to Render (Static Site)
- ✅ **Backend**: Spring Boot to Render (Docker Web Service)
- ✅ **Database**: MySQL (External Provider - required)

---

## 🔧 Prerequisites

Before starting, ensure you have:

1. **GitHub Account** with your code pushed
2. **Render Account** (https://render.com) - Free tier available
3. **Java 17+** (for local testing)
4. **Maven 3.6+** (for local testing)
5. **MySQL Database** (local or cloud - we'll set up cloud DB)

---

## 📝 Step 1: Prepare Your Repository

### Local Setup - Backend

Navigate to backend folder and test locally:

```bash
cd backend

# Install dependencies
mvn clean install

# Run locally (requires local MySQL)
mvn spring-boot:run
```

The backend will run at: `http://localhost:8081/api`

### Test API Endpoints

```bash
# Register User
curl -X POST http://localhost:8081/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# Get All Workshops
curl http://localhost:8081/api/workshops
```

---

## 🗄️ Step 2: Set Up MySQL Database (Required)

### Option A: AWS RDS (Recommended for Render)

1. Go to https://aws.amazon.com/rds/
2. Click "Create database"
3. Choose:
   - Engine: MySQL 8.0
   - Instance class: db.t3.micro (free tier)
   - DB instance identifier: `workshop-db`
   - Master username: `admin`
   - Master password: Create a strong password
4. Note the **Endpoint** (e.g., `workshop-db.xxxxx.us-east-1.rds.amazonaws.com`)

### Option B: DigitalOcean Managed MySQL

1. Go to https://www.digitalocean.com/products/managed-databases
2. Create MySQL cluster
3. Copy the connection string

### Option C: Local MySQL (Development Only)

```sql
CREATE DATABASE workshop_db;
USE workshop_db;
```

---

## 🚀 Step 3: Deploy Backend to Render

### 3.1 Push to GitHub

Make sure backend is in your repository:

```bash
git add .
git commit -m "Add Spring Boot backend with MySQL integration"
git push origin main
```

### 3.2 Create Render Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Select your GitHub repository
4. Fill in details:
   - **Name**: `workshop-backend`
   - **Environment**: Docker
   - **Branch**: main
   - **Build Command**: (leave empty)
   - **Start Command**: (leave empty)
5. Click **"Advanced"** and add Environment Variables:

| Key | Value |
|-----|-------|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://your-db-host:3306/workshop_db` |
| `SPRING_DATASOURCE_USERNAME` | Your DB username |
| `SPRING_DATASOURCE_PASSWORD` | Your DB password |
| `PORT` | `8081` |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` |

6. Click **"Create Web Service"**

**⏳ Wait 5-10 minutes for deployment**

Once deployed, you'll get a URL like: `https://workshop-backend.onrender.com`

### 3.3 Test Backend Deployment

```bash
# Test deployed backend
curl https://workshop-backend.onrender.com/api/workshops

# Should return empty list: []
```

---

## 🎨 Step 4: Deploy Frontend to Render

### 4.1 Configure Environment

The `render.yaml` already has backend URL configured.

For local development, ensure `.env.development` has:
```properties
VITE_API_BASE_URL=/api
```

For production, `.env.production` has:
```properties
VITE_API_BASE_URL=https://workshop-backend.onrender.com/api
```

### 4.2 Deploy Frontend

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Select your GitHub repository
3. Fill in details:
   - **Name**: `workshop-platform`
   - **Build Command**: `npm install && npm run build`
   - **Publish directory**: `dist`
4. Click **"Create Static Site"**

**⏳ Wait 2-3 minutes for deployment**

You'll get a URL like: `https://workshop-platform.onrender.com`

### 4.3 Test Frontend

1. Open https://workshop-platform.onrender.com in browser
2. Try logging in or registering
3. Open browser DevTools → Network tab to see API calls to backend

---

## ✅ Verification Checklist

- [ ] Backend service running on Render
- [ ] Backend can connect to MySQL database
- [ ] Frontend service running on Render
- [ ] Frontend loads without errors
- [ ] API calls from frontend reach backend (check Network tab)
- [ ] Can register/login users
- [ ] Can create/view workshops
- [ ] Can enroll in workshops

---

## 🔄 Environment Variables Reference

### Backend (Spring Boot)

Set these in Render dashboard:

```
SPRING_DATASOURCE_URL=jdbc:mysql://your-host:3306/workshop_db
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
PORT=8081
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JACKSON_SERIALIZATION_WRITE_DATES_AS_TIMESTAMPS=false
```

### Frontend (React/Vite)

Set in `.env.production`:

```
VITE_API_BASE_URL=https://workshop-backend.onrender.com/api
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check MySQL connection string is correct
- Verify database username/password
- Look at Render logs for detailed error

### Frontend can't connect to backend
- Verify `VITE_API_BASE_URL` is correct
- Check backend service is running
- Check CORS is enabled (it is by default in our config)
- Open DevTools → Network tab to see actual request

### CORS errors
The backend is pre-configured to allow:
- `http://localhost:5173` (local dev)
- `http://localhost:3000` (alternatives)
- `https://workshop-platform.onrender.com` (production)

If deploying to different domain, update `WorkshopApplication.java`:

```java
registry.addMapping("/api/**")
    .allowedOrigins("your-frontend-url")
    ...
```

---

## 📊 View Logs

### Backend Logs
1. Go to Render Dashboard → Select `workshop-backend`
2. Click "Logs" tab

### Frontend Logs
1. Go to Render Dashboard → Select `workshop-platform`
2. Click "Logs" tab

---

## 🔄 Making Updates

### Update Backend
```bash
# Make changes to backend code
git add backend/
git commit -m "Update backend"
git push
# Render auto-redeploys
```

### Update Frontend
```bash
# Make changes to frontend code
git add src/
git commit -m "Update frontend"
git push
# Render auto-redeploys
```

### Update Environment Variables
1. Go to Render Dashboard → Service
2. Click "Settings"
3. Edit Environment Variables
4. Click "Save" (auto-redeploys service)

---

## 📚 API Documentation

### Base URL
```
https://workshop-backend.onrender.com/api
```

### User Endpoints
- `POST /users/register` - Register new user
- `POST /users/login` - Login user
- `GET /users/{id}` - Get user profile
- `PUT /users/{id}` - Update profile
- `GET /users/trainers/all` - Get all trainers

### Workshop Endpoints
- `POST /workshops` - Create workshop (trainer only)
- `GET /workshops` - List all workshops
- `GET /workshops/{id}` - Get workshop details
- `GET /workshops/status/{status}` - Filter by status
- `PUT /workshops/{id}` - Update workshop
- `DELETE /workshops/{id}` - Delete workshop

### Enrollment Endpoints
- `POST /enrollments` - Enroll in workshop
- `GET /enrollments/user/{userId}` - My enrollments
- `GET /enrollments/workshop/{workshopId}` - Workshop participants
- `PUT /enrollments/{id}/complete` - Mark as complete
- `DELETE /enrollments/{id}` - Cancel enrollment

---

## 🎓 Next Steps

1. **Integrate with Frontend**
   - Update API calls in React components to use endpoints
   - Handle authentication tokens
   - Add error handling

2. **Add Features**
   - Implement JWT authentication
   - Add email notifications
   - Create admin dashboard

3. **Optimize**
   - Add caching
   - Optimize database queries
   - Setup monitoring

---

## ❓ Need Help?

- **Render Docs**: https://render.com/docs
- **Spring Boot Docs**: https://spring.io/projects/spring-boot
- **MySQL Docs**: https://dev.mysql.com/doc/
- **AWS RDS Setup**: https://docs.aws.amazon.com/rds/latest/UserGuide/

Good luck! 🚀
