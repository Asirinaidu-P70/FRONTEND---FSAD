# Render.com Deployment Guide

## Frontend Deployment (Current Setup)

Your project is currently frontend-only. Follow these steps to deploy to Render:

### Step 1: Prepare Your Repository
```bash
git add .
git commit -m "Add Render deployment configuration"
git push
```

### Step 2: Deploy to Render

1. **Go to [render.com](https://render.com)** and sign up/log in
2. **Click "New +" → "Static Site"**
3. **Connect your GitHub repository**
4. **Fill in the details:**
   - **Name:** `workshop-platform` (or your choice)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. **Click "Create Static Site"**

**Result:** Your frontend will be live at `https://workshop-platform.onrender.com`

---

## Future Backend Integration

When you're ready to add a backend, follow these steps:

### Option A: Deploy Backend as Separate Service (Recommended)

1. **Create/organize your backend code** (Node.js, Python, etc.)
2. **Push backend to GitHub** in a separate repository or branch
3. **In Render Dashboard:**
   - Click "New +" → "Web Service"
   - Connect your backend repository
   - Set build command and start command
   - Add environment variables (database, API keys, etc.)
4. **Get your backend URL** (e.g., `https://workshop-backend.onrender.com`)
5. **Update frontend environment variables** in Render Dashboard:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://workshop-backend.onrender.com/api`

### Option B: Monorepo with Both Services

If frontend and backend are in the **same repository**:

1. **Folder structure:**
   ```
   /frontend          (your React/Vite app)
   /backend           (your Node/Python server)
   render.yaml        (configuration below)
   ```

2. **Create `render.yaml` in root:**
   ```yaml
   services:
     - type: web
       name: workshop-backend
       env: node
       plan: free
       buildCommand: cd backend && npm install
       startCommand: cd backend && npm start
       envVars:
         - key: PORT
           value: 8081
         - key: DATABASE_URL
           sync: false
     
     - type: web
       name: workshop-frontend
       env: static
       buildCommand: cd frontend && npm install && npm run build
       staticPublishPath: frontend/dist
       envVars:
         - key: VITE_API_BASE_URL
           value: https://workshop-backend.onrender.com/api
       routes:
         - type: redirect
           source: /api/<path>
           destination: https://workshop-backend.onrender.com/api/<path>
   ```

3. **Push to GitHub and deploy using `render.yaml`**

---

## Environment Variables Reference

### Frontend (.env.production)
```
VITE_API_BASE_URL=https://your-backend-url/api
```

### Backend (when created)
- `PORT`: The port your backend runs on (usually 8081 or 3000)
- `DATABASE_URL`: Connection string to your database
- `NODE_ENV`: Set to `production`
- Other API keys, secrets, etc.

---

## Quick Troubleshooting

**Problem:** Frontend deployed but API calls fail
- Check that `VITE_API_BASE_URL` in Render Dashboard matches your actual backend URL
- Ensure backend CORS is configured to allow requests from your frontend domain

**Problem:** Backend won't start
- Check that your `startCommand` in render.yaml is correct
- Verify all environment variables are set
- Check build logs in Render Dashboard

**Problem:** Need to update API URL without redeploying
- Go to Render Dashboard → Select Service → Settings → Environment
- Update `VITE_API_BASE_URL` and save (automatic redeploy)

---

## Need Help?
- Render Docs: https://render.com/docs
- GitHub Integration: https://render.com/docs/github
