'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // В реальном приложении здесь был бы запрос к API для отправки письма восстановления
      // Для демонстрации просто показываем успешное сообщение
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
    } catch (err) {
      setError('Произошла ошибка. Попробуйте позже.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Back to login */}
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться к входу
          </Link>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            {!isSuccess ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-primary-600" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Забыли пароль?</h1>
                  <p className="text-gray-600">
                    Введите email, указанный при регистрации, и мы отправим вам инструкции по восстановлению пароля
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Отправка...' : 'Отправить инструкции'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Проверьте почту</h2>
                <p className="text-gray-600 mb-6">
                  Мы отправили инструкции по восстановлению пароля на адрес{' '}
                  <span className="font-medium text-gray-900">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Если письмо не пришло в течение нескольких минут, проверьте папку "Спам"
                </p>
                <Link href="/login" className="btn-primary inline-block">
                  Вернуться к входу
                </Link>
              </div>
            )}
          </div>

          {!isSuccess && (
            <p className="text-center text-sm text-gray-600 mt-6">
              Вспомнили пароль?{' '}
              <Link href="/login" className="text-gray-900 font-medium hover:underline">
                Войти
              </Link>
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
