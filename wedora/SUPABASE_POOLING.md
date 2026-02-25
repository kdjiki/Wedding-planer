# Supabase + Next.js Connection Pooling - Konfiguracija

## Problem: "Max Clients Reached"

Ako koristiš serverless funkcije (npr. Vercel), svaka instanca otvara novu PostgreSQL konekciju. Free tier Supabase-a ima limit od **20 konekcija**, što se brzo popuni, izazivajući grešku:

```
Error: too many connections for role "postgres"
```

## Rješenje: Connection Pooling + Shared Client

### 1. ✅ Connection Pooling je AKTIVIRAN

Tvoj `DATABASE_URL` koristi `.pooler.supabase.com` što znači:

```
postgresql://postgres.sxutxqfwyxzlgsnvonvr:***@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
                                                                    ^^^^^^^ - Connection pooler!
```

To je već pravilno konfiguriranu! Supabase automatski koristi PgBouncer za connection pooling.

### 2. ✅ PostgreSQL Klijent je OPTIMIZIRAN

U [db/index.ts](db/index.ts):

```typescript
const client = postgres(process.env.DATABASE_URL!, {
  max: 1, // Samo 1 konekcija po serverless instanci
  idle_timeout: 30, // Zatvori konekciju nakon 30 sekundi
  connect_timeout: 10, // Timeout za novu konekciju
  prepare: false, // Disable prepared statements zbog poolinga
});
```

### 3. ✅ Shared Client umjesto novog svakim upitom

**DOBRO** - Koristi shared client iz `db/index.ts`:

```ts
import { db } from '@/db'

export default async function IdeasPage() {
  const ideas = await db.select().from(weddingIdeas)
  return <IdeasContent initialIdeas={ideas} />
}
```

**LOŠE** - Kreiranja novog clienta (NE RADI):

```ts
// ❌ Ovo otvarao bi novu konekciju i dovolo do "max clients reached"!
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url, key);
const ideas = await supabase.from("wedding_ideas").select("*");
```

## Gdje koristiti Shared Client

### Za Database operacije - koristi Drizzle ORM:

```ts
import { db } from "@/db";
import { weddingIdeas } from "@/db/schema";

// ✅ Ovo je ispravno
const ideas = await db.select().from(weddingIdeas);
```

### Za Custom Supabase operacije - koristi shared client:

```ts
import { supabase } from "@/lib/supabaseClient";

// ✅ Ovo je ispravno - koristi shared client
const { data } = await supabase.from("table").select("*");
```

## Environment Varijable

Trebam osigurati da `.env` ima:

```env
# Supabase - Connection Pooler (obavezno!)
DATABASE_URL=postgresql://...@aws-1-eu-west-1.pooler.supabase.com:5432/postgres

# Supabase - Public varijable
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxx
```

## Monitoring U Supabase Dashboarda

1. Otvori **Supabase Dashboard**
2. Idi na **Database → Connection Pooling**
3. Provjeri da je **Pool Mode** aktivna
4. Vidi broj aktivnih konekcija

## Lokalni dev (ako trebas testirati)

Development server može koristiti direktnu konekciju ako trebam debug:

```env
# Za development - direktna konekcija (manje brza, ali lakše debugirati)
DATABASE_URL=postgresql://...@aws-1-eu-west-1.postgres.supabase.com:5432/postgres

# Za production/Vercel - pooler konekcija
DATABASE_URL=postgresql://...@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
```

## Implemented Files

- ✅ [db/index.ts](db/index.ts) - Shared PostgreSQL client sa pooling konfiguracijom
- ✅ [lib/supabaseClient.ts](lib/supabaseClient.ts) - Shared Supabase client
- ✅ [lib/db.ts](lib/db.ts) - Best practices dokumentacija

## Rezultat

- ✅ Nema više "max clients reached" greške
- ✅ Konekcije se automatski dijele kroz pool
- ✅ Serverless funkcije używају samo 1 konekciju
- ✅ Idle konekcije se automatski zatvaraju
