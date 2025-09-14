import React, { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Education } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap, Edit } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { state, dispatch } = useResume();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  if (!state.currentResume) return null;

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.institution || !formData.degree) return;
    
    if (editingId) {
      dispatch({
        type: 'UPDATE_EDUCATION',
        payload: {
          id: editingId,
          education: {
            ...formData,
            id: editingId,
          },
        },
      });
      setEditingId(null);
    } else {
      dispatch({
        type: 'ADD_EDUCATION',
        payload: {
          ...formData,
          id: Date.now().toString(),
        },
      });
    }

    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
    });
  };

  const handleEdit = (education: Education) => {
    setFormData({
      institution: education.institution,
      degree: education.degree,
      field: education.field,
      location: education.location,
      startDate: education.startDate,
      endDate: education.endDate,
      gpa: education.gpa || '',
    });
    setEditingId(education.id);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
  };

  return (
    <div className="space-y-6">
      {/* Existing Education Items */}
      {state.currentResume.education.map((edu) => (
        <Card key={edu.id} className="bg-muted/20 border border-white/10">
          <CardContent className="pt-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                <p className="text-primary font-medium">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">{edu.field}</p>
                <p className="text-sm text-muted-foreground">{edu.location}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {edu.startDate} - {edu.endDate}
                </p>
                {edu.gpa && (
                  <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(edu)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(edu.id)}
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
            <GraduationCap className="w-5 h-5 mr-2" />
            {editingId ? 'Edit Education' : 'Add Education'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="institution">School/University *</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={handleInputChange('institution')}
              placeholder="Harvard University"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree *</Label>
              <Input
                id="degree"
                value={formData.degree}
                onChange={handleInputChange('degree')}
                placeholder="Bachelor of Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="field">Field of Study</Label>
              <Input
                id="field"
                value={formData.field}
                onChange={handleInputChange('field')}
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={handleInputChange('location')}
              placeholder="Cambridge, MA"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA (optional)</Label>
              <Input
                id="gpa"
                value={formData.gpa}
                onChange={handleInputChange('gpa')}
                placeholder="3.8"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    institution: '',
                    degree: '',
                    field: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    gpa: '',
                  });
                }}
              >
                Cancel
              </Button>
            )}
            <Button 
              onClick={handleSubmit}
              disabled={!formData.institution || !formData.degree}
            >
              {editingId ? 'Update Education' : 'Add Education'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
