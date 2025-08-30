export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const formatWeight = (weight: number, unit: string): string => {
  if (unit === 'kg' && weight >= 1000) {
    return `${(weight / 1000).toFixed(1)} tonnes`;
  }
  return `${weight} ${unit}`;
};

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} meters`;
  }
  return `${distance.toFixed(1)} km`;
};

export const formatPercentage = (value: number, total: number): string => {
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};

export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatOrderStatus = (status: string): string => {
  return status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

export const formatAddress = (address: {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}): string => {
  const parts = [address.street, address.city, address.state, address.pincode];
  return parts.filter(Boolean).join(', ');
};