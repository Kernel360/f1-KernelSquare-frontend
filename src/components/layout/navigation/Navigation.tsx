"use client";

import { usePathname } from "next/navigation";
import NavigationTab from "./NavigationTab";
import SideNavigation from "./SideNavigation";
import { layoutMeta } from "@/constants/layoutMeta";
import { matchLayoutMetaKey } from "@/util/layoutMeta";

function Navigation() {
  const currentPath = usePathname();

  const pathKey = matchLayoutMetaKey(currentPath);

  return layoutMeta[pathKey]?.containLayout.navigation ? (
    <>
      <SideNavigation />
      <NavigationTab />
    </>
  ) : null;
}

export default Navigation;
