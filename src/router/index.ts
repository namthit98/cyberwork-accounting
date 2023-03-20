import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/components/layouts/AppLayout.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'users',
          name: 'user',
          component: () => import('@/views/user/UserView.vue')
        },
        {
          path: 'setting',
          children: [
            {
              path: '',
              name: 'setting',
              component: () => import('@/views/setting/SettingView.vue')
            },
            {
              path: 'company-info',
              name: 'company-info',
              component: () => import('@/views/setting/CompanyInfoView.vue')
            },
            {
              path: 'organizations',
              children: [
                {
                  path: '',
                  name: 'organizations',
                  component: () =>
                    import('@/views/setting/OrganizationView.vue')
                },
                {
                  path: 'create',
                  name: 'create-organization',
                  meta: { view: 'create' },
                  component: () =>
                    import('@/views/setting/OrganizationView.vue')
                }
              ]
            },
            {
              path: 'roles',
              name: 'roles',
              component: () => import('@/views/setting/RoleView.vue')
            },
            {
              path: 'users',
              name: 'users',
              component: () => import('@/views/setting/UserView.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
