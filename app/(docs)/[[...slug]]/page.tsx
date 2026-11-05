import { findPath } from 'fumadocs-core/page-tree';
import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/notebook/page';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';
import { OpenAPIPage } from '@/components/api-page';
import { getMDXComponents } from '@/components/mdx';
import { PageActions } from '@/components/page-actions';
import { getPageMarkdownUrl } from '@/lib/shared';
import { assertLink, source } from '@/lib/source';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const path = findPath(source.getPageTree().children, (node) => node.type === 'page' && node.url === page.url) ?? [];
  const folders = path.filter((node) => node.type === 'folder' && !node.root);
  const separator = path.findLast((node) => node.type === 'separator');
  const eyebrow = folders.length > 0 ? folders.map((node) => node.name) : separator ? [separator.name] : [];

  const header = (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow.length > 0 && (
          <p className="mb-2 flex flex-wrap items-center gap-1 text-sm text-fd-muted-foreground">
            {eyebrow.map((name, index) => (
              <Fragment key={index}>
                {index > 0 && <ChevronRight className="size-3.5" />}
                <span>{name}</span>
              </Fragment>
            ))}
          </p>
        )}
        <DocsTitle className="text-3xl leading-10 tracking-tight sm:text-4xl">{page.data.title}</DocsTitle>
      </div>
      <PageActions markdownUrl={getPageMarkdownUrl(page).url} />
    </header>
  );

  if (page.type === 'openapi') {
    return (
      <DocsPage full toc={page.data.toc} breadcrumb={{ enabled: false }}>
        {header}
        <DocsBody>
          <OpenAPIPage {...page.data.getOpenAPIPageProps()} />
        </DocsBody>
      </DocsPage>
    );
  }

  const MDX = page.data.body;
  const RelativeLink = createRelativeLink(source, page);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      footer={{ enabled: !page.data.hideFooterPagination }}
      className="px-5 md:px-11 md:*:max-w-[43rem] xl:px-11"
    >
      {header}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: (props) => {
              assertLink(props.href ?? '');
              return <RelativeLink {...props} />;
            },
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
