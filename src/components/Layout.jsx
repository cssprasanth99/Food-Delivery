import { Outlet, Link } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="pt-16 px-4">
        <Outlet />
      </main>
    </div>
  );
}
