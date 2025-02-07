// import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import 'bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import Layout from './Layouts/Layout'; // Importa il layout globale

import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    // Controlla se la pagina ha un layout personalizzato
    const render = (Component) =>
      Component.layout
        ? <Component.layout {...props}><Component {...props} /></Component.layout>
        : <Layout {...props}><Component {...props} /></Layout>;

    root.render(<App {...props} render={render} />);
  },
  progress: {
    color: '#4B5563',
  },
});
