import Image from "next/image";
export default function SaglivPage() {
  
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <a
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Back to Home
        </a>

        <div className="mt-8 grid gap-10 md:grid-cols-2">

          {/* Product Image */}
          <div className="flex min-h-[450px] items-center justify-center rounded-2xl bg-gray-50 p-8">
            <Image
              src="/sagliv.jpeg"
              alt="Sagliv"
              width={400}
              height={500}
              className="max-h-[450px] w-auto object-contain"
            />
          </div>

          {/* Product Information */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              SGAV
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Sagliv
            </h1>

            <p className="mt-4 text-gray-600">
              Liver-support nutritional formulation in a flavoured
              suspension.
            </p>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Composition
              </h2>

              <p className="mt-2 text-gray-700">
                Each 5 ml contains:
              </p>

              <div className="mt-4 overflow-hidden rounded-xl border">
                <ul className="divide-y text-sm text-gray-900">
                  <li className="p-3">L-Ornithine-L-Aspartate — 75 mg</li>
                  <li className="p-3">Lecithin — 125 mg</li>
                  <li className="p-3">Choline Citrate — 125 mg</li>
                  <li className="p-3">Silymarin — 35 mg</li>
                  <li className="p-3">Nicotinamide — 15 mg</li>
                  <li className="p-3">D-Panthenol — 2.5 mg</li>
                  <li className="p-3">Vitamin B1 — 1.8 mg</li>
                  <li className="p-3">Vitamin B2 — 2.5 mg</li>
                  <li className="p-3">Vitamin B6 — 2.4 mg</li>
                  <li className="p-3">Vitamin B12 — 2.5 mcg</li>
                  <li className="p-3">Folic Acid — 75 mcg</li>
                  <li className="p-3">Biotin — 5 mcg</li>
                  <li className="p-3">Vitamin A — 2500 IU</li>
                  <li className="p-3">Vitamin C — 60 mg</li>
                  <li className="p-3">Vitamin D2 — 400 IU</li>
                  <li className="p-3">Vitamin E — 15 IU</li>
                  <li className="p-3">Iodine — 150 mcg</li>
                  <li className="p-3">Zinc — 5 mg</li>
                  <li className="p-3">Magnesium — 50 mg</li>
                  <li className="p-3">Molybdenum — 45 mcg</li>
                  <li className="p-3">L-Lysine — 5000 mcg</li>
                  <li className="p-3">Makoy — 150 mg</li>
                </ul>
              </div>

              <div className="mt-8 rounded-xl bg-gray-50 p-5">
                <h2 className="text-xl font-bold text-gray-900">Product Information</h2>

                <p className="mt-3 text-gray-900">
                  Pack Size: 200 ml
                </p>

                <p className="mt-2 text-gray-900">
                  Flavoured sorbitol base: q.s.
                </p>

                <p className="mt-2 text-gray-900">
                  Dosage: As directed on the product label / by the
                  Dietician.
                </p>
                
           </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}