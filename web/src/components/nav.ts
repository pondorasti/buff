import type { ComponentType, SVGProps } from 'react'
import { IconGrid, IconBarbell, IconGauge, IconBox } from './icons'

export interface NavItem {
  to: '/' | '/routine/$day' | '/loads' | '/equipment'
  params?: Record<string, string>
  label: string
  mobile: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  /** match pathname exactly (default: prefix match on `section` or `to`) */
  exact?: boolean
  /** pathname prefix that marks this item active */
  section?: string
}

/** Shared nav model for Sidebar (desktop) + TabBar (mobile). */
export const NAV: NavItem[] = [
  { to: '/', label: 'Overview', mobile: 'Home', icon: IconGrid, exact: true },
  { to: '/routine/$day', params: { day: 'push' }, label: 'Routine', mobile: 'Routine', icon: IconBarbell, section: '/routine' },
  { to: '/loads', label: 'Loads', mobile: 'Loads', icon: IconGauge },
  { to: '/equipment', label: 'Equipment', mobile: 'Gear', icon: IconBox, section: '/equipment' },
]

export const isActive = (n: NavItem, pathname: string): boolean =>
  n.exact ? pathname === n.to : pathname.startsWith(n.section ?? n.to)
