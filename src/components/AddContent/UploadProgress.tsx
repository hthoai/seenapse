import React from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { UploadProgress as UploadProgressType } from '../../types';

interface UploadProgressProps {
  progress: UploadProgressType;
}

export default function UploadProgress({ progress }: UploadProgressProps) {
  if (progress.status === 'idle') return null;

  return (
    <div className="mt-4">
      {progress.status === 'uploading' && (
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />
          <span className="text-sm text-gray-600">
            Uploading... {Math.round(progress.progress)}%
          </span>
        </div>
      )}
      {progress.status === 'complete' && (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm">Upload complete</span>
        </div>
      )}
      {progress.status === 'error' && (
        <div className="flex items-center space-x-2 text-red-600">
          <XCircle className="h-4 w-4" />
          <span className="text-sm">{progress.error}</span>
        </div>
      )}
    </div>
  );
}