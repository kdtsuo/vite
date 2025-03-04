interface IconLink {
  href: string;
  imgSrc: string;
  alt: string;
}

interface IconLinkProps {
  links: IconLink[];
}

export default function IconLink({ links }: IconLinkProps) {
  return (
    <div className="mp3">
      <div className="flex justify-center flex-wrap items-center">
        {links.map((link, index) => (
          <a
            key={index}
            target="_blank"
            rel="noreferrer"
            href={link.href}
            className="ql point nudgeup fadein80 t200e"
          >
            <img className="w-14 h-auto m-2" src={link.imgSrc} alt={link.alt} />
          </a>
        ))}
      </div>
    </div>
  );
}
