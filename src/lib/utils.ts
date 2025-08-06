import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as FaIcons from "react-icons/fa";
import { ComponentType } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIconComponent = (iconName: keyof typeof FaIcons): ComponentType<any> | null => {
  const icon = FaIcons[iconName];
  if (!icon) {
    console.warn(`Icon not found: ${iconName}`);
  }
  return icon || null;
};