import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Palette } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  isPremium?: boolean;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Professional Classic',
    description: 'Clean, traditional layout perfect for corporate roles',
    preview: '/api/placeholder/300/400',
  },
  {
    id: '2', 
    name: 'Modern Minimal',
    description: 'Sleek design with subtle colors for creative industries',
    preview: '/api/placeholder/300/400',
  },
  {
    id: '3',
    name: 'Executive Elite',
    description: 'Sophisticated layout for senior-level positions',
    preview: '/api/placeholder/300/400',
    isPremium: true,
  },
  {
    id: '4',
    name: 'Creative Pro',
    description: 'Bold design showcasing creativity and innovation',
    preview: '/api/placeholder/300/400',
    isPremium: true,
  },
];

export const TemplateSelector: React.FC = () => {
  const { state, dispatch } = useResume();
  
  if (!state.currentResume) return null;

  const handleSelectTemplate = (templateId: string) => {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });
  };

  return (
    <Card className="bg-gradient-card backdrop-blur-sm border border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Palette className="w-5 h-5 mr-2" />
          Choose Template
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <div key={template.id} className="relative group">
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  state.currentResume?.templateId === template.id 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {/* Preview Image */}
                <div className="aspect-[3/4] bg-gradient-to-br from-muted/20 to-muted/40 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-4">
                    <div className="w-full h-4 bg-primary/20 rounded mb-2" />
                    <div className="w-3/4 h-2 bg-muted rounded mb-2" />
                    <div className="w-full h-2 bg-muted rounded mb-4" />
                    <div className="space-y-2">
                      <div className="w-full h-1 bg-muted/60 rounded" />
                      <div className="w-5/6 h-1 bg-muted/60 rounded" />
                      <div className="w-4/5 h-1 bg-muted/60 rounded" />
                    </div>
                  </div>
                  
                  {/* Premium Badge */}
                  {template.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-gradient-primary text-white">
                      Premium
                    </Badge>
                  )}
                  
                  {/* Selected Indicator */}
                  {state.currentResume?.templateId === template.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="bg-primary text-white rounded-full p-2">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-3">
                  <h4 className="font-semibold text-sm text-foreground mb-1">
                    {template.name}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {template.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted/10 rounded-lg border border-white/10">
          <p className="text-xs text-muted-foreground text-center">
            Premium templates available with Pro plan. 
            <Button variant="link" className="p-0 h-auto text-xs text-primary">
              Upgrade now
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};