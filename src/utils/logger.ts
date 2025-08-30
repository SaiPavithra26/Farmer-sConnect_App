interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  context?: string;
  data?: any;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;

  private addLog(level: LogEntry['level'], message: string, context?: string, data?: any) {
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      data,
    };

    this.logs.push(logEntry);

    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console output in development
    if (__DEV__) {
      const contextStr = context ? `[${context}] ` : '';
      const logMessage = `${contextStr}${message}`;
      
      switch (level) {
        case 'debug':
          console.log(logMessage, data);
          break;
        case 'info':
          console.info(logMessage, data);
          break;
        case 'warn':
          console.warn(logMessage, data);
          break;
        case 'error':
          console.error(logMessage, data);
          break;
      }
    }
  }

  debug(message: string, context?: string, data?: any) {
    this.addLog('debug', message, context, data);
  }

  info(message: string, context?: string, data?: any) {
    this.addLog('info', message, context, data);
  }

  warn(message: string, context?: string, data?: any) {
    this.addLog('warn', message, context, data);
  }

  error(message: string, context?: string, data?: any) {
    this.addLog('error', message, context, data);
  }

  // Predefined logging methods for common scenarios
  logApiCall(endpoint: string, method: string, duration?: number, error?: any) {
    if (error) {
      this.error(`API call failed: ${method} ${endpoint}`, 'API', { error, duration });
    } else {
      this.info(`API call successful: ${method} ${endpoint}`, 'API', { duration });
    }
  }

  logUserAction(action: string, userId?: string, data?: any) {
    this.info(`User action: ${action}`, 'USER', { userId, ...data });
  }

  logScreenView(screenName: string, userId?: string) {
    this.info(`Screen viewed: ${screenName}`, 'NAVIGATION', { userId });
  }

  logError(error: Error, context?: string, additionalData?: any) {
    this.error(error.message, context, {
      stack: error.stack,
      name: error.name,
      ...additionalData,
    });
  }

  logPerformance(operation: string, duration: number, context?: string) {
    if (duration > 1000) {
      this.warn(`Slow operation: ${operation} took ${duration}ms`, context);
    } else {
      this.debug(`Performance: ${operation} took ${duration}ms`, context);
    }
  }

  // Get logs for debugging or sending to external service
  getLogs(level?: LogEntry['level']): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return this.logs;
  }

  getRecentLogs(count: number = 50): LogEntry[] {
    return this.logs.slice(-count);
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Search logs
  searchLogs(query: string): LogEntry[] {
    const lowercaseQuery = query.toLowerCase();
    return this.logs.filter(log => 
      log.message.toLowerCase().includes(lowercaseQuery) ||
      log.context?.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Get logs by time range
  getLogsByTimeRange(startTime: Date, endTime: Date): LogEntry[] {
    return this.logs.filter(log => {
      const logTime = new Date(log.timestamp);
      return logTime >= startTime && logTime <= endTime;
    });
  }

  // Get error summary
  getErrorSummary(): { [key: string]: number } {
    const errorLogs = this.getLogs('error');
    const summary: { [key: string]: number } = {};

    errorLogs.forEach(log => {
      const key = log.context || 'Unknown';
      summary[key] = (summary[key] || 0) + 1;
    });

    return summary;
  }
}

export const logger = new Logger();
export default Logger;