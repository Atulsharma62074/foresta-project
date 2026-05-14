# Foresta Backend API

## ⚠️ Node.js Version Requirement

This backend requires **Node.js 14 or higher**.

### Check your version:
```bash
node --version
```

### If your version is below 14, upgrade using NVM:
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install and use Node 18
nvm install 18
nvm use 18
nvm alias default 18

# Verify
node --version  # should show v18.x.x
```

## Quick Start

```bash
# 1. Copy and fill environment variables
cp .env.example .env

# 2. Install dependencies (after upgrading Node)
npm install

# 3. Start in development mode
npm run dev

# 4. Start in production
npm start
```

## The backend starts on http://localhost:5000
## Health check: http://localhost:5000/health
