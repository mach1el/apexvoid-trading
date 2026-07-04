# Routing Snippet for `mach1el/routing`

> **DO NOT** apply this automatically. This file is a guide for manual integration into the `routing` repo.

---

## 1. Nginx Server Block

Add this server block to the routing repo's nginx configuration (e.g., `conf.d/trading.conf`):

```nginx
server {
    listen 80;
    server_name trading.apexvoid.net;

    # Routing health check
    location = /_routing/health {
        proxy_pass http://apexvoid-trading-frontend:80/_health;
        proxy_set_header Host $host;
    }

    location / {
        proxy_pass http://apexvoid-trading-frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 2. README Route Table Row

Add this row to the route table in the routing repo's README:

| Host | Path | Upstream |
|------|------|----------|
| `trading.apexvoid.net` | `/` | `apexvoid-trading-frontend:80` |

---

## 3. SSL Certificate Bootstrap

```bash
# Request certificate (adjust webroot path to match your routing repo's certbot setup)
certbot certonly --webroot -w /var/www/certbot --domain trading.apexvoid.net

# After cert is issued, recreate the router to pick up the new cert:
cd /path/to/routing
docker compose down && docker compose up -d
```

---

## 4. Prerequisites

- The `routing` external Docker network must exist before starting `apexvoid-trading-frontend`.
- Start the router first: `cd routing && docker compose up -d`
- Then start this app: `cd apexvoid-trading-kb && docker compose up -d --build`
