import React, { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Experience } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Briefcase, Edit } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: [''],
  });

  if (!state.currentResume) return null;

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData(prev => ({
      ...prev,
      description: newDescription,
    }));
  };

  const addDescriptionPoint = () => {
    setFormData(prev => ({
      ...prev,
      description: [...prev.description, ''],
    }));
  };

  const removeDescriptionPoint = (index: number) => {
    if (formData.description.length > 1) {
      const newDescription = formData.description.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        description: newDescription,
      }));
    }
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.position) return;
    
    const filteredDescription = formData.description.filter(desc => desc.trim() !== '');
    
    if (editingId) {
      dispatch({
        type: 'UPDATE_EXPERIENCE',
        payload: {
          id: editingId,
          experience: {
            ...formData,
            id: editingId,
            description: filteredDescription,
          },
        },
      });
      setEditingId(null);
    } else {
      dispatch({
        type: 'ADD_EXPERIENCE',
        payload: {
          ...formData,
          id: Date.now().toString(),
          description: filteredDescription,
        },
      });
    }

    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    });
  };

  const handleEdit = (experience: Experience) => {
    setFormData({
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description.length > 0 ? experience.description : [''],
    });
    setEditingId(experience.id);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
  };

  return (
    <div className="space-y-6">
      {/* Existing Experience Items */}
      {state.currentResume.experience.map((exp) => (
        <Card key={exp.id} className="bg-muted/20 border border-white/10">
          <CardContent className="pt-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{exp.position}</h4>
                <p className="text-primary font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
                {exp.current && (
                  <Badge className="mt-2 bg-primary/20 text-primary">Current Position</Badge>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(exp)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(exp.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Add/Edit Form */}
      <Card className="bg-gradient-card backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground text-lg">
            <Briefcase className="w-5 h-5 mr-2" />
            {editingId ? 'Edit Experience' : 'Add Work Experience'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">Job Title *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={handleInputChange('position')}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={handleInputChange('company')}
                placeholder="Tech Corp"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={handleInputChange('location')}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="month"
                value={formData.startDate}
                onChange={handleInputChange('startDate')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="month"
                value={formData.endDate}
                onChange={handleInputChange('endDate')}
                disabled={formData.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={formData.current}
              onCheckedChange={(checked) =>
                setFormData(prev => ({
                  ...prev,
                  current: checked as boolean,
                  endDate: checked ? '' : prev.endDate,
                }))
              }
            />
            <Label htmlFor="current">I currently work here</Label>
          </div>

          <div className="space-y-4">
            <Label>Job Description *</Label>
            {formData.description.map((desc, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder={`• Achievement or responsibility ${index + 1}...`}
                  className="flex-1 min-h-[80px]"
                />
                {formData.description.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDescriptionPoint(index)}
                    className="h-8 w-8 p-0 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addDescriptionPoint}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </div>

          <div className="flex justify-end space-x-4">
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    company: '',
                    position: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: [''],
                  });
                }}
              >
                Cancel
              </Button>
            )}
            <Button 
              onClick={handleSubmit}
              disabled={!formData.company || !formData.position}
            >
              {editingId ? 'Update Experience' : 'Add Experience'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
