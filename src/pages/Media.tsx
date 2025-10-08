import { MediaDashboard } from "@/components/MediaDashboard";
import { useLocation } from "react-router-dom";

const Media = () => {
  const location = useLocation();
  const isPremium = location.state?.isPremium ?? false;

  return <MediaDashboard initialPremium={isPremium} />;
};

export default Media;
