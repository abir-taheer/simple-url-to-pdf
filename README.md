# PDF Generation API

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/abir-taheer/simple-url-to-pdf)


A service that generates PDFs from web pages using Puppeteer.

## Base URL
```
https://pdf-api.mass.build
```

## Endpoints

### Generate PDF
Convert a webpage to PDF format.

#### `POST /api/render`
```json
{
  "url": "https://example.com",
  "goto": {
    // Optional Puppeteer GoTo options
    // See: https://pptr.dev/api/puppeteer.gotooptions
  },
  "pdf": {
    // Optional PDF generation options
    // See: https://pptr.dev/api/puppeteer.pdfoptions
  }
}
```

#### `GET /api/render`
```
/api/render?url=https://example.com
```

## Security Rules

### URL Restrictions
- URLs must be valid and properly formatted
- If `ALLOWED_PREFIXES` environment variable is set, URLs must start with one of the allowed prefixes
- If `ALLOWED_PREFIXES` is empty, all valid URLs are allowed

### CORS
- CORS restrictions are enforced based on the `ALLOWED_CORS` environment variable
- If `ALLOWED_CORS` is empty, all origins are allowed
- Origins must match exactly with the whitelist entries

## Response

### Success
- Content-Type: `application/pdf`
- Body: PDF file buffer

### Errors

#### 400 Bad Request
```json
{
  "status": "error",
  "message": "Invalid URL"
}
```

#### 403 Forbidden
```json
{
  "status": "error",
  "message": "This URL is not allowed"
}
```

## Environment Variables

| Variable | Description | Format |
|----------|-------------|---------|
| `ALLOWED_PREFIXES` | Comma-separated list of allowed URL prefixes | `prefix1, prefix2, ...` |
| `ALLOWED_CORS` | Comma-separated list of allowed CORS origins | `origin1, origin2, ...` |

## Examples

### Basic PDF Generation
```bash
curl -X POST https://pdf-api.mass.build/api/render \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### With Custom PDF Options
```bash
curl -X POST https://pdf-api.mass.build/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "pdf": {
      "format": "A4",
      "printBackground": true
    }
  }'
```

### Using GET Request
```bash
curl https://pdf-api.mass.build/api/render?url=https://example.com
```
