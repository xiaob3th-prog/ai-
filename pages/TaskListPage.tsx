
import React from 'react';
import { Card, Badge, PrdInfo, Button } from '../components/UIComponents';
import { Play, Pause, Search } from 'lucide-react';
import { Task } from '../types';

const TaskListPage: React.FC = () => {
  const tasks: Task[] = [
    { id: 'T_20231024_01', name: '自动创建_202310240900', status: 'running', createTime: '2023-10-24 09:00:00', totalNumbers: 50, calledCount: 25, connectedCount: 15, assignedCount: 8, signedCount: 2 },
    { id: 'T_20231024_02', name: '手动创建_202310241030', status: 'paused', createTime: '2023-10-24 10:30:00', totalNumbers: 200, calledCount: 100, connectedCount: 40, assignedCount: 15, signedCount: 5 },
    { id: 'T_20231023_05', name: '自动创建_202310231800', status: 'completed', createTime: '2023-10-23 18:00:00', totalNumbers: 120, calledCount: 120, connectedCount: 80, assignedCount: 35, signedCount: 12 },
  ];

  const getStatusType = (status: Task['status']) => {
    switch (status) {
        case 'running': return 'success';
        case 'paused': return 'warning';
        case 'completed': return 'neutral';
        default: return 'neutral';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
        case 'running': return '执行中';
        case 'paused': return '已暂停';
        case 'completed': return '已完成';
        case 'pending': return '未启动';
    }
  };

  return (
    <div>
      <PrdInfo 
        title="任务列表页 (3.5)"
        content={
            <div className="space-y-2">
                <p className="font-medium text-gray-900">3.5. 任务列表页</p>
                <ul className="list-disc pl-5 space-y-1">
                <li><strong>页面目标</strong>：监控外呼任务的运行状态。</li>
                <li><strong>列表字段</strong>：
                    <ul className="list-[circle] pl-5 mt-1 space-y-1 text-gray-600">
                        <li>任务ID、任务名称。</li>
                        <li>任务状态：未启动、执行中、已暂停、已完成。</li>
                        <li>创建时间、号码量、外呼量、呼通量、呼通率 (呼通量/外呼量)、<strong>分配销售量</strong>、签约量。</li>
                        <li><strong>操作</strong>：[暂停]、[继续] (仅针对执行中/暂停状态)。
                            <br/> * 点击暂停、继续调用任务状态变更接口。
                        </li>
                    </ul>
                </li>
                <li><strong>排序</strong>：创建时间倒序。</li>
                <li><strong>筛选</strong>：创建时间段。</li>
                </ul>
            </div>
        }
      />

      <Card>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">外呼任务监控</h2>
          <div className="flex items-center space-x-2">
             <span className="text-sm text-gray-600">创建时间：</span>
             <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm" />
             <span className="text-gray-400">-</span>
             <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm" />
             <Button variant="secondary" className="ml-2 px-3 py-1 h-8 flex items-center">
                <Search className="h-3 w-3 mr-1" /> 筛选
             </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">任务名称 / ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">进度 (已呼/总数)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">呼通率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分配销售量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">签约量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{task.name}</div>
                    <div className="text-xs text-gray-500">{task.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{task.createTime}</td>
                  <td className="px-6 py-4">
                    <Badge status={getStatusLabel(task.status)} type={getStatusType(task.status)} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                        <span className="text-sm text-gray-900 mr-2">{task.calledCount} / {task.totalNumbers}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(task.calledCount / task.totalNumbers) * 100}%` }}></div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {task.calledCount > 0 ? ((task.connectedCount / task.calledCount) * 100).toFixed(1) : 0}%
                    <span className="text-xs text-gray-500 ml-1">({task.connectedCount})</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{task.assignedCount}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">{task.signedCount}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {task.status === 'running' && (
                        <button className="text-yellow-600 hover:text-yellow-900 flex items-center">
                            <Pause className="h-4 w-4 mr-1" /> 暂停
                        </button>
                    )}
                    {task.status === 'paused' && (
                        <button className="text-green-600 hover:text-green-900 flex items-center">
                            <Play className="h-4 w-4 mr-1" /> 继续
                        </button>
                    )}
                    {task.status === 'completed' && (
                        <span className="text-gray-400">已结束</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TaskListPage;
