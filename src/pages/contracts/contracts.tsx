import { Link } from "react-router-dom";
import styles from "./contracts.module.css";
import { Button } from "@/components/ui/button/button";

export default function Contracts({
  contracts,
  isLoading,
  error,
  title,
  status,
  onTitleChange,
  onStatusChange,
}) {

  // Mapping status -> CSS class
  const statusClassMap = {
    available: styles.contractAvailable,
    assigned: styles.contractAssigned,
    completed: styles.contractCompleted,
  };

  return (
    <div className={styles.contractsPage}>
      <h1>Contracts</h1>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterField}>
          <label className={styles.filterLabel}>Title</label>
          <input className={styles.filterInput} value={title} onChange={onTitleChange} />
        </div>

        <div className={styles.filterField}>
        <label className={styles.filterLabel}>Statut</label>
          <select className={styles.filterSelect} value={status} onChange={onStatusChange}>
            <option value="">All</option>
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <Link to="/contracts/create">
            <Button>
              Create contract
            </Button>
          </Link>
        </div>
      </div>

      {/* List */}
      <div className={styles.cardsGrid}>
        {contracts.map((contract) => {
          const statusKey = contract.status.toLowerCase();
          const statusClass = statusClassMap[statusKey]; //choisi la bonne classe CSS selon le statut

          if (isLoading) {
            return <p>Loading contracts...</p>;
          }

          if (error) {
            return <p>{error}</p>;
          }

          if (!contracts || contracts.length === 0) {
            return <p>No contracts found.</p>;
          }

          return (
            <Link to={"/contracts/details/" + contract.id} key={contract.id} className={`${styles.contractCard} ${statusClass}`}>
              <h3>{contract.title}</h3>
              <p>{contract.description}</p>
              <p>Statut : {contract.status}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
