import Link from 'next/link';
import style from './Header.module.scss';

export default function Header() {
  return (
    <header className={style.site_header}>
      
      <div className="content_container">
        <div>
          <h1>
            <Link href="/">
              {/* <img src="#" alt="#" /> */}
              Toa's dev blog
            </Link>
          </h1>
        </div>
        <nav className={style.nav}>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
