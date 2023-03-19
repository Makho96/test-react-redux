import { ReactNode } from "react";

export interface SelectPropTypes {
  id: string,
  list: SelectListType
  onchange: (id: string, value: string, valid: boolean) => void;
  label?: string,
  placeholder?: string,
  chosen?: ListItemTypes,
  icon?: ReactNode,
}

export type SelectListType = ListItemTypes[]

export interface ListItemTypes {
  id: string,
  zip: string,
  name: string,
}

export interface LocalListItemTypes extends ListItemTypes {
  active: boolean
}