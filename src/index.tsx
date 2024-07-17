import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './components/GlobalStyle';
import { Provider } from 'react-redux';
import store from './components/features/store';
import 'antd/dist/reset.css';

const rootElement = document.getElementById('root');
if (rootElement) {
   const root = ReactDOM.createRoot(rootElement);
   root.render(
      // <React.StrictMode>
      <GlobalStyle>
         <Provider store={store}>
            <App />
         </Provider>
      </GlobalStyle>
      //</React.StrictMode>
   );
} else {
   console.error('Root element not found');
}
