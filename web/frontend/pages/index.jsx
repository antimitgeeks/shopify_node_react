import { Route, Routes } from "react-router-dom";
import About from "../components/Home/About";

export default function HomePage() {
  return (
    <Routes>
      <Route path="/" element={<About />} />
    </Routes>
  );
}
