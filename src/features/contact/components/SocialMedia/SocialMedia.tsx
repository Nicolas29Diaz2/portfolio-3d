import styles from "./SocialMedia.module.css";
import { useContact } from "../../hooks/useContact";

export const SocialMedia = () => {
  const { content } = useContact();
  return (
    <nav className={styles.iconNav}>
      <ul>
        <li>
          <a href={content?.gitHubUrl} target="_blank">
            <img src="/Images/Contact/GithubContact.webp" alt="Github" />
          </a>
        </li>
        <li>
          <a
            href={content?.emailUrl}
            target="_blank"
          >
            <img src="/Images/Contact/Mail.webp" alt="Mail" />
          </a>
        </li>
        <li>
          <a href={content?.linkedinUrl} target="_blank">
            <img src="/Images/Contact/Linkedin.webp" alt="Linkedin" />
          </a>
        </li>
        <li>
          <a
            href={content?.whatsAppUrl}
            target="_blank"
          >
            <img src="/Images/Contact/Whatsapp.webp" alt="Whatsapp" />
          </a>
        </li>
      </ul>
    </nav>
  );
};
