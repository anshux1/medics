export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
}

export interface TeamsItem {
  name: string;
  logo: string;
  plan: string;
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface SidebarNavItem extends NavItemWithChildren {}
