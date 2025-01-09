export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
}

export interface User {
  name: string;
  email: string;
  image: string;
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
