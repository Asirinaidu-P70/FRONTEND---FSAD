# 🎯 Complete Local Development Setup - Everything Explained

## Your Current Setup

| Component | Status | Location |
|-----------|--------|----------|
| **Frontend** | ✅ Ready | `C:\Users\pagot\NEW WEB` |
| **Backend** | ✅ Ready | `C:\Users\pagot\Documents\workspace-spring-tools-for-eclipse-5.0.1.RELEASE\workshop-backend` |
| **Database** | ✅ H2 (No Setup!) | `./data/workshopdb.mv.db` (file-based) |
| **MySQL** | ⏸️ Available | Your existing MySQL Workbench DB (optional) |

---

## 🚀 Quick Start - Run Everything Locally (5 minutes)

### **Terminal 1: Start Backend**

```bash
cd "C:\Users\pagot\Documents\workspace-spring-tools-for-eclipse-5.0.1.RELEASE\workshop-backend"
.\mvnw.cmd spring-boot:run
```

Wait for:
```
Started WorkshopBackendApplication in 5 seconds
```

✅ Backend running at: `http://localhost:8081`

### **Terminal 2: Start Frontend**

```bash
cd "C:\Users\pagot\NEW WEB"
npm run dev
```

You should see:
```
➜ Local: http://localhost:5173/
```

✅ Frontend running at: `http://localhost:5173`

### **Browser: Open App**

Open `http://localhost:5173` and test!

---

## 🎓 Understanding Your Stack

### Frontend (React/Vite in VS Code)

- **Technology**: React + JavaScript + Vite
- **Port**: 5173
- **Files to Edit**: `src/` folder
- **API Calls**: Uses `VITE_API_BASE_URL` from `.env`

### Backend (Spring Boot in Eclipse)

- **Technology**: Spring Boot + Java 17
- **Port**: 8081
- **Database**: H2 (file-based, embedded)
- **API Routes**: `/api/auth`, `/api/workshops`, etc.

### Database (H2 - No Installation!)

- **Type**: Embedded H2 database
- **Storage**: `./data/workshopdb.mv.db`
- **Auto-Create**: Tables created automatically
- **Access**: Web console at `http://localhost:8081/h2-console`

---

## 🔧 Development Workflow

### Making Changes to Backend

```bash
# 1. Edit code in Eclipse
# 2. Eclipse auto-reloads (or restart backend)
# 3. Backend restarts automatically
# 4. Test in browser
```

### Making Changes to Frontend

```bash
# 1. Edit code in VS Code
# 2. Browser auto-reloads with changes
# 3. Test immediately!
```

---

## 📊 Using H2 Database Console

While backend is running:

1. Open `http://localhost:8081/h2-console`
2. JDBC URL: `jdbc:h2:file:./data/workshopdb`
3. Username: `sa`
4. Password: (leave blank)
5. Click **Connect**

Now you can:
- ✅ View all tables
- ✅ Query data with SQL
- ✅ See relationships
- ✅ Delete data if needed

---

## 🔗 API Endpoints (Test with curl)

All endpoints start with: `http://localhost:8081/api`

### User Registration
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"Test123!\",\"role\":\"user\"}"
```

### User Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@example.com\",\"password\":\"Test123!\"}"
```

### Get All Workshops
```bash
curl http://localhost:8081/api/workshops
```

### Get All Users
```bash
curl http://localhost:8081/api/auth/users
```

---

## 🐛 Debugging Error 500

### Option 1: Check Backend Console
1. Stop the backend (Ctrl+C or kill process)
2. Look at Eclipse console for error details
3. Read the error message
4. Fix in code
5. Restart backend

### Option 2: Check Browser DevTools
1. Press F12 in browser
2. Go to **Network** tab
3. Trigger the action (register, login, etc.)
4. Click failed request
5. See **Response** tab for error message

### Option 3: Check H2 Console
1. Open `http://localhost:8081/h2-console`
2. Query the data to verify it's being created
3. Check if tables exist

---

## 📝 Common Errors & Quick Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| Error 500 on register | Email already exists | Use different email or delete `./data/workshopdb.mv.db` |
| Error 500 on login | Email doesn't exist | Register first, then login |
| "Cannot POST /api/..." | Backend not running | Start backend first |
| Frontend shows "Cannot reach server" | Wrong API URL | Check `.env` has correct URL |
| "Unique constraint violation" | Duplicate email in DB | Delete database file and restart |

---

## 🔄 Switching to MySQL (Optional)

If you want to use your **MySQL Workbench database** instead of H2:

1. Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/workshopdb
spring.datasource.username=root
spring.datasource.password=NewPassword123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

2. Restart backend
3. Everything works with MySQL now! ✅

---

## 📂 Project Structure

```
C:\Users\pagot\
├── NEW WEB/                          (Frontend)
│   ├── src/                          (React components)
│   ├── .env                          (Local config)
│   ├── .env.development              (Dev config)
│   ├── package.json                  (Dependencies)
│   └── vite.config.js
│
└── Documents/workspace-.../
    └── workshop-backend/             (Backend)
        ├── src/main/java/            (Java code)
        ├── src/main/resources/       (Config files)
        │   └── application.properties
        ├── pom.xml                   (Maven config)
        └── Dockerfile                (For deployment)
```

---

## ✅ Checklist: Everything Working?

- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can register new user
- [ ] Can login with registered account
- [ ] Can view workshops
- [ ] Can create workshop (if trainer)
- [ ] Can enroll in workshop
- [ ] H2 console shows data
- [ ] No error 500 on any action

---

## 🚀 Next Steps

### Option A: Continue Local Development
- Keep running locally
- Fix any remaining issues
- Test all features
- When ready, deploy to Render

### Option B: Deploy to Render Later
Once everything works locally, deploy with:
1. Backend → Render Docker Web Service
2. Frontend → Render Static Site
3. Use H2 or upgrade to MySQL as needed

---

## 📚 Documentation Files in Your Repo

| File | Purpose |
|------|---------|
| `RUN_BACKEND_LOCALLY.md` | Step-by-step to run backend |
| `FIX_ERROR_500.md` | Debug and fix errors |
| `H2_DATABASE_GUIDE.md` | H2 database details |
| `H2_QUICK_DEPLOY.md` | Deploy to Render with H2 |
| `DEPLOYMENT_QUICK_START.md` | Full deployment guide |

---

## 💡 Pro Tips

1. **Use curl to test API** before debugging in browser
2. **Check H2 console** to verify data is saved
3. **Keep browser DevTools open** (F12) while testing
4. **Use different emails** for each registration test
5. **Delete database file** to reset everything

---

## 🆘 Need Help?

1. **Check the guides** mentioned above
2. **Look at console errors** in Eclipse
3. **Use DevTools** (F12) in browser
4. **Test with curl** to isolate issues
5. **Read error messages carefully** - they usually tell you what's wrong!

---

## 🎯 Summary

You now have:
- ✅ Frontend ready to run (`npm run dev`)
- ✅ Backend ready to run (`mvn spring-boot:run`)
- ✅ Database ready (H2 - no setup!)
- ✅ Guides to fix any issues
- ✅ Everything configured for localhost

**Just follow the quick start and you're good to go!** 🚀
