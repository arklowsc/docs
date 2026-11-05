import type { Document, HttpMethods, OperationItem, PagesBuilder, WebhookItem } from 'fumadocs-openapi';
import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: { arklow: 'https://api.arklow.io/swagger/ui/json' },
  includeDocument: false,
});

const httpMethods = new Set<string>(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']);
const pageNamesByDocument = new WeakMap<Document, Map<string, string>>();

export function apiPageName(
  this: PagesBuilder,
  output: { type: 'operation'; item: OperationItem } | { type: 'webhook'; item: WebhookItem },
): string {
  if (output.type === 'webhook') return output.item.name;

  let pageNames = pageNamesByDocument.get(this.document);
  if (!pageNames) {
    pageNames = new Map();
    const seen = new Map<string, number>();
    for (const [path, pathItem] of Object.entries(this.document.paths ?? {})) {
      if (!pathItem) continue;
      for (const method of Object.keys(pathItem)) {
        if (!httpMethods.has(method)) continue;
        const operation = pathItem[method as HttpMethods];
        if (!operation) continue;
        const summary = operation.summary ?? '';
        const base = summary
          ? summary.toLowerCase().replaceAll("'", '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
          : `${method}-${path.replace(/\{[^}]*\}/g, '').replaceAll('/', '')}`;
        const key = `${operation.tags?.[0] ?? ''}/${base}`;
        const count = seen.get(key) ?? 0;
        seen.set(key, count + 1);
        pageNames.set(`${method} ${path}`, count === 0 ? base : `${base}-${count}`);
      }
    }
    pageNamesByDocument.set(this.document, pageNames);
  }

  const name = pageNames.get(`${output.item.method} ${output.item.path}`);
  if (!name) throw new Error(`no page name for ${output.item.method} ${output.item.path}`);
  return name;
}
