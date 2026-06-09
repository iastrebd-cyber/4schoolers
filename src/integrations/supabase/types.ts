export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      consultation_requests: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          requested_at: string
          scheduled_at: string | null
          status: Database["public"]["Enums"]["consultation_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          requested_at?: string
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["consultation_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          requested_at?: string
          scheduled_at?: string | null
          status?: Database["public"]["Enums"]["consultation_status"]
          user_id?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          id: string
          message: string
          provider_id: string
          status: Database["public"]["Enums"]["inquiry_status"]
          student_email: string | null
          student_id: string
          student_name: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          provider_id: string
          status?: Database["public"]["Enums"]["inquiry_status"]
          student_email?: string | null
          student_id: string
          student_name?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          provider_id?: string
          status?: Database["public"]["Enums"]["inquiry_status"]
          student_email?: string | null
          student_id?: string
          student_name?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          avatar_url: string | null
          created_at: string
          current_grade: string | null
          full_name: string | null
          gpa: number | null
          graduation_year: number | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          avatar_url?: string | null
          created_at?: string
          current_grade?: string | null
          full_name?: string | null
          gpa?: number | null
          graduation_year?: number | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          avatar_url?: string | null
          created_at?: string
          current_grade?: string | null
          full_name?: string | null
          gpa?: number | null
          graduation_year?: number | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      provider_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          provider_id: string
          start_time: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          provider_id: string
          start_time: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          provider_id?: string
          start_time?: string
        }
        Relationships: []
      }
      provider_profiles: {
        Row: {
          bio: string | null
          created_at: string
          currency: string
          display_name: string | null
          headline: string | null
          hourly_rate: number | null
          id: string
          is_published: boolean
          location: string | null
          specialties: string[]
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          currency?: string
          display_name?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id: string
          is_published?: boolean
          location?: string | null
          specialties?: string[]
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          currency?: string
          display_name?: string | null
          headline?: string | null
          hourly_rate?: number | null
          id?: string
          is_published?: boolean
          location?: string | null
          specialties?: string[]
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      provider_services: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          price: number | null
          provider_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          price?: number | null
          provider_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          price?: number | null
          provider_id?: string
          title?: string
        }
        Relationships: []
      }
      progress_steps: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["progress_status"]
          step_key: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["progress_status"]
          step_key: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["progress_status"]
          step_key?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quiz_results: {
        Row: {
          answers: Json | null
          created_at: string
          id: string
          quiz_type: string
          recommended_track: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          answers?: Json | null
          created_at?: string
          id?: string
          quiz_type: string
          recommended_track?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          answers?: Json | null
          created_at?: string
          id?: string
          quiz_type?: string
          recommended_track?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: []
      }
      target_universities: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          priority: Database["public"]["Enums"]["university_priority"]
          university_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["university_priority"]
          university_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["university_priority"]
          university_name?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      account_type: "student" | "provider"
      app_role: "admin" | "moderator" | "user"
      consultation_status: "new" | "scheduled" | "completed" | "cancelled"
      inquiry_status: "new" | "read" | "replied" | "closed"
      progress_status: "not_started" | "in_progress" | "completed"
      university_priority: "reach" | "target" | "safety"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_type: ["student", "provider"],
      app_role: ["admin", "moderator", "user"],
      consultation_status: ["new", "scheduled", "completed", "cancelled"],
      inquiry_status: ["new", "read", "replied", "closed"],
      progress_status: ["not_started", "in_progress", "completed"],
      university_priority: ["reach", "target", "safety"],
    },
  },
} as const
