import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ThemeProvider from './context/themeContext';
import Loading from './loading';

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <ThemeProvider>
        <BrowserRouter>
            < App />
        </BrowserRouter>
    </ThemeProvider>
);
