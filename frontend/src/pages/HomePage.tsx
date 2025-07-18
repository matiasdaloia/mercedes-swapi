import { Link } from "react-router";
import { Globe, Users, Rocket } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Rocket className="h-20 w-20 text-yellow-400 animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to the Galaxy Explorer
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Explore the vast universe of Star Wars with comprehensive data on
          planets and characters from across the galaxy. Your journey to the
          stars begins here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <Link to="/planets">
          <FeatureCard
            title="Galactic Planets"
            subtitle="Explore diverse worlds"
            description="Discover the incredible diversity of planets across the galaxy. From the desert world of Tatooine to the forest moon of Endor, explore detailed information about climate, terrain, and populations."
            mainIcon={<Globe className="h-8 w-8 text-blue-400" />}
            pathLabel="Explore Planets"
          />
        </Link>

        <Link to="/people">
          <FeatureCard
            title="Notable Beings"
            subtitle="Meet legendary characters"
            description="Meet the heroes, villains, and everyone in between. From Jedi Masters to Sith Lords, droids to smugglers, discover detailed profiles of the galaxy's most notable inhabitants."
            mainIcon={<Users className="h-8 w-8 text-purple-400" />}
            pathLabel="Meet the Characters"
          />
        </Link>
      </div>

      <div className="text-center py-12">
        <blockquote className="text-2xl italic text-slate-300 mb-4">
          "The Force will be with you, always."
        </blockquote>
        <cite className="text-slate-400">— Obi-Wan Kenobi</cite>
      </div>
    </div>
  );
}
