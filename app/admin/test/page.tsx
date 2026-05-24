export const dynamic = 'force-dynamic'

export default function AdminTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Test Page</h1>
      <p>If you see this, admin routes are working!</p>
      <p className="mt-4">Version: 2.0.1</p>
      <div className="mt-4">
        <a href="/admin/login" className="text-blue-600 hover:underline">
          Go to Login →
        </a>
      </div>
    </div>
  )
}
