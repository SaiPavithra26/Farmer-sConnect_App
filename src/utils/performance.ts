interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

class PerformanceService {
  private metrics: PerformanceMetric[] = [];
  private activeMetrics: Map<string, number> = new Map();

  startTimer(name: string, metadata?: Record<string, any>) {
    const startTime = Date.now();
    this.activeMetrics.set(name, startTime);
    
    this.metrics.push({
      name,
      startTime,
      metadata,
    });
  }

  endTimer(name: string) {
    const startTime = this.activeMetrics.get(name);
    if (!startTime) {
      console.warn(`No active timer found for: ${name}`);
      return;
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Update the metric
    const metricIndex = this.metrics.findIndex(
      m => m.name === name && m.startTime === startTime && !m.endTime
    );
    
    if (metricIndex !== -1) {
      this.metrics[metricIndex].endTime = endTime;
      this.metrics[metricIndex].duration = duration;
    }

    this.activeMetrics.delete(name);
    
    console.log(`Performance: ${name} took ${duration}ms`);
    return duration;
  }

  measureAsync<T>(name: string, asyncFunction: () => Promise<T>): Promise<T> {
    return new Promise(async (resolve, reject) => {
      this.startTimer(name);
      
      try {
        const result = await asyncFunction();
        this.endTimer(name);
        resolve(result);
      } catch (error) {
        this.endTimer(name);
        reject(error);
      }
    });
  }

  measureSync<T>(name: string, syncFunction: () => T): T {
    this.startTimer(name);
    try {
      const result = syncFunction();
      this.endTimer(name);
      return result;
    } catch (error) {
      this.endTimer(name);
      throw error;
    }
  }

  // Predefined measurements for common operations
  measureApiCall<T>(endpoint: string, apiCall: () => Promise<T>): Promise<T> {
    return this.measureAsync(`api_call_${endpoint}`, apiCall);
  }

  measureScreenLoad(screenName: string, loadFunction: () => void) {
    return this.measureSync(`screen_load_${screenName}`, loadFunction);
  }

  measureImageLoad(imageUrl: string): Promise<void> {
    return this.measureAsync(`image_load`, () => {
      return new Promise((resolve) => {
        // Simulate image loading
        setTimeout(resolve, Math.random() * 1000);
      });
    });
  }

  // Get performance data
  getMetrics(): PerformanceMetric[] {
    return this.metrics.filter(m => m.duration !== undefined);
  }

  getAverageTime(name: string): number {
    const relevantMetrics = this.metrics.filter(
      m => m.name === name && m.duration !== undefined
    );
    
    if (relevantMetrics.length === 0) return 0;
    
    const totalTime = relevantMetrics.reduce((sum, m) => sum + (m.duration || 0), 0);
    return totalTime / relevantMetrics.length;
  }

  getSlowestOperations(limit: number = 10): PerformanceMetric[] {
    return this.metrics
      .filter(m => m.duration !== undefined)
      .sort((a, b) => (b.duration || 0) - (a.duration || 0))
      .slice(0, limit);
  }

  clearMetrics() {
    this.metrics = [];
    this.activeMetrics.clear();
  }

  exportMetrics(): string {
    return JSON.stringify(this.getMetrics(), null, 2);
  }

  // Memory usage tracking (basic)
  trackMemoryUsage(context: string) {
    // In a real app, you might use a native module for this
    console.log(`Memory check: ${context}`);
  }

  // FPS tracking placeholder
  trackFPS(callback: (fps: number) => void) {
    // In a real app, you would implement FPS tracking
    // This is a placeholder for the concept
    let frameCount = 0;
    let lastTime = Date.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = Date.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        callback(fps);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }
}

export const performance = new PerformanceService();
export default PerformanceService;