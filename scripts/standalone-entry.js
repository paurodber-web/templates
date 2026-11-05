import { h, hydrate } from 'preact';
import App from '../src/App';

hydrate(h(App, {}), document.getElementById('app'));
