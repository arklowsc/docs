import { llms, loader } from 'fumadocs-core/source';
import { docs } from './collections';
import { apiPageName, openapi } from './openapi';

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      baseDir: 'api-reference',
      groupBy: 'tag',
      name: apiPageName,
      meta: { folderStyle: 'separator' },
    }),
  },
  {
    baseUrl: '/',
    plugins: [
      openapi.loaderPlugin(),
      {
        name: 'api-reference-tab',
        enforce: 'post',
        transformStorage({ storage }) {
          const meta = storage.read('api-reference/meta.json');
          if (meta?.format !== 'meta') throw new Error('api-reference/meta.json is missing');
          meta.data = { ...meta.data, title: 'API reference', root: true };
        },
      },
    ],
  },
);

export function assertLink(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return;

  const [path, hash] = href.split('#');
  const target = source.getPage(path.split('/').filter(Boolean));
  if (!target) throw new Error(`broken link: ${href}`);
  if (hash && !target.data.toc.some((item) => item.url === `#${hash}`)) throw new Error(`broken anchor: ${href}`);
}

export const docsLlms = llms(source, {
  renderPage: async (page) => {
    if (page.type !== 'openapi') {
      return `# ${page.data.title}\n\n${await page.data.getText('processed')}`;
    }

    const { bundled } = page.data.getSchema();
    const { operations = [] } = page.data.getOpenAPIPageProps();
    const components: Record<string, unknown> = {};
    const pending: unknown[] = [];
    const visit = (value: unknown) => {
      if (Array.isArray(value)) {
        value.forEach(visit);
        return;
      }
      if (!value || typeof value !== 'object') return;
      for (const [key, inner] of Object.entries(value)) {
        if (key === '$ref' && typeof inner === 'string' && inner.startsWith('#/components/') && !(inner in components)) {
          const target = inner
            .slice(2)
            .split('/')
            .reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], bundled);
          components[inner] = target;
          pending.push(target);
        } else {
          visit(inner);
        }
      }
    };

    const sections = operations.map(({ path, method }) => {
      const operation = bundled.paths?.[path]?.[method];
      visit(operation);
      while (pending.length > 0) visit(pending.pop());
      return `## ${method.toUpperCase()} ${path}\n\n\`\`\`json\n${JSON.stringify(operation)}\n\`\`\``;
    });
    const referenced = Object.keys(components).length
      ? `\n\n## Referenced components\n\n\`\`\`json\n${JSON.stringify(components)}\n\`\`\``
      : '';
    return `# ${page.data.title}\n\n${sections.join('\n\n')}${referenced}`;
  },
});
