import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import store from './store/index.js';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);