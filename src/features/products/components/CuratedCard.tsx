import * as React from "react";
import { Link } from "react-router-dom";

interface CuratedCardProps {
  imageUrl: string;
  caption: string;
  href: string;
  onClick?: () => void;
}

export const CuratedCard: React.FC<CuratedCardProps> = ({
  imageUrl,
  caption,
  href,
  onClick,
}) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="group flex flex-col items-center text-center focus:outline-none w-full"
    >
      <div className="w-full aspect-[4/5] overflow-hidden bg-muted mb-3 border border-border/40">
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <span className="text-[10px] font-sans tracking-luxury uppercase text-foreground group-hover:text-accent transition-colors">
        {caption}
      </span>
    </Link>
  );
};
