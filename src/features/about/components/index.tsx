import { AboutBackground } from "@/features/about/components/AboutBackground/AboutBackground";
import { AboutBasicInfo } from "@/features/about/components/AboutBasicInfo/AboutBasicInfo";
import { ScreenHtml } from "@/ui/components/ScreenHtml/ScreenHtml";
import { useAbout } from "../hooks/useAbout";
import styles from "./index.module.css";

interface AboutScreenProps {
  readonly showScreen: boolean;
}

export function AboutScreen({ showScreen }: AboutScreenProps) {
  const { content, isLoading } = useAbout();

  return (
    <ScreenHtml
      className={`${styles.html}`}
      distanceFactor={1.72}
      transform
      occlude="blending"
      tabIndex={0}
      position={[0.3, 0, 0]}
      rotation={[0, -Math.PI / 2, 0]}
      scale={1}
      visible={showScreen}
    >
      <AboutBackground />

      {content && !isLoading && (
        <>
          <AboutBasicInfo content={content} />

          <section className={styles.descriptionContainer}>
            <p>{content.description}</p>
          </section>

          <section className={styles.imageContainer}>
            <img src={content.imageUrl} alt="IconAbout" />
          </section>
        </>
      )}

      <h1 className={styles.title}>ABOUT</h1>
    </ScreenHtml>
  );
}
