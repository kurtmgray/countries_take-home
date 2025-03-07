import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import styles from './ErrorAlert.module.css';

/**
 * ErrorAlert Component - Displays error messages in a styled alert box.
 *
 * This component is used to show error messages related to different
 * parts of the application, such as country or region fetching errors.
 * It uses a `destructive` variant to highlight critical issues.
 *
 * @param {string} type - The type of error (e.g., "Countries", "Regions").
 * @param {string} error - The error message to display.
 *
 * @returns {JSX.Element} A styled alert displaying the error message.
 */

type ErrorAlertProps = {
  type: string;
  error: string;
};

export function ErrorAlert({ type, error }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className={styles.error}>
      <AlertTitle>{type} error:</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
