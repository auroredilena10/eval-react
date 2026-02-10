import { Link } from "react-router-dom";
import styles from "./createContract.module.css";
import { Button } from "@/components/ui/button/button";

export default function CreateContract({
    title,
    description,
    reward,
    onTitleChange,
    onDescriptionChange,
    onRewardChange,
    onSubmit,
    isLoading,
    error,
}) {
  if (isLoading) {
    return <p className={styles.message}>Loading contract details...</p>;
  }

  if (error) {
    return <p className={styles.message}>{error}</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create Contract</h1>
        <Link className={styles.backLink} to="/contracts">
          Back to contracts
        </Link>
      </div>

      <form className={styles.form} onSubmit={onSubmit}>
        {error && <p className={styles.message}>{error}</p>}

        <div className={styles.field}>
          <label className={styles.label}>Title</label>
          <input className={styles.input} value={title} onChange={onTitleChange} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={onDescriptionChange}
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Reward</label>
          <input
            className={styles.input} value={reward} onChange={onRewardChange}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Create"}
        </Button>
      </form>
    </div>
  );
}
