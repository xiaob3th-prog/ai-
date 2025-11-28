import React, { useState } from 'react';
import { LayoutDashboard, Users, Phone, ListChecks, FileText, Settings, Bot, Menu, ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'prd', label: 'PRD文档', icon: FileText },
    { id: 'robots', label: '机器人列表', icon: Bot },
    { id: 'rules', label: '自动外呼规则', icon: Settings },
    { id: 'manual', label: '手动筛选外呼', icon: Users },
    { id: 'tasks', label: '任务列表', icon: ListChecks },
    { id: 'results', label: '外呼结果', icon: Phone },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-100 px-4">
          {!collapsed && <span className="text-xl font-bold text-blue-600 truncate">AI自动外呼</span>}
          {collapsed && <span className="text-xl font-bold text-blue-600">AI</span>}
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <div className="flex items-center"><ChevronLeft className="h-5 w-5 mr-2" /> <span>收起侧边栏</span></div>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            {menuItems.find(i => i.id === activePage)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-gray-500">系统运行正常</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;