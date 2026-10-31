// ── Public config response ──
export interface PublicConfig {
  eventTitle: string
  eventDescription: string
  currency: string
  basePrice: number
  deadline: string | null
  isOpen: boolean
  sizeChartImage: string | null
  serverTime: string
  sizes: SizeOption[]
  sleeveTypes: SleeveTypeOption[]
}

export interface SizeOption {
  id: number
  label: string
  surcharge: number
  sortOrder: number
}

export interface SleeveTypeOption {
  id: number
  label: string
  surcharge: number
  sortOrder: number
}

// ── Order item ──
export interface OrderItemData {
  id?: string
  shirtName: string
  sizeLabel: string
  sleeveLabel: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

// ── Order ──
export interface OrderData {
  id: string
  code: string
  customerName: string
  contact: string
  notes: string
  adminNotes: string
  status: string
  paymentStatus: string
  amountPaid: number
  totalPrice: number
  totalQuantity: number
  createdAt: string
  updatedAt: string
  items: OrderItemData[]
}

// ── Order list item (without items) ──
export interface OrderListItem {
  id: string
  code: string
  customerName: string
  contact: string
  itemsCount: number
  totalQuantity: number
  totalPrice: number
  status: string
  paymentStatus: string
  createdAt: string
}

// ── Paginated response ──
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ── Dashboard stats ──
export interface DashboardStats {
  totalOrders: number
  totalShirts: number
  totalRevenue: number
  paidAmount: number
  unpaidAmount: number
  shirtsBySize: { label: string; count: number }[]
  shirtsBySleeve: { label: string; count: number }[]
  ordersByDay: { date: string; count: number }[]
  recentOrders: OrderListItem[]
}

// ── Settings ──
export interface SettingsData {
  eventTitle: string
  eventDescription: string
  currency: string
  basePrice: number
  deadline: string | null
  isOpen: boolean
  sizeChartImage: string | null
  sizes: SizeSettingData[]
  sleeveTypes: SleeveTypeSettingData[]
}

export interface SizeSettingData {
  id: number
  label: string
  surcharge: number
  sortOrder: number
  isActive: boolean
}

export interface SleeveTypeSettingData {
  id: number
  label: string
  surcharge: number
  sortOrder: number
  isActive: boolean
}

// ── API error ──
export interface ApiError {
  statusCode: number
  message: string
  errors?: Record<string, string[]>
}

// ── Form shirt row (client-side) ──
export interface ShirtFormRow {
  _key: string
  shirtName: string
  sizeLabel: string
  sleeveLabel: string
  quantity: number
}

// ── Track response ──
export interface TrackResponse {
  order: OrderData
}

