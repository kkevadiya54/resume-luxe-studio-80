import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Resume, PersonalInfo, Experience, Education, Skill } from '@/types/resume';

interface ResumeState {
  currentResume: Resume | null;
  resumes: Resume[];
  isLoading: boolean;
}

type ResumeAction =
  | { type: 'SET_RESUME'; payload: Resume }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: PersonalInfo }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; experience: Experience } }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; education: Education } }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; skill: Skill } }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'LOAD_RESUMES'; payload: Resume[] }
  | { type: 'CREATE_NEW_RESUME' };

const initialState: ResumeState = {
  currentResume: null,
  resumes: [],
  isLoading: false,
};

const createEmptyResume = (): Resume => ({
  id: Date.now().toString(),
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  templateId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const resumeReducer = (state: ResumeState, action: ResumeAction): ResumeState => {
  switch (action.type) {
    case 'SET_RESUME':
      return { ...state, currentResume: action.payload };
    case 'CREATE_NEW_RESUME':
      const newResume = createEmptyResume();
      return { ...state, currentResume: newResume };
    case 'UPDATE_PERSONAL_INFO':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          personalInfo: action.payload,
          updatedAt: new Date().toISOString(),
        },
      };
    case 'ADD_EXPERIENCE':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          experience: [...state.currentResume.experience, action.payload],
          updatedAt: new Date().toISOString(),
        },
      };
    case 'UPDATE_EXPERIENCE':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          experience: state.currentResume.experience.map(exp =>
            exp.id === action.payload.id ? action.payload.experience : exp
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    case 'DELETE_EXPERIENCE':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          experience: state.currentResume.experience.filter(exp => exp.id !== action.payload),
          updatedAt: new Date().toISOString(),
        },
      };
    case 'ADD_EDUCATION':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          education: [...state.currentResume.education, action.payload],
          updatedAt: new Date().toISOString(),
        },
      };
    case 'UPDATE_EDUCATION':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          education: state.currentResume.education.map(edu =>
            edu.id === action.payload.id ? action.payload.education : edu
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    case 'DELETE_EDUCATION':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          education: state.currentResume.education.filter(edu => edu.id !== action.payload),
          updatedAt: new Date().toISOString(),
        },
      };
    case 'ADD_SKILL':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          skills: [...state.currentResume.skills, action.payload],
          updatedAt: new Date().toISOString(),
        },
      };
    case 'UPDATE_SKILL':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          skills: state.currentResume.skills.map(skill =>
            skill.id === action.payload.id ? action.payload.skill : skill
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    case 'DELETE_SKILL':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          skills: state.currentResume.skills.filter(skill => skill.id !== action.payload),
          updatedAt: new Date().toISOString(),
        },
      };
    case 'SET_TEMPLATE':
      if (!state.currentResume) return state;
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          templateId: action.payload,
          updatedAt: new Date().toISOString(),
        },
      };
    case 'LOAD_RESUMES':
      return { ...state, resumes: action.payload };
    default:
      return state;
  }
};

const ResumeContext = createContext<{
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
  saveResume: () => void;
} | null>(null);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Load resumes from localStorage on mount
  useEffect(() => {
    const savedResumes = localStorage.getItem('resumes');
    if (savedResumes) {
      const resumes = JSON.parse(savedResumes);
      dispatch({ type: 'LOAD_RESUMES', payload: resumes });
    }
  }, []);

  // Save current resume to localStorage
  const saveResume = () => {
    if (!state.currentResume) return;
    
    const existingResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    const updatedResumes = existingResumes.filter((r: Resume) => r.id !== state.currentResume!.id);
    updatedResumes.push(state.currentResume);
    
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    dispatch({ type: 'LOAD_RESUMES', payload: updatedResumes });
  };

  // Auto-save when resume changes
  useEffect(() => {
    if (state.currentResume) {
      saveResume();
    }
  }, [state.currentResume]);

  return (
    <ResumeContext.Provider value={{ state, dispatch, saveResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};