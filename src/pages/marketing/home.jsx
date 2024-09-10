import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { config } from '@/config';
import { Features } from '@/components/marketing/home/features';
import { Hero } from '@/components/marketing/home/hero';

const metadata = {
  title: `Welcome | ${config.site.name}`,
};

export function Page() {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Hero />
        <Features />
      </main>
    </React.Fragment>
  );
}
