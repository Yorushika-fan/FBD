import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FaCloudDownloadAlt, FaBolt, FaShieldAlt, FaUserFriends } from 'react-icons/fa';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('HomePage');

  // Mock statistics data - in a real app, this would come from an API
  const stats = {
    totalParsed: 12500,
    activeUsers: 850,
    successRate: 99.9,
    totalDownloads: 45000,
  };

  return (
    <div className="from-base-200 to-base-100 min-h-screen bg-gradient-to-b">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="from-primary/10 via-secondary/5 absolute inset-0 bg-gradient-to-br to-transparent"></div>
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full min-h-screen flex-col items-center justify-between py-20 lg:flex-row">
            {/* Left Content */}
            <div className="max-w-2xl flex-1 lg:pr-12">
              <h1 className="from-primary via-secondary to-accent mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent lg:text-6xl">
                {t('title')}
              </h1>
              <p className="text-base-content/80 mb-8 text-lg leading-relaxed lg:text-xl">{t('about')}</p>
              <div className="relative z-20 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/parse"
                  className="btn btn-primary btn-lg relative z-20 cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  {t('getStarted')}
                </Link>
                <Link
                  href="/how-to-use"
                  className="btn btn-outline btn-lg relative z-20 cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  {t('howToUse')}
                </Link>
              </div>
            </div>

            {/* Right Logo */}
            <div className="mt-12 flex flex-1 items-center justify-center lg:mt-0">
              <div className="relative w-full max-w-lg">
                <div className="from-primary/20 to-secondary/20 absolute inset-0 rounded-full bg-gradient-to-br blur-3xl"></div>
                <div className="relative z-10 p-8">
                  <Image
                    src="/images/logo.png"
                    alt="Cloud Storage Logo"
                    width={500}
                    height={500}
                    className="h-auto w-full rounded-2xl object-contain shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="relative py-16">
        <div className="via-base-100/50 absolute inset-0 bg-gradient-to-b from-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="stat bg-base-200/80 rounded-box border-base-300/20 border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="stat-figure text-primary">
                <FaCloudDownloadAlt className="text-4xl" />
              </div>
              <div className="stat-title text-base-content/70">{t('totalParsed')}</div>
              <div className="stat-value text-primary">{stats.totalParsed.toLocaleString()}</div>
              <div className="stat-desc text-base-content/60">{t('totalParsedDesc')}</div>
            </div>

            <div className="stat bg-base-200/80 rounded-box border-base-300/20 border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="stat-figure text-secondary">
                <FaUserFriends className="text-4xl" />
              </div>
              <div className="stat-title text-base-content/70">{t('activeUsers')}</div>
              <div className="stat-value text-secondary">{stats.activeUsers.toLocaleString()}</div>
              <div className="stat-desc text-base-content/60">{t('activeUsersDesc')}</div>
            </div>

            <div className="stat bg-base-200/80 rounded-box border-base-300/20 border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="stat-figure text-accent">
                <FaShieldAlt className="text-4xl" />
              </div>
              <div className="stat-title text-base-content/70">{t('successRate')}</div>
              <div className="stat-value text-accent">{stats.successRate}%</div>
              <div className="stat-desc text-base-content/60">{t('successRateDesc')}</div>
            </div>

            <div className="stat bg-base-200/80 rounded-box border-base-300/20 border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
              <div className="stat-figure text-primary">
                <FaBolt className="text-4xl" />
              </div>
              <div className="stat-title text-base-content/70">{t('totalDownloads')}</div>
              <div className="stat-value text-primary">{stats.totalDownloads.toLocaleString()}</div>
              <div className="stat-desc text-base-content/60">{t('totalDownloadsDesc')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20">
        <div className="via-base-200/50 absolute inset-0 bg-gradient-to-b from-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="from-primary to-secondary mb-16 bg-gradient-to-r bg-clip-text text-center text-4xl font-bold text-transparent">
            {t('featuresTitle')}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="card bg-base-100/80 border-base-300/20 group border shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
              <div className="card-body">
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-3 transition-colors duration-300">
                    <FaBolt className="text-primary text-3xl" />
                  </div>
                  <h3 className="card-title text-xl">{t('features.fast')}</h3>
                </div>
                <p className="text-base-content/70">{t('features.fastDesc')}</p>
              </div>
            </div>

            <div className="card bg-base-100/80 border-base-300/20 group border shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
              <div className="card-body">
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-secondary/10 group-hover:bg-secondary/20 rounded-full p-3 transition-colors duration-300">
                    <FaShieldAlt className="text-secondary text-3xl" />
                  </div>
                  <h3 className="card-title text-xl">{t('features.stable')}</h3>
                </div>
                <p className="text-base-content/70">{t('features.stableDesc')}</p>
              </div>
            </div>

            <div className="card bg-base-100/80 border-base-300/20 group border shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
              <div className="card-body">
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-accent/10 group-hover:bg-accent/20 rounded-full p-3 transition-colors duration-300">
                    <FaCloudDownloadAlt className="text-accent text-3xl" />
                  </div>
                  <h3 className="card-title text-xl">{t('features.simple')}</h3>
                </div>
                <p className="text-base-content/70">{t('features.simpleDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
