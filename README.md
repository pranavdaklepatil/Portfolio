# ☁️ Portfolio - CI/CD Pipeline: GitHub Actions → S3 → CloudFront

> **Fully automated deployment pipeline** - every `git push` to `main` builds the Vite app and ships it to a globally distributed AWS CloudFront CDN via S3. Zero manual steps.

---

## 📌 Overview

This project implements a **production-grade CI/CD pipeline** that automates the full delivery lifecycle - from source commit to globally cached CDN - using GitHub Actions, Amazon S3, and Amazon CloudFront.

```
                               git push (main)
                                    │
                                    ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │                    GitHub Actions Runner                        │
        │                      ubuntu-latest                              │
        │                                                                 │
        │  Checkout → Node 20 Setup → npm ci → Vite Build → AWS Deploy    │
        └────────────────────────┬────────────────────────────────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  ▼                             ▼
           aws s3 sync dist/            CloudFront Invalidation
           s3://[bucket] --delete            --paths "/*"
                  │                             │
                  └──────────────┬──────────────┘
                                 ▼
                        CloudFront CDN (Global Edge)
                                 │
                                ▼
                           End Users 🌍
```

---

## 🏗️ Infrastructure

| Layer | AWS Service | Purpose |
|-------|------------|---------|
| **Build Artifact Storage** | Amazon S3 | Stores compiled `dist/` output; acts as CloudFront origin |
| **Content Delivery** | Amazon CloudFront | Global CDN with edge caching; serves content over HTTPS |
| **CI/CD Orchestration** | GitHub Actions | Runs the pipeline on every push to `main` |
| **Secrets Management** | GitHub Encrypted Secrets | Stores AWS credentials and resource identifiers securely |

---

## 🚀 Pipeline - Stage by Stage

Defined in `.github/workflows/main.yml`:

| # | Step | Action / Command | Details |
|---|------|-----------------|---------|
| 1 | **Checkout** | `actions/checkout@v4` | Clones repo at the triggering commit SHA |
| 2 | **Node.js Setup** | `actions/setup-node@v4` | Node 20, with `npm` cache enabled |
| 3 | **Install Dependencies** | `npm ci` | Clean install from `package-lock.json` - deterministic builds |
| 4 | **Build** | `npm run build` | Vite compiles & bundles output into `dist/` |
| 5 | **Configure AWS** | `aws-actions/configure-aws-credentials@v4` | Authenticates runner with AWS using GitHub Secrets |
| 6 | **S3 Sync** | `aws s3 sync dist/ s3://[bucket] --delete` | Syncs only changed files; `--delete` removes stale objects |
| 7 | **Cache Invalidation** | `aws cloudfront create-invalidation --paths "/*"` | Forces CDN edges to fetch the latest build |

> The `--delete` flag on `s3 sync` ensures removed files don't linger in the bucket between deployments.

---

## 🔐 GitHub Secrets Configuration

Navigate to **Settings → Secrets and Variables → Actions → New repository secret** and add:

| Secret Name | Description |
|-------------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM user access key ID |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret access key |
| `AWS_REGION` | AWS region of the S3 bucket (e.g. `ap-south-1`) |
| `S3_BUCKET_NAME` | Name of the target S3 bucket |
| `CLOUDFRONT_DIST_ID` | CloudFront distribution ID (e.g. `E1ABCDEF123456`) |

> ⚠️ **Never** hardcode credentials in workflow files or source code. All sensitive values must live exclusively in GitHub Encrypted Secrets.

---

## 🛡️ IAM Policy - Minimum Required Permissions

Create a dedicated IAM user for CI/CD with **only** these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3DeployAccess",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DIST_ID"
    }
  ]
}
```

> 💡 **Principle of Least Privilege** - this IAM user can only sync to the specific S3 bucket and invalidate the specific CloudFront distribution. No other AWS access is granted.

---

## 📋 Complete Workflow File
[main.yml](.github\workflows\main.yml)

```yaml
name: Deploy Portfolio to S3 + CloudFront

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Vite App
        run: npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Deploy to S3
        run: aws s3 sync dist/ s3://$S3_BUCKET_NAME --delete
        env:
          S3_BUCKET_NAME: ${{ secrets.S3_BUCKET_NAME }}

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id $CLOUDFRONT_DIST_ID \
            --paths "/*"
        env:
          CLOUDFRONT_DIST_ID: ${{ secrets.CLOUDFRONT_DIST_ID }}
```

---

## 🌐 AWS Configuration Notes

### S3 Bucket
- **Block all public access**: ✅ Enabled - objects served exclusively through CloudFront, never directly
- **Static website hosting**: Not required when using CloudFront with OAC
- **Origin Access Control (OAC)**: Recommended over legacy OAI - restricts S3 access to CloudFront only
- **Versioning**: Optional, useful for rollback to previous builds

### CloudFront Distribution

| Setting | Recommended Value |
|---------|------------------|
| **Origin** | S3 bucket via OAC (Origin Access Control) |
| **Viewer Protocol Policy** | Redirect HTTP → HTTPS |
| **Default Root Object** | `index.html` |
| **Cache Policy** | `CachingOptimized` for assets; `no-cache` for `index.html` |
| **Custom Error Pages** | `403` / `404` → `/index.html` (required for client-side routing) |
| **Price Class** | `PriceClass_100` (US/EU) or `PriceClass_All` for global reach |

---

## 🔄 End-to-End Deployment Flow

```
1.  Developer runs:  git push origin main
2.  GitHub detects push → triggers Actions workflow
3.  ubuntu-latest runner spins up
4.  Repo checked out at exact commit SHA
5.  Node 20 installed; npm cache restored
6.  npm ci → deterministic dependency install
7.  npm run build → Vite outputs optimised assets to dist/
8.  AWS credentials configured via GitHub Secrets
9.  aws s3 sync → only changed files uploaded; deleted files removed (--delete)
10. aws cloudfront create-invalidation → CDN cache purged globally (/* paths)
11. CloudFront edges pull fresh content → live in ~1–3 minutes
```

---

## ⚡ Local Development

```bash
# Clone the repository
git clone https://github.com/pranavdaklepatil/portfolio.git
cd portfolio

# Install dependencies
npm ci

# Start local dev server
npm run dev

# Preview production build locally
npm run build && npm run preview
```

---

## 👤 Author

**Pranav Dakle patil**  
DevOps Engineer  
[github.com/pranavdaklepatil](https://github.com/pranavdaklepatil)

---
