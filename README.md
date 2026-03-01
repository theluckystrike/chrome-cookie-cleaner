# chrome-cookie-cleaner — Cookie Cleanup for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i chrome-cookie-cleaner`

Clear by domain, age, third-party, name pattern, and get cookie stats.

```typescript
import { CookieCleaner } from 'chrome-cookie-cleaner';
await CookieCleaner.clearThirdParty('mysite.com');
await CookieCleaner.clearOlderThan(30);
const stats = await CookieCleaner.getStats();
```
MIT License
