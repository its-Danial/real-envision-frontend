import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type StudioCreateCardProps = {
  title: string;
  description: string;
  imgSrc: any;
  imgAlt: string;
  href: string;
};

const StudioCreateCard: FC<StudioCreateCardProps> = ({ title, description, imgSrc, imgAlt, href }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl hover:scale-105">
      <figure className="px-10 pt-10">
        <Image src={imgSrc} alt={imgAlt} className="rounded-lg" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm">{description}</p>
        <div className="card-actions">
          <Link href={href}>
            <button className="btn btn-primary mt-3">Try Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default StudioCreateCard;
