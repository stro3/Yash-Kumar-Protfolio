# Vercel Deployment - Quick Reference

## Prerequisites
```bash
npm install -g vercel
```

## Quick Deploy
```bash
vercel-build.bat
vercel --prod
```

## Environment Variables (Set in Vercel Dashboard)
```
JWT_SECRET=your_secure_random_key
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
DATABASE_URL=postgres://connection_string (Optional - for production DB)
```

## Project Configuration Files
- `vercel.json` - Routing and build configuration
- `backend/api/index.js` - Serverless function wrapper
- `.vercelignore` - Deployment exclusions
- `.env.example` - Environment variable template

## Deployment Commands
```bash
vercel              # Preview deployment
vercel --prod       # Production deployment
vercel logs         # View function logs
vercel rollback     # Revert to previous version
```

## Post-Deployment Verification
1. Health check: `https://your-app.vercel.app/api/health`
2. Frontend: `https://your-app.vercel.app`
3. Check logs in Vercel Dashboard

## Important Notes
- SQLite will not persist on Vercel (use PostgreSQL for production)
- Set all environment variables before deployment
- Frontend builds automatically from `frontend/dist`
- API routes accessible at `/api/*` paths

## Documentation
- Full guide: `VERCEL_DEPLOYMENT.md`
- Database migration: `DATABASE_MIGRATION.md`
- Environment setup: `.env.example`
