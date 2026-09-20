import React, { useState } from 'react';

export interface Organizer {
  name: string;
  avatarUrl?: string;
}

export interface EventData {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  startDate: string; // ISO string hoặc date string (vd: "2025-05-15T09:00:00")
  endDate?: string;
  location: string;
  isOnline?: boolean;
  price?: number | string; // 'Miễn phí' hoặc số tiền
  organizer: Organizer;
  status?: 'upcoming' | 'ongoing' | 'sold_out';
}

export interface EventCardProps {
  event: EventData;
  onRegister?: (id: string | number) => void;
  onBookmark?: (id: string | number, isBookmarked: boolean) => void;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onRegister,
  onBookmark,
  className = '',
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const eventDate = new Date(event.startDate);
  const month = eventDate.toLocaleDateString('vi-VN', { month: 'short' });
  const day = eventDate.toLocaleDateString('vi-VN', { day: '2-digit' });
  const time = eventDate.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    if (onBookmark) {
      onBookmark(event.id, nextState);
    }
  };

  const formatPrice = (price?: number | string) => {
    if (!price || price === 0 || price === 'Miễn phí') return 'Miễn phí';
    if (typeof price === 'number') {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    }
    return price;
  };

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      {/* --- Image & Badges Banner --- */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={event.imageUrl}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Category Tag */}
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm shadow-sm dark:bg-gray-900/90 dark:text-gray-100">
          {event.category}
        </span>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={handleBookmarkToggle}
          aria-label={isBookmarked ? 'Bỏ lưu sự kiện' : 'Lưu sự kiện'}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur-sm shadow-sm transition-all hover:scale-110 hover:bg-white active:scale-95 dark:bg-gray-900/90 dark:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isBookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 transition-colors ${
              isBookmarked ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {/* Date Float Badge */}
        <div className="absolute bottom-3 left-3 flex items-center rounded-xl bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-md dark:bg-gray-900/90">
          <div className="text-center pr-2.5 border-r border-gray-200 dark:border-gray-700">
            <span className="block text-xs font-medium uppercase text-rose-600 dark:text-rose-400">
              {month}
            </span>
            <span className="block text-base font-bold leading-none text-gray-900 dark:text-white">
              {day}
            </span>
          </div>
          <div className="pl-2.5 text-xs font-medium text-gray-600 dark:text-gray-300">
            {time}
          </div>
        </div>
      </div>

      {/* --- Card Body --- */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {event.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {event.description}
        </p>

        {/* Metadata info */}
        <div className="mt-4 space-y-2 text-xs text-gray-500 dark:text-gray-400">
          {/* Location */}
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">
              {event.isOnline ? `Trực tuyến • ${event.location}` : event.location}
            </span>
          </div>

          {/* Organizer */}
          <div className="flex items-center gap-2">
            {event.organizer.avatarUrl ? (
              <img
                src={event.organizer.avatarUrl}
                alt={event.organizer.name}
                className="h-4 w-4 rounded-full object-cover"
              />
            ) : (
              <svg
                className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
            <span className="truncate">Tổ chức bởi {event.organizer.name}</span>
          </div>
        </div>

        {/* --- Footer (Price & Action) --- */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3 dark:border-gray-700/60">
          <div>
            <span className="block text-[11px] font-medium uppercase text-gray-400 dark:text-gray-500">
              Giá vé
            </span>
            <span className="text-base font-bold text-gray-900 dark:text-white">
              {formatPrice(event.price)}
            </span>
          </div>

          {event.status === 'sold_out' ? (
            <span className="rounded-xl bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-400">
              Hết vé
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onRegister?.(event.id)}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Đăng ký ngay
            </button>
          )}
        </div>
      </div>
    </article>
  );
};