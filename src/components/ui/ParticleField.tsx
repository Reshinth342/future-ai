import React, { useEffect, useRef } from 'react';

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(80, Math.floor(width / 20));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.4, // float upwards slowly
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.6 ? '#3b82f6' : Math.random() > 0.3 ? '#8b5cf6' : '#06b6d4'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial dark glow in center
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 100,
        width / 2, height / 2, width * 0.8
      );
      gradient.addColorStop(0, 'rgba(10, 10, 20, 0.4)');
      gradient.addColorStop(1, 'rgba(3, 3, 5, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
