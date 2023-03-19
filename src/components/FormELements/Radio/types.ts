export interface RadioPropTypes {
  id: string,
  label: string,
  name: string,
  checked?: boolean,
  onchange: (id: string, value: string, valid: boolean) => void;
}