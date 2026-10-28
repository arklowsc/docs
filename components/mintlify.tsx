import Link from 'fumadocs-core/link';
import { Step as FumaStep, Steps } from 'fumadocs-ui/components/steps';
import { Tab as FumaTab, Tabs as FumaTabs } from 'fumadocs-ui/components/tabs';
import { Info as InfoIcon, Lightbulb, TriangleAlert } from 'lucide-react';
import { Children, type CSSProperties, isValidElement, type ReactNode } from 'react';
import { Icon } from '@/components/icon';
import { assertLink } from '@/lib/source';

const callouts = {
  note: {
    box: 'border-blue-200 bg-blue-50 dark:border-blue-900/60 dark:bg-blue-950/30',
    icon: <InfoIcon className="text-blue-600 dark:text-blue-300" />,
  },
  info: {
    box: 'border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40',
    icon: <InfoIcon className="text-neutral-500 dark:text-neutral-400" />,
  },
  tip: {
    box: 'border-green-200 bg-green-50 dark:border-green-900/60 dark:bg-green-950/30',
    icon: <Lightbulb className="text-green-600 dark:text-green-300" />,
  },
  warning: {
    box: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/60 dark:bg-yellow-950/30',
    icon: <TriangleAlert className="text-yellow-600 dark:text-yellow-300" />,
  },
};

function Callout({ kind, children }: { kind: keyof typeof callouts; children?: ReactNode }) {
  return (
    <div className={`my-4 flex gap-3 rounded-2xl border px-5 py-4 text-sm leading-6 ${callouts[kind].box}`}>
      <span className="mt-1 shrink-0 [&_svg]:size-4">{callouts[kind].icon}</span>
      <div className="min-w-0 text-fd-secondary-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
    </div>
  );
}

export function Note({ children }: { children?: ReactNode }) {
  return <Callout kind="note">{children}</Callout>;
}

export function Info({ children }: { children?: ReactNode }) {
  return <Callout kind="info">{children}</Callout>;
}

export function Tip({ children }: { children?: ReactNode }) {
  return <Callout kind="tip">{children}</Callout>;
}

export function Warning({ children }: { children?: ReactNode }) {
  return <Callout kind="warning">{children}</Callout>;
}

export { Steps };

export function Step({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <FumaStep>
      {title && <p className="font-semibold text-fd-foreground">{title}</p>}
      {children}
    </FumaStep>
  );
}

export function Card({ title, icon, href, children }: { title: string; icon?: string; href?: string; children?: ReactNode }) {
  const content = (
    <>
      {icon && <Icon name={icon} className="mb-4 size-6 text-fd-primary" />}
      <p className="my-0 font-semibold text-fd-foreground">{title}</p>
      {children && <div className="mt-1 text-fd-secondary-foreground [&>p]:my-0">{children}</div>}
    </>
  );
  const className =
    'not-prose block rounded-2xl border border-fd-foreground/10 bg-fd-background px-6 py-5 leading-6 transition-colors';

  if (!href) return <div className={className}>{content}</div>;
  assertLink(href);
  return (
    <Link href={href} className={`${className} hover:border-fd-primary`}>
      {content}
    </Link>
  );
}

export function Columns({ cols = 2, children }: { cols?: number; children?: ReactNode }) {
  return (
    <div
      className="my-6 grid gap-4 sm:grid-cols-[repeat(var(--columns),minmax(0,1fr))]"
      style={{ '--columns': cols } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Tabs({ children }: { children?: ReactNode }) {
  const items = Children.toArray(children)
    .filter(isValidElement<{ title: string }>)
    .map((child) => child.props.title);

  return <FumaTabs items={items}>{children}</FumaTabs>;
}

export function Tab({ title, children }: { title: string; children?: ReactNode }) {
  return <FumaTab value={title}>{children}</FumaTab>;
}
