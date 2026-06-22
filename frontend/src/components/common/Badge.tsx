/**
 * Badge Component
 * Status indicator with color coding
 */
interface BadgeProps {
  variant?: 'completed' | 'in-progress' | 'pending' | 'closed';
  children: React.ReactNode;
}

export function Badge({ variant = 'pending', children }: BadgeProps) {
  const styles = {
    completed: 'bg-green-100 text-green-700 border border-green-200',
    'in-progress': 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    pending: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
    closed: 'bg-neutral-200 text-neutral-800 border border-neutral-300'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${styles[variant]}`}>
      {children}
    </span>
  );
}
