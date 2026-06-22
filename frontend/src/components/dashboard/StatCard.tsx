import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * StatCard Component
 * Displays a metric card with value, change, and trend
 */
interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  bgColor?: string;
}

export function StatCard({
  label,
  value,
  change = 0,
  trend = 'neutral',
  bgColor = 'bg-blue-50'
}: StatCardProps) {
  const trendColor = trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-neutral-500';
  const trendBg = trend === 'up' ? 'bg-green-100' : trend === 'down' ? 'bg-red-100' : 'bg-neutral-100';
  const Icon = trend === 'up' ? ArrowUp : ArrowDown;

  return (
    <div className={`${bgColor} rounded-lg p-6 border border-neutral-200 hover:shadow-md transition-all duration-200`}>
      <p className="text-sm text-neutral-600 font-medium mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold text-neutral-900">{value}</h3>
        {change !== 0 && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded ${trendBg}`}>
            <Icon size={16} className={trendColor} />
            <span className={`text-sm font-semibold ${trendColor}`}>
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
