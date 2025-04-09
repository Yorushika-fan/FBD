import { useTranslations } from 'next-intl';

export default function HowToUsePage() {
  const t = useTranslations('HowToUse');

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="card from-primary/5 to-secondary/5 mb-12 bg-gradient-to-br">
        <div className="card-body text-center">
          <h1 className="from-primary to-secondary mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
            {t('title')}
          </h1>
          <p className="text-base-content/80 mx-auto max-w-2xl text-lg">{t('description')}</p>
        </div>
      </div>

      {/* Main Steps Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Step 1 */}
        <div className="card bg-base-100 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="card-body">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="card-title text-xl">{t('step1.title')}</h3>
            </div>
            <p className="text-base-content/80">{t('step1.description')}</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="card bg-base-100 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="card-body">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-secondary/10 text-secondary flex h-10 w-10 items-center justify-center rounded-full">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="card-title text-xl">{t('step2.title')}</h3>
            </div>
            <p className="text-base-content/80">{t('step2.description')}</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="card bg-base-100 shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <div className="card-body">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-accent/10 text-accent flex h-10 w-10 items-center justify-center rounded-full">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="card-title text-xl">{t('step3.title')}</h3>
            </div>
            <p className="text-base-content/80">{t('step3.description')}</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-6 text-2xl font-semibold">{t('faqTitle')}</h2>
            <div className="space-y-6">
              <div className="collapse-plus bg-base-200 collapse">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="collapse-title text-lg font-medium">{t('faq.1.question')}</div>
                <div className="collapse-content">
                  <p className="text-base-content/80">{t('faq.1.answer')}</p>
                </div>
              </div>
              <div className="collapse-plus bg-base-200 collapse">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-medium">{t('faq.2.question')}</div>
                <div className="collapse-content">
                  <p className="text-base-content/80">{t('faq.2.answer')}</p>
                </div>
              </div>
              <div className="collapse-plus bg-base-200 collapse">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-medium">{t('faq.3.question')}</div>
                <div className="collapse-content">
                  <p className="text-base-content/80">{t('faq.3.answer')}</p>
                </div>
              </div>
              <div className="collapse-plus bg-base-200 collapse">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-medium">{t('faq.4.question')}</div>
                <div className="collapse-content">
                  <p className="text-base-content/80">{t('faq.4.answer')}</p>
                </div>
              </div>
              <div className="collapse-plus bg-base-200 collapse">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-medium">{t('faq.5.question')}</div>
                <div className="collapse-content">
                  <p className="text-base-content/80">{t('faq.5.answer')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
