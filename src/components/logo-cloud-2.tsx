import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  description: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  const logos = [
    { src: "https://cdn.simpleicons.org/solidity/000000", alt: "Solidity", description: "Smart contract programming language" },
    { src: "https://docs.ethers.org/v5/static/logo.svg", alt: "Ethers.js", description: "Complete Ethereum wallet implementation" },
    { src: "https://cdn.simpleicons.org/nextdotjs/000000", alt: "Next.js", description: "The React Framework for the Web" },
    { src: "https://cdn.simpleicons.org/react/000000", alt: "React.js", description: "Library for web and native user interfaces" },
    { src: "https://cdn.simpleicons.org/apollographql/000000", alt: "Apollo GraphQL", description: "Platform for building API's" },
    { src: "https://cdn.simpleicons.org/mongodb/000000", alt: "MongoDB", description: "Document-based, distributed database" },
    { src: "https://cdn.simpleicons.org/github/000000", alt: "GitHub", description: "versioning and management of software" },
    { src: "https://cdn.simpleicons.org/docker/000000", alt: "Docker", description: "OS-level virtualization to deliver software in packages" },
    { src: "https://cdn.simpleicons.org/postman/000000", alt: "Postman", description: "API platform for building and testing APIs" },
  ];

  return (
    <div
      className={cn(
        "relative grid grid-cols-2 border-x md:grid-cols-3",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      {logos.map((logo, idx) => {
        // Compute borders
        const isMobileRight = idx % 2 === 1;
        const isMdRight = idx % 3 === 2;
        const isLastRowMobile = idx >= logos.length - (logos.length % 2 === 0 ? 2 : 1);
        const isLastRowMd = idx >= logos.length - 3;

        let borderClasses = "";
        if (!isMobileRight) borderClasses += " border-r";
        borderClasses += " border-b";

        // md overrides
        borderClasses += " md:border-b"; // base md border
        if (isMdRight) {
          borderClasses += " md:border-r-0";
        } else {
          borderClasses += " md:border-r";
        }

        // checkerboard background pattern (optional, adds nice aesthetics)
        const isPattern = (idx % 2 === 0);
        const bgClasses = isPattern ? "bg-secondary/50 dark:bg-secondary/20" : "bg-background";

        return (
          <LogoCard
            key={logo.alt}
            className={cn("relative", borderClasses, bgClasses)}
            logo={logo}
          >
            {/* Add decorative PlusIcons on some intersections */}
            {idx === 0 && (
              <PlusIcon
                className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-foreground/20"
                strokeWidth={1}
              />
            )}
            {idx === 4 && (
              <PlusIcon
                className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-foreground/20 hidden md:block"
                strokeWidth={1}
              />
            )}
          </LogoCard>
        );
      })}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col items-center justify-center bg-background px-4 py-8 md:p-8 cursor-pointer transition-colors duration-300",
        "hover:bg-neutral-900 dark:hover:bg-white",
        className
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-6 select-none md:h-8 brightness-0 dark:brightness-0 dark:invert opacity-75 object-contain transition-all duration-300 group-hover:opacity-0 group-hover:scale-95 absolute"
        height={logo.height || "auto"}
        src={logo.src}
        width={logo.width || "auto"}
      />

      <div className="flex flex-col items-center justify-center text-center opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 z-10">
        <h4 className="font-bold text-lg text-white dark:text-neutral-900 mb-1">{logo.alt}</h4>
        <p className="text-xs text-neutral-300 dark:text-neutral-600 max-w-[200px] leading-tight">
          {logo.description}
        </p>
      </div>

      {children}
    </div>
  );
}
