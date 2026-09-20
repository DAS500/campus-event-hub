import './App.css';
import { EventCard } from './components/EventCard';
import type { EventData } from './components/EventCard';

const SAMPLE_EVENTS: EventData[] = [
  {
    id: 1,
    title: 'Hội Thảo Công Nghệ AI & Tương Lai Lập Trình',
    description:
      'Khám phá xu hướng trí tuệ nhân tạo, GenAI và cách các kỹ sư phần mềm tối ưu hiệu suất công việc.',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    category: 'Công nghệ',
    startDate: '2026-09-25T08:30:00',
    location: 'UIT',
    price: 150000,
    organizer: {
      name: 'Tech Community VN',
    },
    status: 'upcoming',
  },

  {
    id: 2,
    title: 'Workshop Thiết Kế UI/UX',
    description:
      'Thực hành thiết kế Design System responsive và tối ưu trải nghiệm người dùng.',
    imageUrl:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
    category: 'Thiết kế',
    startDate: '2026-09-27T14:00:00',
    location: 'Google Meet',
    isOnline: true,
    price: 'Miễn phí',
    organizer: {
      name: 'Designers Hub',
    },
    status: 'upcoming',
  },

  {
    id: 3,
    title: 'Đêm Nhạc Acoustic Dưới Ánh Sao',
    description:
      'Không gian âm nhạc thư giãn cuối tuần cùng các nghệ sĩ indie.',
    imageUrl:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
    category: 'Âm nhạc',
    startDate: '2026-10-02T19:30:00',
    location: 'TP. Hồ Chí Minh',
    price: 300000,
    organizer: {
      name: 'Acoustic Saigon',
    },
    status: 'sold_out',
  },
];

function App() {
  const handleRegister = (id: string | number) => {
    console.log('Đăng ký sự kiện ID:', id);
  };

  const handleBookmark = (
    id: string | number,
    isBookmarked: boolean
  ) => {
    console.log(
      `Sự kiện ${id} đã được ${
        isBookmarked ? 'lưu' : 'bỏ lưu'
      }`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Campus Event Hub
        </h1>

        <p className="mt-2 text-gray-600">
          Khám phá các sự kiện sắp diễn ra
        </p>

        {/* Responsive Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_EVENTS.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister}
              onBookmark={handleBookmark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;