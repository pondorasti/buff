import { createFileRoute, Link } from '@tanstack/react-router'
import { ScreenHeader, Pad, BlockTitle } from '~/components/ScreenHeader'
import { IconArrow } from '~/components/icons'

export const Route = createFileRoute('/')({
  component: Overview,
})

const LEVERS = [
  { kv: 'Calories', stat: '+300–500', p: 'kcal/day over maintenance.' },
  { kv: 'Protein', stat: '1.8–2.2', p: 'g/kg (≈ 0.8–1 g/lb).' },
  { kv: 'Sleep', stat: '7–9 h', p: 'Where growth happens.' },
  { kv: 'Creatine', stat: '5 g', p: 'per day, any time.' },
]

const WEEK: { d: string; day?: string; slug?: string }[] = [
  { d: 'Mon', day: 'Push', slug: 'push' },
  { d: 'Tue', day: 'Pull', slug: 'pull' },
  { d: 'Wed', day: 'Legs', slug: 'legs' },
  { d: 'Thu' },
  { d: 'Fri', day: 'Upper', slug: 'upper' },
  { d: 'Sat', day: 'Lower+', slug: 'lower-plus' },
  { d: 'Sun' },
]

function Overview() {
  return (
    <>
      <ScreenHeader title="Overview" tag="lean-bulk phase" />
      <Pad>
        <div className="mb-[18px] rounded-[20px] border border-line bg-panel px-[22px] pt-[22px] pb-5">
          <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent">The Mission</div>
          <h2 className="my-2 text-[clamp(24px,4.5vw,34px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
            From lean → <em className="not-italic text-accent">lean &amp; built.</em>
          </h2>
          <p className="max-w-[600px] text-[14.5px] text-muted">
            You're already low body fat. The gap to the goal physique is <b className="text-txt">muscle</b>, not fat
            loss. Train hard 5×/week, eat in a surplus, sleep. Everything here is mapped to your gym's actual machines.
          </p>
          <Link
            to="/routine/$day"
            params={{ day: 'push' }}
            className="mt-4 inline-flex items-center gap-2 rounded-[11px] bg-accent px-4 py-[11px] text-sm font-bold text-accent-fg"
          >
            <IconArrow className="h-4 w-4" /> Open today's routine
          </Link>
        </div>

        <BlockTitle>The four levers</BlockTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LEVERS.map((l) => (
            <div key={l.kv} className="rounded-card border border-line bg-panel p-4">
              <div className="mb-[5px] text-[11px] uppercase tracking-[0.08em] text-dim">{l.kv}</div>
              <div className="text-[25px] font-extrabold tracking-[-0.02em] text-accent">{l.stat}</div>
              <p className="text-[13.5px] text-muted">{l.p}</p>
            </div>
          ))}
        </div>

        <BlockTitle>Your week</BlockTitle>
        <div className="flex flex-wrap gap-2">
          {WEEK.map((w) =>
            w.slug ? (
              <Link
                key={w.d}
                to="/routine/$day"
                params={{ day: w.slug }}
                className="rounded-[10px] border border-line bg-panel px-[13px] py-[9px] text-[13px] text-muted hover:border-dim"
              >
                <b className="text-txt">{w.d}</b> <span className="font-bold text-accent">{w.day}</span>
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
      </Pad>
    </>
  )
}
