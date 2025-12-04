# TFI Timeline - Production Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- [x] Supabase account and project
- [x] Google Gemini API key
- [x] GitHub repository (optional but recommended)

---

## Step 1: Prepare Environment Variables

### 1.1 Get Supabase Credentials
```bash
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings > API
4. Copy:
   - Project URL → NEXT_PUBLIC_SUPABASE_URL
   - anon/public key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - service_role key → SUPABASE_SERVICE_ROLE_KEY
```

### 1.2 Get Database URL
```bash
1. Go to Settings > Database
2. Copy "Connection String" (URI format)
3. Replace [YOUR-PASSWORD] with your database password
4. This is your DATABASE_URL
```

### 1.3 Get Gemini API Key
```bash
1. Go to https://ai.google.dev
2. Click "Get API Key"
3. Create new key or use existing
4. Copy the key → GEMINI_API_KEY
```

---

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

```bash
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Build Command: prisma generate && next build
   - Output Directory: .next
   - Install Command: npm install
5. Add Environment Variables (see below)
6. Click "Deploy"
```

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts and add environment variables
```

---

## Step 3: Configure Environment Variables in Vercel

Add these in Vercel Dashboard > Settings > Environment Variables:

### **Required Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:password@host:5432/postgres
GEMINI_API_KEY=your_gemini_key
```

### **Optional Variables:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
RESEND_API_KEY=re_...
TMDB_API_KEY=...
YOUTUBE_API_KEY=...
```

---

## Step 4: Setup Prisma in Production

### 4.1 Generate Prisma Client
Vercel will automatically run `prisma generate` during build (configured in `vercel.json`)

### 4.2 Sync Database Schema
```bash
# Option 1: Pull existing schema from Supabase
npx prisma db pull

# Option 2: Push Prisma schema to Supabase
npx prisma db push

# Commit the changes
git add prisma/schema.prisma
git commit -m "Sync Prisma schema"
git push
```

---

## Step 5: Seed Database (Optional)

```bash
# Run seed script locally or via Vercel CLI
npm run seed-events

# Or manually add data via Supabase Dashboard
```

---

## Step 6: Configure Custom Domain (Optional)

```bash
1. Go to Vercel Dashboard > Settings > Domains
2. Add your custom domain (e.g., tfitimeline.com)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)
```

---

## Step 7: Verify Deployment

### 7.1 Check Build Logs
```bash
1. Go to Vercel Dashboard > Deployments
2. Click on latest deployment
3. Check "Building" logs for errors
4. Verify Prisma client generation
```

### 7.2 Test Production App
```bash
1. Visit your deployment URL
2. Test critical flows:
   - Sign up / Login
   - View calendar
   - Create event
   - AI chat
   - Social features
```

---

## 🔧 Troubleshooting

### Build Fails with Prisma Error
```bash
# Make sure DATABASE_URL is set in Vercel
# Check that prisma generate is in build command
# Verify schema.prisma is committed to git
```

### Database Connection Error
```bash
# Verify DATABASE_URL format
# Check Supabase project is active
# Ensure database password is correct
# Try connection pooling URL if needed
```

### Environment Variables Not Working
```bash
# Make sure variables are set for "Production"
# Redeploy after adding variables
# Check variable names match exactly (case-sensitive)
```

---

## 📊 Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Prisma client generated successfully
- [ ] Database schema synced
- [ ] Sample data seeded
- [ ] Authentication working
- [ ] Calendar view loading
- [ ] Event creation working
- [ ] AI chat responding
- [ ] Social features functional
- [ ] PWA installable
- [ ] Mobile responsive
- [ ] Performance optimized (Lighthouse > 90)
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (Vercel Analytics)

---

## 🎯 Production URLs

After deployment, you'll have:

```
Production: https://your-app.vercel.app
Preview: https://your-app-git-branch.vercel.app (for each branch)
Custom: https://tfitimeline.com (if configured)
```

---

## 📈 Monitoring & Analytics

### Enable Vercel Analytics
```bash
1. Go to Vercel Dashboard > Analytics
2. Enable Web Analytics (free)
3. View real-time metrics
```

### Enable Vercel Speed Insights
```bash
1. Go to Vercel Dashboard > Speed Insights
2. Enable (free)
3. Monitor Core Web Vitals
```

---

## 🔐 Security Checklist

- [ ] All API keys in environment variables (not in code)
- [ ] Service role key only in server-side code
- [ ] Row-level security enabled in Supabase
- [ ] CORS configured correctly
- [ ] Rate limiting enabled (Vercel Edge Config)
- [ ] Input validation with Zod on all routes
- [ ] Authentication required for protected routes

---

## 🚀 Deployment Commands Reference

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs

# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback

# Add environment variable
vercel env add VARIABLE_NAME

# Pull environment variables
vercel env pull
```

---

## 📱 PWA Deployment Notes

Your PWA will automatically work on Vercel with:
- ✅ Service Worker caching
- ✅ Offline functionality
- ✅ Install prompt
- ✅ Push notifications

No additional configuration needed!

---

## 🎉 You're Live!

Once deployed, your TFI Timeline app will be:
- ✅ Live on the internet
- ✅ Accessible worldwide
- ✅ Auto-scaled by Vercel
- ✅ SSL secured (HTTPS)
- ✅ Edge-optimized
- ✅ Production-ready

**Share your app and impress investors! 🚀**
