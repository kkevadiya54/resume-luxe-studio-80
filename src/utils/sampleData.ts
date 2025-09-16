import { Resume } from '@/types/resume';

export const sampleResume: Resume = {
  id: 'sample-resume',
  personalInfo: {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahjohnson',
    website: 'sarahjohnson.dev',
    summary: 'Results-driven Software Engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and collaborative problem-solving.',
  },
  experience: [
    {
      id: 'exp1',
      company: 'Tech Innovations Inc.',
      position: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: [
        'Led development of React-based dashboard serving 10,000+ daily users',
        'Implemented responsive design patterns improving mobile experience by 40%',
        'Mentored 3 junior developers and established code review processes',
        'Reduced page load times by 60% through optimization and lazy loading'
      ],
    },
    {
      id: 'exp2',
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      location: 'Remote',
      startDate: '2020-01',
      endDate: '2022-02',
      current: false,
      description: [
        'Built user interfaces for SaaS platform using React and TypeScript',
        'Collaborated with design team to implement pixel-perfect UI components',
        'Increased conversion rates by 25% through A/B testing and optimization',
        'Integrated with RESTful APIs and implemented real-time features with WebSockets'
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.7',
    },
  ],
  skills: [
    { id: 'skill1', name: 'JavaScript', level: 'Expert', category: 'Technical' },
    { id: 'skill2', name: 'React', level: 'Expert', category: 'Technical' },
    { id: 'skill3', name: 'TypeScript', level: 'Advanced', category: 'Technical' },
    { id: 'skill4', name: 'Node.js', level: 'Advanced', category: 'Technical' },
    { id: 'skill5', name: 'Python', level: 'Intermediate', category: 'Technical' },
    { id: 'skill6', name: 'AWS', level: 'Intermediate', category: 'Technical' },
    { id: 'skill7', name: 'Spanish', level: 'Advanced', category: 'Language' },
    { id: 'skill8', name: 'Leadership', level: 'Advanced', category: 'Soft Skills' },
    { id: 'skill9', name: 'Problem Solving', level: 'Expert', category: 'Soft Skills' },
  ],
  templateId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};