<script setup lang="ts">
import { computed } from 'vue'
import type { DashboardStats } from '~/shared/types'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
})

useHead({
  title: 'Dashboard | Admin',
})

const { data: stats, status, refresh } = await useFetch<DashboardStats>('/api/admin/stats')

// Formatting helpers
const sizeLabels = computed(() => stats.value?.shirtsBySize.map((s) => s.label) || [])
const sizeCounts = computed(() => stats.value?.shirtsBySize.map((s) => s.count) || [])

const sleeveLabels = computed(() => stats.value?.shirtsBySleeve.map((s) => s.label) || [])
const sleeveCounts = computed(() => stats.value?.shirtsBySleeve.map((s) => s.count) || [])

const dayLabels = computed(() => stats.value?.ordersByDay.map((d) => d.date) || [])
const dayCounts = computed(() => stats.value?.ordersByDay.map((d) => d.count) || [])
</script>

<template>
  <div class="space-y-6">
    <!-- Header with Quick Refresh -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white">
          Overview & Analytics
        </h1>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Real-time summary of group shirt orders, inventory demand, and payments.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition"
          title="Refresh statistics"
          @click="() => refresh()"
        >
          <Icon name="lucide:refresh-cw" class="w-4 h-4" />
        </button>

        <NuxtLink to="/admin/orders">
          <BaseButton variant="primary" size="sm">
            <Icon name="lucide:list" class="w-4 h-4 mr-1.5" />
            <span>View All Orders</span>
          </BaseButton>
        </NuxtLink>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <BaseLoadingSkeleton v-for="i in 5" :key="i" type="card" :lines="2" />
    </div>

    <!-- Stat Cards Row -->
    <div v-else-if="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <AdminStatCard
        title="Total Orders"
        :value="stats.totalOrders"
        icon="lucide:shopping-bag"
        color="primary"
      />

      <AdminStatCard
        title="Total Shirts"
        :value="stats.totalShirts"
        icon="lucide:shirt"
        color="accent"
      />

      <AdminStatCard
        title="Total Revenue"
        :value="stats.totalRevenue"
        prefix="MYR "
        icon="lucide:dollar-sign"
        color="success"
      />

      <AdminStatCard
        title="Paid Amount"
        :value="stats.paidAmount"
        prefix="MYR "
        icon="lucide:check-circle"
        color="success"
      />

      <AdminStatCard
        title="Unpaid Balance"
        :value="stats.unpaidAmount"
        prefix="MYR "
        icon="lucide:alert-circle"
        color="warning"
      />
    </div>

    <!-- Charts Row -->
    <div v-if="stats" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Donut: Shirts by Size -->
      <div class="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft">
        <h3 class="font-heading font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon name="lucide:pie-chart" class="w-4 h-4 text-primary-500" />
          <span>Shirts by Size</span>
        </h3>
        <AdminChartDonut
          title="Demand by Size"
          :labels="sizeLabels"
          :data="sizeCounts"
        />
      </div>

      <!-- Donut: Shirts by Sleeve Type -->
      <div class="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft">
        <h3 class="font-heading font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon name="lucide:sparkles" class="w-4 h-4 text-violet" />
          <span>Shirts by Sleeve Type</span>
        </h3>
        <AdminChartDonut
          title="Demand by Sleeve"
          :labels="sleeveLabels"
          :data="sleeveCounts"
        />
      </div>

      <!-- Bar/Line: Orders by Day -->
      <div class="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft">
        <h3 class="font-heading font-bold text-sm text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Icon name="lucide:trending-up" class="w-4 h-4 text-emerald-500" />
          <span>Daily Order Volume</span>
        </h3>
        <AdminChartLine
          title="Orders per Day"
          :labels="dayLabels"
          :data="dayCounts"
        />
      </div>
    </div>

    <!-- Recent Orders List -->
    <div v-if="stats" class="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-soft p-5 sm:p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-heading font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="lucide:clock" class="w-4 h-4 text-primary-500" />
          <span>Recent Orders</span>
        </h3>

        <NuxtLink to="/admin/orders" class="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
          View all →
        </NuxtLink>
      </div>

      <div v-if="stats.recentOrders.length === 0" class="text-center py-8 text-gray-400 text-xs">
        No orders submitted yet.
      </div>

      <div v-else class="divide-y divide-gray-100 dark:divide-gray-700/50">
        <div
          v-for="o in stats.recentOrders"
          :key="o.id"
          class="py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div class="flex items-center gap-3">
            <span class="font-mono font-bold text-primary-600 dark:text-primary-400">
              {{ o.code }}
            </span>
            <span class="font-semibold text-gray-900 dark:text-white">
              {{ o.customerName }}
            </span>
            <span class="text-gray-400 text-[11px]">
              ({{ o.totalQuantity }} {{ o.totalQuantity === 1 ? 'shirt' : 'shirts' }})
            </span>
          </div>

          <div class="flex items-center gap-3">
            <BaseStatusBadge :status="o.status" type="order" />
            <BaseStatusBadge :status="o.paymentStatus" type="payment" />
            <span class="font-heading font-bold text-gray-900 dark:text-white">
              MYR {{ Number(o.totalPrice).toFixed(2) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

