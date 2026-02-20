# Aria Backend – Deployment Guide

## What's Included

```
aria-backend/
├── api/
│   └── chat.js          ← Secure backend (hides your API key)
├── public/
│   └── index.html       ← Aria chatbot frontend
└── vercel.json          ← Vercel configuration
```

---

## Step 1 – Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **"New repository"**
3. Name it `aria-backend`
4. Click **"Create repository"**
5. Upload all three files maintaining the folder structure above

---

## Step 2 – Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"**
3. Select your `aria-backend` repository
4. Click **"Deploy"** (Vercel auto-detects the settings)

---

## Step 3 – Add Your API Key (Most Important!)

After deploying:

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Name: `ANTHROPIC_API_KEY`
4. Value: paste your `sk-ant-...` key
5. Click **Save**
6. Go to **Deployments** → click the three dots on your latest deployment → **Redeploy**

This keeps your API key 100% secret — it never appears in the browser.

---

## Step 4 – Test It

1. Visit your Vercel URL (e.g., `https://aria-backend.vercel.app`)
2. Aria should greet you and respond to messages
3. Share this URL with your dental client for demo purposes!

---

## Step 5 – Embed on a Client's Website (Optional)

To add Aria as a chat widget on an existing website, add this iframe anywhere in the site's HTML:

```html
<iframe 
  src="https://YOUR-VERCEL-URL.vercel.app" 
  width="480" 
  height="620" 
  style="border:none; border-radius:20px; box-shadow:0 8px 32px rgba(0,0,0,0.15);"
></iframe>
```

---

## Costs

- **Vercel hosting**: Free
- **Anthropic API**: Pay per use — roughly $0.01–$0.05 per full conversation with claude-haiku
- A busy dental office with 100 chats/day ≈ ~$1–5/month

---

## Customizing Aria

To change Aria's personality, services, or dental practice name, edit the `system` prompt inside `api/chat.js`.

For questions, reach out to your developer. 🦷
