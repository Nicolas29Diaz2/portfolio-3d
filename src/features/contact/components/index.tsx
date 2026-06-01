import { Background } from "./Background/Background";
import styles from "./index.module.css";
import { ScreenHtml } from "@/ui/components/ScreenHtml/ScreenHtml";
import { SocialMedia } from "./SocialMedia/SocialMedia";
import { Form } from "./Form/Form";

interface ContactProps {
  readonly showScreen: boolean;
}

export const ContactScreen = ({ showScreen }: Readonly<ContactProps>) => {
  return (
    <ScreenHtml
      className={styles.html}
      distanceFactor={1}
      transform
      occlude="blending"
      position={[0.48, 0.21, 0.44]}
      rotation={[-Math.PI / 15.4, 0, 0]}
      visible={showScreen}
    >
      <Form />

      <Background />

      <SocialMedia />

      <h1 className={styles.title}>CONTACT ME</h1>
    </ScreenHtml>
  );
};
