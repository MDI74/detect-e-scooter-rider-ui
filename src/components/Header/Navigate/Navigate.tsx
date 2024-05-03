import { Button } from '@/components/Button/Button';
import Link from 'next/link';

export function Navigate() {
  return (
    <nav className="navigate">
      <ul className="navigate__list">
        <li className="navigate__item">
          <Link href="/">
            <Button>Детектирование</Button>
          </Link>
        </li>
        <li className="navigate__item">
          <Link href="/tracking">
            <Button>Трекинг</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
