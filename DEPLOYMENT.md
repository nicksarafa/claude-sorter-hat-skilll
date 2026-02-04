# 🚀 Deployment Guide

This guide will help you deploy the Sorting Hat to the web so anyone can use it!

## Overview

The Sorting Hat has two parts:
1. **Frontend** (HTML/CSS/JavaScript) - Deploy on **Surge** ✨
2. **Backend** (Node.js server) - Deploy on **Railway**, **Render**, or run locally

---

## Option 1: Frontend on Surge + Backend Locally (Easiest for Testing)

Perfect for: Testing with family on your local network

### Step 1: Deploy Frontend to Surge

```bash
# Install Surge globally
npm install -g surge

# Run the deployment script
./deploy-surge.sh
```

When prompted, enter: `http://localhost:3000` (your local backend)

**Note:** This only works when your computer is running the backend server!

### Step 2: Keep Backend Running Locally

```bash
npm start
```

**Access:** Go to `https://sorting-hat.surge.sh` (or your custom domain)

---

## Option 2: Frontend on Surge + Backend on Railway (Best for Production)

Perfect for: Sharing with friends/family anywhere

### Step 1: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app/)** and sign up (free tier available)

2. **Click "New Project"** → "Deploy from GitHub repo"

3. **Connect your GitHub:**
   - Push this project to GitHub first:
     ```bash
     git remote add origin your-github-url
     git push -u origin main
     ```
   - Or create a new repo on Railway and push the backend folder

4. **Configure Railway:**
   - Click "Add variables"
   - Add: `ANTHROPIC_API_KEY` = your API key
   - Add: `PORT` = 3000
   - Add: `NODE_ENV` = production

5. **Set root directory to `backend/`** in Railway settings

6. **Deploy!** Railway will give you a URL like:
   `https://your-app.railway.app`

### Step 2: Deploy Frontend to Surge

```bash
./deploy-surge.sh
```

When prompted, enter your Railway URL:
```
https://your-app.railway.app
```

**Done!** Visit `https://sorting-hat.surge.sh`

---

## Option 3: Frontend on Surge + Backend on Render

Perfect for: Alternative to Railway (also has free tier)

### Step 1: Deploy Backend to Render

1. **Go to [Render.com](https://render.com/)** and sign up

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repo**

4. **Configure:**
   - Name: `sorting-hat-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `backend`

5. **Add Environment Variables:**
   - `ANTHROPIC_API_KEY` = your API key
   - `NODE_ENV` = production

6. **Deploy!** Get your URL like:
   `https://sorting-hat-backend.onrender.com`

### Step 2: Deploy Frontend to Surge

```bash
./deploy-surge.sh
```

Enter your Render URL when prompted.

---

## Option 4: Custom Domain on Surge

Want your own domain like `sorting-hat.yourdomain.com`?

### Step 1: Update CNAME file

Edit the `CNAME` file in the project root:
```
your-custom-domain.com
```

### Step 2: Configure DNS

Add a CNAME record in your domain provider:
```
CNAME  @  na-west1.surge.sh
```

### Step 3: Deploy with Custom Domain

```bash
cd frontend
surge . your-custom-domain.com
```

---

## Manual Deployment Steps

If you prefer to deploy manually:

### Deploy Frontend Manually

```bash
# Install Surge
npm install -g surge

# Login to Surge (first time only)
surge login

# Edit frontend/config.js with your backend URL
# Then deploy
cd frontend
surge . sorting-hat.surge.sh
```

### Deploy Backend Manually (Railway CLI)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

---

## Environment Configuration

### Frontend Config (frontend/config.js)

The deployment script creates this automatically, but you can edit it:

```javascript
const config = {
  API_BASE_URL: 'https://your-backend-url.com',
  MAX_IMAGE_SIZE: 10 * 1024 * 1024,
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/heic']
};
window.APP_CONFIG = config;
```

### Backend Config (.env)

On Railway/Render, set these environment variables:
```
ANTHROPIC_API_KEY=your-api-key
PORT=3000
NODE_ENV=production
```

---

## Cost Estimates

### Free Tiers:
- **Surge:** Free (with surge.sh domain)
- **Railway:** $5 credit/month (enough for ~500 sortings)
- **Render:** Free tier available (sleeps after inactivity)

### Paid (if needed):
- **Railway:** ~$10-20/month for consistent uptime
- **Render:** ~$7/month for always-on
- **Custom domain:** ~$10-15/year

---

## CORS Configuration

The backend already has CORS enabled for all origins. If you need to restrict it:

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: 'https://sorting-hat.surge.sh'
}));
```

---

## Testing Your Deployment

### 1. Test Backend Health

```bash
curl https://your-backend-url.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "The Sorting Hat is ready!"
}
```

### 2. Test Frontend

Open `https://sorting-hat.surge.sh` and try sorting something!

### 3. Check Browser Console

Open Developer Tools (F12) and check for any errors.

---

## Troubleshooting

### "Failed to connect to backend"

**Problem:** Frontend can't reach backend

**Solutions:**
1. Check backend is running: `curl https://your-backend-url/api/health`
2. Verify `frontend/config.js` has correct backend URL
3. Check CORS settings in `backend/server.js`

### "API key invalid"

**Problem:** Backend API key not set correctly

**Solutions:**
1. Check Railway/Render environment variables
2. Make sure key starts with `sk-ant-`
3. Redeploy backend after adding key

### "Surge deployment failed"

**Problem:** Surge CLI issues

**Solutions:**
```bash
# Update Surge
npm install -g surge@latest

# Login again
surge login

# Try deploying manually
cd frontend
surge .
```

### "Backend sleeps on Render free tier"

**Problem:** Render free tier sleeps after 15 minutes of inactivity

**Solutions:**
1. Upgrade to paid tier ($7/month)
2. Use Railway instead (better free tier)
3. Use UptimeRobot to ping your backend every 10 minutes

---

## Quick Reference

### Deploy Frontend
```bash
./deploy-surge.sh
```

### Update Frontend Only
```bash
cd frontend
surge . sorting-hat.surge.sh
```

### View Surge Deployments
```bash
surge list
```

### Remove Surge Deployment
```bash
surge teardown sorting-hat.surge.sh
```

---

## Security Notes

1. **Never commit API keys** - Use environment variables
2. **Use HTTPS** - Both Surge and Railway/Render provide this automatically
3. **Rate limiting** - Consider adding rate limiting to your backend in production
4. **Image size limits** - Already configured (10MB max)

---

## Next Steps After Deployment

1. **Test thoroughly** - Try all input types (images, webcam, text)
2. **Share the link** - Send to family and friends!
3. **Monitor usage** - Check Railway/Render dashboard for API usage
4. **Add analytics** (optional) - Google Analytics or similar
5. **Custom domain** (optional) - Make it memorable!

---

## Support

- Surge docs: https://surge.sh/help
- Railway docs: https://docs.railway.app
- Render docs: https://render.com/docs

---

**Happy Deploying!** 🎩✨

Your Sorting Hat will be accessible to anyone on the internet!
