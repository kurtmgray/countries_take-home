import styles from './SkeletonLoader.module.css';

export function SkeletonLoader() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
          </div>
        ))}
      </div>
    </div>
  );
}
