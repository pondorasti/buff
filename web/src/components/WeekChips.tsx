import { Link } from '@tanstack/react-router'
import { week } from '~/data'

/** Weekday chips: Mon Push · Tue Pull · … Rest days are dimmed.
    Pass `activeSlug` (Routine page) to highlight the selected day. */
export function WeekChips({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {week.map((w) =>
        w.slug ? (
          <Link
            key={w.d}
            to="/routine/$day"
            params={{ day: w.slug }}
            className={
              'rounded-[10px] border px-[13px] py-[9px] text-[13px] ' +
              (w.slug === activeSlug
                ? 'border-accent bg-accent text-accent-fg'
                : 'border-line bg-panel text-muted hover:border-dim')
            }
          >
            <b className={w.slug === activeSlug ? 'text-accent-fg' : 'text-txt'}>{w.d}</b>{' '}
            <span className={'font-bold ' + (w.slug === activeSlug ? 'text-accent-fg' : 'text-accent')}>{w.name}</span>
          </Link>
        ) : (
          <div
            key={w.d}
            className="rounded-[10px] border border-line bg-panel px-[13px] py-[9px] text-[13px] text-muted opacity-60"
          >
            <b className="text-txt">{w.d}</b> Rest
          </div>
        ),
      )}
    </div>
  )
}
