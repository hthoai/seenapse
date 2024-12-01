import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContentTypeSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

export default function ContentTypeSection({ icon: Icon, title, description, iconColor }: ContentTypeSectionProps) {
  return (
    <div className="flex flex-col items-center p-4">
      <Icon className={`h-8 w-8 ${iconColor} mb-2`} />
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 text-center mt-1">
        {description}
      </p>
    </div>
  );
}