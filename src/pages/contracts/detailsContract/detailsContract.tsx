import { Link } from "react-router-dom";
import styles from "./detailsContract.module.css";
import { Button } from "@/components/ui/button/button";

export default function DetailsContract({
  contractData,
  witcherData,
  isLoading,
  error,
}) {
  if (isLoading) {
    return <p className={styles.message}>Loading contract details...</p>;
  }

  if (error) {
    return <p className={styles.message}>{error}</p>;
  }

  if (!contractData) {
    return <p className={styles.message}>No contract found.</p>;
  }

  const status = contractData.status?.toLowerCase();
  const showWitcher = status === "assigned" || status === "completed";

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contract Details</h1>
        <Link className={styles.backLink} to="/contracts">
          Back to contracts
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Title </span>
          <span className={styles.value}>{contractData.title}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Description</span>
          <span className={styles.value}>{contractData.description}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Reward</span>
          <span className={styles.value}>{contractData.reward}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Status</span>
          <span className={styles.value}>{contractData.status}</span>
        </div>

        {showWitcher && (
          <div className={styles.row}>
            <span className={styles.label}>Assigned witcher</span>
            <span className={styles.value}>
              {witcherData ? witcherData.name : "Loading witcher..."}
            </span>
          </div>
        )}
        <Link to={`/contracts/edit/${contractData.id}`}>
          <br></br>
          <Button>
            Edit this contract
          </Button>
        </Link>
      </div>
    </div>
  );
}
