import { useState, type SubmitEvent } from "react";
import emailjs from "@emailjs/browser";
import styles from "./Form.module.css";
import { useToastStore } from "@/store/toastStore";

emailjs.init(import.meta.env.VITE_PUBLIC_KEY);

export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const showError = useToastStore((state) => state.showError);

  const handleSubmit = async (
    event: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const form = event.currentTarget;

    setIsLoading(true);
    setIsSuccess(false);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        "template_fybb9nr",
        form,
      );

      setIsSuccess(true);
      form.reset();
    } catch {
      showError(
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
    </form>
  );
};
