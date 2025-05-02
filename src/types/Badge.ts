export default interface BadgeProps {
  children: React.ReactNode;
  type: 'alert' | 'count';
  count?: number;
  inset?: string;
}
