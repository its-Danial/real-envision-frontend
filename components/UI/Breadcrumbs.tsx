import Link from "next/link";
import { FC } from "react";

type BreadcrumbsProps = {
  links: { title: string; href?: string }[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({ links }) => {
  return (
    <div className="text-sm breadcrumbs px-8 mb-5">
      <ul>
        {links.map((link, index) => {
          if (index !== links.length - 1) {
            return (
              <li key={link.title}>
                <Link href={link.href!}>{link.title}</Link>
              </li>
            );
          }
        })}
        <li className="font-semibold">{links.at(-1)?.title}</li>
      </ul>
    </div>
  );
};
export default Breadcrumbs;
