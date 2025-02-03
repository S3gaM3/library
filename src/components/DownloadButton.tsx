// src/components/DownloadButton.tsx
import React from 'react';
import { saveAs } from 'file-saver';

interface DownloadButtonProps {
  fileUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileUrl }) => {
  const handleDownload = () => {
    saveAs(fileUrl, 'book.pdf');
  };

  return (
    <button onClick={handleDownload} className="btn-primary">
      Скачать книгу
    </button>
  );
};

export default DownloadButton;
