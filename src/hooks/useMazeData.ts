import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  thumbnail?: string;
  type: "featured" | "social";
}

interface MazeData {
  id?: string;
  title: string;
  description: string;
  configuration: {
    theme: string;
    idea: string;
    context: string;
    coverImage: string | null;
    style: {
      backgroundColor: string;
      accentColor: string;
      fontFamily: string;
      borderRadius: number;
      theme: string;
      orientation: 'horizontal' | 'vertical';
    };
    profile: {
      displayName: string;
      bio: string;
      title: string;
    };
    links: Link[];
  };
}

export function useMazeData(profileId: string) {
  const [mazes, setMazes] = useState<MazeData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load mazes from database
  const loadMazes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mazes')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setMazes(data as any[] || []);
    } catch (error) {
      console.error('Error loading mazes:', error);
      toast.error('Failed to load mazes');
    } finally {
      setLoading(false);
    }
  };

  // Save or update a maze
  const saveMaze = async (mazeData: MazeData) => {
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

      toast.success(mazeData.id ? 'Maze updated!' : 'Maze saved!');
      await loadMazes();
      return result.data;
    } catch (error) {
      console.error('Error saving maze:', error);
      toast.error('Failed to save maze');
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

      toast.success('Maze deleted');
      await loadMazes();
    } catch (error) {
      console.error('Error deleting maze:', error);
      toast.error('Failed to delete maze');
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
