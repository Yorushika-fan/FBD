import { useTranslations } from 'next-intl';

export default function HowToUsePage() {
  const t = useTranslations('HowToUse');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">{t('title')}</h1>
        <p className="text-base-content/80 mx-auto max-w-2xl text-lg">{t('description')}</p>
      </div>

      {/* Video Tutorial Section */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">{t('videoTitle')}</h2>
        <div className="mx-auto aspect-video w-full max-w-4xl">
          <iframe
            className="h-full w-full rounded-lg shadow-lg"
            src="https://player.bilibili.com/player.html?bvid=BV1xx411c7mD"
            allowFullScreen
            title="Tutorial Video"
          />
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Step 1 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4 text-xl">{t('step1.title')}</h3>
            <p className="text-base-content/80">{t('step1.description')}</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4 text-xl">{t('step2.title')}</h3>
            <p className="text-base-content/80">{t('step2.description')}</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4 text-xl">{t('step3.title')}</h3>
            <p className="text-base-content/80">{t('step3.description')}</p>
          </div>
        </div>
      </div>

      {/* Additional Tips */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold">{t('tipsTitle')}</h2>
        <div className="bg-base-200 rounded-lg p-6">
          <ul className="list-inside list-disc space-y-2">
            <li>{t('tips.1')}</li>
            <li>{t('tips.2')}</li>
            <li>{t('tips.3')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
