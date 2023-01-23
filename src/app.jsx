import React from 'react';
import { createRoot } from 'react-dom/client';
import SelectHistory from './components/SelectHistory/index.jsx';
 
const appDom = document.querySelector('#app');
const root = createRoot(appDom);

root.render(<SelectHistory />);