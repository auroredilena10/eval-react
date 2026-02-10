import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { contract, witcher } from "@/lib/api";
// import DetailsContract from "./detailsContract";
import styles from "./detailsContract.module.css";
import { Link } from "react-router-dom";

export default function DetailsContractContainer() {
  console.log("useEffect triggered, id =");

  const { id } = useParams(); // Récupère l'ID du contrat depuis l'URL

  const [contractData, setContractData] = useState(null); //récupére les données du contrat
  const [witcherData, setWitcherData] = useState(null); //récupére les données du sorceleur associé au contrat

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  //fetch contract details by id
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const contractResult = await contract.getById(id);
        setContractData(contractResult);
        
        //const status = contractResult?.status?.toLowerCase();
        //const needsWitcher = status === "assigned" || status === "completed";
        const needsWitcher = true;
        console.log("Contract data:", contractResult);
        if (needsWitcher && contractResult.assignedTo) {
          const witcherResult = await witcher.getById(contractResult.assignedTo);
          setWitcherData(witcherResult);
          console.log("Witcher data:", witcherResult);
        } else {
          setWitcherData(null);
        }
      } catch {
        setError("Error while fetching contracts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

return (
  <div className={styles.page}>
      <p> popo</p>
      <div className={styles.header}>
        <h1 className={styles.title}>Contract Details</h1>
        <Link className={styles.backLink} to="/contracts">
          Back to contracts
        </Link>
      </div>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Title</span>
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
          {/* <span className={styles.label}>Status</span> */}
          {/* <span className={styles.value}>{contractData.status}</span> */}
        </div>

        {/* {showWitcher && ( */}
          <div className={styles.row}>
            <span className={styles.label}>Assigned witcher</span>
            <span className={styles.value}>
              {witcherData ? witcherData.name : "Loading witcher..."}
            </span>
          </div>
        {/* )} */}
      </div>
    </div>
  );
}