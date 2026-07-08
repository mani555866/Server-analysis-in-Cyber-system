# Deployment Guide

Complete guide for deploying CyberForensics AI Platform to production.

## Pre-Deployment Checklist

### Code Quality
- [ ] All console.log debug statements removed
- [ ] No hardcoded secrets or API keys
- [ ] TypeScript compilation passes without errors
- [ ] ESLint passes all checks
- [ ] All imports are correctly resolved
- [ ] Code follows project conventions

### Testing
- [ ] All major features tested manually
- [ ] Error handling verified
- [ ] Network requests tested
- [ ] Mobile responsiveness checked
- [ ] Browser compatibility verified (Chrome, Firefox, Safari, Edge)
- [ ] Dark theme appearance verified

### Configuration
- [ ] Environment variables defined in `.env.production`
- [ ] API endpoints configured correctly
- [ ] Feature flags properly set
- [ ] Security headers configured
- [ ] CORS settings appropriate
- [ ] Rate limiting configured

### Performance
- [ ] Lighthouse score > 80
- [ ] Core Web Vitals optimized
- [ ] Bundle size analyzed and acceptable
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] Unused dependencies removed

### Security
- [ ] Dependencies audited for vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] CSRF protection enabled
- [ ] Secure headers configured
- [ ] API authentication implemented
- [ ] Rate limiting configured
- [ ] Input validation on all forms

## Environment Setup

### Production Environment Variables

Create `.env.production.local`:

```env
NEXT_PUBLIC_APP_NAME=CyberForensics AI
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENV=production

NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=<your_secret_key>

LOG_LEVEL=warn
ENABLE_DEBUG_MODE=false

NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_WEBHOOK=true

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=<your_access_key>
AWS_SECRET_ACCESS_KEY=<your_secret_key>
```

## Deployment to Vercel (Recommended)

### Step 1: Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Production release v1.0.0"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Select the project

### Step 3: Configure Environment

1. Go to Settings → Environment Variables
2. Add all production environment variables
3. Set Node.js version to 18+
4. Select Next.js as framework

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Verify deployment at provided URL
4. Run post-deployment tests

### Step 5: Monitor

1. Enable Analytics in Vercel dashboard
2. Set up error tracking (Sentry/Rollbar)
3. Monitor performance metrics
4. Set up alerts for errors and performance

## Docker Deployment

### Build Docker Image

```bash
# Build image
docker build -t cyber-forensics:latest .

# Tag for registry
docker tag cyber-forensics:latest your-registry/cyber-forensics:latest

# Push to registry
docker push your-registry/cyber-forensics:latest
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    image: cyber-forensics:latest
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_ENV=production
      - LOG_LEVEL=warn
      - ENABLE_DEBUG_MODE=false
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## Manual Deployment

### Prerequisites
- Node.js 18+
- pnpm installed globally

### Steps

```bash
# 1. Clone repository
git clone <repository-url>
cd cyber-forensics-platform

# 2. Install dependencies
pnpm install

# 3. Build application
pnpm build

# 4. Set environment variables
cp .env.example .env.production.local
# Edit .env.production.local with production values

# 5. Start application
pnpm start

# Application runs on http://localhost:3000
```

### Reverse Proxy Setup (Nginx)

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Post-Deployment

### Verification

1. **Homepage Load**
   - [ ] Dashboard loads without errors
   - [ ] All navigation items visible
   - [ ] Theme applied correctly

2. **Functionality**
   - [ ] Create threat works
   - [ ] Search functionality works
   - [ ] Settings save properly
   - [ ] Scanner can be initiated

3. **Performance**
   - [ ] Page load time < 3s
   - [ ] No console errors
   - [ ] Images load properly
   - [ ] Charts render smoothly

4. **Security**
   - [ ] HTTPS enforced
   - [ ] Security headers present
   - [ ] No sensitive data in console
   - [ ] API authentication working

### Monitoring Setup

#### Sentry Error Tracking
```typescript
// Add to lib/config.ts or layout
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_ENV,
  tracesSampleRate: 0.1,
});
```

#### Google Analytics
```typescript
// Add tracking ID to environment
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=<your-ga-id>
```

### Backup and Recovery

1. **Database Backups** (if applicable)
   - Enable automated backups
   - Test restore procedures
   - Document recovery process

2. **Configuration Backups**
   - Document all environment variables
   - Store securely in password manager
   - Version control sensitive configs

## Rollback Procedure

### If Deployment Fails

#### Vercel
1. Go to Deployments
2. Find last stable deployment
3. Click "Promote to Production"

#### Manual
```bash
git revert <commit-hash>
git push origin main
pnpm build && pnpm start
```

## Monitoring and Maintenance

### Daily Checks
- [ ] Application is responding
- [ ] No critical errors in logs
- [ ] Performance metrics normal
- [ ] Database connections healthy

### Weekly Checks
- [ ] Review error logs
- [ ] Check dependency updates
- [ ] Verify backups completed
- [ ] Review analytics

### Monthly Tasks
- [ ] Security audit
- [ ] Performance optimization
- [ ] Dependency updates
- [ ] Capacity planning

## Scaling

### Horizontal Scaling
- Use load balancer (NGINX, HAProxy)
- Implement session persistence
- Use shared storage for uploads

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching layer (Redis)

## Support and Documentation

- Keep deployment logs for 30 days minimum
- Document all custom configurations
- Create runbooks for common issues
- Establish incident response procedures

## Version Updates

When updating to a new version:

```bash
# 1. Test in staging
git checkout staging
git pull origin main

# 2. Run tests
pnpm test

# 3. Build and verify
pnpm build

# 4. When ready for production
git tag -a v1.0.1 -m "Version 1.0.1"
git push origin v1.0.1

# 5. Trigger production deployment
```
