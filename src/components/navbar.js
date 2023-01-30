import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <article className="navbar-brand">
            <Link href="/">
              <Image
                src="/images/logo.webp"
                width={140}
                height={65}
                alt="logo"
              />
            </Link>
          </article>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <article className="nav-link active" aria-current="page">
                  <Link href="/"> Home</Link>
                </article>
              </li>
              <li className="nav-item">
                <article className="nav-link">
                  <Link href="/tasks/new">New Task</Link>
                </article>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
