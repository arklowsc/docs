import { createGetUrl } from 'fumadocs-core/source';

const getMarkdownUrl = createGetUrl('/llms.mdx');

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getMarkdownUrl(segments, page.locale) };
}
