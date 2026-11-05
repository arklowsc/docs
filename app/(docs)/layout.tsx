import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/'>) {
  const { nav, ...options } = baseOptions();

  return (
    <DocsLayout
      {...options}
      tree={source.getPageTree()}
      tabMode="navbar"
      nav={{ ...nav, mode: 'top' }}
      sidebar={{ collapsible: false }}
    >
      {children}
    </DocsLayout>
  );
}
