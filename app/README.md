# cantoncable.com

Official website of Guangzhou Cable Co., Ltd. — static site hosted on **Cloudflare Pages** with automatic deployment from this repository.

## Structure

| Path | Description |
|---|---|
| `index.html` | Homepage (About / Products / Why Us / Certifications entry / Contact) |
| `certificates.html` | Certificates & test-reports page — **edit the `CERTS` array in this file to add or remove certificates** |
| `assets/certificates/` | Certificate PDF files |
| `assets/img/` | Certificate cover thumbnails |
| `404.html`, `robots.txt`, `sitemap.xml`, `favicon.svg` | Site plumbing |

## How to update

1. Push changes to the `main` branch — Cloudflare Pages deploys automatically in ~1 minute.
2. To add a certificate: upload the PDF to `assets/certificates/`, optionally add a cover image to `assets/img/`, then copy one `{ ... }` entry inside the `CERTS` array in `certificates.html` and edit its fields.

详细中文操作步骤见仓库根目录的 **《操作指南.md》**。
