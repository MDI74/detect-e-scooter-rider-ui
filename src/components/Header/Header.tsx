import { Navigate } from './Navigate/Navigate';

export function Header() {
  return (
    <header className="header">
      <div className="container header__wrapper">
        <h1 className="header__title">E-SCOOTER RIDER DETECTOR</h1>
        <Navigate />
      </div>
    </header>
  );
}
