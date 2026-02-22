# Ultimate A-Z Guide: Deploying the UMCA React App Online for Free

This guide walks you through the exact steps to take your local React application and publish it live on the internet for free, using GitHub and Vercel.

## Phase 1: Prepare Your Project for the Web

Before uploading, we need to ensure the app handles page routing (like `/about` or `/contact`) correctly once it's on a live server.

### Step 1: Create a Vercel Configuration File
1. Open your project in VS Code.
2. In the root directory (the very top folder, alongside `package.json`), create a new file named exactly: `vercel.json`
3. Paste the following code into `vercel.json` and save the file:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
*Why do we need this?* Because this is a Single Page Application (SPA) using React Router. If someone directly visits `yourwebsite.com/contact`, the server needs to know to load `index.html` first so React can handle the routing.

## Phase 2: Upload Your Code to GitHub

GitHub will host your code, and Vercel will automatically read from GitHub to build your website. 

### Step 1: Create a GitHub Account and Repository
1. Go to [GitHub.com](https://github.com/) and create an account (or log in).
2. Look for the **"+"** icon in the top right corner and click **"New repository"**.
3. Name your repository (e.g., `umca-website`).
4. Keep it **Public** (or Private, up to you).
5. Do NOT check "Add a README file". Let it be completely empty.
6. Click the green **"Create repository"** button.

### Step 2: Push Your Local Code to GitHub
1. Open up a terminal inside your VS Code project (Terminal -> New Terminal). Make sure you are in `g:/Projects/UMCA`.
2. Run these exact Git commands, one by one, pressing Enter after each:

```bash
git init
git add .
git commit -m "Initial commit of UMCA website"
git branch -M main
```

3. Go back to the empty GitHub repository page you just created. Look for the section that says **"…or push an existing repository from the command line"**.
4. Copy the two commands they give you and paste them into your VS Code terminal. They will look exactly like this (but with your username):

```bash
git remote add origin https://github.com/YourUsername/umca-website.git
git push -u origin main
```

Refresh your GitHub repository page. You should now see all your project files!

## Phase 3: Deploy to Vercel

Vercel is the easiest and fastest way to host Vite/React applications.

### Step 1: Connect to Vercel
1. Go to [Vercel.com](https://vercel.com/) and click **"Sign Up"**.
2. Important: Choose **"Continue with GitHub"** so Vercel can access your code.
3. Once logged in to Vercel's dashboard, click the black **"Add New..."** button in the top right and select **"Project"**.

### Step 2: Import Your Repository
1. You will see a list of your GitHub repositories. Find the `umca-website` repository you just created.
2. Click the **"Import"** button next to it.

### Step 3: Configure and Deploy
1. Vercel will bring you to a "Configure Project" screen. 
2. Vercel is extremely smart—it will automatically detect that you've built this with "Vite".
3. You don't need to change *anything*. The defaults for the Build Command (`npm run build`) and Output Directory (`dist`) are already perfect.
4. Click the big **"Deploy"** button.

### Step 4: Wait for the Magic!
1. Vercel will now download your code, run `npm run build`, and publish the contents. This usually takes less than 60 seconds.
2. You will see fireworks on the screen when it's done!
3. Click the **"Continue to Dashboard"** button.
4. On your dashboard, you will see a "DOMAINS" button or a link that looks something like `umca-website.vercel.app`. **Click it. Your website is now live on the internet!**

## Phase 4: Future Updates (Automatic!)

The best part about this setup is that Vercel is directly connected to your GitHub. 

If you make any changes to the code in the future:
1. Save your files in VS Code.
2. Open your terminal and run:
   ```bash
   git add .
   git commit -m "Updated some text on the homepage"
   git push
   ```
3. Vercel will automatically detect the push, rebuild your website, and update the live URL within a minute. You never need to log into Vercel to click "Deploy" again!
