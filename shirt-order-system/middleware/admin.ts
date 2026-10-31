export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') {
    return
  }

  try {
    const { user } = await $fetch<{ user: { role: string; username: string } }>('/api/admin/me')
    if (!user || user.role !== 'admin') {
      return navigateTo('/admin/login')
    }
  } catch (err) {
    return navigateTo('/admin/login')
  }
})

