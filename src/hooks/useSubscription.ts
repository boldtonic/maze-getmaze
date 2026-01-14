import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type SubscriptionTier = 'free' | 'premium';
export type SubscriptionType = 'user' | 'media';

interface SubscriptionData {
  subscription_tier: SubscriptionTier;
  subscription_type: SubscriptionType | null;
}

interface UseSubscriptionReturn {
  isPremium: boolean;
  subscriptionType: SubscriptionType | null;
  loading: boolean;
  updateSubscription: (tier: SubscriptionTier, type: SubscriptionType) => Promise<void>;
}

export function useSubscription(fallbackPremium?: boolean): UseSubscriptionReturn {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscription_tier: fallbackPremium ? 'premium' : 'free',
    subscription_type: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('subscription_tier, subscription_type')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching subscription:', error);
          return;
        }

        if (data) {
          setSubscription({
            subscription_tier: (data.subscription_tier as SubscriptionTier) || 'free',
            subscription_type: data.subscription_type as SubscriptionType | null
          });
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  const updateSubscription = async (tier: SubscriptionTier, type: SubscriptionType) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_tier: tier,
          subscription_type: type
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating subscription:', error);
        return;
      }

      setSubscription({ subscription_tier: tier, subscription_type: type });
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return {
    isPremium: subscription.subscription_tier === 'premium',
    subscriptionType: subscription.subscription_type,
    loading,
    updateSubscription
  };
}
