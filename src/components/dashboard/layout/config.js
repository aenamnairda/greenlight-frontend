import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboards',
      items: [
        {
          key: 'dashboard:overview',
          title: 'Overview',
          href: paths['dashboard'],
          icon: 'grid-four',
        },
        {
          key: 'dashboard:movies',
          title: 'Movies',
          icon: 'receipt',
          items: [
            {
              key: 'dashboard:movies',
              title: 'List Movies',
              href: paths['dashboard.movies'],
            },
            {
              key: 'dashboard:movies:create',
              title: 'Add Movie',
              href: paths['dashboard.movies.create'],
            },
          ],
        },
      ],
    },
  ],
};
