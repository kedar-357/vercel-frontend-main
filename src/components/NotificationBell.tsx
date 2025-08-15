import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useJobs, Job } from '@/contexts/JobContext';

const NotificationBell = () => {
  const { jobs } = useJobs();
  const [upcomingInterviews, setUpcomingInterviews] = useState<Job[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Get upcoming interviews (within next 7 days)
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcoming = jobs.filter(job => {
      if (job.interviewDate) {
        const interviewDate = new Date(job.interviewDate);
        return interviewDate >= today && interviewDate <= nextWeek;
      }
      return false;
    }).sort((a, b) => 
      new Date(a.interviewDate!).getTime() - new Date(b.interviewDate!).getTime()
    );
    
    setUpcomingInterviews(upcoming);
  }, [jobs]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={notificationRef}>
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-full hover:bg-[#3E3E81] transition-colors"
      >
        <Bell size={20} />
        {upcomingInterviews.length > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>
      
      {/* Notification Dropdown */}
      {showNotifications && (
        <div 
          className="absolute top-full right-0 mt-2 w-80 bg-[#3E3E81] rounded-lg shadow-lg z-50 border border-[#4E4E91] notification-dropdown"
        >
          <div className="p-4 border-b border-[#4E4E91]">
            <h3 className="font-bold text-lg">Upcoming Interviews</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {upcomingInterviews.length > 0 ? (
              upcomingInterviews.map((job) => (
                <div key={job._id} className="p-4 border-b border-[#4E4E91] hover:bg-[#4E4E91]/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">{job.company}</p>
                      <p className="text-sm text-gray-300">{job.role}</p>
                    </div>
                    <span className="text-base font-semibold text-white-500">
                      {new Date(job.interviewDate!).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                <Bell className="mx-auto mb-2" size={24} />
                <p>No upcoming interviews</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
