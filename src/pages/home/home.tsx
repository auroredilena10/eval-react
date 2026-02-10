import { Button } from "@/components/ui/button/button"
import { Link } from "react-router-dom"


export default function Home() {
  return (
    <div>
      <h1>Witcher Board</h1>

      <Link to="/contracts">
        <Button>
          Voir les contrats
        </Button>
      </Link>
    </div>
  )
}
