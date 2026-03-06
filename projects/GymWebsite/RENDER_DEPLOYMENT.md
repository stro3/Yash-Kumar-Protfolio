# 🚀 Render.com Backend Deployment Guide

## Step 1: Sign Up for Render

1. Go to [https://render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with your **GitHub account** (recommended for automatic deployments)

## Step 2: Create a New Web Service

1. Once logged in, click **"New +"** in the top right
2. Select **"Web Service"**

## Step 3: Connect Your Repository

1. If this is your first time:
   - Click **"Connect account"** next to GitHub
   - Authorize Render to access your repositories
   
2. Find and select your repository: **`stro3/GYM-Website`**
3. Click **"Connect"**

## Step 4: Configure the Service

Fill in the following settings:

### Basic Settings
- **Name**: `gymfit-backend` (or any name you prefer)
- **Region**: Choose closest to your users (e.g., Oregon, Frankfurt, Singapore)
- **Branch**: `main`
- **Root Directory**: `backend`

### Build Settings
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

### Instance Type
- **Free** (select this for now - your service may sleep after 15 min of inactivity)
- Or **Starter** ($7/month - stays awake 24/7)

## Step 5: Add Environment Variables

Scroll down to **"Environment Variables"** section and click **"Add Environment Variable"**:

### Required Variables:

1. **NODE_ENV**
   - Value: `production`

2. **JWT_SECRET**
   - Value: Generate a secure random string
   - Go to [https://randomkeygen.com](https://randomkeygen.com)
   - Copy any "Fort Knox Password" (e.g., `mK9#pL2$vN8@qR5!zX3^wY7`)

3. **FRONTEND_URL**
   - Value: Your Vercel frontend URL
   - Example: `https://gym-website-abc123.vercel.app`
   - **Note**: You'll need to update this after getting your Vercel URL

4. **PORT** (Optional - Render sets this automatically)
   - Value: `10000`

## Step 6: Deploy

1. Click **"Create Web Service"** at the bottom
2. Render will start deploying your backend
3. **Wait 2-5 minutes** for the deploy to complete
4. Watch the logs for any errors

## Step 7: Copy Your Backend URL

Once deployment succeeds:
1. At the top of the page, you'll see your backend URL
2. Example: `https://gymfit-backend.onrender.com`
3. **Copy this URL** - you'll need it for Vercel

## Step 8: Test Your Backend

Visit your backend URL + `/api/health`:
```
https://gymfit-backend.onrender.com/api/health
```

You should see:
```json
{
  "message": "Server is running!",
  "database": "SQLite (Embedded)",
  "timestamp": "2026-01-05T..."
}
```

## Step 9: Update Vercel Frontend

Now connect your frontend to the backend:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **gym-website** project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://gymfit-backend.onrender.com/api` (use YOUR actual URL)
   - **Environment**: All (Production, Preview, Development)
5. Click **"Save"**

## Step 10: Redeploy Frontend

1. Go to the **"Deployments"** tab in Vercel
2. Click the **"..." menu** on the latest deployment
3. Select **"Redeploy"**
4. Wait 1-2 minutes

## Step 11: Update Backend FRONTEND_URL

1. Go back to Render dashboard
2. Click your **gymfit-backend** service
3. Go to **"Environment"** tab
4. Edit the **FRONTEND_URL** variable
5. Set it to your Vercel URL: `https://gym-website-abc123.vercel.app`
6. Click **"Save Changes"**
7. Service will automatically redeploy

## 🎉 You're Done!

Your website is now fully live!
- **Frontend**: https://your-site.vercel.app
- **Backend**: https://gymfit-backend.onrender.com

Test signup/login - it should work now!

## 📊 Monitoring

### Check Backend Logs
- Render Dashboard → Your Service → **"Logs"** tab
- See real-time server activity and errors

### Check Backend Status
- Render Dashboard → Your Service → **"Events"** tab
- See deployment history and health checks

## 💡 Important Notes

### Free Tier Limitations
- Backend sleeps after 15 minutes of inactivity
- First request after sleep will be slow (30 seconds)
- Upgrade to Starter ($7/mo) for 24/7 uptime

### Database Persistence
- SQLite file persists on Render's disk
- Data won't be lost between deploys
- For production, consider upgrading to PostgreSQL

## 🐛 Troubleshooting

### Issue: "Service Unavailable"
- Check Render logs for errors
- Verify all environment variables are set

### Issue: Still getting "Network Error"
- Verify VITE_API_URL in Vercel matches Render URL
- Check you redeployed frontend after adding variable

### Issue: "Not allowed by CORS"
- Verify FRONTEND_URL on Render matches your Vercel URL
- Make sure there's no trailing slash

## 🔄 Automatic Deployments

Good news! Both services auto-deploy when you push to GitHub:
- Push to `main` → Vercel frontend updates
- Push to `main` → Render backend updates

No manual deployment needed!
