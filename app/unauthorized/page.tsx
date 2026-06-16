import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Unauthorized Access',
}

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m0 0V7m0 2h-2m2 0h2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-playfair font-bold text-kasu-green mb-3">Access Denied</h1>
        <p className="text-secondary mb-6">
          You do not have permission to access the admin area. If you believe this is an error, please contact the system administrator.
        </p>
        <div className="space-x-4">
          <Button asChild variant="gold">
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}