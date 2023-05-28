import { Outlet, Link } from "react-router-dom";
import Navigation from "../components/horizontal";

export default function Root() {
  return (
    <>
      <Navigation />
      <div className="">
        <Outlet />
      </div>
    </>
  );
}
