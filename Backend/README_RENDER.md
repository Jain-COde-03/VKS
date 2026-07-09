Deploying Backend to Render

Steps

1. Create a new Web Service on Render:
   - Connect your GitHub repository.
   - Select 'Web Service'.
   - Branch: main (or your deploy branch).
   - Environment: Node.
   - Build Command: `npm install`
   - Start Command: `npm run start`

2. Set Environment Variables in the Render dashboard (Service -> Environment):
   - `MONGODB_URI` — your MongoDB connection string
   - `JWT_SECRET` — a secure random string
   - `FRONTEND_URL` — https://your-frontend-domain
   - `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` (optional)
   - Any Cloudinary keys (optional)

3. Health Checks & Ports
   - Render exposes port from `process.env.PORT`; your app already reads `process.env.PORT || 5000`.
   - Optionally enable a health check path (e.g., `/api/health`) in Render settings.

4. Webhooks
   - If using external payment providers (Razorpay), set webhook endpoints in the provider dashboard to `https://<your-backend>/api/payment/webhook` and verify signatures.

5. Deployment
   - Trigger deploy on push to the configured branch. Verify logs in Render dashboard.

Notes
- For sessions and cookies, Render uses a managed domain; ensure `FRONTEND_URL` is set and CORS/cookie SameSite settings are configured for cross-site cookies if necessary.
- Use Render Secrets to store sensitive values.
