# Deployment Guide - Vercel & Railway

This guide covers deploying the Retention Metrics Dashboard:
- **Frontend (React)**: Deploy to Vercel
- **Backend (Flask)**: Deploy to Railway

## Prerequisites

- GitHub account (for connecting repositories)
- Vercel account (free tier available)
- Railway account (free tier available)
- UV package manager (for local development)

## Backend Deployment on Railway

### Step 1: Prepare Your Repository

1. Make sure your `requirements.txt` includes `gunicorn`:
   ```bash
   uv pip install gunicorn
   uv pip freeze > requirements.txt
   ```

2. Ensure you have a `Procfile` in the root directory (already created):
   ```
   web: gunicorn -w 4 -b 0.0.0.0:$PORT app:app
   ```

### Step 2: Deploy to Railway

1. **Connect Repository:**
   - Go to [Railway](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Environment Variables:**
   In Railway dashboard, add these environment variables:
   ```
   PORT=8000 (Railway sets this automatically, but you can override)
   RETENTION_PERIOD=11186400
   FLASK_DEBUG=False
   ```

3. **Railway Auto-Detection:**
   - Railway will automatically detect Python
   - It will run: `pip install -r requirements.txt`
   - Then start using the Procfile

4. **Using UV (Optional):**
   If you want to use UV on Railway, you can:
   - Add a custom build command in Railway settings:
     ```
     uv pip install -r requirements.txt gunicorn
     ```
   - Or modify `railway.json` (already created) to use UV

5. **Get Your Railway URL:**
   - Railway will provide a URL like: `https://your-app-name.railway.app`
   - Copy this URL - you'll need it for Vercel configuration

### Step 3: Upload Data Files

Railway needs access to your CSV files. You have a few options:

**Option A: Include in Repository (Recommended for small files)**
- Commit `reg_data.csv` and `auth_data.csv` to your repo
- Railway will have access to them

**Option B: Use Railway Volumes**
- In Railway dashboard, add a volume
- Upload files via Railway CLI or dashboard

**Option C: Use External Storage**
- Store files in S3, Google Cloud Storage, etc.
- Update `app.py` to fetch from external source

## Frontend Deployment on Vercel

### Step 1: Prepare Frontend

1. **Update API URL:**
   - The frontend uses `REACT_APP_API_URL` environment variable
   - For local development, it defaults to `http://localhost:8000`
   - For production, set it to your Railway URL

### Step 2: Deploy to Vercel

1. **Connect Repository:**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - **Important**: Set the root directory to `frontend`

2. **Configure Build Settings:**
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build` (or `npm run vercel-build`)
   - Output Directory: `build`

3. **Set Environment Variables:**
   In Vercel dashboard, add:
   ```
   REACT_APP_API_URL=https://your-railway-app.railway.app
   ```
   Replace with your actual Railway URL

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your React app
   - You'll get a URL like: `https://your-app.vercel.app`

## Local Development Setup

### Backend (with UV):
```bash
uv pip install -r requirements.txt
python app.py
```

### Frontend:
```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:8000 npm start
```

Or create a `.env` file in the `frontend` directory:
```
REACT_APP_API_URL=http://localhost:8000
```

## Environment Variables Summary

### Railway (Backend):
- `PORT` - Automatically set by Railway
- `RETENTION_PERIOD` - Retention period in seconds (default: 11186400)
- `FLASK_DEBUG` - Set to `False` for production

### Vercel (Frontend):
- `REACT_APP_API_URL` - Your Railway backend URL (e.g., `https://your-app.railway.app`)

## Troubleshooting

### CORS Issues
- The backend is configured to allow all origins
- If you still see CORS errors, check that your Railway URL is correct

### Data Files Not Found
- Make sure CSV files are in the repository or accessible to Railway
- Check file paths in `app.py` are relative to the app root

### Build Failures
- **Railway**: Check that `requirements.txt` includes all dependencies
- **Vercel**: Ensure `package.json` has the correct build script
- Check build logs in both platforms for specific errors

## Updating Deployments

### Backend (Railway):
- Push changes to your GitHub repository
- Railway will automatically redeploy

### Frontend (Vercel):
- Push changes to your GitHub repository
- Vercel will automatically redeploy
- If you change the Railway URL, update the `REACT_APP_API_URL` in Vercel

## Cost Considerations

- **Vercel**: Free tier includes generous limits for personal projects
- **Railway**: Free tier includes $5/month credit
- Both platforms offer paid plans for higher usage

## Next Steps

1. Deploy backend to Railway
2. Get Railway URL
3. Deploy frontend to Vercel with Railway URL as environment variable
4. Test the full stack deployment
5. Set up custom domains (optional)
