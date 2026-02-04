# 🚀 Surge Deployment - Quick Start

Deploy your Sorting Hat to the web in 5 minutes!

## What You'll Get

- **Frontend URL:** `https://sorting-hat.surge.sh` (free!)
- **Backend:** Choose where to host (see options below)

---

## Super Quick Deploy (For Testing)

### 1. Install Surge

```bash
npm run install:surge
```

Or manually:
```bash
npm install -g surge
```

### 2. Deploy with Script

```bash
npm run deploy
```

Follow the prompts:
1. Enter your backend URL
2. Surge will ask you to login (first time only)
3. Confirm deployment

**Done!** Your Sorting Hat is live at `https://sorting-hat.surge.sh`

---

## Backend Options

You need to host the backend somewhere. Here are your options:

### Option A: Keep Running Locally (Easiest)

**Use when:** Testing with family on your network only

1. Keep your computer running with `npm start`
2. When deploying to Surge, enter: `http://localhost:3000`

**Note:** Only works when your computer is on and running the server!

### Option B: Deploy to Railway (Recommended)

**Use when:** You want anyone on the internet to access it

**Free tier:** $5 credit/month (~500 sortings)

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up (GitHub account)
3. Click "New Project" → "Deploy from GitHub"
4. Connect this repo
5. Add environment variables:
   - `ANTHROPIC_API_KEY` = your API key
   - `NODE_ENV` = production
6. Deploy!
7. Copy your Railway URL (e.g., `https://your-app.railway.app`)
8. Use this URL when deploying to Surge

**Cost:** Free tier then ~$10-20/month if you exceed it

### Option C: Deploy to Render

**Use when:** Alternative to Railway (also has free tier)

**Free tier:** Available but sleeps after 15 mins of inactivity

**Steps:**
1. Go to [render.com](https://render.com)
2. Sign up
3. Click "New +" → "Web Service"
4. Connect GitHub repo
5. Configure:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
6. Add `ANTHROPIC_API_KEY` in Environment
7. Deploy!
8. Copy your Render URL
9. Use when deploying to Surge

**Cost:** Free (with sleep) or $7/month for always-on

---

## Step-by-Step First Deploy

### 1. Choose Your Backend

Pick one of the options above. For this guide, we'll use Railway:

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository
5. Railway will detect Node.js automatically

### 2. Configure Railway

In Railway settings:
- Add variable: `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`
- Add variable: `NODE_ENV` = `production`
- Save and wait for deploy

Copy your Railway URL (looks like: `https://sorting-hat-production.up.railway.app`)

### 3. Deploy Frontend to Surge

```bash
npm run deploy
```

When prompted:
```
Enter your backend URL: https://sorting-hat-production.up.railway.app
```

Surge will ask you to:
1. Create account (first time) or login
2. Confirm deployment

### 4. Test It!

Open: `https://sorting-hat.surge.sh`

Try sorting something:
- Type: "a brave lion"
- Upload a photo
- Use webcam

---

## Updating Your Deployment

### Update Frontend Only

```bash
npm run deploy:frontend
```

### Update Backend Only

**Railway:** Just push to GitHub, Railway auto-deploys

**Render:** Push to GitHub or click "Manual Deploy"

---

## Custom Domain (Optional)

Want `sorting-hat.yourdomain.com` instead of `sorting-hat.surge.sh`?

### 1. Edit CNAME file

```bash
echo "sorting-hat.yourdomain.com" > CNAME
```

### 2. Update your DNS

Add CNAME record at your domain provider:
```
CNAME  sorting-hat  na-west1.surge.sh
```

### 3. Deploy with Custom Domain

```bash
cd frontend
surge . sorting-hat.yourdomain.com
```

---

## Troubleshooting

### "Surge command not found"

```bash
npm install -g surge
```

### "Permission denied: ./deploy-surge.sh"

```bash
chmod +x deploy-surge.sh
```

### "Can't connect to backend"

1. Check backend is running:
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. Make sure `frontend/config.js` has correct URL

3. Check browser console (F12) for errors

### "API calls failing"

- Verify Railway/Render has correct `ANTHROPIC_API_KEY`
- Check API key starts with `sk-ant-`
- Look at Railway/Render logs for errors

---

## Quick Commands

```bash
# Install Surge globally
npm run install:surge

# Deploy everything (runs the script)
npm run deploy

# Deploy frontend only (after script has run once)
npm run deploy:frontend

# View all your Surge deployments
surge list

# Remove a deployment
surge teardown sorting-hat.surge.sh
```

---

## What Gets Deployed

**To Surge (Frontend):**
- All HTML, CSS, JavaScript files
- Images, fonts (if you add them)
- Config with your backend URL

**To Railway/Render (Backend):**
- Node.js server
- Claude API integration
- Sorting logic
- House database

---

## Costs Summary

### Free Option
- **Surge:** Free
- **Backend:** Run locally
- **Total:** $0

### Hobby Option (Recommended)
- **Surge:** Free
- **Railway:** $5 credit/month (free tier)
- **Total:** ~$0-10/month depending on usage

### Production Option
- **Surge:** Free (or $30/year for custom domain)
- **Railway:** ~$10-20/month
- **Total:** ~$10-20/month

---

## Next Steps

1. ✅ Deploy to Surge
2. ✅ Test the sorting
3. Share the link with family!
4. Optional: Add custom domain
5. Optional: Add analytics

---

**Need More Help?**

See the full `DEPLOYMENT.md` for detailed instructions and more options!

---

🎩✨ **Your Sorting Hat is ready to go online!**
