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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      archive_history: {
        Row: {
          action: string
          created_at: string
          householder_id: string
          id: string
          notes: string | null
          reason: Database["public"]["Enums"]["archive_reason"] | null
          staff_id: string
        }
        Insert: {
          action: string
          created_at?: string
          householder_id: string
          id?: string
          notes?: string | null
          reason?: Database["public"]["Enums"]["archive_reason"] | null
          staff_id: string
        }
        Update: {
          action?: string
          created_at?: string
          householder_id?: string
          id?: string
          notes?: string | null
          reason?: Database["public"]["Enums"]["archive_reason"] | null
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "archive_history_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "householders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archive_history_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "v_householder_stove_usage"
            referencedColumns: ["householder_id"]
          },
          {
            foreignKeyName: "archive_history_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "v_householders_with_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archive_history_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "archive_history_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "archive_history_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      chief_cv_assignments: {
        Row: {
          chief_id: string
          created_at: string
          cv_area_id: string
          id: string
        }
        Insert: {
          chief_id: string
          created_at?: string
          cv_area_id: string
          id?: string
        }
        Update: {
          chief_id?: string
          created_at?: string
          cv_area_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chief_cv_assignments_chief_id_fkey"
            columns: ["chief_id"]
            isOneToOne: false
            referencedRelation: "chiefs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chief_cv_assignments_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "cv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chief_cv_assignments_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["cv_area_id"]
          },
        ]
      }
      chiefs: {
        Row: {
          created_at: string
          id: string
          name: string
          phone: string | null
          ta_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          phone?: string | null
          ta_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          phone?: string | null
          ta_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chiefs_ta_id_fkey"
            columns: ["ta_id"]
            isOneToOne: false
            referencedRelation: "traditional_authorities"
            referencedColumns: ["id"]
          },
        ]
      }
      coordinator_areas: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          updated_at: string
          vpa_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          vpa_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          vpa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coordinator_areas_vpa_id_fkey"
            columns: ["vpa_id"]
            isOneToOne: false
            referencedRelation: "vpa_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_areas: {
        Row: {
          code: string
          created_at: string
          id: string
          lcv_area_id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          lcv_area_id: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          lcv_area_id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cv_areas_lcv_area_id_fkey"
            columns: ["lcv_area_id"]
            isOneToOne: false
            referencedRelation: "lcv_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_performance_metrics: {
        Row: {
          created_at: string
          cv_area_id: string
          green_count: number | null
          id: string
          inspection_rate: number | null
          inspections_completed: number | null
          metric_date: string
          new_registrations: number | null
          period_type: string
          red_count: number | null
          staff_id: string
          total_householders: number | null
          uninspected_count: number | null
          yellow_count: number | null
        }
        Insert: {
          created_at?: string
          cv_area_id: string
          green_count?: number | null
          id?: string
          inspection_rate?: number | null
          inspections_completed?: number | null
          metric_date: string
          new_registrations?: number | null
          period_type: string
          red_count?: number | null
          staff_id: string
          total_householders?: number | null
          uninspected_count?: number | null
          yellow_count?: number | null
        }
        Update: {
          created_at?: string
          cv_area_id?: string
          green_count?: number | null
          id?: string
          inspection_rate?: number | null
          inspections_completed?: number | null
          metric_date?: string
          new_registrations?: number | null
          period_type?: string
          red_count?: number | null
          staff_id?: string
          total_householders?: number | null
          uninspected_count?: number | null
          yellow_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cv_performance_metrics_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "cv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cv_performance_metrics_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["cv_area_id"]
          },
          {
            foreignKeyName: "cv_performance_metrics_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cv_performance_metrics_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "cv_performance_metrics_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      householders: {
        Row: {
          archive_notes: string | null
          archive_reason: Database["public"]["Enums"]["archive_reason"] | null
          archived_at: string | null
          archived_by_id: string | null
          carbon_rights_explained: boolean | null
          ccm_explained: boolean | null
          ccm_image_path: string | null
          chief_id: string
          created_at: string
          cv_area_id: string
          family_count: number | null
          first_name: string
          gps_accuracy: number | null
          has_kitchen: boolean | null
          house_ownership: Database["public"]["Enums"]["house_ownership"] | null
          id: string
          is_archived: boolean | null
          is_verified: boolean | null
          kitchen_image_path: string | null
          kitchen_rainproof: boolean | null
          kitchen_well_ventilated: boolean | null
          landlord_name: string | null
          last_ccm_condition:
            | Database["public"]["Enums"]["ccm_condition"]
            | null
          last_ccm_in_use: boolean | null
          last_inspection_by_id: string | null
          last_inspection_date: string | null
          last_known_gps_accuracy: number | null
          last_known_location: unknown
          last_name: string | null
          legacy_address: string | null
          legacy_id: number | null
          location: unknown
          middle_name: string | null
          stove_build_date: string | null
          stove_type: Database["public"]["Enums"]["stove_type"] | null
          updated_at: string
          verified_date: string | null
          wood_buy: Database["public"]["Enums"]["wood_purchase"] | null
          wood_collection_hours: number | null
        }
        Insert: {
          archive_notes?: string | null
          archive_reason?: Database["public"]["Enums"]["archive_reason"] | null
          archived_at?: string | null
          archived_by_id?: string | null
          carbon_rights_explained?: boolean | null
          ccm_explained?: boolean | null
          ccm_image_path?: string | null
          chief_id: string
          created_at?: string
          cv_area_id: string
          family_count?: number | null
          first_name: string
          gps_accuracy?: number | null
          has_kitchen?: boolean | null
          house_ownership?:
            | Database["public"]["Enums"]["house_ownership"]
            | null
          id?: string
          is_archived?: boolean | null
          is_verified?: boolean | null
          kitchen_image_path?: string | null
          kitchen_rainproof?: boolean | null
          kitchen_well_ventilated?: boolean | null
          landlord_name?: string | null
          last_ccm_condition?:
            | Database["public"]["Enums"]["ccm_condition"]
            | null
          last_ccm_in_use?: boolean | null
          last_inspection_by_id?: string | null
          last_inspection_date?: string | null
          last_known_gps_accuracy?: number | null
          last_known_location?: unknown
          last_name?: string | null
          legacy_address?: string | null
          legacy_id?: number | null
          location?: unknown
          middle_name?: string | null
          stove_build_date?: string | null
          stove_type?: Database["public"]["Enums"]["stove_type"] | null
          updated_at?: string
          verified_date?: string | null
          wood_buy?: Database["public"]["Enums"]["wood_purchase"] | null
          wood_collection_hours?: number | null
        }
        Update: {
          archive_notes?: string | null
          archive_reason?: Database["public"]["Enums"]["archive_reason"] | null
          archived_at?: string | null
          archived_by_id?: string | null
          carbon_rights_explained?: boolean | null
          ccm_explained?: boolean | null
          ccm_image_path?: string | null
          chief_id?: string
          created_at?: string
          cv_area_id?: string
          family_count?: number | null
          first_name?: string
          gps_accuracy?: number | null
          has_kitchen?: boolean | null
          house_ownership?:
            | Database["public"]["Enums"]["house_ownership"]
            | null
          id?: string
          is_archived?: boolean | null
          is_verified?: boolean | null
          kitchen_image_path?: string | null
          kitchen_rainproof?: boolean | null
          kitchen_well_ventilated?: boolean | null
          landlord_name?: string | null
          last_ccm_condition?:
            | Database["public"]["Enums"]["ccm_condition"]
            | null
          last_ccm_in_use?: boolean | null
          last_inspection_by_id?: string | null
          last_inspection_date?: string | null
          last_known_gps_accuracy?: number | null
          last_known_location?: unknown
          last_name?: string | null
          legacy_address?: string | null
          legacy_id?: number | null
          location?: unknown
          middle_name?: string | null
          stove_build_date?: string | null
          stove_type?: Database["public"]["Enums"]["stove_type"] | null
          updated_at?: string
          verified_date?: string | null
          wood_buy?: Database["public"]["Enums"]["wood_purchase"] | null
          wood_collection_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "householders_archived_by_id_fkey"
            columns: ["archived_by_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_archived_by_id_fkey"
            columns: ["archived_by_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "householders_archived_by_id_fkey"
            columns: ["archived_by_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_chief_id_fkey"
            columns: ["chief_id"]
            isOneToOne: false
            referencedRelation: "chiefs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "cv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["cv_area_id"]
          },
          {
            foreignKeyName: "householders_last_inspection_by_id_fkey"
            columns: ["last_inspection_by_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_last_inspection_by_id_fkey"
            columns: ["last_inspection_by_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "householders_last_inspection_by_id_fkey"
            columns: ["last_inspection_by_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      inspections: {
        Row: {
          ccm_condition: Database["public"]["Enums"]["ccm_condition"] | null
          ccm_image_path: string | null
          ccm_in_use: boolean
          ccm_rain_protection: boolean | null
          created_at: string
          gps_accuracy: number | null
          has_kitchen: boolean | null
          householder_id: string
          id: string
          inspection_date: string
          kitchen_image_path: string | null
          kitchen_rainproof: boolean | null
          kitchen_well_ventilated: boolean | null
          location: unknown
          staff_id: string
          wood_use: boolean | null
        }
        Insert: {
          ccm_condition?: Database["public"]["Enums"]["ccm_condition"] | null
          ccm_image_path?: string | null
          ccm_in_use: boolean
          ccm_rain_protection?: boolean | null
          created_at?: string
          gps_accuracy?: number | null
          has_kitchen?: boolean | null
          householder_id: string
          id?: string
          inspection_date?: string
          kitchen_image_path?: string | null
          kitchen_rainproof?: boolean | null
          kitchen_well_ventilated?: boolean | null
          location?: unknown
          staff_id: string
          wood_use?: boolean | null
        }
        Update: {
          ccm_condition?: Database["public"]["Enums"]["ccm_condition"] | null
          ccm_image_path?: string | null
          ccm_in_use?: boolean
          ccm_rain_protection?: boolean | null
          created_at?: string
          gps_accuracy?: number | null
          has_kitchen?: boolean | null
          householder_id?: string
          id?: string
          inspection_date?: string
          kitchen_image_path?: string | null
          kitchen_rainproof?: boolean | null
          kitchen_well_ventilated?: boolean | null
          location?: unknown
          staff_id?: string
          wood_use?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "inspections_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "householders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspections_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "v_householder_stove_usage"
            referencedColumns: ["householder_id"]
          },
          {
            foreignKeyName: "inspections_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "v_householders_with_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspections_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inspections_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "inspections_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      lcv_areas: {
        Row: {
          code: string
          coordinator_area_id: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          coordinator_area_id: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          coordinator_area_id?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lcv_areas_coordinator_area_id_fkey"
            columns: ["coordinator_area_id"]
            isOneToOne: false
            referencedRelation: "coordinator_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          coordinator_area_id: string | null
          created_at: string
          cv_area_id: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          is_active: boolean
          lcv_area_id: string | null
          leave_date: string | null
          name: string
          phone: string | null
          position: Database["public"]["Enums"]["staff_position"]
          start_date: string | null
          updated_at: string
          vpa_area_id: string | null
        }
        Insert: {
          coordinator_area_id?: string | null
          created_at?: string
          cv_area_id?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          is_active?: boolean
          lcv_area_id?: string | null
          leave_date?: string | null
          name: string
          phone?: string | null
          position: Database["public"]["Enums"]["staff_position"]
          start_date?: string | null
          updated_at?: string
          vpa_area_id?: string | null
        }
        Update: {
          coordinator_area_id?: string | null
          created_at?: string
          cv_area_id?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          is_active?: boolean
          lcv_area_id?: string | null
          leave_date?: string | null
          name?: string
          phone?: string | null
          position?: Database["public"]["Enums"]["staff_position"]
          start_date?: string | null
          updated_at?: string
          vpa_area_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_coordinator_area_id_fkey"
            columns: ["coordinator_area_id"]
            isOneToOne: false
            referencedRelation: "coordinator_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "cv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["cv_area_id"]
          },
          {
            foreignKeyName: "staff_lcv_area_id_fkey"
            columns: ["lcv_area_id"]
            isOneToOne: false
            referencedRelation: "lcv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_vpa_area_id_fkey"
            columns: ["vpa_area_id"]
            isOneToOne: false
            referencedRelation: "vpa_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_assignment_history: {
        Row: {
          coordinator_area_id: string | null
          created_at: string
          cv_area_id: string | null
          end_date: string | null
          id: string
          lcv_area_id: string | null
          staff_id: string
          start_date: string
        }
        Insert: {
          coordinator_area_id?: string | null
          created_at?: string
          cv_area_id?: string | null
          end_date?: string | null
          id?: string
          lcv_area_id?: string | null
          staff_id: string
          start_date: string
        }
        Update: {
          coordinator_area_id?: string | null
          created_at?: string
          cv_area_id?: string | null
          end_date?: string | null
          id?: string
          lcv_area_id?: string | null
          staff_id?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_assignment_history_coordinator_area_id_fkey"
            columns: ["coordinator_area_id"]
            isOneToOne: false
            referencedRelation: "coordinator_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_assignment_history_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "cv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_assignment_history_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["cv_area_id"]
          },
          {
            foreignKeyName: "staff_assignment_history_lcv_area_id_fkey"
            columns: ["lcv_area_id"]
            isOneToOne: false
            referencedRelation: "lcv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_assignment_history_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_assignment_history_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "staff_assignment_history_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_auth: {
        Row: {
          auth_user_id: string | null
          created_at: string
          id: string
          last_login: string | null
          password_hash: string | null
          staff_id: string
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          id?: string
          last_login?: string | null
          password_hash?: string | null
          staff_id: string
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          id?: string
          last_login?: string | null
          password_hash?: string | null
          staff_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_auth_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: true
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_auth_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: true
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "staff_auth_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: true
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      stove_usage_frequency: {
        Row: {
          created_at: string
          frequency: Database["public"]["Enums"]["usage_frequency"]
          id: string
          notes: string | null
          season: Database["public"]["Enums"]["season"]
          stove_type: Database["public"]["Enums"]["stove_type"]
          usage_survey_id: string
        }
        Insert: {
          created_at?: string
          frequency: Database["public"]["Enums"]["usage_frequency"]
          id?: string
          notes?: string | null
          season: Database["public"]["Enums"]["season"]
          stove_type: Database["public"]["Enums"]["stove_type"]
          usage_survey_id: string
        }
        Update: {
          created_at?: string
          frequency?: Database["public"]["Enums"]["usage_frequency"]
          id?: string
          notes?: string | null
          season?: Database["public"]["Enums"]["season"]
          stove_type?: Database["public"]["Enums"]["stove_type"]
          usage_survey_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stove_usage_frequency_usage_survey_id_fkey"
            columns: ["usage_survey_id"]
            isOneToOne: false
            referencedRelation: "usage_surveys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stove_usage_frequency_usage_survey_id_fkey"
            columns: ["usage_survey_id"]
            isOneToOne: false
            referencedRelation: "v_householder_stove_usage"
            referencedColumns: ["survey_id"]
          },
          {
            foreignKeyName: "stove_usage_frequency_usage_survey_id_fkey"
            columns: ["usage_survey_id"]
            isOneToOne: false
            referencedRelation: "v_seasonal_stove_comparison"
            referencedColumns: ["survey_id"]
          },
        ]
      }
      traditional_authorities: {
        Row: {
          created_at: string
          district_id: string
          id: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          district_id: string
          id?: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          district_id?: string
          id?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "traditional_authorities_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_surveys: {
        Row: {
          adult_count: number | null
          buy_charcoal: boolean | null
          ccm_image_path: string | null
          ccm_in_use: boolean
          ccm_training_received: boolean | null
          ccm_warm: boolean | null
          charcoal_spending_weekly: number | null
          child_count: number | null
          consent_given: boolean
          cooking_frequency: string | null
          cooking_hours: string | null
          created_at: string
          dry_season_fuel_location: string | null
          enough_fuel: boolean | null
          gps_accuracy: number | null
          householder_id: string
          id: string
          is_main_cook: boolean | null
          location: unknown
          main_income_source: string | null
          maintenance_types: string[] | null
          no_usage_reason: string | null
          not_enough_fuel_reason: string | null
          only_cookstove_in_use: boolean | null
          other_cooking_methods_signs: boolean | null
          other_stove_image_path: string | null
          other_stoves_present: boolean | null
          phone_number: string | null
          regular_maintenance: boolean | null
          respondent_gender: Database["public"]["Enums"]["gender"] | null
          staff_id: string
          survey_date: string
          usage_signs: boolean | null
          wet_season_fuel_location: string | null
          wood_collection_hours: number | null
          wood_collection_method: string | null
          wood_spending_weekly: number | null
        }
        Insert: {
          adult_count?: number | null
          buy_charcoal?: boolean | null
          ccm_image_path?: string | null
          ccm_in_use: boolean
          ccm_training_received?: boolean | null
          ccm_warm?: boolean | null
          charcoal_spending_weekly?: number | null
          child_count?: number | null
          consent_given?: boolean
          cooking_frequency?: string | null
          cooking_hours?: string | null
          created_at?: string
          dry_season_fuel_location?: string | null
          enough_fuel?: boolean | null
          gps_accuracy?: number | null
          householder_id: string
          id?: string
          is_main_cook?: boolean | null
          location?: unknown
          main_income_source?: string | null
          maintenance_types?: string[] | null
          no_usage_reason?: string | null
          not_enough_fuel_reason?: string | null
          only_cookstove_in_use?: boolean | null
          other_cooking_methods_signs?: boolean | null
          other_stove_image_path?: string | null
          other_stoves_present?: boolean | null
          phone_number?: string | null
          regular_maintenance?: boolean | null
          respondent_gender?: Database["public"]["Enums"]["gender"] | null
          staff_id: string
          survey_date?: string
          usage_signs?: boolean | null
          wet_season_fuel_location?: string | null
          wood_collection_hours?: number | null
          wood_collection_method?: string | null
          wood_spending_weekly?: number | null
        }
        Update: {
          adult_count?: number | null
          buy_charcoal?: boolean | null
          ccm_image_path?: string | null
          ccm_in_use?: boolean
          ccm_training_received?: boolean | null
          ccm_warm?: boolean | null
          charcoal_spending_weekly?: number | null
          child_count?: number | null
          consent_given?: boolean
          cooking_frequency?: string | null
          cooking_hours?: string | null
          created_at?: string
          dry_season_fuel_location?: string | null
          enough_fuel?: boolean | null
          gps_accuracy?: number | null
          householder_id?: string
          id?: string
          is_main_cook?: boolean | null
          location?: unknown
          main_income_source?: string | null
          maintenance_types?: string[] | null
          no_usage_reason?: string | null
          not_enough_fuel_reason?: string | null
          only_cookstove_in_use?: boolean | null
          other_cooking_methods_signs?: boolean | null
          other_stove_image_path?: string | null
          other_stoves_present?: boolean | null
          phone_number?: string | null
          regular_maintenance?: boolean | null
          respondent_gender?: Database["public"]["Enums"]["gender"] | null
          staff_id?: string
          survey_date?: string
          usage_signs?: boolean | null
          wet_season_fuel_location?: string | null
          wood_collection_hours?: number | null
          wood_collection_method?: string | null
          wood_spending_weekly?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_surveys_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "householders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_surveys_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "v_householder_stove_usage"
            referencedColumns: ["householder_id"]
          },
          {
            foreignKeyName: "usage_surveys_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "v_householders_with_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_surveys_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_surveys_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "usage_surveys_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      vpa_areas: {
        Row: {
          code: string
          created_at: string
          district_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          district_id: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          district_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vpa_areas_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown
          f_table_catalog: unknown
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown
          f_table_catalog: string | null
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      v_cv_inspection_stats: {
        Row: {
          cv_area_id: string | null
          cv_area_name: string | null
          green_count: number | null
          red_count: number | null
          staff_id: string | null
          staff_name: string | null
          total_householders: number | null
          uninspected_count: number | null
          yellow_count: number | null
        }
        Relationships: []
      }
      v_householder_stove_usage: {
        Row: {
          first_name: string | null
          frequency: Database["public"]["Enums"]["usage_frequency"] | null
          householder_id: string | null
          last_name: string | null
          notes: string | null
          season: Database["public"]["Enums"]["season"] | null
          stove_type: Database["public"]["Enums"]["stove_type"] | null
          survey_date: string | null
          survey_id: string | null
        }
        Relationships: []
      }
      v_householders_with_areas: {
        Row: {
          archive_notes: string | null
          archive_reason: Database["public"]["Enums"]["archive_reason"] | null
          archived_at: string | null
          archived_by_id: string | null
          carbon_rights_explained: boolean | null
          ccm_explained: boolean | null
          ccm_image_path: string | null
          chief_id: string | null
          chief_name: string | null
          coordinator_area_name: string | null
          created_at: string | null
          cv_area_id: string | null
          cv_area_name: string | null
          district_name: string | null
          family_count: number | null
          first_name: string | null
          gps_accuracy: number | null
          has_kitchen: boolean | null
          house_ownership: Database["public"]["Enums"]["house_ownership"] | null
          id: string | null
          inspection_status:
            | Database["public"]["Enums"]["inspection_color"]
            | null
          is_archived: boolean | null
          is_verified: boolean | null
          kitchen_image_path: string | null
          kitchen_rainproof: boolean | null
          kitchen_well_ventilated: boolean | null
          landlord_name: string | null
          last_ccm_condition:
            | Database["public"]["Enums"]["ccm_condition"]
            | null
          last_ccm_in_use: boolean | null
          last_inspection_by_id: string | null
          last_inspection_date: string | null
          last_known_gps_accuracy: number | null
          last_known_location: unknown
          last_name: string | null
          latitude: number | null
          lcv_area_name: string | null
          legacy_address: string | null
          legacy_id: number | null
          location: unknown
          longitude: number | null
          middle_name: string | null
          stove_build_date: string | null
          stove_type: Database["public"]["Enums"]["stove_type"] | null
          ta_name: string | null
          updated_at: string | null
          verified_date: string | null
          vpa_area_name: string | null
          wood_buy: Database["public"]["Enums"]["wood_purchase"] | null
          wood_collection_hours: number | null
        }
        Relationships: [
          {
            foreignKeyName: "householders_archived_by_id_fkey"
            columns: ["archived_by_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_archived_by_id_fkey"
            columns: ["archived_by_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "householders_archived_by_id_fkey"
            columns: ["archived_by_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_chief_id_fkey"
            columns: ["chief_id"]
            isOneToOne: false
            referencedRelation: "chiefs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "cv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["cv_area_id"]
          },
          {
            foreignKeyName: "householders_last_inspection_by_id_fkey"
            columns: ["last_inspection_by_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "householders_last_inspection_by_id_fkey"
            columns: ["last_inspection_by_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["staff_id"]
          },
          {
            foreignKeyName: "householders_last_inspection_by_id_fkey"
            columns: ["last_inspection_by_id"]
            isOneToOne: false
            referencedRelation: "v_staff_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      v_seasonal_stove_comparison: {
        Row: {
          dry_season_frequency:
            | Database["public"]["Enums"]["usage_frequency"]
            | null
          householder_id: string | null
          stove_type: Database["public"]["Enums"]["stove_type"] | null
          survey_date: string | null
          survey_id: string | null
          wet_season_frequency:
            | Database["public"]["Enums"]["usage_frequency"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_surveys_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "householders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_surveys_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "v_householder_stove_usage"
            referencedColumns: ["householder_id"]
          },
          {
            foreignKeyName: "usage_surveys_householder_id_fkey"
            columns: ["householder_id"]
            isOneToOne: false
            referencedRelation: "v_householders_with_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      v_staff_with_areas: {
        Row: {
          area_code: string | null
          area_name: string | null
          coordinator_area_id: string | null
          created_at: string | null
          cv_area_id: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: string | null
          is_active: boolean | null
          lcv_area_id: string | null
          leave_date: string | null
          name: string | null
          phone: string | null
          position: Database["public"]["Enums"]["staff_position"] | null
          start_date: string | null
          updated_at: string | null
          vpa_area_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_coordinator_area_id_fkey"
            columns: ["coordinator_area_id"]
            isOneToOne: false
            referencedRelation: "coordinator_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "cv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_cv_area_id_fkey"
            columns: ["cv_area_id"]
            isOneToOne: false
            referencedRelation: "v_cv_inspection_stats"
            referencedColumns: ["cv_area_id"]
          },
          {
            foreignKeyName: "staff_lcv_area_id_fkey"
            columns: ["lcv_area_id"]
            isOneToOne: false
            referencedRelation: "lcv_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_vpa_area_id_fkey"
            columns: ["vpa_area_id"]
            isOneToOne: false
            referencedRelation: "vpa_areas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: { Args: never; Returns: string }
      _postgis_scripts_pgsql_version: { Args: never; Returns: string }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _postgis_stats: {
        Args: { ""?: string; att_name: string; tbl: unknown }
        Returns: string
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_sortablehash: { Args: { geom: unknown }; Returns: number }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      addauth: { Args: { "": string }; Returns: boolean }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
      broadcast_project_summary: {
        Args: {
          payload_data: Json
          payload_table: string
          payload_year: number
        }
        Returns: undefined
      }
      compute_inspection_status: {
        Args: { last_inspection: string }
        Returns: Database["public"]["Enums"]["inspection_color"]
      }
      disablelongtransactions: { Args: never; Returns: string }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { column_name: string; table_name: string }; Returns: string }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { schema_name: string; table_name: string }; Returns: string }
        | { Args: { table_name: string }; Returns: string }
      enablelongtransactions: { Args: never; Returns: string }
      equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      geometry: { Args: { "": string }; Returns: unknown }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geomfromewkt: { Args: { "": string }; Returns: unknown }
      get_active_stoves_count: {
        Args: { p_year: string }
        Returns: {
          active_stoves: number
          total_stoves: number
        }[]
      }
      get_ccms_in_use_count: { Args: { year_param: number }; Returns: number }
      get_condition_good_count: {
        Args: { year_param: number }
        Returns: number
      }
      get_household_stats: {
        Args: { p_year: string }
        Returns: {
          active_households: number
          total_households: number
        }[]
      }
      get_inspected_0_to_3_months_count: {
        Args: { year_param: number }
        Returns: number
      }
      get_inspected_3_to_6_months_count: {
        Args: { year_param: number }
        Returns: number
      }
      get_inspected_over_6_months_count: {
        Args: { year_param: number }
        Returns: number
      }
      get_inspection_stats: {
        Args: { p_year: string }
        Returns: {
          inspections_this_month: number
          inspections_this_year: number
        }[]
      }
      get_rain_protected_count: {
        Args: { year_param: number }
        Returns: number
      }
      get_staff_householder_stats: {
        Args: { staff_uuid: string }
        Returns: {
          green_count: number
          red_count: number
          total_count: number
          uninspected_count: number
          yellow_count: number
        }[]
      }
      get_staff_householders: {
        Args: { staff_uuid: string }
        Returns: {
          archive_notes: string | null
          archive_reason: Database["public"]["Enums"]["archive_reason"] | null
          archived_at: string | null
          archived_by_id: string | null
          carbon_rights_explained: boolean | null
          ccm_explained: boolean | null
          ccm_image_path: string | null
          chief_id: string
          created_at: string
          cv_area_id: string
          family_count: number | null
          first_name: string
          gps_accuracy: number | null
          has_kitchen: boolean | null
          house_ownership: Database["public"]["Enums"]["house_ownership"] | null
          id: string
          is_archived: boolean | null
          is_verified: boolean | null
          kitchen_image_path: string | null
          kitchen_rainproof: boolean | null
          kitchen_well_ventilated: boolean | null
          landlord_name: string | null
          last_ccm_condition:
            | Database["public"]["Enums"]["ccm_condition"]
            | null
          last_ccm_in_use: boolean | null
          last_inspection_by_id: string | null
          last_inspection_date: string | null
          last_known_gps_accuracy: number | null
          last_known_location: unknown
          last_name: string | null
          legacy_address: string | null
          legacy_id: number | null
          location: unknown
          middle_name: string | null
          stove_build_date: string | null
          stove_type: Database["public"]["Enums"]["stove_type"] | null
          updated_at: string
          verified_date: string | null
          wood_buy: Database["public"]["Enums"]["wood_purchase"] | null
          wood_collection_hours: number | null
        }[]
        SetofOptions: {
          from: "*"
          to: "householders"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_staff_stats: {
        Args: { p_year: string }
        Returns: {
          active_staff: number
          total_staff: number
        }[]
      }
      get_stove_years: {
        Args: never
        Returns: {
          newest_year: number
          oldest_year: number
        }[]
      }
      get_total_kitchens: { Args: { year_param: number }; Returns: number }
      get_well_ventilated_count: {
        Args: { year_param: number }
        Returns: number
      }
      gettransactionid: { Args: never; Returns: unknown }
      longtransactionsenabled: { Args: never; Returns: boolean }
      populate_geometry_columns:
        | { Args: { tbl_oid: unknown; use_typmod?: boolean }; Returns: number }
        | { Args: { use_typmod?: boolean }; Returns: string }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_extensions_upgrade: { Args: never; Returns: string }
      postgis_full_version: { Args: never; Returns: string }
      postgis_geos_version: { Args: never; Returns: string }
      postgis_lib_build_date: { Args: never; Returns: string }
      postgis_lib_revision: { Args: never; Returns: string }
      postgis_lib_version: { Args: never; Returns: string }
      postgis_libjson_version: { Args: never; Returns: string }
      postgis_liblwgeom_version: { Args: never; Returns: string }
      postgis_libprotobuf_version: { Args: never; Returns: string }
      postgis_libxml_version: { Args: never; Returns: string }
      postgis_proj_version: { Args: never; Returns: string }
      postgis_scripts_build_date: { Args: never; Returns: string }
      postgis_scripts_installed: { Args: never; Returns: string }
      postgis_scripts_released: { Args: never; Returns: string }
      postgis_svn_version: { Args: never; Returns: string }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_version: { Args: never; Returns: string }
      postgis_wagyu_version: { Args: never; Returns: string }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | { Args: { line1: unknown; line2: unknown }; Returns: number }
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
            Returns: number
          }
      st_area:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkt: { Args: { "": string }; Returns: string }
      st_asgeojson:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_asgml:
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
      st_askml:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: { Args: { format?: string; geom: unknown }; Returns: string }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_astext: { Args: { "": string }; Returns: string }
      st_astwkb:
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: number }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; options?: string; radius: number }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; quadsegs: number; radius: number }
            Returns: unknown
          }
      st_centroid: { Args: { "": string }; Returns: unknown }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collect: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_coorddim: { Args: { geometry: unknown }; Returns: number }
      st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_crosses: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
            Returns: number
          }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_distancesphere:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_expand:
        | { Args: { box: unknown; dx: number; dy: number }; Returns: unknown }
        | {
            Args: { box: unknown; dx: number; dy: number; dz?: number }
            Returns: unknown
          }
        | {
            Args: {
              dm?: number
              dx: number
              dy: number
              dz?: number
              geom: unknown
            }
            Returns: unknown
          }
      st_force3d: { Args: { geom: unknown; zvalue?: number }; Returns: unknown }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_generatepoints:
        | { Args: { area: unknown; npoints: number }; Returns: unknown }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: { Args: { "": string }; Returns: unknown }
      st_geographyfromtext: { Args: { "": string }; Returns: unknown }
      st_geohash:
        | { Args: { geog: unknown; maxchars?: number }; Returns: string }
        | { Args: { geom: unknown; maxchars?: number }; Returns: string }
      st_geomcollfromtext: { Args: { "": string }; Returns: unknown }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: { Args: { "": string }; Returns: unknown }
      st_geomfromewkt: { Args: { "": string }; Returns: unknown }
      st_geomfromgeojson:
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": string }; Returns: unknown }
      st_geomfromgml: { Args: { "": string }; Returns: unknown }
      st_geomfromkml: { Args: { "": string }; Returns: unknown }
      st_geomfrommarc21: { Args: { marc21xml: string }; Returns: unknown }
      st_geomfromtext: { Args: { "": string }; Returns: unknown }
      st_gmltosql: { Args: { "": string }; Returns: unknown }
      st_hasarc: { Args: { geometry: unknown }; Returns: boolean }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
        SetofOptions: {
          from: "*"
          to: "valid_detail"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      st_length:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_letters: { Args: { font?: Json; letters: string }; Returns: unknown }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefromtext: { Args: { "": string }; Returns: unknown }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linetocurve: { Args: { geometry: unknown }; Returns: unknown }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_mlinefromtext: { Args: { "": string }; Returns: unknown }
      st_mpointfromtext: { Args: { "": string }; Returns: unknown }
      st_mpolyfromtext: { Args: { "": string }; Returns: unknown }
      st_multilinestringfromtext: { Args: { "": string }; Returns: unknown }
      st_multipointfromtext: { Args: { "": string }; Returns: unknown }
      st_multipolygonfromtext: { Args: { "": string }; Returns: unknown }
      st_node: { Args: { g: unknown }; Returns: unknown }
      st_normalize: { Args: { geom: unknown }; Returns: unknown }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_pointfromtext: { Args: { "": string }; Returns: unknown }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: { Args: { "": string }; Returns: unknown }
      st_polygonfromtext: { Args: { "": string }; Returns: unknown }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: { Args: { geom1: unknown; geom2: unknown }; Returns: string }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | { Args: { geog: unknown; srid: number }; Returns: unknown }
        | { Args: { geom: unknown; srid: number }; Returns: unknown }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_split: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | { Args: { geog: unknown }; Returns: number }
        | { Args: { geom: unknown }; Returns: number }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_transform:
        | {
            Args: { from_proj: string; geom: unknown; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { from_proj: string; geom: unknown; to_srid: number }
            Returns: unknown
          }
        | { Args: { geom: unknown; to_proj: string }; Returns: unknown }
      st_triangulatepolygon: { Args: { g1: unknown }; Returns: unknown }
      st_union:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_wkbtosql: { Args: { wkb: string }; Returns: unknown }
      st_wkttosql: { Args: { "": string }; Returns: unknown }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      unlockrows: { Args: { "": string }; Returns: number }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
    }
    Enums: {
      archive_reason:
        | "moved"
        | "deceased"
        | "duplicate"
        | "stove_destroyed"
        | "opted_out"
        | "other"
      ccm_condition: "good" | "needs_repair" | "damaged" | "replaced"
      gender: "male" | "female" | "other"
      house_ownership: "owned" | "rented" | "family"
      inspection_color: "green" | "yellow" | "red" | "uninspected"
      season: "dry" | "wet"
      staff_position:
        | "project_manager"
        | "district_manager"
        | "area_manager"
        | "coordinator"
        | "lead_community_volunteer"
        | "community_volunteer"
      stove_type:
        | "ccm"
        | "3_stone_fire"
        | "charcoal"
        | "mbaula"
        | "other_brick"
        | "metal"
        | "other"
      usage_frequency:
        | "daily"
        | "several_per_week"
        | "weekly"
        | "several_per_month"
        | "monthly"
        | "rarely"
        | "never"
      wood_purchase: "yes" | "no" | "sometimes"
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown
      }
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
      archive_reason: [
        "moved",
        "deceased",
        "duplicate",
        "stove_destroyed",
        "opted_out",
        "other",
      ],
      ccm_condition: ["good", "needs_repair", "damaged", "replaced"],
      gender: ["male", "female", "other"],
      house_ownership: ["owned", "rented", "family"],
      inspection_color: ["green", "yellow", "red", "uninspected"],
      season: ["dry", "wet"],
      staff_position: [
        "project_manager",
        "district_manager",
        "area_manager",
        "coordinator",
        "lead_community_volunteer",
        "community_volunteer",
      ],
      stove_type: [
        "ccm",
        "3_stone_fire",
        "charcoal",
        "mbaula",
        "other_brick",
        "metal",
        "other",
      ],
      usage_frequency: [
        "daily",
        "several_per_week",
        "weekly",
        "several_per_month",
        "monthly",
        "rarely",
        "never",
      ],
      wood_purchase: ["yes", "no", "sometimes"],
    },
  },
} as const
