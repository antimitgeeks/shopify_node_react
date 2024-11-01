import { BrowserRouter, Route } from "react-router-dom";
import Routes from "./Routes";
import "./index.css"
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";


export default function App() {
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <Routes pages={pages} />
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
