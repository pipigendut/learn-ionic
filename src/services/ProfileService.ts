// src/services/profileService.ts
import { supabase } from '../supabaseClient';

export const getProfile = async (userUuid: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userUuid)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error fetching profile:', error.message);
    throw error;
  }
};

export const saveProfile = async (userUuid: string, profileData: { username?: string; avatar_url?: string }) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        { uid: userUuid, username: profileData.username, avatar_url: profileData.avatar_url }
      ]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error saving profile:', error.message);
    throw error;
  }
};

export const updateProfile = async (userUuid: string, profileData: { username?: string; avatar_url?: string }) => {
  try {
    debugger
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('uid', userUuid);

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error updating profile:', error.message);
    throw error;
  }
};