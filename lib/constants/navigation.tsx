import { TbHomeCheck } from "react-icons/tb";
import { VscAccount, VscArchive, VscChecklist } from 'react-icons/vsc';

export type DockItemData = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export const NAVIGATION_ITEMS = [
  { 
    icon: <TbHomeCheck size={24} color="white" />, 
    label: 'Home', 
    href: '/' 
  },
  { 
    icon: <VscAccount size={24} color="white" />, 
    label: 'Profile', 
    href: '/profile' 
  },
  { 
    icon: <VscArchive size={24} color="white" />, 
    label: 'Archive', 
    href: '/archive' 
  },
  { 
    icon: <VscChecklist size={24} color="white" />, 
    label: 'Tasks', 
    href: '/tasks' 
  },
] as const;

export const DOCK_CONFIG = {
  panelHeight: 68,
  baseItemSize: 50,
  magnification: 70,
} as const;
