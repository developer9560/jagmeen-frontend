import sitemap from '../sitemap';

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  }[character] || character));
}

export async function GET() {
  const entries = await sitemap();
  const urls = entries.map((entry) => {
    const lastModified = entry.lastModified
      ? new Date(entry.lastModified).toISOString()
      : new Date().toISOString();

    return `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>${entry.changeFrequency || 'monthly'}</changefreq>\n    <priority>${entry.priority ?? 0.5}</priority>\n  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
