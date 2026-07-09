Deploying Frontend to Vercel

1. Connect repository to Vercel.
2. Create a new project and select this repo.
3. Set Build Command: `npm run build` and Output Directory: `dist`.
4. Environment Variables (optional): `VITE_API_BASE` (e.g., https://api.yourdomain)
5. Deploy. Vercel will provide a domain; point your DNS to it.

Notes
- If your API is on Render, set `VITE_API_BASE` in Vercel to your Render service URL and update `Frontend/src/services/api.js` to use `import.meta.env.VITE_API_BASE` as the baseURL.
