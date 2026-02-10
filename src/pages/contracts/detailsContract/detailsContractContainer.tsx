import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { contract, witcher } from "@/lib/api";
import DetailsContract from "./detailsContract";

export default function DetailsContractContainer() {
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
        
        const status = contractResult?.status?.toLowerCase();
        const needsWitcher = status === "assigned" || status === "completed";

        if (needsWitcher && contractResult.assignedTo) {
          const witcherResult = await witcher.getById(contractResult.assignedTo);
          setWitcherData(witcherResult);

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
  <>
  <DetailsContract
      contractData={contractData}
      witcherData={witcherData}
      isLoading={isLoading}
      error={error}
    />
  </>
  );
}