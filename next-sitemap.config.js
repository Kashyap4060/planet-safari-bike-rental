/**
 * next-sitemap configuration.
 * Update `siteUrl` once a custom domain is attached in Vercel.
 * Keep this in sync with `business.siteUrl` in src/data/business.ts.
 *
 * @type {import('next-sitemap').IConfig}
 */
module.exports = {
  siteUrl:
    process.env.SITE_URL || 'https://planet-safari-bike-rental.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
