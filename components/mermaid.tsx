import { render } from 'pele';
import { useId } from 'react';

export function Mermaid({ chart }: { chart: string }) {
  const id = useId();
  const wide = render(chart, { idPrefix: id });
  const narrow = render(chart, { idPrefix: `${id}narrow`, maxWidth: 320 });

  if (narrow.width >= wide.width) return <div className="my-6" dangerouslySetInnerHTML={{ __html: wide.svg }} />;

  return (
    <div className="my-6 @container">
      <div className="@max-[600px]:hidden" dangerouslySetInnerHTML={{ __html: wide.svg }} />
      <div className="@min-[600px]:hidden" dangerouslySetInnerHTML={{ __html: narrow.svg }} />
    </div>
  );
}
