// server/api/faq.ts
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {

  const client = await serverSupabaseClient(event)

  const query = getQuery(event)
  const slug = query.slug


  if (slug) {
    const { data, error } = await client
      .from('faq')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      return { success: false, error: error.message, data: null }
    }

    return { success: true, data }
  }

  const { data, error } = await client
    .from('faq')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    return { success: false, error: error.message, data: [] }
  }

  return { success: true, data }
})