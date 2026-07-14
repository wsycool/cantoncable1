import { useEffect, useRef } from 'react';

interface LineData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isRadial?: boolean;
  isBuilding?: boolean;
}

function generateLines(width: number, height: number, isMobile: boolean): LineData[] {
  const cx = width / 2;
  const cy = height / 2;
  const count = isMobile ? 50 : 200;
  const lines: LineData[] = [];

  // Regular random lines
  for (let i = 0; i < count; i++) {
    lines.push({
      x1: Math.floor(Math.random() * width),
      y1: Math.floor(Math.random() * height),
      x2: Math.floor(Math.random() * width),
      y2: Math.floor(Math.random() * height),
    });
  }

  // Radial lines from center
  const angleStep = 30;
  const radialCount = isMobile ? 6 : 12;
  for (let i = 0; i < radialCount; i++) {
    const angle = i * angleStep;
    const rad = (angle * Math.PI) / 180;
    const len = width * 0.8;
    lines.push({
      x1: cx,
      y1: cy,
      x2: Math.floor(cx + Math.cos(rad) * len),
      y2: Math.floor(cy + Math.sin(rad) * len),
      isRadial: true,
    });
  }

  // Building lines near center
  const buildingCount = isMobile ? 4 : 8;
  for (let i = 0; i < buildingCount; i++) {
    const offsetX = (Math.random() - 0.5) * 400;
    const offsetY = (Math.random() - 0.5) * 400;
    lines.push({
      x1: cx + offsetX * 0.3,
      y1: cy + offsetY * 0.3,
      x2: cx + offsetX,
      y2: cy + offsetY,
      isBuilding: true,
    });
  }

  // Supplementary lines for upper area
  const suppCount = isMobile ? 20 : 80;
  for (let i = 0; i < suppCount; i++) {
    const y2 = Math.random() * cy;
    lines.push({
      x1: Math.floor(Math.random() * width),
      y1: Math.floor(Math.random() * cy),
      x2: Math.floor(Math.random() * width),
      y2: Math.floor(y2),
    });
  }

  return lines;
}

function createSVG(line: LineData, index: number, total: number): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  const xMax = Math.max(line.x1, line.x2);
  const xMin = Math.min(line.x1, line.x2);
  const yMax = Math.max(line.y1, line.y2);
  const yMin = Math.min(line.y1, line.y2);
  const padding = 4;

  svg.setAttribute('width', String(xMax - xMin + padding * 2));
  svg.setAttribute('height', String(yMax - yMin + padding * 2));
  svg.style.left = `${xMin - padding}px`;
  svg.style.top = `${yMin - padding}px`;
  svg.style.strokeDasharray = '1000';

  lineEl.setAttribute('x1', String(line.x1 - xMin + padding));
  lineEl.setAttribute('y1', String(line.y1 - yMin + padding));
  lineEl.setAttribute('x2', String(line.x2 - xMin + padding));
  lineEl.setAttribute('y2', String(line.y2 - yMin + padding));

  if (line.isRadial) {
    svg.style.stroke = '#4a6b8a';
    svg.style.strokeWidth = '1.5';
  } else if (line.isBuilding) {
    svg.style.stroke = '#5a7d9a';
    svg.style.strokeWidth = '1.5';
  } else {
    svg.style.stroke = '#3a4c5e';
    svg.style.strokeWidth = '1';
  }

  // Animation delay based on position
  const delay = (index / total) * 4;
  lineEl.style.animationDelay = `${delay}s`;
  lineEl.classList.add('bp-line-animated');

  svg.appendChild(lineEl);
  return svg;
}

export default function BlueprintGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(hover: none)').matches;

    function loopCycle() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      container.innerHTML = '';
      const lines = generateLines(width, height, isMobile);
      const total = lines.length;

      // Batch reveal: show small groups every 200ms
      let batchIndex = 0;
      const batchSize = isMobile ? 5 : 15;

      function showBatch() {
        if (!container) return;
        const end = Math.min(batchIndex + batchSize, lines.length);
        for (let i = batchIndex; i < end; i++) {
          const svg = createSVG(lines[i], i, total);
          container.appendChild(svg);
        }
        batchIndex = end;
        if (batchIndex < lines.length) {
          animationRef.current = requestAnimationFrame(() => {
            setTimeout(showBatch, 200);
          });
        }
      }

      showBatch();
    }

    // Initial cycle
    loopCycle();

    // Repeating cycle every 5500ms
    intervalRef.current = setInterval(loopCycle, 5500);

    // ResizeObserver
    resizeObserverRef.current = new ResizeObserver(() => {
      loopCycle();
    });
    resizeObserverRef.current.observe(container);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, []);

  return <div ref={containerRef} className="blueprint-grid-container" />;
}
