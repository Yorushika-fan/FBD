'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不匹配');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // 这里应该调用API进行注册
      // 示例代码，实际应该调用后端API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '注册失败');
      }

      // 注册成功后跳转到登录页
      router.push('/auth/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('发生错误，请重试');
      }
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
            <p className="text-neutral-content mt-2 text-xl">创建您的账户</p>
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
                <span className="label-text">姓名</span>
              </label>
              <input
                type="text"
                placeholder="您的姓名"
                className="input input-bordered"
                value={name}
                onChange={handleNameChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-control mt-4">
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
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">确认密码</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? <span className="loading loading-spinner loading-sm"></span> : '注册'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p>
              已有账号?{' '}
              <Link href="/auth/login" className="link link-primary">
                登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
