export default function EmotionSelector({ defaultValue }: { defaultValue?: string }) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-ink/70">How did it feel?</p>
      <div className="flex flex-wrap gap-3">
        <input
          type="radio"
          name="procedure-emotion"
          value="confident"
          id="emotion-confident"
          className="peer/confident sr-only"
          defaultChecked={defaultValue === "confident"}
        />
        <label
          htmlFor="emotion-confident"
          className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink/70 transition peer-checked/confident:border-sage-600 peer-checked/confident:bg-sage-100 peer-checked/confident:text-sage-800"
        >
          Confident
        </label>

        <input
          type="radio"
          name="procedure-emotion"
          value="anxious"
          id="emotion-anxious"
          className="peer/anxious sr-only"
          defaultChecked={defaultValue === "anxious"}
        />
        <label
          htmlFor="emotion-anxious"
          className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink/70 transition peer-checked/anxious:border-amber-600 peer-checked/anxious:bg-amber-100 peer-checked/anxious:text-sage-800"
        >
          Anxious
        </label>

        <input
          type="radio"
          name="procedure-emotion"
          value="happy"
          id="emotion-happy"
          className="peer/happy sr-only"
          defaultChecked={defaultValue === "happy"}
        />
        <label
          htmlFor="emotion-happy"
          className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink/70 transition peer-checked/happy:border-sky-600 peer-checked/happy:bg-sky-100 peer-checked/happy:text-sky-800"
        >
          Happy
        </label>

        <input
          type="radio"
          name="procedure-emotion"
          value="overwhelmed"
          id="emotion-overwhelmed"
          className="peer/overwhelmed sr-only"
          defaultChecked={defaultValue === "overwhelmed"}
        />
        <label
          htmlFor="emotion-overwhelmed"
          className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink/70 transition peer-checked/overwhelmed:border-rose-600 peer-checked/overwhelmed:bg-rose-100 peer-checked/overwhelmed:text-rose-800"
        >
          Overwhelmed
        </label>
      </div>
    </div>
  );
}