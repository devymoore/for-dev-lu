import { ConnectKitButton } from "connectkit";
import { Caisson } from "./Caisson";

export function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center gap-8">
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <ConnectKitButton />
        </div>
      </div>
    </div>
  );
}
