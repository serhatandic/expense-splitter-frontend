import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Auth0Provider
			domain='dev-lf7jyqpt7yg0qfln.us.auth0.com'
			clientId='eqP9zYxnvifEfgXoHUqsc64yYjgB2bWm'
			redirectUri={window.location.origin}
		>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
