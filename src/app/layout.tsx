import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anshu Priya | Cloud & DevOps Engineer',
  description: 'Portfolio of Anshu Priya — Cloud & DevOps Engineer focused on AWS, CI/CD, Docker, Kubernetes, Linux, automation and full-stack development.',
  keywords: ['Anshu Priya', 'Cloud Engineer', 'DevOps Engineer', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Linux', 'Full Stack Developer'],
  authors: [{ name: 'Anshu Priya' }],
  openGraph: {
    title: 'Anshu Priya | Cloud & DevOps Engineer',
    description: 'Building applications. Automating infrastructure. Deploying to the cloud.',
    type: 'website',
    url: 'https://anshupriya.dev',
    siteName: 'Anshu Priya Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anshu Priya | Cloud & DevOps Engineer',
    description: 'Cloud & DevOps Engineer focused on AWS, CI/CD, Docker, Kubernetes, automation and full-stack development.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Anshu Priya',
              jobTitle: 'Cloud & DevOps Engineer',
              knowsAbout: ['AWS', 'DevOps', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins', 'Linux', 'Full Stack Development'],
              alumniOf: 'Sarala Birla University',
              url: 'https://anshupriya.dev',
              sameAs: [
                'https://github.com/anshupriya0510',
                'https://www.linkedin.com/in/anshu-priya-51a634270/',
                'https://leetcode.com/u/anshu_priya05/'
              ]
            })
          }}
        />
      </head>
      <body className="bg-transparent text-[#f0f4ff] antialiased">
        {children}
      </body>
    </html>
  );
}
