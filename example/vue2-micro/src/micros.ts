const RouteMicros: any = [
  {
    name: 'example-react-micro',
    activeRule: '/zone',
    container: '#micro-container',
    extras: {
      basename: '/zone',
    },
    entry: 'https://localhost:9000',
    type: 'route',
  },
  {
    name: 'example-react-micro2',
    activeRule: '/zone-origin,/zone-origin/3',
    container: '#micro-container',
    extras: {
      basename: '/zone-origin',
    },
    entry: 'https://localhost:9001',
    type: 'route',
  },
  {
    name: 'example-vue-micro3',
    activeRule: '/vue3',
    container: '#micro-container',
    extras: {
      basename: '/vue3',
    },
    entry: 'https://localhost:9003',
    type: 'route',
  },
];

export { RouteMicros };
