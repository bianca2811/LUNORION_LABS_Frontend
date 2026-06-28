export interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  permission?: string;
  disabled?: boolean;
  children?: SidebarItem[];
}