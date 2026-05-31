import { useState, type SubmitEvent } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Form.module.css";

emailjs.init(import.meta.env.VITE_PUBLIC_KEY);

export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const form = event.currentTarget;

    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        "template_fybb9nr",
        form,
      );

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);

      setError(
        "Message delivery failed. Feel free to use another method below to get in touch.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input type="email" name="email_id" placeholder="Your Email" required />

      <textarea name="message" placeholder="Your Message" rows={5} required />

      <button type="submit" disabled={isLoading || isSuccess}>
        {isLoading ? "Sending..." : "Send"}
      </button>

      {isSuccess && (
        <p className={styles.textFeedback}>
          I received the message, thank you for contacting me.
        </p>
      )}

      {error && (
        <p className={`${styles.textFeedback} ${styles.error}`}>{error}</p>
      )}
    </form>
  );
};
