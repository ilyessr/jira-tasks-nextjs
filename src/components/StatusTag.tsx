import React from 'react';

interface StatusTagProps {
  status: string;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  let badgeColor = '';
  switch (status.toLowerCase()) {
    case 'en cours de lancement':
      badgeColor = 'bg-yellow-500';
      break;
    case 'lancé':
      badgeColor = 'bg-green-500';
      break;
    case 'à faire':
      badgeColor = 'bg-red-500';
      break;
    case 'en cours':
      badgeColor = 'bg-blue-500';
      break;
    default:
      badgeColor = 'bg-gray-400';
  } 

  return (
    <span className={`h-8 px-2 py-1 text-white rounded inline-block w-fit ${badgeColor}`}>
      {status}
    </span>
  );
};

export default StatusTag;
