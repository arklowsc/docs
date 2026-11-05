import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { applyMdxPreset } from 'fumadocs-mdx/config';
import { defineDocs } from 'fumadocs-mdx/macro';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      hideFooterPagination: z.boolean().optional(),
    }),
    mdxOptions: applyMdxPreset({
      remarkPlugins: (plugins) => [remarkMdxMermaid, ...plugins],
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});
