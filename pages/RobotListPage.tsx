import React, { useState } from 'react';
import { Card, Button, PrdInfo } from '../components/UIComponents';
import { RefreshCw } from 'lucide-react';
import { Robot } from '../types';

const RobotListPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [robots, setRobots] = useState<Robot[]>([
    { id: 'BOT_001', name: '新用户激活_标准版_V1', type: '回访/激活' },
    { id: 'BOT_002', name: '活动通知_双11', type: '通知' },
    { id: 'BOT_003', name: '沉默用户召回_V2', type: '回访/激活' },
  ]);

  const handleSync = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('同步成功！');
    }, 1500);
  };

  return (
    <div>
      <PrdInfo 
        title="机器人列表页 (3.1)"
        content={
          <div className="space-y-2">
            <p className="font-medium text-gray-900">3.1. 机器人列表页</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>页面目标</strong>：同步并管理第三方(百度)的外呼机器人话术模板。</li>
              <li><strong>列表字段</strong>：机器人ID、机器人名称、机器人呼叫类型。</li>
              <li><strong>功能交互</strong>：
                <ul className="list-[circle] pl-5 mt-1 space-y-1 text-gray-600">
                  <li><strong>同步机器人</strong>：点击“获取机器人”按钮 -&gt; 调用百度API -&gt; 成功提示“同步成功”并刷新列表；失败提示错误信息。</li>
                  <li><strong>无筛选</strong>：默认展示所有。</li>
                </ul>
              </li>
            </ul>
          </div>
        }
      />

      <Card>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium text-gray-900">机器人列表</h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">共 {robots.length} 个</span>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleSync} disabled={loading} className="flex items-center">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? '同步中...' : '获取机器人'}
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">机器人ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">机器人名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">呼叫类型</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {robots.map((robot) => (
                <tr key={robot.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{robot.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{robot.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{robot.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RobotListPage;