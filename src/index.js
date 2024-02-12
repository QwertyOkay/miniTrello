import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
// import client from './apolloClient';
// import { ApolloProvider } from '@apollo/client';
import './index.css';


const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
    <App />
);