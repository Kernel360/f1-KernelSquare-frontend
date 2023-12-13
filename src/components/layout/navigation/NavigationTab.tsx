"use client";

import Tab from "@/components/shared/tab/Tab";
import { layoutMeta } from "@/constants/layoutMeta";
import { navigationRoutes } from "@/constants/navigationRoute";
import { matchLayoutMetaKey } from "@/util/layoutMeta";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function NavigationTab() {
  const currentPath = usePathname();

  const pathKey = matchLayoutMetaKey(currentPath);

  const wrapperClassNames = twMerge([
    "sticky w-full top-[--height-header] z-navigation py-1 bg-white sm:hidden",
    !layoutMeta[pathKey].containLayout.header && "top-0",
  ]);

  return (
    <nav className={wrapperClassNames}>
      <Tab
        defaultTab={
          navigationRoutes.find((route) => route.to === currentPath)?.label
        }
        className="mt-4"
        tabs={navigationRoutes.map(({ label, to }) => {
          return {
            label,
            content: <Link href={to}>{label}</Link>,
            active: currentPath === to,
          };
        })}
      />
    </nav>
  );
}

function NavigationTabItem() {}

export default NavigationTab;
