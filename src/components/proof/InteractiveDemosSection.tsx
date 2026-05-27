import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Play,
  RotateCcw,
  Zap,
  ArrowRight,
  Clock,
  Database,
  Activity,
  BarChart3,
  Network,
  Cpu,
  TrendingUp,
  Sparkles,
  Shield,
  Gauge,
} from 'lucide-react';

/* =========================================================
   TYPES
========================================================= */

interface APIResponse {
  status: number;
  data: {
    user: {
      id: number;
      name: string;
      role: string;
    };
    timestamp: string;
  };
}

/* =========================================================
   UTILS
========================================================= */

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

/* =========================================================
   SORTING VISUALIZATION
========================================================= */

const SortingDemo = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState(0);

  const generateArray = () => {
    const newArray = Array.from(
      { length: 15 },
      () => Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
    setCurrentIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSorting(false);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const quickSort = async () => {
    setSorting(true);
    setSortedIndices([]);
    setComparisons(0);

    const arr = [...array];

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        setCurrentIndices([j, high]);
        setComparisons(prev => prev + 1);
        await sleep(80);

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
        }
      }

      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      return i + 1;
    };

    const sort = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    };

    await sort(0, arr.length - 1);

    setCurrentIndices([]);
    setSortedIndices(Array.from({ length: arr.length }, (_, i) => i));
    setSorting(false);
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="font-orbitron text-white text-lg">Quick Sort Visualization</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{comparisons} comparisons</span>
          </div>
        </div>

        <div className="flex gap-4 text-xs text-gray-500 mb-4">
          <span>Time: O(n log n)</span>
          <span>Space: O(log n)</span>
        </div>

        <div className="flex items-end justify-center gap-1 h-40 mb-5 bg-gray-800/30 rounded-xl p-3 border border-white/5">
          {array.map((value, index) => (
            <motion.div
              key={index}
              layout
              className={`
                w-4 rounded-t-md transition-all duration-100
                ${sortedIndices.includes(index)
                  ? 'bg-gradient-to-t from-emerald-500 to-teal-400'
                  : currentIndices.includes(index)
                  ? 'bg-gradient-to-t from-orange-500 to-yellow-400'
                  : 'bg-gradient-to-t from-cyan-500 to-blue-500'
                }
              `}
              style={{ height: `${value}%` }}
              animate={{ scaleY: sorting ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={quickSort}
            disabled={sorting}
            size="sm"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600"
          >
            <Play className="w-4 h-4 mr-2" />
            {sorting ? 'Sorting...' : 'Run Sort'}
          </Button>
          <Button
            onClick={generateArray}
            disabled={sorting}
            size="sm"
            variant="outline"
            className="border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

/* =========================================================
   API DEMO
========================================================= */

const APIDemo = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<APIResponse | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [requestCount, setRequestCount] = useState(0);

  const simulateAPICall = async () => {
    setLoading(true);
    setResult(null);
    const start = performance.now();
    await sleep(900 + Math.random() * 400);
    const end = performance.now();
    setLatency(Math.round(end - start));
    setRequestCount(prev => prev + 1);
    setResult({
      status: 200,
      data: {
        user: {
          id: 1,
          name: 'Byte Ranger',
          role: 'Full Stack Developer',
        },
        timestamp: new Date().toISOString(),
      },
    });
    setLoading(false);
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <Network className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="font-orbitron text-white text-lg">API Request Simulation</h3>
          </div>
          {latency && (
            <span className="text-xs text-purple-400">
              {latency}ms • #{requestCount}
            </span>
          )}
        </div>

        <div className="bg-gray-800/30 rounded-lg p-3 mb-4 font-mono text-xs border border-white/5">
          <span className="text-purple-400">GET</span>
          <span className="text-gray-400"> /api/v1/dashboard/analytics</span>
        </div>

        <div className="bg-gray-800/30 rounded-lg p-4 mb-5 min-h-[120px] border border-white/5 font-mono text-xs overflow-hidden">
          {loading ? (
            <div className="flex items-center gap-3 text-gray-400">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <RotateCcw className="w-4 h-4" />
              </motion.div>
              Fetching response...
            </div>
          ) : result ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-emerald-400 mb-2">✓ 200 OK</div>
              <pre className="text-purple-400 overflow-x-auto text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </motion.div>
          ) : (
            <span className="text-gray-500">Click below to simulate an API request</span>
          )}
        </div>

        <Button
          onClick={simulateAPICall}
          disabled={loading}
          size="sm"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
        >
          <Zap className="w-4 h-4 mr-2" />
          {loading ? 'Processing...' : 'Send Request'}
        </Button>
      </CardContent>
    </Card>
  );
};

/* =========================================================
   STATE MACHINE DEMO
========================================================= */

const StateMachineDemo = () => {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [history, setHistory] = useState<string[]>(['idle']);

  const transitions: Record<string, string[]> = {
    idle: ['loading'],
    loading: ['success', 'error'],
    success: ['idle'],
    error: ['idle', 'loading'],
  };

  const stateColors: Record<string, string> = {
    idle: 'bg-gray-800/50 border-gray-600 text-gray-300',
    loading: 'bg-orange-500/20 border-orange-500 text-orange-400',
    success: 'bg-emerald-500/20 border-emerald-500 text-emerald-400',
    error: 'bg-red-500/20 border-red-500 text-red-400',
  };

  const handleTransition = (nextState: 'idle' | 'loading' | 'success' | 'error') => {
    if (transitions[state].includes(nextState)) {
      setState(nextState);
      setHistory(prev => [...prev.slice(-3), nextState]);
    }
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="font-orbitron text-white text-lg">Frontend State Machine</h3>
        </div>

        <div className="flex justify-center mb-6">
          <motion.div
            key={state}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`
              px-8 py-3 rounded-xl border-2 uppercase tracking-wide font-orbitron font-bold
              ${stateColors[state]}
            `}
          >
            {state}
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {(['idle', 'loading', 'success', 'error'] as const).map(s => (
            <Button
              key={s}
              size="sm"
              variant="outline"
              disabled={!transitions[state].includes(s)}
              onClick={() => handleTransition(s)}
              className={`
                text-xs transition-all duration-300
                ${transitions[state].includes(s)
                  ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-500/10'
                  : 'opacity-30 cursor-not-allowed'
                }
              `}
            >
              <ArrowRight className="w-3 h-3 mr-1" />
              {s}
            </Button>
          ))}
        </div>

        <div className="text-xs text-center text-gray-500 mt-4">
          History: {history.join(' → ')}
        </div>

        <p className="text-xs text-center text-gray-500 mt-3 leading-relaxed">
          Demonstrating deterministic state transitions commonly used in scalable frontend architectures.
        </p>
      </CardContent>
    </Card>
  );
};

/* =========================================================
   CACHE VISUALIZATION
========================================================= */

const CacheDemo = () => {
  const [cached, setCached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [hitCount, setHitCount] = useState(0);
  const [missCount, setMissCount] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    const delay = cached ? 120 : 1400;
    const start = performance.now();
    await sleep(delay);
    const end = performance.now();
    setResponseTime(Math.round(end - start));
    
    if (cached) {
      setHitCount(prev => prev + 1);
    } else {
      setMissCount(prev => prev + 1);
      setCached(true);
    }
    setLoading(false);
  };

  const clearCache = () => {
    setCached(false);
    setResponseTime(null);
  };

  return (
    <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-orange-500/30 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <Database className="w-4 h-4 text-orange-400" />
          </div>
          <h3 className="font-orbitron text-white text-lg">Cache Simulation</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800/30 rounded-lg p-4 border border-white/5">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Cache Status</span>
              <motion.span
                className={`text-sm font-semibold ${cached ? 'text-emerald-400' : 'text-orange-400'}`}
                animate={{ scale: cached ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                {cached ? 'HIT ✓' : 'MISS ✗'}
              </motion.span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Response Time</span>
              <motion.span
                className="text-sm text-white"
                animate={{ color: responseTime && responseTime < 200 ? '#10B981' : '#F97316' }}
              >
                {responseTime ? `${responseTime}ms` : '--'}
              </motion.span>
            </div>
            <div className="flex justify-between mt-2 pt-2 border-t border-white/10">
              <span className="text-xs text-gray-500">Cache Hits: {hitCount}</span>
              <span className="text-xs text-gray-500">Cache Misses: {missCount}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={fetchData}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
            >
              <Activity className="w-4 h-4 mr-2" />
              {loading ? 'Fetching...' : 'Fetch Resource'}
            </Button>
            <Button
              onClick={clearCache}
              disabled={loading}
              variant="outline"
              className="border-gray-700 text-gray-400 hover:bg-gray-800/50"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed text-center">
            Demonstrates how caching dramatically reduces latency and improves system performance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

/* =========================================================
   PERFORMANCE METRICS
========================================================= */

const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 62,
    latency: 124,
    throughput: 856,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: 30 + Math.random() * 40,
        memory: 50 + Math.random() * 30,
        latency: 80 + Math.random() * 100,
        throughput: 700 + Math.random() * 300,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto mt-8"
    >
      <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-950/90 border-2 border-pink-500/30 hover:border-pink-500/50 transition-all duration-500">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/30">
              <Gauge className="w-4 h-4 text-pink-400" />
            </div>
            <h3 className="font-orbitron text-white text-lg">Live Performance Metrics</h3>
            <motion.div
              className="ml-auto flex items-center gap-1 text-xs text-emerald-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="w-3 h-3" />
              LIVE
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'CPU Usage', value: metrics.cpu, unit: '%', color: 'cyan' },
              { label: 'Memory Usage', value: metrics.memory, unit: '%', color: 'purple' },
              { label: 'Latency', value: metrics.latency, unit: 'ms', color: 'orange' },
              { label: 'Throughput', value: metrics.throughput, unit: 'req/s', color: 'emerald' },
            ].map((metric, idx) => (
              <motion.div
                key={metric.label}
                className="p-4 rounded-xl bg-gray-800/30 border border-white/5"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-xs text-gray-500 mb-2">{metric.label}</div>
                <motion.div
                  className={`text-2xl font-orbitron font-bold text-${metric.color}-400`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {Math.round(metric.value)}{metric.unit}
                </motion.div>
                <div className="w-full bg-gray-700 rounded-full h-1 mt-2 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-${metric.color}-500`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* =========================================================
   MAIN SECTION
========================================================= */

export const InteractiveDemosSection = () => {
  return (
    <section className="py-24 md:py-28 relative overflow-hidden" id="demos">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12), transparent)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4], x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3), transparent)`,
            }}
            animate={{ y: [0, -35, 0], opacity: [0, 0.5, 0], scale: [0, 1.5, 0] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-5"
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-cyan-400">INTERACTIVE DEMOS</span>
            </div>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Interactive Engineering Demos
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-6"
          />

          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Interactive simulations demonstrating problem-solving, system behavior,
            performance optimization, and scalable engineering concepts.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <SortingDemo />
          <APIDemo />
          <StateMachineDemo />
          <CacheDemo />
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics />
      </div>
    </section>
  );
};