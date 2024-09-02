import DrawingBoard from '@/components/drawingboard/drawingboard';
import Image from 'next/image';
import styles from './page.module.css';

export default function DrawingBoardPage() {

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

      <DrawingBoard />
    </main>
  )
}
