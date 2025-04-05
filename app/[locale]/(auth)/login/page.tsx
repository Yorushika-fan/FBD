'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('请填写所有字段');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('发生错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <div className="mb-8 text-center">
            <h1 className="text-primary text-5xl font-bold">StoreIt</h1>
            <p className="text-neutral-content mt-2 text-xl">您的个人Google Drive替代品</p>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">邮箱</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">密码</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered"
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                required
              />
              <label className="label">
                <Link href="/auth/forgot-password" className="label-text-alt link link-hover">
                  忘记密码?
                </Link>
              </label>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <span className="loading loading-spinner loading-sm"></span> : '登录'}
              </button>
            </div>
          </form>

          <div className="divider">或者</div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="btn btn-outline gap-2"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            使用Google账号继续
          </button>

          <div className="mt-6 text-center">
            <p>
              还没有账号?{' '}
              <Link href="/auth/register" className="link link-primary">
                注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
