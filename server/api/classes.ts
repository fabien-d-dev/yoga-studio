// server/api/classes.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: yogaClasses, error } = await client
    .from('classes')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur Supabase: ${error.message}`
    })
  }

  return {
    success: true,
    data: yogaClasses
  }
})