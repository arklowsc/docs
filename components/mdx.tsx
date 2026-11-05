import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from '@/components/mermaid';
import { Card, Columns, Info, Note, Step, Steps, Tab, Tabs, Tip, Warning } from '@/components/mintlify';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Card,
    CardGroup: Columns,
    Columns,
    Info,
    Mermaid,
    Note,
    Step,
    Steps,
    Tab,
    Tabs,
    Tip,
    Warning,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
