import { X } from 'lucide-react';

type HeaderProps = {
  title: string;
  onClose?: () => void;
};

export const Header = ({ title, onClose }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between h-14 px-4 bg-white">
      {/* 왼쪽 여백 맞추기용 */}
      <div className="w-6" />

      {/* 제목 */}
      <h1 className="text-lg font-semibold text-gray-900">
        {title}
      </h1>

      {/* 닫기 버튼 */}
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-6" />
      )}
    </header>
  );
};