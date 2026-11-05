'use client';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { MarkdownCopyButton } from 'fumadocs-ui/layouts/docs/page';
import { ChevronDown, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BrandIcon } from '@/components/brand-icon';

const assistants = [
  { name: 'ChatGPT', icon: 'openai', url: 'https://chatgpt.com/' },
  { name: 'Claude', icon: 'claude', url: 'https://claude.ai/new' },
  { name: 'Perplexity', icon: 'perplexity', url: 'https://www.perplexity.ai/search' },
];

const maxUrlLength = 16_000;
const question = '\n\nAnswer my questions about this page of the Arklow docs.';

function assistantHref(url: string, markdown: string) {
  const href = (text: string) => `${url}?${new URLSearchParams({ q: `${text}${question}` })}`;
  if (href(markdown).length <= maxUrlLength) return href(markdown);

  let low = 0;
  let high = markdown.length;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (href(`${markdown.slice(0, middle)}\n\n[truncated]`).length <= maxUrlLength) low = middle;
    else high = middle - 1;
  }
  return href(`${markdown.slice(0, low)}\n\n[truncated]`);
}

const segmentClass =
  'h-[34px] border border-fd-border bg-fd-background text-sm font-medium text-fd-secondary-foreground hover:bg-fd-accent';
const itemClass =
  'flex w-full items-center justify-start gap-2.5 rounded-lg border-0 bg-transparent px-2.5 py-2 text-sm font-normal text-fd-foreground hover:bg-fd-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fd-muted-foreground';

export function PageActions({ markdownUrl }: { markdownUrl: string }) {
  const [markdown, setMarkdown] = useState<string>();
  const hrefs = useMemo(
    () => (markdown === undefined ? undefined : assistants.map(({ url }) => assistantHref(url, markdown))),
    [markdown],
  );

  function onOpenChange(open: boolean) {
    if (!open || markdown !== undefined) return;
    void fetch(markdownUrl)
      .then((res) => res.text())
      .then(setMarkdown);
  }

  return (
    <div className="flex shrink-0">
      <MarkdownCopyButton markdownUrl={markdownUrl} className={`${segmentClass} rounded-l-xl rounded-r-none border-r-0 px-3`}>
        Copy page
      </MarkdownCopyButton>
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger
          aria-label="More page actions"
          className={`${segmentClass} inline-flex w-[34px] items-center justify-center rounded-l-none rounded-r-xl [&_svg]:size-4 [&_svg]:text-fd-muted-foreground`}
        >
          <ChevronDown />
        </PopoverTrigger>
        <PopoverContent align="end" className="flex w-60 flex-col p-1.5">
          <MarkdownCopyButton markdownUrl={markdownUrl} className={itemClass}>
            Copy page
          </MarkdownCopyButton>
          <a href={markdownUrl} target="_blank" rel="noreferrer" className={itemClass}>
            <FileText />
            View as Markdown
          </a>
          {assistants.map(({ name, icon }, index) => (
            <a
              key={name}
              href={hrefs?.[index]}
              aria-disabled={hrefs === undefined}
              target="_blank"
              rel="noreferrer"
              className={`${itemClass} aria-disabled:opacity-50`}
            >
              <BrandIcon name={icon} />
              Open in {name}
            </a>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
