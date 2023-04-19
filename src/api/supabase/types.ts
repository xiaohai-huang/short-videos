export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      PowerPlayPointsPerGame: {
        Row: {
          player_id: number;
          PointsPerG: number;
          season: number;
        };
        Insert: {
          player_id: number;
          PointsPerG: number;
          season?: number;
        };
        Update: {
          player_id?: number;
          PointsPerG?: number;
          season?: number;
        };
      };
      profiles: {
        Row: {
          avatar: string | null;
          created_at: string | null;
          user_id: string;
          user_name: string | null;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string | null;
          user_id: string;
          user_name?: string | null;
        };
        Update: {
          avatar?: string | null;
          created_at?: string | null;
          user_id?: string;
          user_name?: string | null;
        };
      };
      todos: {
        Row: {
          completed: boolean;
          created_at: string | null;
          description: string | null;
          id: number;
          title: string;
        };
        Insert: {
          completed?: boolean;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          title: string;
        };
        Update: {
          completed?: boolean;
          created_at?: string | null;
          description?: string | null;
          id?: number;
          title?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
