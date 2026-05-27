import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallMobile: boolean;
  orientation: 'portrait' | 'landscape';
  width: number;
  height: number;
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Initial check
    checkMobile();
    
    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return isMobile;
}

// Advanced hook with more responsive states
export function useResponsive(): ResponsiveState {
  const [state, setState] = React.useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isSmallMobile: false,
    orientation: 'landscape',
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  React.useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
        isSmallMobile: width < 480,
        orientation: width > height ? 'landscape' : 'portrait',
        width,
        height,
      });
    };

    // Initial update
    updateDimensions();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", updateDimensions);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", updateDimensions);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}

// Hook for SSR-safe initial responsive state
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Set initial value
    setMatches(mediaQuery.matches);
    
    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);
  
  return matches;
}

// Hook for touch device detection
export function useIsTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    
    checkTouch();
  }, []);
  
  return isTouchDevice;
}

// Hook for dynamic font scaling based on screen size
export function useResponsiveFontSize(baseSize: number = 16): number {
  const { isMobile, isTablet, width } = useResponsive();
  
  const fontSize = React.useMemo(() => {
    if (isMobile) {
      return baseSize * 0.875; // 14px on mobile
    }
    if (isTablet) {
      return baseSize * 0.9375; // 15px on tablet
    }
    return baseSize; // 16px on desktop
  }, [isMobile, isTablet, baseSize]);
  
  return fontSize;
}

// Hook for responsive grid columns
export function useResponsiveGridColumns(baseColumns: number = 3): number {
  const { isMobile, isTablet } = useResponsive();
  
  const columns = React.useMemo(() => {
    if (isMobile) return Math.max(1, Math.floor(baseColumns / 2));
    if (isTablet) return Math.max(2, baseColumns - 1);
    return baseColumns;
  }, [isMobile, isTablet, baseColumns]);
  
  return columns;
}

// Hook for sidebar visibility based on screen size
export function useSidebarResponsive(initialOpen: boolean = true): {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
} {
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = React.useState<boolean>(() => {
    // On mobile, sidebar starts closed
    if (typeof window !== 'undefined') {
      return isMobile ? false : initialOpen;
    }
    return initialOpen;
  });
  
  React.useEffect(() => {
    // Close sidebar automatically when switching to mobile
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
    // Open sidebar automatically when switching to desktop
    if (!isMobile && !isOpen && initialOpen) {
      setIsOpen(true);
    }
  }, [isMobile, isOpen, initialOpen]);
  
  return { isOpen, setIsOpen, isMobile };
}

// Hook for responsive padding/margin values
export function useResponsiveSpacing(): {
  padding: { x: number; y: number };
  margin: { x: number; y: number };
  gap: number;
} {
  const { isMobile, isTablet } = useResponsive();
  
  const spacing = React.useMemo(() => {
    if (isMobile) {
      return { padding: { x: 16, y: 12 }, margin: { x: 12, y: 8 }, gap: 12 };
    }
    if (isTablet) {
      return { padding: { x: 24, y: 16 }, margin: { x: 16, y: 12 }, gap: 16 };
    }
    return { padding: { x: 32, y: 20 }, margin: { x: 24, y: 16 }, gap: 24 };
  }, [isMobile, isTablet]);
  
  return spacing;
}

// Hook for detecting if device has hover capability
export function useHoverCapable(): boolean {
  const [hoverCapable, setHoverCapable] = React.useState<boolean>(true);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    const handleChange = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
    
    setHoverCapable(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return hoverCapable;
}

// Export default hook
export default useIsMobile;