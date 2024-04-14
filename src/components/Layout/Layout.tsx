import { PropsWithChildren } from 'react';
import { Header } from '../Header/Header';

export function Layout({
  children,
}: {
} & PropsWithChildren) {
  return (
    <>
      <Header />
      <div className="layout">
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
