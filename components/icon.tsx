import { icons } from 'lucide-react';
import type { SVGProps } from 'react';
import { BrandIcon, isBrandIcon } from '@/components/brand-icon';

export function Icon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  if (isBrandIcon(name)) return <BrandIcon name={name} {...props} />;

  const LucideIcon = icons[name.replace(/(?:^|-)(\w)/g, (_, letter: string) => letter.toUpperCase()) as keyof typeof icons];
  if (!LucideIcon) throw new Error(`unknown icon: ${name}`);

  return <LucideIcon aria-hidden="true" {...props} />;
}
