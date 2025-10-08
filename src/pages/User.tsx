import { MazeDashboard } from "@/components/MazeDashboard";
import { useLocation } from "react-router-dom";

const User = () => {
  const location = useLocation();
  const isPremium = location.state?.isPremium ?? false;

  return <MazeDashboard initialPremium={isPremium} />;
};

export default User;
