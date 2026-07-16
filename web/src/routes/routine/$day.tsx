import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { days, getDayBySlug } from '~/data'
import { ScreenHeader, Pad } from '~/components/ScreenHeader'
import { ExerciseTable } from '~/components/ExerciseTable'

export const Route = createFileRoute('/routine/$day')({
  loader: ({ params }) => {
    const day = getDayBySlug(params.day)
    if (!day) throw notFound()
    return { day }
  },
  component: RoutineDay,
})

function RoutineDay() {
  const { day } = Route.useLoaderData()
  return (
    <>
      <ScreenHeader title="Routine" tag="~60 min / session" />
      <Pad>
        <p className="mb-[18px] max-w-[640px] text-[14.5px] text-muted">
          Stop each set <b className="text-txt">1–2 reps short of failure</b>. Control the lowering (~2–3 sec).{' '}
          <span className="text-accent">★</span> = weak-point priority (delts &amp; upper back = the “built” look,
          fastest).
        </p>

        <div className="mb-4 flex gap-[7px] overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none]">
          {days.map((d) => {
            const active = d.slug === day.slug
            return (
              <Link
                key={d.slug}
                to="/routine/$day"
                params={{ day: d.slug }}
                className={
                  'flex flex-none flex-col gap-px rounded-[11px] border px-3.5 py-[9px] text-[13.5px] font-semibold ' +
                  (active
                    ? 'border-accent bg-accent text-accent-fg'
                    : 'border-line bg-panel text-muted hover:border-dim hover:text-txt')
                }
              >
                <span>{d.name}</span>
                <small className={'text-[10px] font-semibold tracking-[0.03em] ' + (active ? 'opacity-60' : 'text-dim')}>
                  {d.focus}
                </small>
              </Link>
            )
          })}
        </div>

        <div className="mx-0.5 mb-3 flex gap-3.5 text-[12.5px] text-muted">
          <span>
            ~<b className="text-txt">{day.sets} sets</b>
          </span>
          <span>
            ~<b className="text-txt">{day.time}</b>
          </span>
        </div>

        <ExerciseTable items={day.items} />

        <div className="mt-4 rounded-card border border-warn-line bg-warn-tint px-4 py-3.5">
          <b className="text-warn">Freedom Rack = your new anchor</b>
          <p className="mt-[3px] text-[13px] text-muted">
            Each day now opens with a barbell compound on the Freedom Rack — the best single driver for size and
            strength. Dumbbells still cap at ~<b className="text-txt">11 kg / 25 lb</b>, so keep curls and incline work
            on cables or the barbell.
          </p>
        </div>
      </Pad>
    </>
  )
}
