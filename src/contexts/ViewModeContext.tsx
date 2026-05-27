import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type ViewMode = 'immersive' | 'recruiter';

interface PerformanceSettings {
  enableParticles: boolean;
  enable3D: boolean;
  enableBlur: boolean;
  fpsLimit: number;
  reducedMotion: boolean;
}

interface ViewModeContextType {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  isRecruiterMode: boolean;
  toggleMode: () => void;
  performance: PerformanceSettings;
  setPerformance: (settings: Partial<PerformanceSettings>) => void;
  gpuTier: 'low' | 'medium' | 'high';
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

const detectGPUTier = (): 'low' | 'medium' | 'high' => {
  if (typeof window === 'undefined') return 'medium';
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return 'low';
  
  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory < 4) return 'low';
  if (deviceMemory && deviceMemory >= 8) return 'high';
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < 4) return 'low';
  if (cores && cores >= 8) return 'high';
  
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) return 'medium';
  
  // Try to detect GPU capability via WebGL
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Check for integrated graphics
        if (renderer.toLowerCase().includes('intel') || renderer.toLowerCase().includes('integrated')) {
          return 'medium';
        }
        // Check for high-end GPUs
        if (renderer.toLowerCase().includes('nvidia') || renderer.toLowerCase().includes('amd') || renderer.toLowerCase().includes('radeon')) {
          return 'high';
        }
      }
    }
  } catch (e) {
    // WebGL not available
    return 'low';
  }
  
  return 'medium';
};

const getDefaultPerformanceSettings = (gpuTier: 'low' | 'medium' | 'high', isRecruiter: boolean): PerformanceSettings => {
  if (isRecruiter) {
    return {
      enableParticles: false,
      enable3D: false,
      enableBlur: true,
      fpsLimit: 30,
      reducedMotion: false,
    };
  }
  
  switch (gpuTier) {
    case 'low':
      return {
        enableParticles: false,
        enable3D: false,
        enableBlur: false,
        fpsLimit: 30,
        reducedMotion: true,
      };
    case 'medium':
      return {
        enableParticles: true,
        enable3D: true,
        enableBlur: true,
        fpsLimit: 45,
        reducedMotion: false,
      };
    case 'high':
      return {
        enableParticles: true,
        enable3D: true,
        enableBlur: true,
        fpsLimit: 60,
        reducedMotion: false,
      };
  }
};

export const ViewModeProvider = ({ children }: { children: ReactNode }) => {
  const [gpuTier, setGpuTier] = useState<'low' | 'medium' | 'high'>('medium');
  
  const [mode, setMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'recruiter') return 'recruiter';
      const saved = localStorage.getItem('portfolio-view-mode');
      if (saved === 'recruiter') return 'recruiter';
    }
    return 'immersive';
  });
  
  const [performance, setPerformanceState] = useState<PerformanceSettings>(() => 
    getDefaultPerformanceSettings('medium', mode === 'recruiter')
  );

  // Detect GPU tier on mount
  useEffect(() => {
    const tier = detectGPUTier();
    setGpuTier(tier);
    setPerformanceState(getDefaultPerformanceSettings(tier, mode === 'recruiter'));
  }, []);

  // Update performance when mode changes
  useEffect(() => {
    setPerformanceState(getDefaultPerformanceSettings(gpuTier, mode === 'recruiter'));
  }, [mode, gpuTier]);

  useEffect(() => {
    localStorage.setItem('portfolio-view-mode', mode);
    const url = new URL(window.location.href);
    if (mode === 'recruiter') {
      url.searchParams.set('mode', 'recruiter');
    } else {
      url.searchParams.delete('mode');
    }
    window.history.replaceState({}, '', url.toString());
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'immersive' ? 'recruiter' : 'immersive');
  }, []);

  const setPerformance = useCallback((settings: Partial<PerformanceSettings>) => {
    setPerformanceState(prev => ({ ...prev, ...settings }));
  }, []);

  return (
    <ViewModeContext.Provider value={{ 
      mode, 
      setMode, 
      isRecruiterMode: mode === 'recruiter',
      toggleMode,
      performance,
      setPerformance,
      gpuTier,
    }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within ViewModeProvider');
  }
  return context;
};
