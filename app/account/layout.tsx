import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccountSidebar from '@/components/account/AccountSidebar';
import ProtectedRoute from '@/components/account/ProtectedRoute';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-cream min-h-[70vh]">
        <ProtectedRoute>
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <AccountSidebar />
              <div className="flex-1 min-w-0">{children}</div>
            </div>
          </div>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  );
}
