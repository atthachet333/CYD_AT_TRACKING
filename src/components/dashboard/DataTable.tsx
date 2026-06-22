'use client';

import { Task } from '@/types/index';
import { Badge } from '@/components/common/Badge';
import { AlertCircle } from 'lucide-react';

/**
 * DataTable Component
 * Responsive table for displaying job/task details
 */
interface DataTableProps {
  tasks: Task[];
  title?: string;
  compact?: boolean;
}

export function DataTable({ tasks, title = 'Tasks', compact = false }: DataTableProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 font-semibold';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  const displayTasks = compact ? tasks.slice(0, 5) : tasks;

  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Assignee
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {displayTasks.map((task) => (
              <tr key={task.id} className="hover:bg-neutral-50 transition-colors">
                <td className="px-6 py-4 text-sm">
                  <p className="font-medium text-neutral-900 truncate">{task.title}</p>
                  {task.description && (
                    <p className="text-xs text-neutral-500 truncate">{task.description}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Badge variant={task.status as any}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {isOverdue(task.dueDate) && task.status !== 'completed' && (
                      <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-red-600 font-semibold' : 'text-neutral-600'}`}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {task.assignee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {displayTasks.length === 0 && (
        <div className="px-6 py-12 text-center">
          <p className="text-neutral-500">No tasks found</p>
        </div>
      )}
    </div>
  );
}
