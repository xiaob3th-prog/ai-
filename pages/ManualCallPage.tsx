import React, { useState } from 'react';
import { Card, Button, Badge, PrdInfo, Modal } from '../components/UIComponents';
import { Filter, PhoneCall, Plus, Trash2 } from 'lucide-react';
import { RetryRule } from '../types';

const ManualCallPage: React.FC = () => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal State
  const [retryEnabled, setRetryEnabled] = useState(false);
  const [retryRules, setRetryRules] = useState<RetryRule[]>([{ id: 1, delayValue: 30, delayUnit: 'minute' }]);

  const addRule = () => {
    if (retryRules.length >= 3) return;
    setRetryRules([...retryRules, { id: Date.now(), delayValue: 1, delayUnit: 'hour' }]);
  };
  const removeRule = (id: number) => {
    setRetryRules(retryRules.filter(r => r.id !== id));
  };

  // Mock users
  const users = [
    { id: '1001', name: '张三', phone: '138****0001', regTime: '2023-10-24 10:00', status: '未外呼' },
    { id: '1002', name: '李四', phone: '139****0002', regTime: '2023-10-24 11:30', status: '未接通' },
    { id: '1003', name: '王五', phone: '137****0003', regTime: '2023-10-24 12:15', status: '未外呼' },
    { id: '1004', name: '赵六', phone: '158****0004', regTime: '2023-10-24 09:20', status: '未接通' },
    { id: '1005', name: '钱七', phone: '136****0005', regTime: '2023-10-23 15:45', status: '未外呼' },
  ];

  const handleSearch = () => {
    // Simulate search finding 5 records
    setSelectedCount(5); 
  };

  const handleCreateTask = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <PrdInfo 
        title="手动筛选与外呼 (3.4)"
        content={
          <div className="space-y-2">
            <p className="font-medium text-gray-900">3.4. 手动筛选与外呼页面</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>页面目标</strong>：清洗存量老用户。</li>
              <li><strong>列表筛选与展示</strong>：
                  <ul className="list-[circle] pl-5 mt-1 space-y-1 text-gray-600">
                      <li><strong>筛选条件</strong>：注册时间段、自动外呼状态（全部/未外呼过/外呼过且未接通）。</li>
                      <li><strong>列表字段</strong>：UID、姓名、手机号、注册时间、是否自动外呼过。</li>
                      <li><strong>跳转</strong>：点击姓名，新标签页打开CMS用户详情页。</li>
                  </ul>
              </li>
              <li><strong>数据源限制</strong>：仅显示 <code>未签约</code> AND <code>销售为空</code> AND 未进行过自动外呼或者自动外呼过但是未接通 AND <code>类型=个人</code> 的用户。</li>
              <li><strong>发起外呼交互</strong>：
                  <ul className="list-[circle] pl-5 mt-1 space-y-1 text-gray-600">
                      <li><strong>按钮状态</strong>：
                          <ul className="list-[square] pl-5 mt-1">
                              <li>未选择筛选条件：置灰。</li>
                              <li>筛选结果 &gt; 1000条：置灰 (提示：单次任务不能超过1000人，请缩小筛选范围)。</li>
                              <li>筛选结果 1~999条：高亮可点击。</li>
                          </ul>
                      </li>
                      <li><strong>配置弹窗/新页</strong>：
                          <ul className="list-[square] pl-5 mt-1">
                            <li>点击按钮后进入“手动外呼配置页”。</li>
                            <li>默认回显“自动外呼规则”的配置参数，但允许用户修改 (修改不影响全局自动配置)。</li>
                          </ul>
                      </li>
                      <li><strong>确认执行</strong>：
                          <ul className="list-[square] pl-5 mt-1">
                            <li>创建任务，任务名：<code>手动创建_yyyyMMddHHmmss</code>。</li>
                            <li>调用接口流程同自动任务。</li>
                          </ul>
                      </li>
                  </ul>
              </li>
            </ul>
          </div>
        }
      />

      <Card className="mb-6">
        <div className="p-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">注册时间段</label>
                <div className="flex items-center space-x-2">
                    <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
                    <span className="text-gray-500">-</span>
                    <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">外呼状态</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                    <option value="">全部</option>
                    <option value="none">未外呼过</option>
                    <option value="failed">外呼过且未接通</option>
                </select>
              </div>
              <div className="flex items-end">
                 <Button onClick={handleSearch} className="w-full flex justify-center items-center">
                    <Filter className="h-4 w-4 mr-2" /> 筛选数据
                 </Button>
              </div>
           </div>
        </div>
      </Card>

      <Card>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">筛选结果</h3>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                    当前筛选选中：<span className="text-blue-600 font-bold">{selectedCount}</span> 人
                </span>
                <Button 
                    onClick={handleCreateTask}
                    disabled={selectedCount === 0 || selectedCount > 1000}
                    className="flex items-center"
                >
                    <PhoneCall className="h-4 w-4 mr-2" /> 发起外呼任务
                </Button>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">UID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">姓名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">手机号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">注册时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer hover:underline">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.regTime}</td>
                  <td className="px-6 py-4">
                    <Badge status={user.status} type={user.status === '未接通' ? 'warning' : 'neutral'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination mock */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
            <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded text-gray-500 disabled:opacity-50">上一页</button>
                <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600">1</button>
                <button className="px-3 py-1 border rounded text-gray-500">2</button>
                <button className="px-3 py-1 border rounded text-gray-500">下一页</button>
            </div>
        </div>
      </Card>

      {/* Config Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="创建手动外呼任务"
        footer={
            <>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>取消</Button>
                <Button onClick={() => { alert('任务创建成功'); setIsModalOpen(false); }}>确认执行</Button>
            </>
        }
      >
        <div className="space-y-4">
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-sm text-yellow-800 mb-4">
                注意：已选中 {selectedCount} 人，将创建一次性外呼任务。
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">任务名称</label>
                <input type="text" disabled value={`手动创建_${new Date().toISOString().slice(0,10).replace(/-/g,'')}`} className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">机器人话术</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>新用户激活_标准版_V1</option>
                        <option>沉默用户召回_V2</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">外呼时间段</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>早九晚六 (09:00~18:00)</option>
                        <option>早九晚五 (09:00~17:00)</option>
                        <option>早十晚六 (10:00~18:00)</option>
                        <option>早十晚五 (10:00~17:00)</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">呼叫周期</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>所有自然日</option>
                        <option>仅工作日</option>
                        <option>仅周末</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">午休禁呼</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>午休1小时 (12:00-13:00)</option>
                        <option>午休2小时 (12:00-14:00)</option>
                        <option>不午休</option>
                    </select>
                </div>
            </div>

            {/* Retry Logic Copy */}
            <div className="border-t border-gray-100 pt-4">
                 <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">自动重播策略</h3>
                    <div className="flex items-center">
                        <span className="text-xs text-gray-600 mr-2">{retryEnabled ? '开启' : '关闭'}</span>
                        <button
                        onClick={() => setRetryEnabled(!retryEnabled)}
                        className={`relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            retryEnabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                        >
                        <span
                            className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            retryEnabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                        />
                        </button>
                    </div>
                 </div>

                {retryEnabled && (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        {retryRules.map((rule, index) => (
                            <div key={rule.id} className="flex items-center mb-2 last:mb-0">
                                <span className="text-xs text-gray-600 w-16">第{index+1}次重试</span>
                                <input type="number" className="w-16 border border-gray-300 rounded px-1 py-0.5 text-xs" defaultValue={rule.delayValue} />
                                <select className="ml-1 border border-gray-300 rounded px-1 py-0.5 text-xs">
                                    <option value="minute">分钟</option>
                                    <option value="hour">小时</option>
                                </select>
                                <span className="text-xs text-gray-600 ml-1">后</span>
                                <button onClick={() => removeRule(rule.id)} className="ml-2 text-red-500 hover:text-red-700">
                                    <Trash2 className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                        {retryRules.length < 3 && (
                            <Button variant="secondary" onClick={addRule} className="mt-2 text-xs flex items-center px-2 py-1 h-auto">
                                <Plus className="h-3 w-3 mr-1" /> 添加
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center pt-2">
                <input type="checkbox" id="record" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="record" className="ml-2 block text-sm text-gray-900">开启全程录音</label>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManualCallPage;