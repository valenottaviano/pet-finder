import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  return (
    <div className="font-sans min-h-screen">
      {/* Hero Section */}
      <div className="bg-yellow-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Never Lose Your Best Friend Again
              </h1>
              <p className="text-xl sm:text-2xl text-gray-800 mb-8 max-w-3xl">
                Protect your pets with smart QR codes and instantly connect with their finder. Your peace of mind is just a scan away.
              </p>
              <Link href="/auth/register">
                <Button className="bg-gray-900 text-white text-lg px-8 py-3 rounded-full hover:bg-gray-800">
                  Register Your Pet Today
                </Button>
              </Link>
            </div>
            <div className="order-first lg:order-last">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image
                  src="/images/foto_1.jpg"
                  alt="Happy person hugging their dog"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Smart QR Protection</h3>
              <p className="text-gray-600">
                Each pet gets a unique QR code tag. When scanned, it instantly connects finders with owners - no app required.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Live Location Tracking</h3>
              <p className="text-gray-600">
                See where your pet was last scanned. Get real-time notifications and location data to guide your search.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-gray-600">
                Join our community forum where neighbors help neighbors. Report found pets and help others reunite with their loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Connect with pet lovers in your area. Together, we create a safer community for our furry friends.
            </p>
          </div>
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-8">
            <Image
              src="/images/Community.jpg"
              alt="Pet owners community gathering"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Lost Pets In Your Area
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              View real-time locations of lost pets in your community. Each marker represents a pet waiting to be found and reunited with their family.
            </p>
          </div>
          <div className="w-full h-[600px] bg-gray-100 rounded-xl shadow-inner flex items-center justify-center">
            {/* Map component will be placed here */}
            <p className="text-gray-500 text-lg">Interactive map coming soon...</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Protect Your Pet?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of pet owners who sleep better knowing their pets are protected with Petfinder's smart tracking system.
          </p>
          <div className="space-x-4">
            <Link href="/auth/register">
              <Button className="bg-yellow-400 text-gray-900 text-lg px-8 py-3 rounded-full hover:bg-yellow-300">
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white text-lg px-8 py-3 rounded-full hover:bg-white hover:text-gray-900">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
