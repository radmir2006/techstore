export const dynamic = 'force-dynamic'

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">TechStore Status</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <p className="font-semibold text-green-800">✓ Application is running</p>
            <p className="text-sm text-green-600 mt-1">Version: 2.0.1</p>
          </div>

          <div className="p-4 bg-blue-100 rounded-lg">
            <p className="font-semibold text-blue-800">Routes to test:</p>
            <ul className="mt-2 space-y-1 text-sm text-blue-600">
              <li>• <a href="/" className="underline">Home page</a></li>
              <li>• <a href="/api/health" className="underline">Health check API</a></li>
              <li>• <a href="/admin/test" className="underline">Admin test page</a></li>
              <li>• <a href="/admin/login" className="underline">Admin login</a></li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-100 rounded-lg">
            <p className="font-semibold text-yellow-800">⚠ If admin routes don't work:</p>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
              <li>1. Check Railway logs for build errors</li>
              <li>2. Verify DATABASE_URL is set in Railway environment</li>
              <li>3. Verify NEXTAUTH_SECRET is set</li>
              <li>4. Check if Prisma migrations ran successfully</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
