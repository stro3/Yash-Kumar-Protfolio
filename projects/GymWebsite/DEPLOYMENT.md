# Deployment Guide for GymFit Pro

## Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Create accounts on:
   - [Vercel](https://vercel.com) - for frontend hosting
   - [Render.com](https://render.com) - for backend hosting (free tier available)

## Step 1: Deploy Frontend to Vercel

### A. First-Time Setup
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### B. Configure Environment Variables in Vercel Dashboard
1. Go to your project on Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api` (update after backend deployment)
   - **Environment**: Production

## Step 2: Deploy Backend to Render.com

### A. Create New Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `stro3/GYM-Website`

### B. Configure Build Settings
- **Name**: gymfit-pro-backend
- **Environment**: Node
- **Region**: Choose closest to your users
- **Branch**: main
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

### C. Add Environment Variables on Render
- **Name**: `NODE_ENV`
  - **Value**: `production`
- **Name**: `JWT_SECRET`
  - **Value**: Generate a secure random string (e.g., use https://randomkeygen.com/)
- **Name**: `DATABASE_URL` (Optional for PostgreSQL)
  - If using SQLite, skip this
  - If using PostgreSQL, add database URL from Render's PostgreSQL service

### D. Save Backend URL
After deployment, copy the backend URL (e.g., `https://gymfit-pro-backend.onrender.com`)

## Step 3: Update Frontend Environment Variable
1. Go back to Vercel dashboard
2. Update `VITE_API_URL` to your actual Render backend URL
3. Redeploy: `vercel --prod`

## Step 4: Verify Deployment
1. Visit your Vercel frontend URL
2. Test signup/login functionality
3. Check browser console for any API errors

## Troubleshooting

### Issue: "Network Error" on signup
- **Cause**: Backend URL not configured or backend not running
- **Fix**: Verify `VITE_API_URL` in Vercel matches your Render backend URL

### Issue: CORS errors
- **Cause**: Backend CORS not configured for frontend domain
- **Fix**: Update `backend/server.js` CORS origin to include your Vercel URL

### Issue: Database not persisting
- **Cause**: SQLite file storage not supported on Render
- **Fix**: Use Render's PostgreSQL database (see `backend/config/database.production.js`)

## Alternative: Quick Deploy (Frontend Only)

If you want to deploy just the frontend for demo purposes:

```bash
# Build frontend locally
cd frontend
npm run build

# Deploy to Vercel
cd ..
vercel --prod
```

**Note**: Without backend, features requiring API calls (signup, login, bookings) won't work.

## Automatic Deployments

Both Vercel and Render support automatic deployments from GitHub:
- Push to `main` branch → Automatic deployment
- Great for continuous integration

## Cost Breakdown
- **Vercel**: Free (Hobby plan)
- **Render**: Free tier available (may sleep after inactivity)
- **Total**: $0/month for hobby projects

## Next Steps After Deployment
1. Add custom domain (optional)
2. Enable analytics on Vercel
3. Set up monitoring/alerts on Render
4. Configure CDN for images
