import { FC } from "react";

import NavBar from "../navbar/Navbar";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

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

const Footer: FC = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="normal-case text-xl font-semibold">RealEnvision</span>
        <p>
          Design and Implementation of Image Generation System based on Diffusion Model
          <br />
          by{" "}
          <Link href="https://www.malikdanial.xyz/" legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer" className="font-semibold">
              Malik Danial Azhar
            </a>
          </Link>
        </p>
      </div>
      <div>
        <span className="footer-title">Image generation services</span>
        <Link href="/create/text-to-image" legacyBehavior>
          <a className="link link-hover">Text to Image</a>
        </Link>
        <Link href="/create/image-to-image" legacyBehavior>
          <a className="link link-hover">Image to Image</a>
        </Link>
        <Link href="/create/image-inpainting" legacyBehavior>
          <a className="link link-hover">Image Inpainting</a>
        </Link>
        <Link href="/create/super-resolution" legacyBehavior>
          <a className="link link-hover">Super Resolution</a>
        </Link>
      </div>

      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <Link href="https://github.com/its-Danial" legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              <BsGithub className="h-6 w-6 hover:scale-110" />
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/malik-danial-azhar/" legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              <BsLinkedin className="h-6 w-6 hover:scale-110" />
            </a>
          </Link>
        </div>
      </div>

      <div>
        <span className="footer-title">GitHub Repo</span>
        <div className="grid grid-flow-row gap-4">
          <Link href="https://github.com/its-Danial/real-envision-frontend" legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              Next.js
            </a>
          </Link>
          <Link href="https://github.com/its-Danial/real-envision-backend" legacyBehavior passHref>
            <a target="_blank" rel="noopener noreferrer">
              FastAPI
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};
