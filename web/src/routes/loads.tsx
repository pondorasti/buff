import { createFileRoute, Link } from '@tanstack/react-router'
import { Fragment } from 'react'
import { loads } from '~/data'
import { ScreenHeader, Pad } from '~/components/ScreenHeader'

export const Route = createFileRoute('/loads')({
  component: Loads,
})

function Loads() {
  return (
    <>
      <ScreenHeader title="Load targets" tag="anchored @ 70 kg / 154 lb" />
      <Pad>
        <p className="mb-[18px] max-w-[640px] text-[14.5px] text-muted">
          These are <b className="text-txt">starting anchors for a lean beginner</b> — not rules. The real rule: pick a
          load where the <b className="text-txt">last 1–2 reps are genuinely hard</b> at the target reps. Then chase the
          3-month column with double progression (top of range → add weight → reset).
        </p>

        <div className="overflow-hidden rounded-card border border-line bg-panel">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Lift', 'Trains', 'Start', '3-mo target'].map((h, i) => (
                  <th
                    key={h}
                    className={
                      'bg-panel-2 px-[15px] py-3 text-[10.5px] font-bold uppercase tracking-[0.08em] text-dim ' +
                      (i >= 2 ? 'text-right' : 'text-left')
                    }
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loads.map((group) => (
                <Fragment key={group.title}>
                  <tr>
                    <td
                      colSpan={4}
                      className="border-b border-line bg-panel-2 px-[15px] py-[9px] text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-accent-2"
                    >
                      {group.title}
                    </td>
                  </tr>
                  {group.rows.map((r) => (
                    <tr
                      key={r.name}
                      className={
                        'relative border-b border-line last:border-0 ' +
                        (r.ex ? 'transition-colors duration-150 hover:bg-panel-2' : '')
                      }
                    >
                      <td className="px-[15px] py-3 text-[13.5px] font-semibold text-txt">
                        {r.ex ? (
                          <Link to="/exercise/$id" params={{ id: r.ex }} className="after:absolute after:inset-0">
                            {r.star ? <span className="text-accent">★ </span> : null}
                            {r.name}
                          </Link>
                        ) : (
                          <>
                            {r.star ? <span className="text-accent">★ </span> : null}
                            {r.name}
                          </>
                        )}
                      </td>
                      <td className="px-[15px] py-3 text-[12.5px] text-muted">{r.trains}</td>
                      <td className="whitespace-nowrap px-[15px] py-3 text-right text-[13.5px] font-bold tabular-nums text-accent">
                        {r.start}
                      </td>
                      <td className="whitespace-nowrap px-[15px] py-3 text-right text-[13.5px] font-bold tabular-nums text-accent">
                        {r.target}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-card border border-warn-line bg-warn-tint px-4 py-3.5">
          <b className="text-warn">How to scale to you</b>
          <p className="mt-[3px] text-[13px] text-muted">
            Heavier or lighter than 70 kg? Scale roughly in proportion — e.g. at 60 kg / 132 lb start ~15% lighter. The
            Olympic bar alone is <b className="text-txt">20 kg / 44 lb</b>, so barbell starts include the bar. Let the{' '}
            <b className="text-txt">last-1–2-reps-hard</b> rule decide the actual load.
          </p>
        </div>
        <div className="mt-[18px] rounded-xl border border-line bg-panel px-[15px] py-[13px] text-[12.5px] text-muted">
          Reminder: your gym's dumbbells cap at ~10 kg / 22 lb — for curls and incline press you'll hit that ceiling
          fast, so switch those to <b className="text-txt">cables</b> to keep loading past the DB limit.
        </div>
      </Pad>
    </>
  )
}
