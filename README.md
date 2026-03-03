# chrome-cookie-cleaner

Manage and clean cookies in Chrome extensions with pattern matching.

## Overview

chrome-cookie-cleaner provides utilities to manage cookies, set expiration, and clean cookies by domain or pattern.

## Installation

```bash
npm install chrome-cookie-cleaner
```

## Usage

### Get Cookies

```javascript
import { CookieManager } from 'chrome-cookie-cleaner';

const cookies = await CookieManager.getAll({
  url: 'https://example.com',
});

console.log(cookies.map(c => c.name));
```

### Set Cookie

```javascript
await CookieManager.set({
  url: 'https://example.com',
  name: 'session',
  value: 'abc123',
  expirationDate: Date.now() / 1000 + 86400, // 1 day
  secure: true,
  sameSite: 'strict',
});
```

### Clean Cookies

```javascript
// Delete all cookies from domain
await CookieManager.clean('example.com');

// Delete by pattern
await CookieManager.cleanPattern('*tracker*');

// Delete all extension cookies
await CookieManager.cleanAll();
```

## API

### Methods

- `getAll(filter?)` - Get cookies matching filter
- `set(cookie)` - Set a cookie
- `remove(cookie)` - Remove a cookie
- `clean(domain)` - Clean cookies for domain
- `cleanPattern(pattern)` - Clean by pattern
- `cleanAll()` - Clean all cookies

### Filter Options

| Option | Type | Description |
|--------|------|-------------|
| url | string | Filter by URL |
| name | string | Filter by name |
| domain | string | Filter by domain |
| path | string | Filter by path |
| secure | boolean | Filter by secure flag |
| session | boolean | Filter session cookies |

## Manifest

```json
{
  "permissions": ["cookies"]
}
```

## Browser Support

- Chrome 90+

## License

MIT
