import { Link } from "react-router-dom";
import { getCurrentWitcher, clearCurrentWitcher } from "@/lib/authWitcher";
import { Button } from "@/components/ui/button/button";
import { useState } from "react";

/**
 * CurrentWitcherBar
 *
 * Displays the currently connected witcher and a context-aware action:
 * - Shows “Login” when no witcher is selected.
 * - Shows “Logout” when a witcher is selected, and clears the session on click.
 *
 * @component
 * @returns {JSX.Element} A small top bar with current status and login/logout action.
 */

export default function CurrentWitcherBar() {
  // Tiny state bump to force a re-render after logout
  const [tick, setTick] = useState(0);

  // Grab the currently selected witcher
  const current = getCurrentWitcher();

  const handleLogout = () => {
    clearCurrentWitcher();
    setTick(t => t + 1); // refresh UI
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
      <div>
        {current ? (
          <strong>Current witcher: {current.name}</strong>
        ) : (
          <strong>No witcher selected</strong>
        )}
      </div>

      <div>
        {!current ? (
          // If no witcher, show login button
          <Link to="/login">
            <Button type="button">Login</Button>
          </Link>
        ) : (
          // Otherwise show logout button
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}