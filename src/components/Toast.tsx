import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  isVisible: boolean;
  onOpenBag: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  subMessage,
  isVisible,
  onOpenBag,
}) => {
  if (!isVisible) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-50 bg-[#241E1C] text-white p-4 rounded-xl shadow-2xl border border-[#3D3531] flex items-center gap-4 animate-fade-in max-w-sm"
    >
      <div className="w-8 h-8 rounded-full bg-[#9E3E2F] flex items-center justify-center shrink-0">
        <ShoppingBag className="w-4 h-4 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold">{message}</div>
        {subMessage && (
          <div className="text-[11px] text-[#D9CEBF] truncate">{subMessage}</div>
        )}
      </div>

      <button
        onClick={onOpenBag}
        className="px-3 py-1.5 bg-white text-[#241E1C] hover:bg-[#FAF7F2] rounded text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
      >
        <span>View</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </aside>
  );
};
