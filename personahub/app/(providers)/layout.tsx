import Providers from '@/app/providers';

export default function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}