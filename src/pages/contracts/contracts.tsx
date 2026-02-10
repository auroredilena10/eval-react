import styles from "./contracts.module.css";

export default function Contracts({
  contracts,
  isLoading,
  error,
}) {
  if (isLoading) {
    return <p>Loading contracts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!contracts || contracts.length === 0) {
    return <p>No contracts found.</p>;
  }

  // Mapping status -> CSS class
  const statusClassMap = {
    available: styles.contractAvailable,
    assigned: styles.contractAssigned,
    completed: styles.contractCompleted,
  };

  return (
    <div className={styles.contractsPage}>
      <h1>Contracts</h1>
      {contracts.map((contract) => {
        const statusKey = contract.status.toLowerCase();
        const statusClass = statusClassMap[statusKey]; // Choisi la bonne classe CSS selon le statut

        return (
          <div
            key={contract.id}
            className={`${styles.contractCard} ${statusClass}`}
          >
            <h3>{contract.title}</h3>
            <p>{contract.description}</p>
            <p>{contract.status}</p>
          </div>
        );
      })}
    </div>
  );
}
