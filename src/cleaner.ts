/**
 * Cookie Cleaner — Smart cookie cleanup utilities
 */
export class CookieCleaner {
    /** Clear all cookies for a domain */
    static async clearDomain(domain: string): Promise<number> {
        const cookies = await chrome.cookies.getAll({ domain });
        for (const cookie of cookies) {
            const protocol = cookie.secure ? 'https' : 'http';
            await chrome.cookies.remove({ url: `${protocol}://${cookie.domain}${cookie.path}`, name: cookie.name });
        }
        return cookies.length;
    }

    /** Clear all cookies */
    static async clearAll(): Promise<number> {
        const cookies = await chrome.cookies.getAll({});
        for (const cookie of cookies) {
            const protocol = cookie.secure ? 'https' : 'http';
            await chrome.cookies.remove({ url: `${protocol}://${cookie.domain}${cookie.path}`, name: cookie.name });
        }
        return cookies.length;
    }

    /** Clear cookies older than N days */
    static async clearOlderThan(days: number): Promise<number> {
        const cutoff = Date.now() / 1000 - days * 86400;
        const cookies = await chrome.cookies.getAll({});
        let count = 0;
        for (const cookie of cookies) {
            if (!cookie.expirationDate || cookie.expirationDate < cutoff) {
                const protocol = cookie.secure ? 'https' : 'http';
                await chrome.cookies.remove({ url: `${protocol}://${cookie.domain}${cookie.path}`, name: cookie.name });
                count++;
            }
        }
        return count;
    }

    /** Clear third-party cookies */
    static async clearThirdParty(currentDomain: string): Promise<number> {
        const cookies = await chrome.cookies.getAll({});
        let count = 0;
        for (const cookie of cookies) {
            if (!cookie.domain.includes(currentDomain)) {
                const protocol = cookie.secure ? 'https' : 'http';
                await chrome.cookies.remove({ url: `${protocol}://${cookie.domain}${cookie.path}`, name: cookie.name });
                count++;
            }
        }
        return count;
    }

    /** Get cookie stats */
    static async getStats(): Promise<{ total: number; domains: number; secure: number; httpOnly: number; session: number }> {
        const cookies = await chrome.cookies.getAll({});
        const domains = new Set(cookies.map((c) => c.domain));
        return {
            total: cookies.length, domains: domains.size,
            secure: cookies.filter((c) => c.secure).length,
            httpOnly: cookies.filter((c) => c.httpOnly).length,
            session: cookies.filter((c) => !c.expirationDate).length,
        };
    }

    /** Clear cookies matching name pattern */
    static async clearByName(pattern: RegExp): Promise<number> {
        const cookies = await chrome.cookies.getAll({});
        let count = 0;
        for (const cookie of cookies) {
            if (pattern.test(cookie.name)) {
                const protocol = cookie.secure ? 'https' : 'http';
                await chrome.cookies.remove({ url: `${protocol}://${cookie.domain}${cookie.path}`, name: cookie.name });
                count++;
            }
        }
        return count;
    }
}
