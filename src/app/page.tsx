'use client';

import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // 初始化日期
  useEffect(() => {
    updateDate();
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  // 从localStorage加载任务
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('todoCheckinTasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }
  }, []);

  // 保存任务到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todoCheckinTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const updateDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      weekday: 'long' 
    };
    setCurrentDate(now.toLocaleDateString('zh-CN', options));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setTasks([newTask, ...tasks]);
    setInputText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? new Date().toISOString() : null
        };
      }
      return task;
    }));
  };

  const deleteTask = (id: number) => {
    if (window.confirm('确定要删除这个任务吗？')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="container">
      <header className="header">
        <h1>✅ Todo 打卡系统</h1>
        <p className="date">{currentDate}</p>
      </header>

      <div className="card">
        <form onSubmit={addTask} className="add-task">
          <input
            type="text"
            placeholder="添加新任务..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit">添加</button>
        </form>
      </div>

      <div className="card">
        <div className="stats">
          <div className="stat-item">
            <div className="stat-value">{totalTasks}</div>
            <div className="stat-label">总任务</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{completedTasks}</div>
            <div className="stat-label">已完成</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{totalTasks - completedTasks}</div>
            <div className="stat-label">待完成</div>
          </div>
        </div>

        {totalTasks > 0 && (
          <>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-text">今日进度: {progress}%</div>
          </>
        )}
      </div>

      <div className="card">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>还没有任务，添加一个开始吧！</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <div className="task-content">
                  <div className="task-text">{task.text}</div>
                  <div className="task-time">
                    {task.completed 
                      ? `✅ 完成于 ${formatTime(task.completedAt)}` 
                      : `📅 创建于 ${formatTime(task.createdAt)}`
                    }
                  </div>
                </div>
                <button 
                  className="task-delete"
                  onClick={() => deleteTask(task.id)}
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
