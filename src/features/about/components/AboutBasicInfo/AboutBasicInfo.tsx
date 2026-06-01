import type { AboutBasicInfoProps } from "@/features/about/types/aboutScreen.types";
import styles from "./AboutBasicInfo.module.css";

export function AboutBasicInfo({ content }: Readonly<AboutBasicInfoProps>) {
  return (
    <section className={styles.section}>
      <ul className={styles.ulContainer}>
        <li className={styles.liInfo}>
          <img src="/Images/AboutImages/IconName.webp" alt="IconName" />
          <div>
            <h2>Name:</h2>
            <p>{content.name}</p>
          </div>
        </li>
        <li className={styles.liInfo}>
          <img src="/Images/AboutImages/IconAge.webp" alt="IconName" />
          <div>
            <h2>Age:</h2>
            <p>{content.age}</p>
          </div>
        </li>
        <li className={styles.liInfo}>
          <img src="/Images/AboutImages/IconProfession.webp" alt="IconName" />
          <div>
            <h2> Profession:</h2>
            <p> {content.role}</p>
          </div>
        </li>
      </ul>
    </section>
  );
}
