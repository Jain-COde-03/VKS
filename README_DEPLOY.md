Production deployment using Docker + Traefik (Let's Encrypt)

Overview
- Traefik acts as the reverse proxy and obtains TLS certs automatically via Let's Encrypt.
- Backend and frontend are built into containers and served behind Traefik.

Prerequisites
- A DNS A/AAAA record for `DOMAIN` pointing to the server's public IP.
- Docker and docker-compose installed on the host.
- Create a `.env.prod` file from `.env.prod.example` and fill values.

Basic deploy steps

1. Copy example to `.env.prod` and edit:

```bash
cp .env.prod.example .env.prod
# edit .env.prod and set DOMAIN, LETSENCRYPT_EMAIL, MONGODB_URI, JWT_SECRET
```

2. Build and start services:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

3. Confirm Traefik obtained certificates and services are reachable at `https://${DOMAIN}`.

Notes & security
- The ACME storage is persisted in a Docker volume (`traefik-lets-encrypt`). Keep backups of it if migrating.
- In production, ensure `JWT_SECRET` and DB credentials are strong and kept secret (use a secret manager when possible).
- Ensure database access is restricted to the application IP when possible.

Alternatives
- If you prefer nginx + certbot, I can add a `docker-compose` variant that runs certbot on the host and uses nginx as reverse proxy.
