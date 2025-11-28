import React, { useState } from 'react';
import { Card, Badge, Button, PrdInfo, Modal } from '../components/UIComponents';
import { Search, Bot, User } from 'lucide-react';
import { CallRecord } from '../types';

const CallResultPage: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<CallRecord | null>(null);

  const records: CallRecord[] = [
    {
      id: 'C_001',
      taskName: '自动创建_202310240900',
      robotName: '新用户激活_标准版_V1',
      phone: '138****0001',
      callTime: '2023-10-24 09:15:22',
      status: 'executed',
      result: 'connected',
      callType: 'first',
      tags: ['意向-高', '个人', '咨询报价'],
      signStatus: 'unsigned',
      duration: '02:15',
      chatLog: [
        { role: 'bot', content: '您好，这里是XX平台，看到您刚注册了我们的服务，想问下您主要是有哪方面的需求呢？', time: '00:00' },
        { role: 'user', content: '哦，你好。我主要是想看下个人理财的产品。', time: '00:10' },
        { role: 'bot', content: '明白的，针对个人用户我们有几款热门的短期理财，收益率在3%-4%之间，您感兴趣了解下吗？', time: '00:15' },
        { role: 'user', content: '可以啊，大概多少起投？', time: '00:25' },
        { role: 'bot', content: '一千元起投的，门槛很低。那我这边安排专业的理财顾问加您微信详细发您资料可以吗？', time: '00:30' },
        { role: 'user', content: '行，就这个号。', time: '00:45' },
      ]
    },
    {
      id: 'C_002',
      taskName: '自动创建_202310240900',
      robotName: '新用户激活_标准版_V1',
      phone: '139****9999',
      callTime: '2023-10-24 09:18:11',
      status: 'executed',
      result: 'not_connected',
      failReason: '拒接',
      callType: 'first',
      tags: [],
      signStatus: 'unsigned',
      duration: '00:00'
    },
    {
      id: 'C_003',
      taskName: '手动创建_202310241030',
      robotName: '沉默用户召回_V2',
      phone: '137****8888',
      callTime: '2023-10-24 10:35:00',
      status: 'executed',
      result: 'connected',
      callType: 'retry',
      tags: ['意向-中', '企业'],
      signStatus: 'signed',
      duration: '01:45',
      chatLog: [
        { role: 'bot', content: '您好，这边是XX平台...', time: '00:00' },
        { role: 'user', content: '不需要，谢谢。', time: '00:05' },
      ]
    }
  ];

  return (
    <div>
      <PrdInfo 
        title="外呼结果列表 (3.6)"
        content={
            <div className="space-y-2">
                <p className="font-medium text-gray-900">3.6. 外呼结果列表</p>
                <ul className="list-disc pl-5 space-y-1">
                <li><strong>页面目标</strong>：查看明细数据，是销售分配和效果分析的数据源。</li>
                <li><strong>数据来源</strong>：百度外呼结束后的回调数据 + 本地补充数据。</li>
                <li><strong>列表字段</strong>：
                    <ul className="list-[circle] pl-5 mt-1 space-y-1 text-gray-600">
                        <li>基础信息：任务名称、机器人名称、手机号码、外呼时间。</li>
                        <li>状态信息：
                            <ul className="list-[square] pl-5 mt-1">
                                <li>执行状态：待执行 (未收到回调)、已执行 (收到回调)。</li>
                                <li>外呼结果：已接通、未接通。</li>
                                <li>未接通原因：(空号、拒接、超时等)。</li>
                                <li>呼叫类型：首次呼叫、重试、预约呼叫。</li>
                            </ul>
                        </li>
                        <li>业务信息：
                            <ul className="list-[square] pl-5 mt-1">
                                <li>标签抽取：(百度AI提取的意向标签)。</li>
                                <li>签约状态：未签约/已签约/已解约 (读取实时用户状态)。</li>
                                <li>对话时长。</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><strong>操作</strong>：
                    <ul className="list-[circle] pl-5 mt-1 space-y-1 text-gray-600">
                        <li><strong>查看详情</strong>：仅“已接通”显示。点击弹窗展示 <strong>对话原文</strong> (Chat Log)。</li>
                    </ul>
                </li>
                <li><strong>筛选条件</strong>：
                    <ul className="list-[circle] pl-5 mt-1 space-y-1 text-gray-600">
                        <li>任务名称 (模糊)、手机号 (精确)、外呼时间段。</li>
                        <li>外呼结果 (已接通/未接通)、标签抽取 (模糊)、签约状态 (多选)。</li>
                    </ul>
                </li>
                </ul>
            </div>
        }
      />

      <Card className="mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="任务名称" className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <input type="text" placeholder="手机号" className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <div className="flex items-center space-x-1">
                <input type="date" className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <span className="text-gray-400">-</span>
                <input type="date" className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">全部结果</option>
                <option value="connected">已接通</option>
                <option value="not_connected">未接通</option>
            </select>
            <input type="text" placeholder="意向标签" className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">签约状态</option>
                <option value="signed">已签约</option>
                <option value="unsigned">未签约</option>
                <option value="cancelled">已解约</option>
            </select>
            <div className="col-span-1 md:col-span-2 hidden lg:block"></div>
            <Button className="flex justify-center items-center col-span-1 md:col-span-4 lg:col-span-2 xl:col-span-1 xl:col-start-4">
                <Search className="h-4 w-4 mr-2" /> 查询
            </Button>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">任务信息</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">手机号/时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">执行状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">通话状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">呼叫类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">时长</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">AI标签</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">签约状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{record.taskName}</div>
                    <div className="text-xs text-gray-500">{record.robotName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{record.phone}</div>
                    <div className="text-xs text-gray-500">{record.callTime}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={record.status === 'executed' ? '已执行' : '待执行'} type="neutral" />
                  </td>
                  <td className="px-6 py-4">
                    {record.result === 'connected' ? (
                        <Badge status="已接通" type="success" />
                    ) : (
                        <Badge status={`未接通 (${record.failReason})`} type="error" />
                    )}
                  </td>
                   <td className="px-6 py-4 text-sm text-gray-600">
                    {record.callType === 'first' ? '首次呼叫' : '重试'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{record.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                        {record.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">{tag}</span>
                        ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${record.signStatus === 'signed' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                        {record.signStatus === 'unsigned' ? '未签约' : record.signStatus === 'signed' ? '已签约' : '已解约'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {record.result === 'connected' && (
                        <Button variant="outline" className="px-2 py-1 text-xs" onClick={() => setSelectedRecord(record)}>
                            查看详情
                        </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Chat Log Modal */}
      <Modal
        isOpen={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title="对话详情与录音"
        footer={
            <div className="w-full flex justify-between items-center text-xs text-gray-500">
                <span>Call ID: {selectedRecord?.id}</span>
                {/* Allocation status removed per user request */}
            </div>
        }
      >
        <div className="space-y-6">
            {selectedRecord && (
                <>
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between border border-gray-100">
                    <div>
                        <div className="flex items-center space-x-2">
                             <h4 className="text-base font-bold text-gray-800">{selectedRecord.phone}</h4>
                             <Badge status={selectedRecord.robotName} type="neutral" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{selectedRecord.callTime}</p>
                    </div>
                    <div className="text-right">
                        <div className="bg-white px-3 py-1 rounded border border-gray-200 text-sm font-medium">
                            通话时长: {selectedRecord.duration}
                        </div>
                        <div className="mt-1 flex space-x-1 justify-end">
                            {selectedRecord.tags.map(tag => (
                                <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4 p-2">
                    {selectedRecord.chatLog?.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                            {msg.role === 'bot' && (
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                                    <Bot className="h-4 w-4 text-gray-500" />
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-3 shadow-sm ${
                                    msg.role === 'bot' 
                                        ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none' 
                                        : 'bg-blue-600 text-white rounded-tr-none'
                                }`}
                            >
                                <div className="text-sm leading-relaxed">{msg.content}</div>
                                <div className={`text-xs mt-1.5 ${msg.role === 'bot' ? 'text-gray-400' : 'text-blue-200'} text-right`}>
                                    {msg.time}
                                </div>
                            </div>
                            {msg.role === 'user' && (
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 flex-shrink-0">
                                    <User className="h-4 w-4 text-blue-600" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
      </Modal>
    </div>
  );
};

export default CallResultPage;