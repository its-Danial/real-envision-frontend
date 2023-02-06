import { FC } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="mt-8 min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
export default MainLayout;
