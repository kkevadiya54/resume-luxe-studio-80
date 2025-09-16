import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Eye, Download, Star, Briefcase, Code, Palette, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import template1 from '@/assets/template-1.jpg';
import template2 from '@/assets/template-2.jpg';
import template3 from '@/assets/template-3.jpg';

const Examples = () => {
  const navigate = useNavigate();

  const examples = [
    {
      id: 1,
      title: "Senior Software Engineer",
      industry: "Technology",
      experience: "5+ years",
      template: template1,
      description: "A comprehensive resume showcasing full-stack development expertise, leadership experience, and technical achievements.",
      skills: ["React", "Node.js", "Python", "AWS", "Leadership"],
      icon: Code,
      downloads: "2.3K",
      rating: 4.9
    },
    {
      id: 2,
      title: "Marketing Director",
      industry: "Marketing",
      experience: "8+ years",
      template: template2,
      description: "Strategic marketing professional with proven track record in brand management and digital marketing campaigns.",
      skills: ["Brand Strategy", "Digital Marketing", "Analytics", "Team Leadership"],
      icon: Briefcase,
      downloads: "1.8K",
      rating: 4.8
    },
    {
      id: 3,
      title: "UX/UI Designer",
      industry: "Design",
      experience: "4+ years",
      template: template3,
      description: "Creative designer specializing in user experience and interface design for web and mobile applications.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      icon: Palette,
      downloads: "3.1K",
      rating: 5.0
    },
    {
      id: 4,
      title: "Recent Graduate",
      industry: "Entry Level",
      experience: "New Graduate",
      template: template1,
      description: "Fresh graduate resume highlighting education, internships, projects, and relevant coursework.",
      skills: ["Java", "Data Analysis", "Project Management", "Research"],
      icon: GraduationCap,
      downloads: "4.5K",
      rating: 4.7
    },
    {
      id: 5,
      title: "Project Manager",
      industry: "Management",
      experience: "6+ years",
      template: template2,
      description: "Experienced project manager with expertise in agile methodologies and cross-functional team leadership.",
      skills: ["Agile", "Scrum", "Risk Management", "Stakeholder Management"],
      icon: Briefcase,
      downloads: "2.7K",
      rating: 4.9
    },
    {
      id: 6,
      title: "Data Scientist",
      industry: "Technology",
      experience: "4+ years",
      template: template3,
      description: "Data scientist with strong background in machine learning, statistical analysis, and data visualization.",
      skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
      icon: Code,
      downloads: "1.9K",
      rating: 4.8
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-xl font-bold text-foreground">Resume Examples</h1>
            <div></div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-gradient-primary text-white px-4 py-2 mb-6">
            <Star className="w-4 h-4 mr-2" />
            Professional Examples
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Real Resume
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Examples
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Get inspired by real resume examples from various industries and experience levels. 
            Each example is crafted by career experts and optimized for modern hiring practices.
          </p>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => {
              const IconComponent = example.icon;
              return (
                <Card 
                  key={example.id}
                  className="group relative overflow-hidden bg-gradient-card backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-luxury animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    {/* Preview Image */}
                    <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-muted/50 to-muted">
                      <img 
                        src={example.template} 
                        alt={`${example.title} resume example`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Industry Badge */}
                      <Badge className="absolute top-4 left-4 bg-primary/20 text-primary border-primary/30">
                        <IconComponent className="w-3 h-3 mr-1" />
                        {example.industry}
                      </Badge>

                      {/* Rating Badge */}
                      <Badge className="absolute top-4 right-4 bg-accent/20 text-accent border-accent/30">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {example.rating}
                      </Badge>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Button variant="glass" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button 
                            variant="glass" 
                            size="sm"
                            onClick={() => navigate('/builder')}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Example Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{example.title}</h3>
                        <span className="text-sm text-muted-foreground">{example.downloads} downloads</span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {example.description}
                      </p>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Experience: {example.experience}</p>
                        <div className="flex flex-wrap gap-1">
                          {example.skills.slice(0, 3).map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {example.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{example.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={() => navigate('/builder')}
                      >
                        Use This Example
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-card backdrop-blur-sm border border-white/10 p-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Create Your Resume?
            </h2>
            <p className="text-muted-foreground mb-8">
              Use any of these examples as a starting point and customize them to match your unique experience and style.
            </p>
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => navigate('/builder')}
            >
              Start Building Now
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Examples;