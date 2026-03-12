import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, Image as ImageIcon, Save, LogOut, MousePointer2 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>('center');
  const [selectedScale, setSelectedScale] = useState<number>(1);
  const [selectedFit, setSelectedFit] = useState<'cover' | 'contain'>('cover');
  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const inactivityTimer = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-hide after 60s of inactivity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (isVisible) {
      inactivityTimer.current = setTimeout(() => {
        setIsVisible(false);
        setIsSelectionMode(false);
      }, 60000);
    }
  }, [isVisible]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();
    return () => {
      events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivityTimer]);

  // Handle selection mode class on html element
  useEffect(() => {
    if (isSelectionMode) {
      document.documentElement.classList.add('admin-select-mode');
    } else {
      document.documentElement.classList.remove('admin-select-mode');
    }
    return () => document.documentElement.classList.remove('admin-select-mode');
  }, [isSelectionMode]);

  // Handle selection logic
  useEffect(() => {
    if (!isSelectionMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const editable = elements.find(el => 
        el.classList.contains('editable-image') || 
        el.hasAttribute('data-editable-bg')
      ) as HTMLElement;

      // Clear previous highlights
      document.querySelectorAll('.admin-highlight').forEach(el => {
        (el as HTMLElement).style.outline = '';
        (el as HTMLElement).style.outlineOffset = '';
        el.classList.remove('admin-highlight');
      });

      if (editable) {
        editable.style.outline = '2px solid #cd93ff';
        editable.style.outlineOffset = '2px';
        editable.classList.add('admin-highlight');
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const editable = elements.find(el => 
        el.classList.contains('editable-image') || 
        el.hasAttribute('data-editable-bg')
      ) as HTMLElement;

      if (editable) {
        const id = editable.id || editable.getAttribute('data-editable-bg');
        if (id) {
          setSelectedImageId(id);
          
          // Get current source, position, scale and fit
          const savedPos = localStorage.getItem(`pos_${id}`);
          const savedScale = localStorage.getItem(`scale_${id}`);
          const savedFit = localStorage.getItem(`fit_${id}`) as 'cover' | 'contain' | null;
          
          if (editable.tagName === 'IMG') {
            setPreviewUrl((editable as HTMLImageElement).src);
            setSelectedPosition(savedPos || window.getComputedStyle(editable).objectPosition || 'center');
            setSelectedScale(savedScale ? parseFloat(savedScale) : 1);
            setSelectedFit(savedFit || (window.getComputedStyle(editable).objectFit as 'cover' | 'contain') || 'cover');
          } else {
            const style = window.getComputedStyle(editable);
            const bg = style.backgroundImage;
            const url = bg.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
            setPreviewUrl(url);
            setSelectedPosition(savedPos || style.backgroundPosition || 'center');
            setSelectedScale(savedScale ? parseFloat(savedScale) : 1);
            setSelectedFit(savedFit || (style.backgroundSize as 'cover' | 'contain') || 'cover');
          }
          setIsSelectionMode(false);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      document.querySelectorAll('.admin-highlight').forEach(el => {
        (el as HTMLElement).style.outline = '';
        (el as HTMLElement).style.outlineOffset = '';
      });
    };
  }, [isSelectionMode]);

  // Secret Hotspot Logic
  const handleHotspotClick = (e: React.MouseEvent) => {
    if (!e.shiftKey) return;

    const now = Date.now();
    if (now - lastClickTime < 2000) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount >= 3) {
        setIsVisible(true);
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (base64Str: string, maxWidth = 1200, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(base64Str);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  const handleSave = async () => {
    try {
      if (selectedImageId && previewUrl) {
        if (typeof window !== 'undefined' && window.localStorage) {
          // Compress before saving if it's a data URL
          let finalUrl = previewUrl;
          if (previewUrl.startsWith('data:image')) {
            finalUrl = await compressImage(previewUrl);
          }
          
          localStorage.setItem(`img_${selectedImageId}`, finalUrl);
          localStorage.setItem(`pos_${selectedImageId}`, selectedPosition);
          localStorage.setItem(`scale_${selectedImageId}`, selectedScale.toString());
          localStorage.setItem(`fit_${selectedImageId}`, selectedFit);
          applySavedToDOM();
          handleCancel();
        }
      }
    } catch (err) {
      console.error("AdminPanel: Error saving image", err);
      alert("Failed to save image. The image is still too large for local storage even after compression. Please try a smaller file or clear your browser's local storage.");
    }
  };

  const applySavedToDOM = useCallback(() => {
    if (typeof window === 'undefined' || !window.localStorage) return;

    try {
      // Apply to <img> tags
      const images = document.querySelectorAll<HTMLImageElement>('.editable-image');
      images.forEach(img => {
        if (!img.id) return;
        const saved = localStorage.getItem(`img_${img.id}`);
        const savedPos = localStorage.getItem(`pos_${img.id}`);
        const savedScale = localStorage.getItem(`scale_${img.id}`);
        const savedFit = localStorage.getItem(`fit_${img.id}`);
        
        if (saved) {
          if (img.src !== saved) img.src = saved;
        }
        if (savedFit) {
          img.style.objectFit = savedFit;
        } else if (saved) {
          // Default to contain if saved but no fit mode specified yet (safer for logos/diagrams)
          img.style.objectFit = 'contain';
        }
        if (savedPos) {
          img.style.objectPosition = savedPos;
        }
        if (savedScale) {
          img.style.transform = `scale(${savedScale})`;
        }
      });

      // Apply to background images
      const bgElements = document.querySelectorAll<HTMLElement>('[data-editable-bg]');
      bgElements.forEach(el => {
        const id = el.getAttribute('data-editable-bg');
        if (!id) return;
        const saved = localStorage.getItem(`img_${id}`);
        const savedPos = localStorage.getItem(`pos_${id}`);
        const savedScale = localStorage.getItem(`scale_${id}`);
        const savedFit = localStorage.getItem(`fit_${id}`);
        
        if (saved) {
          const bgValue = `url("${saved}")`;
          if (el.style.backgroundImage !== bgValue) {
            el.style.backgroundImage = bgValue;
          }
        }
        if (savedFit) {
          el.style.backgroundSize = savedFit;
        } else if (saved) {
          // Default to contain if saved but no fit mode specified yet (safer for logos/diagrams)
          el.style.backgroundSize = 'contain';
        }
        if (savedPos) {
          el.style.backgroundPosition = savedPos;
        }
        if (savedScale) {
          el.style.transform = `scale(${savedScale})`;
        }
      });
    } catch (err) {
      // Silently fail for background application errors to avoid crashing the UI
      console.warn("AdminPanel: Error applying saved images", err);
    }
  }, []);

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all image replacements? This will reset the site to its original state.")) {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('img_') || key.startsWith('pos_') || key.startsWith('scale_') || key.startsWith('fit_')) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setSelectedImageId(null);
    setPreviewUrl(null);
    setSelectedPosition('center');
    setSelectedScale(1);
    setSelectedFit('cover');
    setIsSelectionMode(false);
  };

  // Load saved images on mount
  useEffect(() => {
    applySavedToDOM();
    const observer = new MutationObserver(applySavedToDOM);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [applySavedToDOM]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html.admin-select-mode * {
          cursor: crosshair !important;
        }
        html.admin-select-mode .cursor-layer,
        html.admin-select-mode [class*="overlay"],
        html.admin-select-mode [class*="reveal"] {
          pointer-events: none !important;
        }
        html.admin-select-mode .editable-image,
        html.admin-select-mode [data-editable-bg],
        html.admin-select-mode .editable-image-container {
          pointer-events: auto !important;
        }
        .admin-highlight {
          transition: outline 0.2s ease;
        }
      `}} />
      {/* Secret Hotspot - Bottom Right of Footer area (invisible) */}
      <div 
        className="fixed bottom-0 right-0 w-3 h-3 z-[9999] opacity-0 cursor-default"
        onClick={handleHotspotClick}
        title=""
      />

      {isVisible && (
        <div className="fixed bottom-6 left-6 z-[10000] w-72 bg-white dark:bg-dark border border-black/10 dark:border-white/10 shadow-2xl p-6 font-sans text-dark dark:text-light animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold">Admin Panel</h3>
            <button onClick={() => setIsVisible(false)} className="opacity-50 hover:opacity-100 transition-opacity">
              <X size={16} />
            </button>
          </div>

          <div className="space-y-6">
            <button 
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              className={`w-full py-3 px-4 font-mono text-[10px] uppercase tracking-widest border flex items-center justify-center gap-2 transition-all ${
                isSelectionMode 
                  ? 'bg-accent text-dark border-transparent' 
                  : 'border-black/10 dark:border-white/10 hover:border-accent'
              }`}
            >
              <MousePointer2 size={14} />
              {isSelectionMode ? 'Click an image...' : 'Select image to replace'}
            </button>

            {selectedImageId && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Selected ID</span>
                  <span className="font-mono text-xs font-bold truncate">{selectedImageId}</span>
                </div>
                
                <div className="aspect-video bg-black/5 dark:bg-white/5 overflow-hidden border border-black/5 dark:border-white/5 relative">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      style={{ objectPosition: selectedPosition }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Position</span>
                  <select 
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full bg-transparent border border-black/10 dark:border-white/10 p-2 font-mono text-[10px] uppercase tracking-widest focus:border-accent outline-none"
                  >
                    <option value="center" className="bg-white dark:bg-dark">Center</option>
                    <option value="top" className="bg-white dark:bg-dark">Top</option>
                    <option value="bottom" className="bg-white dark:bg-dark">Bottom</option>
                    <option value="left" className="bg-white dark:bg-dark">Left</option>
                    <option value="right" className="bg-white dark:bg-dark">Right</option>
                    <option value="top left" className="bg-white dark:bg-dark">Top Left</option>
                    <option value="top right" className="bg-white dark:bg-dark">Top Right</option>
                    <option value="bottom left" className="bg-white dark:bg-dark">Bottom Left</option>
                    <option value="bottom right" className="bg-white dark:bg-dark">Bottom Right</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Scale (Zoom)</span>
                    <span className="font-mono text-[10px]">{selectedScale.toFixed(2)}x</span>
                  </div>
                  <input 
                    type="range"
                    min="1"
                    max="3"
                    step="0.01"
                    value={selectedScale}
                    onChange={(e) => setSelectedScale(parseFloat(e.target.value))}
                    className="w-full accent-accent bg-black/10 dark:bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Fit Mode</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setSelectedFit('cover')}
                      className={`py-2 border font-mono text-[10px] uppercase tracking-widest transition-all ${
                        selectedFit === 'cover' 
                          ? 'bg-dark dark:bg-light text-light dark:text-dark border-transparent' 
                          : 'border-black/10 dark:border-white/10 hover:border-accent'
                      }`}
                    >
                      Cover (Fill)
                    </button>
                    <button 
                      onClick={() => setSelectedFit('contain')}
                      className={`py-2 border font-mono text-[10px] uppercase tracking-widest transition-all ${
                        selectedFit === 'contain' 
                          ? 'bg-dark dark:bg-light text-light dark:text-dark border-transparent' 
                          : 'border-black/10 dark:border-white/10 hover:border-accent'
                      }`}
                    >
                      Contain (Full)
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 border border-black/10 dark:border-white/10 font-mono text-[10px] uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                  >
                    Choose File
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button 
                      onClick={handleSave}
                      className="py-2 bg-dark dark:bg-light text-light dark:text-dark font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                    >
                      <Save size={12} /> Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="py-2 border border-black/10 dark:border-white/10 font-mono text-[10px] uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-2">
              <button 
                onClick={handleClearAll}
                className="w-full py-2 font-mono text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all"
              >
                Clear All Changes
              </button>
              
              <button 
                onClick={() => {
                  setIsVisible(false);
                  setIsSelectionMode(false);
                }}
                className="w-full py-2 opacity-40 hover:opacity-100 hover:text-accent font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                <LogOut size={12} /> Exit Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
