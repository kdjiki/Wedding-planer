/**
 * Shared Database Client Configuration
 *
 * Ova datoteka koristi shared PostgreSQL klijent koji se koristi
 * u cijeloj aplikaciji kako bi se izbjegla "max clients reached" greška.
 *
 * Setup za Supabase + Next.js:
 * 1. Connection pooling je aktiviran preko DATABASE_URL - koristi .pooler.supabase.com
 * 2. PostgreSQL klijent je konfiguriran sa max: 1 za serverless okruženje
 * 3. Idle timeout je postavio na 30 sekundi za automatsku konekciju
 *
 * VAŽNO: Uvijek koristi ovaj shared client umjesto kreiranja novog!
 */

import { db } from "@/db";

export { db } from "@/db";

/**
 * Best Practices za korištenje baze podataka:
 *
 * ✅ DOBRO - Koristi shared client:
 * ```ts
 * import { db } from '@/lib/db'
 *
 * const ideas = await db.select().from(weddingIdeas)
 * ```
 *
 * ❌ LOŠE - Kreiranja novog clienta:
 * ```ts
 * import { createClient } from '@supabase/supabase-js'
 * const supabase = createClient(url, key) // Otvarao bi novu konekciju!
 * ```
 *
 *
 * Za Custom Supabase operacije (ako trebaju):
 *
 * Koristi shared Supabase client iz lib/supabaseClient:
 * ```ts
 * import { supabase } from '@/lib/supabaseClient'
 *
 * const { data } = await supabase.from('table').select('*')
 * ```
 */

export default db;
