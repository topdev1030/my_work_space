import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider as ReduxProvider } from "react-redux";

// store
import { store } from "@/redux";
// config
import config from "@/config";
// components
import App from "./App";
// styles
import "antd/dist/reset.css";
import "./index.css";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<Auth0Provider
		domain={config.auth0.domain}
		clientId={config.auth0.clientId}
		authorizationParams={{
			redirect_uri: config.auth0.redirectUri,
			audience: config.auth0.audience,
		}}
	>
		<ReduxProvider store={store}>
			<App />
		</ReduxProvider>
	</Auth0Provider>
);
