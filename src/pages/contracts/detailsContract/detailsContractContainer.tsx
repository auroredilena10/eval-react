import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { contract, witcher } from "@/lib/api";
import DetailsContract from "./detailsContract";
import { getCurrentWitcher } from "@/lib/authWitcher";

/**
 * DetailsContractContainer
 *
 * Fetches and displays a contract’s details by URL `id`, along with the assigned witcher (if any).
 * Exposes actions to assign the current witcher and to mark the contract as completed.
 *
 * Data flow:
 * - Loads contract on mount/id change; conditionally loads witcher if needed.
 * - Handles optimistic-like refresh after actions by refetching the contract.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function DetailsContractContainer() {
  const { id } = useParams(); // Récupère l'ID du contrat depuis l'URL

  const [contractData, setContractData] = useState(null); //récupére les données du contrat
  const [witcherData, setWitcherData] = useState(null); //récupére les données du sorceleur associé au contrat

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currentWitcher = getCurrentWitcher();

  const handleAssign = async () => {
  try {
    setError("");
    if (!id || !currentWitcher) return;

    setIsLoading(true);
    await contract.assignTo(id, currentWitcher.id);

    // refetch details to refresh UI
    const updated = await contract.getById(id);
    setContractData(updated);

    // also refresh witcher info for display
    if (updated.assignedTo) {
      const w = await witcher.getById(String(updated.assignedTo));
      setWitcherData(w);
    }
  } catch {
    setError("Error while assigning contract");
  } finally {
    setIsLoading(false);
  }
};

const handleComplete = async () => {
  try {
    setError("");
    if (!id) return;

    setIsLoading(true);
    await contract.setStatus(id, "Completed");

    const updated = await contract.getById(id);
    setContractData(updated);
  } catch {
    setError("Error while completing contract");
  } finally {
    setIsLoading(false);
  }
};

  //fetch contract details by id
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const contractResult = await contract.getById(id);
        setContractData(contractResult);
        
        const status = contractResult?.status?.toLowerCase();
        const needsWitcher = status === "assigned" || status === "completed";

        if (needsWitcher && contractResult.assignedTo) {
          const witcherResult = await witcher.getById(contractResult.assignedTo);
          setWitcherData(witcherResult);

        } else {
          setWitcherData(null);
        }
      } catch (error){
        setError("Error while fetching contracts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

return (
  <>
  <DetailsContract
      contractData={contractData}
      witcherData={witcherData}
      isLoading={isLoading}
      error={error}
      currentWitcher={currentWitcher}
      onAssign={handleAssign}
      onComplete={handleComplete}
    />
  </>
  );
}