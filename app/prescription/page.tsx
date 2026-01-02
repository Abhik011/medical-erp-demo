

export default function PrescriptionPage() {
  return (
    <>


    <div className="rounded-2xl bg-white p-6 shadow-soft shadow-[0_12px_32px_rgba(91,61,245,0.22)]
hover:shadow-[0_18px_45px_rgba(91,61,245,0.32)]
 transition-shadow
">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Prescription Validation
        </h2>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <label className="block text-sm mb-2">
            Upload Prescription
          </label>
          <input
            type="file"
            className="w-full mb-4 text-sm"
          />

          <label className="block text-sm mb-2">
            Doctor Name
          </label>
          <input
            className="w-full rounded-lg border p-2 mb-4 dark:bg-zinc-900"
            placeholder="Dr. Name"
          />

          <label className="block text-sm mb-2">
            Patient Name
          </label>
          <input
            className="w-full rounded-lg border p-2"
            placeholder="Patient Name"
          />

          <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
            ⚠ Schedule H medicine requires valid prescription
          </div>

          <button className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white">
            Validate Prescription
          </button>
        </div>
      </div>
    </>
  );
}
