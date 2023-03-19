export interface ButtonProps {
  text: string,
  onclick: () => void,
  disabled?: boolean,
  type?: 'button' | 'submit'
}