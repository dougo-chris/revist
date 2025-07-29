export function getMenu() {
  const menu = [
    {
      name: 'Articles',
      href: '/article',
    },
    {
      name: 'Developer',
      href: '/developer',
    },
    {
      name: 'Lists',
      href: '/list',
    },
    {
      name: 'Work',
      href: '/work',
    },
    {
      name: 'About',
      href: '/about',
    },
  ]
  if (process.env.NODE_ENV !== 'production') {
    menu.push({
      name: 'Backlog',
      href: '/backlog',
    });
  }

  return menu;
};
