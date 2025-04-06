import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about us and our mission',
};

const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'UI/UX Design', 'GraphQL', 'REST APIs'];

export default function AboutPage() {
  return (
    <div className="container mx-auto space-y-16 px-4 py-16">
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <div className="relative mx-auto h-32 w-32">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="Profile"
            className="border-primary rounded-full border-4 shadow-lg"
          />
        </div>
        <h1 className="from-primary to-primary/50 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          About Us
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          We are a team of developers who are passionate about creating beautiful, functional, and accessible web
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid gap-8 md:grid-cols-2">
        <Card className="space-y-4 p-6 transition-shadow hover:shadow-lg">
          <h2 className="text-primary text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            To deliver exceptional digital experiences through innovative web solutions, combining cutting-edge
            technology with thoughtful design.
          </p>
        </Card>
        <Card className="space-y-4 p-6 transition-shadow hover:shadow-lg">
          <h2 className="text-primary text-2xl font-semibold">Our Vision</h2>
          <p className="text-muted-foreground">
            To be at the forefront of web development, creating solutions that inspire and empower users worldwide.
          </p>
        </Card>
      </section>

      {/* Skills Section */}
      <section className="space-y-6">
        <h2 className="text-primary text-center text-2xl font-semibold">Our Expertise</h2>
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
        <h2 className="text-primary text-2xl font-semibold">Get in Touch</h2>
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

      {/* Stats Section */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { title: 'Projects', value: '100+' },
          { title: 'Clients', value: '50+' },
          { title: 'Experience', value: '5+ yrs' },
          { title: 'Team', value: '10+' },
        ].map((stat) => (
          <Card key={stat.title} className="p-4 text-center transition-shadow hover:shadow-lg">
            <h3 className="text-muted-foreground">{stat.title}</h3>
            <p className="text-primary mt-2 text-2xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
