import { Brain, Award, Users, Microscope, ChevronLeft, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  const teamMembers = [
    {
      name: "Dr. Sarah Kim",
      role: "Chief AI Scientist",
      bio: "PhD in Computer Vision, 10+ years in dermatology AI research",
      image: "👩‍⚕️"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      bio: "Full-stack engineer specializing in healthcare applications",
      image: "👨‍💻"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Dermatologist Advisor",
      bio: "Board-certified dermatologist with expertise in digital health",
      image: "👩‍🔬"
    },
    {
      name: "Alex Johnson",
      role: "Product Designer",
      bio: "UX specialist focused on accessible healthcare interfaces",
      image: "🎨"
    }
  ];

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Advanced AI Technology",
      description: "Our proprietary CNN model trained on over 100,000 skin images achieves 95% accuracy across 19 skin types."
    },
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "Scientific Foundation",
      description: "Built on peer-reviewed dermatological research and validated by board-certified dermatologists."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User-Centric Design",
      description: "Designed with accessibility and user privacy in mind, following healthcare data protection standards."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Clinically Validated",
      description: "Tested across diverse skin types and validated through clinical trials with dermatology partners."
    }
  ];

  const milestones = [
    { year: "2023", event: "Founded with vision to democratize skincare" },
    { year: "2023", event: "Completed first AI model training" },
    { year: "2024", event: "Launched beta with 1,000 users" },
    { year: "2024", event: "Reached 50,000 active users" },
    { year: "2024", event: "Partnership with leading dermatology clinics" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="border-white/30 text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Zephyre</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing skincare through the power of artificial intelligence and environmental science. 
            Our mission is to make personalized, scientific skincare accessible to everyone, everywhere.
          </p>
        </section>

        {/* Mission Statement */}
        <Card className="glass-card border-white/20 mb-16">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-4xl mx-auto">
                To democratize access to professional-grade skincare analysis and recommendations by combining 
                cutting-edge AI technology with real-time environmental data. We believe everyone deserves 
                personalized skincare guidance that adapts to their unique needs and environment.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Makes Zephyre Different
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass-card border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Journey
          </h2>
          <Card className="glass-card border-white/20">
            <CardContent className="p-8">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                      {milestone.year}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-lg">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-white/70">contact@zephyre.ai</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                <p className="text-white/70">San Francisco, CA</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-white/20">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
                <p className="text-white/70">24/7 Live Chat</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <Card className="glass-card border-white/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Skincare Journey?
            </h2>
            <p className="text-white/70 mb-6">
              Join thousands of users who've transformed their skincare routine with AI-powered insights.
            </p>
            <Button 
              onClick={onBack}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3"
            >
              Try Zephyre Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};