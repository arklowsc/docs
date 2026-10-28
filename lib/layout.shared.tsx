import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { ChevronRight } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img src="/logo/light.svg" alt="Arklow" className="h-6 w-auto dark:hidden" />
          <img src="/logo/dark.svg" alt="Arklow" className="hidden h-6 w-auto dark:block" />
        </>
      ),
      url: '/',
    },
    links: [
      {
        type: 'custom',
        on: 'all',
        secondary: true,
        children: (
          <a
            href="https://app.arklow.io"
            className="inline-flex h-9 items-center gap-1 rounded-xl bg-fd-primary-button px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Dashboard
            <ChevronRight className="size-4" />
          </a>
        ),
      },
    ],
  };
}
