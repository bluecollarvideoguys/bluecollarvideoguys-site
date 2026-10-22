/**
 * Pings IndexNow (Bing, Yandex, and other participating engines) with every
 * URL in the live sitemap so new and updated pages get crawled fast.
 * Run after a deploy goes live:  npm run indexnow
 * Google does not use IndexNow; it reads the sitemap submitted in Search Console.
 */
const HOST = "www.bluecollarvideoguys.com";
const KEY = "e20559c0954b45678a69b9213923b9ee";

const sitemap = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!urlList.length) {
  console.error("No URLs found in the sitemap. Is the site live?");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: submitted ${urlList.length} URLs, status ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
