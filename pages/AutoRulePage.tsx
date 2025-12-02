import React, { useState } from 'react';
import { Card, Button, PrdInfo } from '../components/UIComponents';
import { Plus, Trash2, Save } from 'lucide-react';
import { RetryRule } from '../types';

const AutoRulePage: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [retryEnabled, setRetryEnabled] = useState(false);
  const [retryRules, setRetryRules] = useState<RetryRule[]>([
    { id: 1, delayValue: 30, delayUnit: 'minute' }
  ]);

  const addRule = () => {
    if (retryRules.length >= 3) return;
    setRetryRules([...retryRules, { id: Date.now(), delayValue: 1, delayUnit: 'hour' }]);
  };

  const removeRule = (id: number) => {
    setRetryRules(retryRules.filter(r => r.id !== id));
  };

  const handleSave = () => {
    alert('保存成功！');
  };

  return (
    <div>
      <PrdInfo 
        title="自动外呼规则配置 (3.2)"
        content={
          <div className="space-y-2">
            <p className="font-medium text-gray-900">3.2. 自动外呼规则配置</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>页面目标</strong>：设置新用户自动触达的全局策略。</li>
              <li><strong>交互逻辑</strong>：单页面表单。</li>
              <li><strong>字段定义</strong>：
                <ul className="list-[circle] pl-5 mt-1 space-y-1 text-gray-600">
                  <li><strong>总开关</strong>：[Switch开关] 开启/关闭。关闭时，下方所有配置项置灰不可用，且定时任务停止扫描。</li>
                  <li><strong>机器人选择</strong>：[下拉单选] 数据源取自“机器人列表”。</li>
                  <li><strong>外呼时间段</strong>：[下拉单选]
                      <ul className="list-[square] pl-5 mt-1">
                          <li>早九晚六 (09:00~18:00)</li>
                          <li>早九晚五 (09:00~17:00)</li>
                          <li>早十晚六 (10:00~18:00)</li>
                          <li>早十晚五 (10:00~17:00)</li>
                      </ul>
                  </li>
                  <li><strong>呼叫周期</strong>：[下拉单选] 所有自然日 / 仅工作日 / 仅周末。</li>
                  <li><strong>午休禁呼</strong>：[下拉单选] 不午休 / 午休1小时(12-13) / 午休2小时(12-14)。</li>
                  <li><strong>自动重播策略</strong>：
                      <ul className="list-[square] pl-5 mt-1">
                          <li>[Switch开关] 开启后显示配置项。</li>
                          <li><strong>规则配置</strong>：支持动态添加，最多3条。
                            <br />逻辑：若第N次呼叫失败，则 {'{{整数}} {{单位：小时/分钟}}'} 后重播。
                            <br />交互：点击“+”增加阶梯，点击“-”删除阶梯。
                          </li>
                      </ul>
                  </li>
                </ul>
              </li>
              <li><strong>保存验证</strong>：点击保存时校验必填项，未填项红框高亮提示。</li>
            </ul>
          </div>
        }
      />

      <Card className="max-w-4xl mx-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">自动外呼全局策略</h2>
          <div className="flex items-center">
            <span className={`mr-3 text-sm font-medium ${enabled ? 'text-gray-900' : 'text-gray-400'}`}>
              {enabled ? '已开启' : '已关闭'}
            </span>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                enabled ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className={`p-8 space-y-8 ${!enabled ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Section 1: Basic Config */}
          <section className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900 border-l-4 border-primary-500 pl-3">基础配置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">选择机器人 <span className="text-red-500">*</span></label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border">
                  <option>新用户激活_标准版_V1</option>
                  <option>沉默用户召回_V2</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">呼叫周期 <span className="text-red-500">*</span></label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border">
                  <option>所有自然日</option>
                  <option>仅工作日</option>
                  <option>仅周末</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">外呼时间段 <span className="text-red-500">*</span></label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border">
                  <option>早九晚六 (09:00~18:00)</option>
                  <option>早九晚五 (09:00~17:00)</option>
                  <option>早十晚六 (10:00~18:00)</option>
                  <option>早十晚五 (10:00~17:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">午休禁呼 <span className="text-red-500">*</span></label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md border">
                  <option>午休1小时 (12:00-13:00)</option>
                  <option>午休2小时 (12:00-14:00)</option>
                  <option>不午休</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Retry Config */}
          <section className="space-y-6 pt-6 border-t border-gray-100">
             <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900 border-l-4 border-primary-500 pl-3">自动重播策略</h3>
                <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{retryEnabled ? '开启' : '关闭'}</span>
                    <button
                    onClick={() => setRetryEnabled(!retryEnabled)}
                    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                        retryEnabled ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                    >
                    <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        retryEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                    />
                    </button>
                </div>
             </div>

            {retryEnabled && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    {retryRules.map((rule, index) => (
                        <div key={rule.id} className="flex items-center mb-4 last:mb-0">
                            <span className="text-sm text-gray-600 w-24">第 {index + 1} 次重试：</span>
                            <span className="text-sm text-gray-600 mr-2">呼叫失败后等待</span>
                            <input 
                                type="number" 
                                className="w-20 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-primary-500 focus:border-primary-500"
                                defaultValue={rule.delayValue}
                            />
                            <select className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-primary-500 focus:border-primary-500">
                                <option value="minute">分钟</option>
                                <option value="hour">小时</option>
                            </select>
                            <span className="text-sm text-gray-600 ml-2">后进行重播</span>
                            <button 
                                onClick={() => removeRule(rule.id)}
                                className="ml-4 text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                    
                    {retryRules.length < 3 && (
                        <Button variant="secondary" onClick={addRule} className="mt-2 text-xs flex items-center">
                            <Plus className="h-3 w-3 mr-1" /> 添加重试阶梯 (最多3条)
                        </Button>
                    )}
                </div>
            )}
          </section>

          <div className="pt-6 border-t border-gray-200 flex justify-end">
             <Button className="flex items-center px-6" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" /> 保存配置
             </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AutoRulePage;