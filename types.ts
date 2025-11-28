export interface Robot {
  id: string;
  name: string;
  type: string;
}

export interface Task {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'paused' | 'completed';
  createTime: string;
  totalNumbers: number;
  calledCount: number;
  connectedCount: number;
  signedCount: number;
}

export interface CallRecord {
  id: string;
  taskName: string;
  robotName: string;
  phone: string;
  callTime: string;
  status: 'executed' | 'pending';
  result: 'connected' | 'not_connected';
  failReason?: string;
  callType: 'first' | 'retry' | 'appointment';
  tags: string[];
  signStatus: 'unsigned' | 'signed' | 'cancelled';
  duration: string; // "01:23"
  chatLog?: ChatMessage[];
}

export interface ChatMessage {
  role: 'bot' | 'user';
  content: string;
  time: string;
}

export interface RetryRule {
  id: number;
  delayValue: number;
  delayUnit: 'minute' | 'hour';
}