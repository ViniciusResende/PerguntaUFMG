/** Application setup */
import './setup';

/** React imports */
import React from 'react';
import { createRoot } from 'react-dom/client';

/** Routes */
import Router from './routes';

/** Main renderer */
const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(<React.StrictMode>{Router}</React.StrictMode>);
