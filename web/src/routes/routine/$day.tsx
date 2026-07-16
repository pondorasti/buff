import { createFileRoute, notFound } from '@tanstack/react-router'
import { getDayBySlug } from '~/data'
import { ScreenHeader, Pad } from '~/components/ScreenHeader'
import { ExerciseTable } from '~/components/ExerciseTable'
import { WeekChips } from '~/components/WeekChips'

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

        <div className="mb-4">
          <WeekChips activeSlug={day.slug} />
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
