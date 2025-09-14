import React, { useEffect } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { ResumePreview } from '@/components/ResumePreview';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, 
  Save, 
  Eye, 
  User, 
  Briefcase, 
  GraduationCap, 
  Award,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const ResumeBuilder = () => {
  const { state, dispatch, saveResume } = useResume();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.currentResume) {
      dispatch({ type: 'CREATE_NEW_RESUME' });
    }
  }, [state.currentResume, dispatch]);

  const handleSave = () => {
    saveResume();
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  const handleExportPDF = () => {
    if (!state.currentResume) return;
    
    // Import and use the export utility
    import('@/utils/resumeExport').then(({ exportResumePDF }) => {
      exportResumePDF(state.currentResume!);
    });
  };

  if (!state.currentResume) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Loading Resume Builder</h2>
          <p className="text-muted-foreground">Please wait while we set up your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-bold text-foreground">Resume Builder</h1>
              <Badge className="ml-3 bg-primary/20 text-primary border-primary/30">
                Auto-saved
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="premium" size="sm" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Left Panel - Forms */}
          <div className="space-y-6">
            <Card className="bg-gradient-card backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <User className="w-5 h-5 mr-2" />
                  Build Your Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="personal" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Personal
                    </TabsTrigger>
                    <TabsTrigger value="experience" className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Education
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Skills
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="max-h-96 overflow-y-auto pr-2">
                    <TabsContent value="personal">
                      <PersonalInfoForm />
                    </TabsContent>
                    <TabsContent value="experience">
                      <ExperienceForm />
                    </TabsContent>
                    <TabsContent value="education">
                      <EducationForm />
                    </TabsContent>
                    <TabsContent value="skills">
                      <SkillsForm />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <Card className="bg-gradient-card backdrop-blur-sm border border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Eye className="w-5 h-5 mr-2" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)] overflow-hidden">
                <div className="h-full overflow-y-auto">
                  <ResumePreview resume={state.currentResume} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;