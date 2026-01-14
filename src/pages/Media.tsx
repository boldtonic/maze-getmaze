import { MediaDashboard } from "@/components/MediaDashboard";
import { useLocation } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";

const Media = () => {
  const location = useLocation();
  const locationPremium = location.state?.isPremium ?? false;
  
  // Use subscription hook with location state as fallback for immediate navigation
  const { isPremium, loading } = useSubscription(locationPremium);

  // Use location state immediately, then switch to DB value once loaded
  const effectivePremium = loading ? locationPremium : isPremium;

  return <MediaDashboard initialPremium={effectivePremium} />;
};

export default Media;
