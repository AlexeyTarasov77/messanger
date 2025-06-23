
export type MediaImage = {
  id: string;
  file: string;
  filename: string;
};

export interface IModalBaseProps {
  isVisible: boolean;
  close: () => void;
}
