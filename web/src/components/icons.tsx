import { HugeiconsIcon, type HugeiconsIconProps } from '@hugeicons/react'
import {
  ArrowRight02Icon,
  DashboardSquare01Icon,
  Dumbbell01Icon,
  EquipmentGym01Icon,
  GaugeIcon,
} from '@hugeicons/core-free-icons'

type IconProps = Omit<HugeiconsIconProps, 'icon'>

const make =
  (icon: HugeiconsIconProps['icon']) =>
  (props: IconProps) => <HugeiconsIcon icon={icon} strokeWidth={1.9} {...props} />

/** Overview / home */
export const IconGrid = make(DashboardSquare01Icon)
/** Routine / training */
export const IconBarbell = make(Dumbbell01Icon)
/** Load targets */
export const IconGauge = make(GaugeIcon)
/** Equipment / gear */
export const IconBox = make(EquipmentGym01Icon)
/** CTA arrow */
export const IconArrow = make(ArrowRight02Icon)
