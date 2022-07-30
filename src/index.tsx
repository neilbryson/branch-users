import './styles/styles.css';

import { createRoot } from 'react-dom/client';

import { RootView } from './views/RootView';

const container = document.getElementById('root');

if (!container) throw new Error('Please add a #root element in public/index.html');

const root = createRoot(container);
root.render(<RootView />);
