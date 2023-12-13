"use client";

import { Icon } from "@/components/icons/Icons";
import { layoutMeta } from "@/constants/layoutMeta";
import { navigationRoutes } from "@/constants/navigationRoute";
import { matchLayoutMetaKey } from "@/util/layoutMeta";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

interface SideNavigationItemProps {
  label: string;
  active: boolean;
  activeClassName: string;
  icon: Icon;
  to: string;
}

function SideNavigation() {
  const currentPath = usePathname();

  const pathKey = matchLayoutMetaKey(currentPath);

  const wrapperClassNames = twMerge([
    "hidden sm:sticky sm:inline-flex sm:w-[200px] sm:align-top sm:top-[--height-header] sm:bg-colorsLightGray sm:h-[calc(100vh-var(--height-header))] sm:z-navigation",
    !layoutMeta[pathKey].containLayout.header && "sm:top-0 sm:h-screen",
  ]);

  return (
    <aside className={wrapperClassNames}>
      <nav className={"w-full box-border px-2 py-6"}>
        <ul className="flex flex-col gap-4">
          {navigationRoutes.map(({ label, icon, to, activeClassName }) => {
            const active = to === currentPath;

            return (
              <li key={label}>
                <SideNavigationItem
                  label={label}
                  icon={icon}
                  active={active}
                  activeClassName={activeClassName}
                  to={to}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function SideNavigationItem({
  label,
  active,
  icon,
  to,
  activeClassName,
}: SideNavigationItemProps) {
  const Icon = icon;

  const iconClassNames = twMerge([
    "text-colorsDarkGray text-xl",
    active && activeClassName,
  ]);

  const textClassNames = twMerge([
    "text-colorsGray text-xl font-bold",
    active && "text-secondary",
  ]);

  return (
    <Link href={to} className="flex gap-2 items-center">
      <Icon className={iconClassNames} />
      <span className={textClassNames}>{label}</span>
    </Link>
  );
}

export default SideNavigation;
