import React, { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Skill } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Award, Edit } from 'lucide-react';

export const SkillsForm: React.FC = () => {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'Intermediate',
    category: 'Technical',
  });

  if (!state.currentResume) return null;

  const handleInputChange = (field: keyof typeof formData) => (
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name) return;
    
    if (editingId) {
      dispatch({
        type: 'UPDATE_SKILL',
        payload: {
          id: editingId,
          skill: {
            ...formData,
            id: editingId,
          },
        },
      });
      setEditingId(null);
    } else {
      dispatch({
        type: 'ADD_SKILL',
        payload: {
          ...formData,
          id: Date.now().toString(),
        },
      });
    }

    setFormData({
      name: '',
      level: 'Intermediate',
      category: 'Technical',
    });
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setEditingId(skill.id);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_SKILL', payload: id });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-yellow-500/20 text-yellow-600';
      case 'Intermediate': return 'bg-blue-500/20 text-blue-600';
      case 'Advanced': return 'bg-green-500/20 text-green-600';
      case 'Expert': return 'bg-purple-500/20 text-purple-600';
      default: return 'bg-gray-500/20 text-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-primary/20 text-primary';
      case 'Language': return 'bg-accent/20 text-accent';
      case 'Soft Skills': return 'bg-secondary/20 text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Group skills by category
  const skillsByCategory = state.currentResume.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-6">
      {/* Existing Skills Display */}
      {Object.entries(skillsByCategory).length > 0 && (
        <div className="space-y-4">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <Card key={category} className="bg-muted/20 border border-white/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="group relative">
                      <Badge 
                        className={`${getLevelColor(skill.level)} pr-8 cursor-pointer`}
                        onClick={() => handleEdit(skill)}
                      >
                        {skill.name} - {skill.level}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(skill.id)}
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground hover:bg-destructive/80 rounded-full"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      <Card className="bg-gradient-card backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground text-lg">
            <Award className="w-5 h-5 mr-2" />
            {editingId ? 'Edit Skill' : 'Add Skills'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="skillName">Skill Name *</Label>
            <Input
              id="skillName"
              value={formData.name}
              onChange={(e) => handleInputChange('name')(e.target.value)}
              placeholder="e.g., JavaScript, Project Management, Spanish"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={handleInputChange('category')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Language">Language</SelectItem>
                  <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Proficiency Level</Label>
              <Select value={formData.level} onValueChange={handleInputChange('level')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: '',
                    level: 'Intermediate',
                    category: 'Technical',
                  });
                }}
              >
                Cancel
              </Button>
            )}
            <Button 
              onClick={handleSubmit}
              disabled={!formData.name}
            >
              {editingId ? 'Update Skill' : 'Add Skill'}
            </Button>
          </div>

          {/* Quick Add Popular Skills */}
          <div className="pt-4 border-t border-white/10">
            <Label className="text-sm text-muted-foreground mb-3 block">Quick Add Popular Skills:</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS',
                'Project Management', 'Leadership', 'Communication', 'Problem Solving'
              ].map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  size="sm"
                  onClick={() => handleInputChange('name')(skill)}
                  className="text-xs h-8"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
