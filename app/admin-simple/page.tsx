export const dynamic = 'force-dynamic'

export default function SimpleAdminPage() {
  return (
    <html>
      <body style={{ padding: '40px', fontFamily: 'system-ui' }}>
        <h1>Simple Admin Page (No Layout)</h1>
        <p>If you see this, Next.js routing works!</p>
        <p>Version: 2.0.1</p>
        <hr style={{ margin: '20px 0' }} />
        <p><a href="/admin/login" style={{ color: 'blue' }}>Try Admin Login →</a></p>
        <p><a href="/status" style={{ color: 'blue' }}>Check Status →</a></p>
        <p><a href="/api/health" style={{ color: 'blue' }}>API Health Check →</a></p>
      </body>
    </html>
  )
}
