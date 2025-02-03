import Image from "next/image";
import Link from "next/link";
import AQIDisplay from "./components/AQIDisplay";

export default function Home() {
  return (
    <>
      <section className="relative bg-gray-900 text-white">
        <Image
          src="/hero.jpg"
          alt="Delhi, the world's most air polluted capital"
          fill
          className="object-cover object-center opacity-40"
          priority
          sizes="100vw"
        />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <AQIDisplay />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Clean Air for Delhi: Demand Action Now
            </h1>
            <p className="text-lg mb-8">
              Delhi is among the most polluted cities in the world. It's time to
              stand up for our right to clean air.
            </p>
            <Link
              href="/form"
              className="inline-block bg-[#f47704] text-white px-8 py-3 rounded-lg 
                       text-lg font-semibold hover:bg-[#f47704]/90 transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-[#f47704] focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Email Delhi CM
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why We Need Your Help
            </h2>
            <p className="text-gray-700 mb-8 text-center">
              For decades, we have waited for the government to act. Our lives
              are getting shorter, and yet there is no sense of urgency. It's
              time for citizens to demand action.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">
                Take action in 2 minutes
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f47704]" />
                  Answer a few questions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f47704]" />
                  Generate a customized email instantly
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f47704]" />
                  Review and submit your message
                </li>
              </ul>
            </div>
            <div className="text-center">
              <Link
                href="/form"
                className="inline-block bg-[#f47704] text-white px-8 py-3 rounded-lg 
                         text-lg font-semibold hover:bg-[#f47704]/90 transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-[#f47704] focus:ring-offset-2"
              >
                Email Delhi CM
              </Link>
              {/* <p className="mt-4 text-sm text-gray-600">
                Join X others who have already taken action
              </p> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
