interface PerformanceTypeProps {
  defaultValue?: string
}

export default function PerformanceTypeSelector({ defaultValue = 'observed' }: PerformanceTypeProps) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-ink/70">Performance type</p>
      <div className="flex flex-wrap gap-3">

        <input
          type="radio"
          name="procedure-performanceType"
          value="independent"
          id="performance-independent"
          className="peer/independent sr-only"
          defaultChecked={defaultValue === 'independent'}
        />
        <label
          htmlFor="performance-independent"
          className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink/70 transition peer-checked/independent:border-sage-600 peer-checked/independent:bg-sage-100 peer-checked/independent:text-sage-800"
        >
          Independent
        </label>

        <input
          type="radio"
          name="procedure-performanceType"
          value="assisted"
          id="performance-assisted"
          className="peer/assisted sr-only"
          defaultChecked={defaultValue === 'assisted'}
        />
        <label
          htmlFor="performance-assisted"
          className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink/70 transition peer-checked/assisted:border-sage-600 peer-checked/assisted:bg-sage-100 peer-checked/assisted:text-sage-800"
        >
          Assisted
        </label>

        <input
          type="radio"
          name="procedure-performanceType"
          value="observed"
          id="performance-observed"
          className="peer/observed sr-only"
          defaultChecked={defaultValue === 'observed'}
        />
        <label
          htmlFor="performance-observed"
          className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink/70 transition peer-checked/observed:border-sage-600 peer-checked/observed:bg-sage-100 peer-checked/observed:text-sage-800"
        >
          Observed
        </label>

      </div>
    </div>
  )
}