'use client';

import { useEffect, useRef, useState } from 'react';

interface PdfSliderProps {
  pdfUrl: string;
}

export default function PdfSlider({ pdfUrl }: PdfSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    let cancelled = false;

    const renderPdf = async () => {
      setLoading(true);
      setError(null);

      try {
        // Dynamically import pdfjs-dist to avoid SSR issues
        const pdfjsLib = await import('pdfjs-dist');

        // Set worker source to the bundled worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          // Prevent PDF from being cached in a way that enables downloading
          withCredentials: false,
        });

        const pdf = await loadingTask.promise;
        if (cancelled) return;

        setNumPages(pdf.numPages);

        const container = containerRef.current;
        if (!container) return;

        // Clear previous canvases
        container.innerHTML = '';

        // Render each page as a canvas
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) break;

          const page = await pdf.getPage(pageNum);
          if (cancelled) break;

          // Scale: 2.0 = high quality on most screens
          const viewport = page.getViewport({ scale: 2.0 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // Prevent right-click on each canvas
          canvas.addEventListener('contextmenu', (e) => e.preventDefault());

          // Style canvas to look like a full-width image
          canvas.style.width = '100%';
          canvas.style.height = 'auto';
          canvas.style.display = 'block';
          canvas.style.userSelect = 'none';
          canvas.style.webkitUserSelect = 'none';
          canvas.draggable = false;

          // Wrapper div for spacing between pages
          const wrapper = document.createElement('div');
          wrapper.style.width = '100%';
          wrapper.style.marginBottom = '1px';
          wrapper.style.background = '#fff';
          wrapper.appendChild(canvas);
          container.appendChild(wrapper);

          const ctx = canvas.getContext('2d');
          if (!ctx) continue;

          await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;
        }
      } catch (err) {
        if (!cancelled) {
          console.error('PDF render error:', err);
          setError('Could not load the document. Please try again later.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  return (
    <div className="w-full select-none" onContextMenu={(e) => e.preventDefault()}>
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 tracking-wider uppercase">Loading document…</p>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Canvas pages render here */}
      <div
        ref={containerRef}
        className="w-full"
        style={{ display: loading ? 'none' : 'block' }}
      />

      {!loading && !error && numPages > 0 && (
        <p className="text-center text-xs text-slate-400 tracking-widest uppercase py-4">
          {numPages} page{numPages !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
