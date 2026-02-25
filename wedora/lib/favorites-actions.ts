import { supabase } from "@/lib/supabase"

// Funkcija za sinkronizaciju (dodavanje/brisanje)
export async function toggleFavoriteAction(serviceId: string, isAdding: boolean) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  if (!isAdding) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .match({ service_id: serviceId, user_id: user.id })
    return error ? null : false
  } else {
    const { error } = await supabase
      .from("favorites")
      .upsert(
        { service_id: serviceId, user_id: user.id },
        { onConflict: 'user_id,service_id' }
      )
    return error ? null : true
  }
}

// NOVA FUNKCIJA: Dohvaća sve ID-ove favorita korisnika
export async function fetchUserFavorites() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("favorites")
    .select("service_id")
    .eq("user_id", user.id)

  if (error) {
    console.error("Error fetching favorites:", error)
    return []
  }

  return data.map(f => f.service_id)
}