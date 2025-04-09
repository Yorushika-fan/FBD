import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

const skills = ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Java', 'SpringBoot', 'MySQL'];

export default function AboutPage() {
  const t = useTranslations('About');
  return (
    <div className="container mx-auto space-y-16 px-4 py-16">
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <div className="relative mx-auto h-32 w-32">
          <Image
            src="/images/avatar.svg"
            alt="Profile"
            className="border-primary rounded-full border-4 shadow-lg"
            width={128}
            height={128}
          />
        </div>
        <h1 className="from-primary to-primary/50 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          {t('title')}
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">{t('description')}</p>
      </section>

      {/* Skills Section */}
      <section className="space-y-6">
        <h2 className="text-primary text-center text-2xl font-semibold">{t('skills')}</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="hover:bg-primary hover:text-primary-foreground px-4 py-1 text-sm transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="space-y-6 text-center">
        <h2 className="text-primary text-2xl font-semibold">{t('contact')}</h2>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" className="hover:text-primary rounded-full">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
          <Button variant="outline" size="icon" className="hover:text-primary rounded-full">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
          <Button variant="outline" size="icon" className="hover:text-primary rounded-full">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
