import React from 'react';
import { Card } from '../components/UIComponents';
import { ExternalLink } from 'lucide-react';

interface PRDPageProps {
  onNavigate: (page: string) => void;
}

const PRDPage: React.FC<PRDPageProps> = ({ onNavigate }) => {
  const LinkHeader: React.FC<{ title: string; target: string; id: string }> = ({ title, target, id }) => (
    <h3 className="text-xl font-bold mt-8 mb-3 border-l-4 border-blue-500 pl-3 flex items-center group cursor-pointer hover:text-blue-700" onClick={() => onNavigate(target)}>
      {id}. {title}
      <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </h3>
  );

  return (
    <div className="space-y-6">
      <Card className="p-8">
        <div className="prose max-w-none text-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">AI自动外呼系统产品需求文档 (PRD)</h1>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6 text-sm text-gray-600 grid grid-cols-2 gap-4">
            <div><span className="font-bold">文档版本：</span>V1.0</div>
            <div><span className="font-bold">面向对象：</span>后端开发、前端开发、测试人员、UI设计</div>
            <div><span className="font-bold">文档状态：</span>进行中</div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. 项目背景与目标</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>背景：</strong>为了提高销售线索挖掘效率，降低人工盲呼成本。</li>
            <li><strong>目标：</strong>
              <ol className="list-decimal pl-6 mt-1 space-y-1">
                <li><strong>自动化触达：</strong>对新注册用户进行实时AI外呼筛选。</li>
                <li><strong>存量激活：</strong>支持对历史沉没用户进行批量清洗。</li>
                <li><strong>智能分配：</strong>基于AI对话提取的标签，将高意向用户自动分配给对应销售，实现由“人找线索”转变为“线索找人”。</li>
                <li><strong>效果评估：</strong>通过全链路数据闭环，评估不同话术效果及ROI。</li>
              </ol>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. 业务流程图 (逻辑描述)</h2>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 space-y-4 mb-6">
            <div className="mb-4">
              <span className="font-bold text-blue-800 block mb-1">1. 新用户流：</span>
              <span className="text-gray-700">用户注册 -&gt; 满足定时条件(每30min) -&gt; 校验规则(未签约/无销售/个人) -&gt; <strong>创建自动外呼任务</strong> -&gt; 百度AI外呼 -&gt; 回调结果 -&gt; <strong>抽取标签</strong> -&gt; <strong>自动分配销售</strong> -&gt; 销售跟进。</span>
            </div>
            <div>
              <span className="font-bold text-blue-800 block mb-1">2. 老用户流：</span>
              <span className="text-gray-700">运营手动筛选 -&gt; 校验规则(未外呼/未接通) -&gt; <strong>创建手动外呼任务</strong> -&gt; 百度AI外呼 -&gt; 回调结果 -&gt; <strong>抽取标签</strong> -&gt; <strong>自动分配销售</strong> -&gt; 销售跟进。</span>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. 功能模块详情</h2>
          <p className="mb-4 text-sm text-gray-500">百度接口文档：<a href="https://cloud.baidu.com/doc/ky/s/rmfnjpj48" className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">https://cloud.baidu.com/doc/ky/s/rmfnjpj48</a></p>
          
          <LinkHeader id="3.1" title="机器人列表页" target="robots" />
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>页面目标</strong>：同步并管理第三方(百度)的外呼机器人话术模板。</li>
            <li><strong>列表字段</strong>：机器人ID、机器人名称、机器人呼叫类型。</li>
            <li><strong>功能交互</strong>：
                <ul className="list-circle pl-6 mt-1 text-gray-600">
                    <li><strong>同步机器人</strong>：点击“获取机器人”按钮 -&gt; 调用百度API -&gt; 成功提示“同步成功”并刷新列表；失败提示错误信息。</li>
                    <li><strong>无筛选</strong>：默认展示所有。</li>
                </ul>
            </li>
          </ul>

          <LinkHeader id="3.2" title="自动外呼规则配置" target="rules" />
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>页面目标</strong>：设置新用户自动触达的全局策略。</li>
            <li><strong>交互逻辑</strong>：单页面表单。</li>
            <li><strong>字段定义</strong>：
                <ul className="list-circle pl-6 mt-1 text-gray-600 space-y-1">
                    <li><strong>总开关</strong>：[Switch开关] 开启/关闭。关闭时，下方所有配置项置灰不可用，且定时任务停止扫描。</li>
                    <li><strong>机器人选择</strong>：[下拉单选] 数据源取自“机器人列表”。</li>
                    <li><strong>外呼时间段</strong>：[下拉单选] 早九晚六 (09:00~18:00) / 早九晚五 (09:00~17:00) / 早十晚六 (10:00~18:00) / 早十晚五 (10:00~17:00)。</li>
                    <li><strong>呼叫周期</strong>：[下拉单选] 所有自然日 / 仅工作日 / 仅周末。</li>
                    <li><strong>午休禁呼</strong>：[下拉单选] 不午休 / 午休1小时(12-13) / 午休2小时(12-14)。</li>
                    <li><strong>自动重播策略</strong>：
                        <ul className="list-[square] pl-6 mt-1">
                            <li>[Switch开关] 开启后显示配置项。</li>
                            <li><strong>规则配置</strong>：支持动态添加，最多3条。逻辑：若第N次呼叫失败，则 {'{{整数}} {{单位：小时/分钟}}'} 后重播。交互：点击“+”增加阶梯，点击“-”删除阶梯。</li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li><strong>保存验证</strong>：点击保存时校验必填项，未填项红框高亮提示。</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-3 border-l-4 border-blue-500 pl-3">3.3. 定时任务脚本 (后端逻辑)</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4 bg-gray-50 p-4 rounded">
            <li><strong>触发机制</strong>：每30分钟执行一次 (Crontab)。</li>
            <li><strong>前置校验</strong>：检查“自动外呼规则”总开关是否开启，关闭则跳过。</li>
            <li><strong>数据抓取范围</strong>：
                <ul className="list-circle pl-6 mt-1">
                    <li>时间窗口：<code>[当前时间-1小时, 当前时间-30分钟]</code> 。</li>
                    <li>用户筛选条件：类型=个人 AND 签约状态=未签约 AND 销售归属=NULL。</li>
                </ul>
            </li>
            <li><strong>执行动作</strong>：
                <ul className="list-circle pl-6 mt-1">
                    <li>若数据为空：结束本次任务。</li>
                    <li>若有数据：
                        <ol className="list-decimal pl-6 mt-1">
                            <li>调用百度接口创建任务，任务名：<code>自动创建_yyyyMMddHHmmss</code>。</li>
                            <li>参数配置：读取“自动外呼规则配置”中的参数（是否录音=是）。</li>
                            <li>导入名单：传入抓取到的手机号列表。</li>
                            <li>启动任务：变更任务状态为“执行中”。</li>
                            <li>写入本地任务记录表。</li>
                        </ol>
                    </li>
                </ul>
            </li>
          </ul>

          <LinkHeader id="3.4" title="手动筛选与外呼页面" target="manual" />
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>页面目标</strong>：清洗存量老用户。</li>
            <li><strong>列表筛选与展示</strong>：
                <ul className="list-circle pl-6 mt-1 text-gray-600">
                    <li><strong>筛选条件</strong>：注册时间段、自动外呼状态（全部/未外呼过/外呼过且未接通）。</li>
                    <li><strong>列表字段</strong>：UID、姓名、手机号、注册时间、是否自动外呼过。</li>
                    <li><strong>跳转</strong>：点击姓名，新标签页打开CMS用户详情页。</li>
                </ul>
            </li>
            <li><strong>数据源限制</strong>：仅显示 <code>未签约</code> AND <code>销售为空</code> AND 未进行过自动外呼或者自动外呼过但是未接通 AND <code>类型=个人</code> 的用户。</li>
            <li><strong>发起外呼交互</strong>：
                <ul className="list-circle pl-6 mt-1 text-gray-600">
                    <li><strong>按钮状态</strong>：
                        <ul className="list-[square] pl-6 mt-1">
                             <li>未选择筛选条件：置灰。</li>
                             <li>筛选结果 &gt; 1000条：置灰 (提示：单次任务不能超过1000人，请缩小筛选范围)。</li>
                             <li>筛选结果 1~999条：高亮可点击。</li>
                        </ul>
                    </li>
                    <li><strong>配置弹窗/新页</strong>：点击按钮后进入“手动外呼配置页”。默认回显“自动外呼规则”的配置参数，但允许用户修改 (修改不影响全局自动配置)。</li>
                    <li><strong>确认执行</strong>：创建任务，任务名：<code>手动创建_yyyyMMddHHmmss</code>。调用接口流程同自动任务。</li>
                </ul>
            </li>
          </ul>

          <LinkHeader id="3.5" title="任务列表页" target="tasks" />
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>页面目标</strong>：监控外呼任务的运行状态。</li>
            <li><strong>列表字段</strong>：
                <ul className="list-circle pl-6 mt-1 text-gray-600">
                    <li>任务ID、任务名称。</li>
                    <li>任务状态：未启动、执行中、已暂停、已完成。</li>
                    <li>创建时间、号码量、外呼量、呼通量、呼通率 (呼通量/外呼量)、签约量。</li>
                    <li><strong>操作</strong>：[暂停]、[继续] (仅针对执行中/暂停状态)。点击暂停、继续调用任务状态变更接口。</li>
                </ul>
            </li>
            <li><strong>排序</strong>：创建时间倒序。</li>
            <li><strong>筛选</strong>：创建时间段。</li>
          </ul>

          <LinkHeader id="3.6" title="外呼结果列表" target="results" />
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>页面目标</strong>：查看明细数据，是销售分配和效果分析的数据源。</li>
            <li><strong>数据来源</strong>：百度外呼结束后的回调数据 + 本地补充数据。</li>
            <li><strong>列表字段</strong>：
                <ul className="list-circle pl-6 mt-1 text-gray-600">
                    <li>基础信息：任务名称、机器人名称、手机号码、外呼时间。</li>
                    <li>状态信息：执行状态 (待执行/已执行)、外呼结果 (已接通/未接通)、未接通原因 (空号、拒接、超时等)、呼叫类型 (首次呼叫/重试/预约呼叫)。</li>
                    <li>业务信息：标签抽取 (百度AI提取的意向标签)、签约状态 (未签约/已签约/已解约)、对话时长。</li>
                </ul>
            </li>
            <li><strong>操作</strong>：<strong>查看详情</strong>（仅“已接通”显示）。点击弹窗展示 <strong>对话原文</strong> (Chat Log)。</li>
            <li><strong>筛选条件</strong>：任务名称 (模糊)、手机号 (精确)、外呼时间段、外呼结果、标签抽取 (模糊)、签约状态 (多选)。</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-3 border-l-4 border-blue-500 pl-3">3.7. 核心业务逻辑：自动分配</h3>
          <div className="bg-yellow-50 p-4 rounded border border-yellow-100 mb-6">
            <div className="font-bold mb-2">触发时机：接收到外呼结果回调，且外呼结果=已接通。</div>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>企业分配：</strong>
                  <ul className="list-circle pl-6">
                    <li>条件：<code>标签抽取</code> 包含 "企业"。</li>
                    <li>动作：平均分配给【企业销售团队】成员。</li>
                  </ul>
              </li>
              <li><strong>个人分配：</strong>
                  <ul className="list-circle pl-6">
                    <li>条件：<code>标签抽取</code> 包含 "个人" AND <code>城市标签</code> 属于 (北京, 上海, 广州, 杭州, 天津, 武汉)。</li>
                    <li>动作：平均分配给【个人销售团队】成员。</li>
                  </ul>
              </li>
              <li><strong>不分配：</strong>
                  <ul className="list-circle pl-6">
                    <li>条件：不满足上述任何条件。</li>
                    <li>动作：不分配销售。</li>
                  </ul>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-3 border-l-4 border-blue-500 pl-3">3.8. 系统备注逻辑</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>触发时机</strong>：外呼结果=已接通。</li>
            <li><strong>执行动作</strong>：在用户画像/CRM系统的“备注”模块插入一条记录。</li>
            <li><strong>备注格式</strong>：
                <pre className="bg-gray-100 p-2 rounded mt-1 text-sm">
【AI外呼记录】  
标签：{'{{标签抽取结果}}'}  
对话详情：{'{{对话原文}}'}
                </pre>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. 非功能性需求</h2>
          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li><strong>接口稳定性</strong>：百度API调用需增加重试机制和超时熔断，避免阻塞定时任务。</li>
            <li><strong>并发控制</strong>：手动外呼虽然限制1000条，但需防止多个运营同时操作导致并发过高，建议后端增加任务队列处理。</li>
            <li><strong>数据一致性</strong>：分配销售时需加锁，防止同一个用户被分配给多个销售。</li>
          </ol>
        </div>
      </Card>
    </div>
  );
};

export default PRDPage;