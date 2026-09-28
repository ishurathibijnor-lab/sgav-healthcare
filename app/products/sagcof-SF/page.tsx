import Image from "next/image";

export default function SagcofSFPage() {
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
          <div className="flex min-h-[450px] items-center justify-center rounded-2xl bg-gray-50">
            <Image
              src="/sagcof-SF.jpeg"
              alt="Sagcof-SF"
              width={400}
              height={500}
              className="max-h-[450px] w-auto object-contain"
            />
          </div>

          {/* Product Information */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
              SGAV 
            </p>

            <h1 className="text-4xl font-bold text-gray-900">
              Sagcof-SF
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              Cough & Cold Syrup
            </p>

            {/* Composition */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Composition
              </h2>

              <div className="mt-3 rounded-xl bg-gray-50 p-5 text-gray-700">
                <p>
                  Each 5 ml contains:
                </p>

                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    Chlorpheniramine Maleate IP — 2 mg
                  </li>
                  <li>
                    Dextromethorphan Hydrobromide IP — 15 mg
                  </li>
                  <li>
                    Phenylephrine Hydrochloride IP — 5 mg
                  </li>
                  <li>
                    Flavoured Syrup Base — q.s.
                  </li>
                </ul>
              </div>
            </div>

            {/* Product Information */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Product Information
              </h2>

              <div className="mt-4 space-y-3 text-gray-700">

                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Product Name</span>
                  <span>Sagcof-SF</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Dosage Form</span>
                  <span>Syrup</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Pack Size</span>
                  <span>100 ml</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Dosage</span>
                  <span>As directed by physician</span>
                </div>

              </div>
            </div>

            {/* Warning */}
            <div className="mt-8 rounded-xl bg-yellow-50 p-5">
              <h2 className="font-semibold text-gray-900">
                Warning
              </h2>

              <p className="mt-2 text-gray-700">
                Not for children below 4 years.
              </p>
            </div>

            {/* Manufacturer */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Manufactured By
              </h2>

              <p className="mt-2 text-gray-700">
                Knox Life Sciences
                <br />
                Baddi, Distt. Solan, Himachal Pradesh
              </p>
            </div>

            {/* Marketed By */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Marketed By
              </h2>

              <p className="mt-2 text-gray-700">
                <strong>SGAV Healthcare Private Limited</strong>
                <br />
                House No. C/4, Roma Vihar Colony,
                <br />
                Sitapur-Jwalapur, Distt. Haridwar,
                <br />
                Uttarakhand – 249407
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}