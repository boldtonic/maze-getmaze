import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MazeData } from "@/types";
import { TOAST_MESSAGES } from "@/constants";

export function useMazeData(profileId: string | undefined) {
  const [mazes, setMazes] = useState<MazeData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load mazes from database
  const loadMazes = async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mazes')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setMazes((data || []) as any);
    } catch (error) {
      console.error('Error loading mazes:', error);
      toast.error(TOAST_MESSAGES.LOAD_ERROR);
    } finally {
      setLoading(false);
    }
  };

  // Save or update a maze
  const saveMaze = async (mazeData: MazeData) => {
    if (!profileId) {
      toast.error(TOAST_MESSAGES.AUTH_ERROR);
      return null;
    }

    try {
      const mazeRecord = {
        profile_id: profileId,
        title: mazeData.title,
        description: mazeData.description,
        configuration: mazeData.configuration as any,
        is_published: true
      };

      let result;
      if (mazeData.id) {
        // Update existing maze
        result = await supabase
          .from('mazes')
          .update(mazeRecord)
          .eq('id', mazeData.id)
          .select()
          .single();
      } else {
        // Insert new maze
        result = await supabase
          .from('mazes')
          .insert(mazeRecord)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      toast.success(mazeData.id ? TOAST_MESSAGES.SAVE_SUCCESS : TOAST_MESSAGES.SAVE_SUCCESS);
      await loadMazes();
      return result.data;
    } catch (error) {
      console.error('Error saving maze:', error);
      toast.error(TOAST_MESSAGES.SAVE_ERROR);
      return null;
    }
  };

  // Delete a maze
  const deleteMaze = async (mazeId: string) => {
    try {
      const { error } = await supabase
        .from('mazes')
        .delete()
        .eq('id', mazeId);

      if (error) throw error;

      toast.success(TOAST_MESSAGES.DELETE_SUCCESS);
      await loadMazes();
    } catch (error) {
      console.error('Error deleting maze:', error);
      toast.error(TOAST_MESSAGES.DELETE_ERROR);
    }
  };

  useEffect(() => {
    if (profileId) {
      loadMazes();
    }
  }, [profileId]);

  return {
    mazes,
    loading,
    saveMaze,
    deleteMaze,
    loadMazes
  };
}
