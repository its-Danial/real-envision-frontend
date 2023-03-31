import { FC } from "react";
import Footer from "../footer/Footer";
import NavBar from "../navbar/Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
