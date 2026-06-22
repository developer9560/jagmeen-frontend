import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="flex flex-col z-50 sticky top-0 w-full bg-white shadow-sm">
      {/* <AnnouncementBar /> */}
      <Navbar />
    </header>
  );
}
