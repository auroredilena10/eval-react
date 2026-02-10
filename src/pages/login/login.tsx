import { Button } from "@/components/ui/button/button";
import styles from "./login.module.css";

export default function LoginWitcher({
  witchers,
  selectedId,
  onSelectedChange,
  onSubmit,
  isLoading,
  error,
}) {
  if (isLoading) return <p>Loading witchers...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Login as a Witcher</h1>
      </div>

      {error && <p className={styles.message}>{error}</p>}

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Choose a witcher</label>
          <select className={styles.select} value={selectedId} onChange={onSelectedChange}>
            <option value="">-- Select --</option>
            {witchers.map((w: any) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" disabled={!selectedId}>
          Login
        </Button>
      </form>
    </div>
  );
}
