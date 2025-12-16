import LinkTokenScreen from "./components/link-token-screen";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LinkTokenScreen />
      <Toaster position="top-center" richColors />
    </div>
  );
}