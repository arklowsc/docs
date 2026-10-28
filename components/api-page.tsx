'use client';
import { createOpenAPIPage } from 'fumadocs-openapi/ui';
import { preload } from 'react-dom';

export const OpenAPIPage = createOpenAPIPage({
  async loadDocument(id) {
    if (typeof window === 'undefined') {
      preload(`/api/openapi/${id}`, { as: 'fetch', crossOrigin: 'anonymous' });
      const { openapi } = await import('@/lib/openapi');
      return (await openapi.getSchema(id)).bundled;
    }
    return (await fetch(`/api/openapi/${id}`)).json();
  },
});
