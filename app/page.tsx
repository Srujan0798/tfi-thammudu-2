import Link from 'next/link';
import { Calendar, Sparkles, Users, Link as LinkIcon, Zap, Film, Radio, Star, Ticket, PartyPopper } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
          <div className="text-center animate-fade-in">
            {/* Logo/Title */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Film className="w-16 h-16 text-yellow-400 animate-pulse-glow" />
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                TFI Calendar
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-4 font-semibold">
              Your Ultimate Telugu Film Industry Timeline
            </p>
            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Track every release, birthday, jayanti, and celebration. Connect with fellow fans.
              Never miss a TFI moment again! 🎬✨
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/calendar"
                className="group relative px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-yellow-500/50"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Open Calendar
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>

              <Link
                href="/explore"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-full border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Explore Creators
                </span>
              </Link>

              <Link
                href="/live"
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <Radio className="w-6 h-6 animate-pulse" />
                  TFI Live
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Everything TFI in One Place
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <Calendar className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Timeline View</h3>
              <p className="text-gray-400">
                Zoom from years to days. Mark movie releases, birthdays, jayantis, and audio launches.
                See the entire TFI history at a glance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Assistant</h3>
              <p className="text-gray-400">
                Chat with our TFI-loving AI! Get personalized suggestions, live news updates,
                and never forget important dates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <LinkIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Link Everything</h3>
              <p className="text-gray-400">
                Attach YouTube videos, Instagram posts, Twitter updates, Spotify songs,
                and BookMyShow tickets to any event.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Sync with Creators</h3>
              <p className="text-gray-400">
                Follow your favorite meme pages, fan clubs, and official accounts.
                Auto-sync their calendars to yours!
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Tag System</h3>
              <p className="text-gray-400">
                Filter by heroes (Pawan Kalyan, Prabhas, Mahesh Babu), directors, music directors,
                or any custom tags you create.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-red-500/10 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <Film className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Complete History</h3>
              <p className="text-gray-400">
                From Mahanati to modern blockbusters. From NTR&apos;s legacy to Prabhas&apos; global domination.
                Preserve every TFI moment.
              </p>
            </div>

            {/* Feature 7 - TFI Live */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
              <Link href="/live">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <Radio className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">TFI Live Mode</h3>
                <p className="text-gray-400">
                  Breaking news, trending hashtags, and live updates. Stay on top of every TFI development 24/7.
                </p>
              </Link>
            </div>

            {/* Feature 8 - Cinema Journey */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <Link href="/journey">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Cinema Journey</h3>
                <p className="text-gray-400">
                  Explore hero timelines from debut to blockbusters. Celebrate milestones and achievements.
                </p>
              </Link>
            </div>

            {/* Feature 9 - Re-releases */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <Link href="/rereleases">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Re-Release Tracker</h3>
                <p className="text-gray-400">
                  Find re-release shows near you. Book tickets for birthday specials and anniversary celebrations.
                </p>
              </Link>
            </div>

            {/* Feature 10 - Festival Releases */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105">
              <Link href="/festivals">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                  <PartyPopper className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Festival Releases</h3>
                <p className="text-gray-400">
                  Sankranti, Dasara, Summer clashes! Track competing releases with AI predictions.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Tags Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Your Favorite Heroes, All in One Timeline
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Pawan Kalyan', color: 'from-red-500 to-pink-500' },
              { name: 'Prabhas', color: 'from-blue-500 to-cyan-500' },
              { name: 'Mahesh Babu', color: 'from-green-500 to-emerald-500' },
              { name: 'Allu Arjun', color: 'from-yellow-500 to-orange-500' },
              { name: 'Jr NTR', color: 'from-purple-500 to-pink-500' },
              { name: 'Ram Charan', color: 'from-orange-500 to-red-500' },
              { name: 'Chiranjeevi', color: 'from-indigo-500 to-purple-500' },
              { name: 'Rajamouli', color: 'from-teal-500 to-green-500' },
            ].map((hero) => (
              <div
                key={hero.name}
                className={`px-6 py-3 rounded-full bg-gradient-to-r ${hero.color} text-white font-semibold text-lg hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg`}
              >
                {hero.name}
              </div>
            ))}
            <div className="text-center w-full mt-8 text-gray-400 text-lg">
              Don&apos;t miss out on the TFI action. Join thousands of fans today!
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-black mb-6">
            Ready to Celebrate TFI? 🎉
          </h2>
          <p className="text-xl text-black/80 mb-8 font-semibold">
            Join thousands of fans organizing their TFI journey. Start your timeline today!
          </p>
          <Link
            href="/calendar"
            className="inline-block px-10 py-5 bg-black text-white font-bold text-xl rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            Get Started Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-lg">
            Made with ❤️ for TFI Fans | © 2025 TFI Calendar
          </p>
          <p className="text-gray-500 mt-2">
            Celebrating Telugu Cinema, One Event at a Time 🎬
          </p>
        </div>
      </footer>
    </div>
  );
}
