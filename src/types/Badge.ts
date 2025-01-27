export default interface BadgeProps {
  children: React.ReactNode;
  type: 'alert' | 'count';
  count?: number;
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}
