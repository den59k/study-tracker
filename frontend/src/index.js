import React from 'react';
import ReactDOM from 'react-dom';

import 'styles/global.sass'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'providers/auth';
import { RouterProvider } from 'providers/router';
import { ModalWindowProvider } from 'providers/modal-window'

ReactDOM.render(
	<React.StrictMode>
		<ModalWindowProvider>
			<AuthProvider>
				<RouterProvider>
					<App />
				</RouterProvider>
			</AuthProvider>
		</ModalWindowProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
