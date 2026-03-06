# Production Database Migration Guide

This guide provides instructions for migrating from SQLite to a production-ready database system for Vercel deployment.

## Database Selection Criteria

### SQLite Limitations on Vercel
- Serverless functions are ephemeral and stateless
- File-based databases do not persist between invocations
- No shared state across multiple function instances
- Data loss occurs on every cold start

### Recommended Production Databases

#### Option 1: Vercel Postgres (Recommended)
**Advantages:**
- Native Vercel integration
- Automatic connection pooling
- Low latency from edge locations
- Simple configuration

**Setup Instructions:**
1. Navigate to Vercel Dashboard > Storage > Create Database
2. Select Postgres database type
3. Choose deployment region closest to primary users
4. Copy connection string from database settings
5. Add as `DATABASE_URL` environment variable
6. Install PostgreSQL adapter: `npm install pg pg-hstore`

**Environment Variables:**
```bash
DATABASE_URL=postgres://username:password@host:5432/database?sslmode=require
```

#### Option 2: Supabase
**Advantages:**
- Free tier with generous limits
- Built-in authentication and storage
- Real-time subscriptions
- GraphQL API support

**Setup Instructions:**
1. Create account at supabase.com
2. Create new project
3. Navigate to Settings > Database
4. Copy connection string
5. Configure environment variables

**Environment Variables:**
```bash
DATABASE_URL=postgresql://postgres:password@db.project.supabase.co:5432/postgres
```

#### Option 3: PlanetScale
**Advantages:**
- MySQL-compatible serverless database
- Automatic horizontal scaling
- Branching workflow for schema changes
- No connection limits

**Setup Instructions:**
1. Create account at planetscale.com
2. Create new database
3. Generate connection credentials
4. Configure environment variables

**Environment Variables:**
```bash
DATABASE_URL=mysql://username:password@host.us-east-3.psdb.cloud/database?sslaccept=strict
```

## Migration Process

### Step 1: Install Database Driver
```bash
cd backend
npm install pg pg-hstore
```

### Step 2: Update Database Configuration
Replace `backend/config/database.js` with `backend/config/database.production.js`:

```bash
copy backend\config\database.production.js backend\config\database.js
```

### Step 3: Configure Environment Variables
Add to Vercel project settings:
- `DATABASE_URL` - Full connection string from your database provider

### Step 4: Test Connection Locally
Create `.env` file in backend directory:
```bash
DATABASE_URL=your_connection_string_here
```

Run backend locally:
```bash
cd backend
npm start
```

Verify console output shows successful database connection.

### Step 5: Deploy to Vercel
```bash
vercel --prod
```

### Step 6: Verify Production Database
Check function logs in Vercel Dashboard to confirm:
- Database connection established
- Models synchronized successfully
- No connection errors

## Schema Migration Strategy

### Automatic Synchronization
Current configuration uses `sequelize.sync({ force: false })` which:
- Creates tables if they don't exist
- Does not modify existing schema
- Preserves existing data

### Manual Migrations (Recommended for Production)
Install Sequelize CLI:
```bash
npm install --save-dev sequelize-cli
```

Initialize migrations:
```bash
npx sequelize-cli init
```

Generate migration:
```bash
npx sequelize-cli migration:generate --name initial-schema
```

Run migrations:
```bash
npx sequelize-cli db:migrate
```

## Connection Pooling Configuration

### PostgreSQL Connection Pool
Update database configuration:
```javascript
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
```

### MySQL Connection Pool
```javascript
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
```

## Data Backup Strategy

### Vercel Postgres Backups
- Automatic daily backups on paid plans
- Point-in-time recovery available
- Manual snapshot creation via dashboard

### Supabase Backups
- Daily automatic backups
- Download via Database > Backups
- Restore via SQL editor

### Custom Backup Script
```javascript
const fs = require('fs');
const { sequelize } = require('./config/database');

async function backupDatabase() {
  const models = Object.keys(sequelize.models);
  const backup = {};
  
  for (const modelName of models) {
    const data = await sequelize.models[modelName].findAll();
    backup[modelName] = data;
  }
  
  fs.writeFileSync(
    `backup-${Date.now()}.json`,
    JSON.stringify(backup, null, 2)
  );
}
```

## Performance Optimization

### Index Creation
Add indexes to frequently queried columns:
```javascript
User.init({
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    indexes: [{ unique: true }]
  }
});
```

### Query Optimization
Use eager loading to reduce query count:
```javascript
const user = await User.findOne({
  where: { id: userId },
  include: [{ model: Membership }]
});
```

### Connection Management
Implement connection singleton pattern in serverless wrapper.

## Troubleshooting

### Issue: Connection Timeout
**Symptom:** Database connection fails with timeout error
**Solution:** 
- Verify connection string format
- Check firewall rules allow Vercel IP ranges
- Increase connection timeout in sequelize config

### Issue: SSL Certificate Error
**Symptom:** SSL verification failed
**Solution:**
```javascript
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}
```

### Issue: Too Many Connections
**Symptom:** Pool exhausted error messages
**Solution:**
- Reduce pool max size to 3-5
- Implement connection recycling
- Add connection cleanup on function termination

## Cost Comparison

### Vercel Postgres
- Free tier: Not available
- Hobby: $20/month
- Pro: Custom pricing

### Supabase
- Free tier: 500MB database, 2GB bandwidth
- Pro: $25/month
- Unlimited bandwidth on paid plans

### PlanetScale
- Free tier: 5GB storage, 1 billion row reads
- Scaler: $39/month
- Enterprise: Custom pricing

## Migration Checklist

- [ ] Select production database provider
- [ ] Create database instance
- [ ] Install database driver dependencies
- [ ] Update database configuration file
- [ ] Configure connection pooling
- [ ] Set environment variables in Vercel
- [ ] Test connection locally
- [ ] Deploy to Vercel
- [ ] Verify production connectivity
- [ ] Configure backup strategy
- [ ] Add monitoring alerts
- [ ] Document rollback procedure

---

**Status:** Production database migration configuration complete
