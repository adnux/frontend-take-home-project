'use client';

import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {

  return (
    <main className={styles.main}>

      <div className={styles.code}>
        <p>Frontend Engineer Take Home Project</p>
      </div>
      
      <div>
        <Image
          className={styles.logo}
          src="/classkick.png"
          alt="Classkick Logo"
          width={200}
          height={50}
          priority
        />
      </div>
      
      <div>
        <h1 className={styles.error}>An error has occurred</h1>
        <p className={styles.error}>Please try again later</p>
      </div>
    </main>
  )
}
