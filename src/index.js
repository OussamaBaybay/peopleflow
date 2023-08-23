import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Navbar from "react-bootstrap/Navbar";
import { createRoot } from 'react-dom/client';
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
	<QueryClientProvider client={queryClient}>
		<Navbar bg="dark">
			<Navbar.Brand href="#home">Logo</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					developed by: <a href="#login">Oussama baybay</a>
				</Navbar.Text>
			</Navbar.Collapse>
		</Navbar>
		<App />
		<ReactQueryDevtools />
	</QueryClientProvider>
</React.StrictMode>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
