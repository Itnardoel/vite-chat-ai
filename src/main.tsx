import ReactDOM from "react-dom/client";
import {ErrorBoundary} from "react-error-boundary";

import App from "./App";
import ErrorPage from "./pages/error";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={ErrorPage} onReset={() => location.reload()}>
    <App />
  </ErrorBoundary>,
);
