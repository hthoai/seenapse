import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Headphones, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import FileTypeSection from './FileTypeSection';
import UploadProgress from './UploadProgress';
import { UploadProgress as UploadProgressType } from '../../types';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'audio/mpeg': ['.mp3'],
  'audio/wav': ['.wav'],
  'audio/x-m4a': ['.m4a']
};

interface FileUploadZoneProps {
  onFileAccepted: (file: File) => void;
}

export default function FileUploadZone({ onFileAccepted }: FileUploadZoneProps) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgressType>({
    progress: 0,
    status: 'idle'
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 50MB limit');
      return;
    }

    try {
      setUploadProgress({ progress: 0, status: 'uploading' });
      
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress({ progress: i, status: 'uploading' });
      }

      setUploadProgress({ progress: 100, status: 'complete' });
      onFileAccepted(file);
    } catch (error) {
      setUploadProgress({
        progress: 0,
        status: 'error',
        error: 'Upload failed. Please try again.'
      });
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0]?.message;
      toast.error(error || 'Invalid file type');
    }
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <FileTypeSection
          icon={FileText}
          title="Documents"
          formats={['PDF', 'DOC', 'DOCX', 'PPT', 'PPTX']}
          iconColor="text-blue-500"
        />
        <FileTypeSection
          icon={Headphones}
          title="Audio"
          formats={['MP3', 'WAV', 'M4A']}
          iconColor="text-green-500"
        />
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragActive 
            ? 'border-indigo-500 bg-indigo-50 scale-102' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
      >
        <input {...getInputProps()} />
        <Upload className={`mx-auto h-12 w-12 ${
          isDragActive ? 'text-indigo-500' : 'text-gray-400'
        }`} />
        <p className="mt-2 text-sm font-medium text-gray-900">
          {isDragActive ? 'Drop your file here' : 'Drag & drop a file here, or click to select'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Maximum file size: 50MB
        </p>
      </div>

      <UploadProgress progress={uploadProgress} />
    </div>
  );
}