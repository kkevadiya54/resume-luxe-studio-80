import { Resume } from '@/types/resume';

export const exportResumeAsHTML = (resume: Resume): string => {
  const { personalInfo, experience, education, skills } = resume;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.fullName} - Resume</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        .header {
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .name {
            font-size: 2.5em;
            font-weight: bold;
            color: #1f2937;
            margin: 0 0 10px 0;
        }
        .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 0.9em;
            color: #6b7280;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 1.3em;
            font-weight: bold;
            color: #2563eb;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
            margin-bottom: 15px;
            text-transform: uppercase;
        }
        .experience-item, .education-item {
            margin-bottom: 20px;
        }
        .job-title, .degree {
            font-size: 1.1em;
            font-weight: bold;
            color: #1f2937;
        }
        .company, .institution {
            font-weight: 600;
            color: #2563eb;
        }
        .date-location {
            font-size: 0.9em;
            color: #6b7280;
            margin: 5px 0;
        }
        .description {
            margin: 10px 0;
        }
        .description ul {
            margin: 5px 0 5px 20px;
            padding: 0;
        }
        .description li {
            margin: 3px 0;
        }
        .skills-category {
            margin-bottom: 15px;
        }
        .category-name {
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
        }
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .skill-badge {
            background: #dbeafe;
            color: #1d4ed8;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.85em;
            font-weight: 500;
        }
        .summary {
            font-style: italic;
            color: #4b5563;
            line-height: 1.7;
        }
        @media print {
            body { padding: 0; }
            .header { page-break-after: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${personalInfo.fullName}</h1>
        <div class="contact-info">
            ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo.phone ? `<span>📞 ${personalInfo.phone}</span>` : ''}
            ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
            ${personalInfo.website ? `<span>🌐 ${personalInfo.website}</span>` : ''}
            ${personalInfo.linkedin ? `<span>💼 ${personalInfo.linkedin}</span>` : ''}
        </div>
    </div>

    ${personalInfo.summary ? `
    <div class="section">
        <h2 class="section-title">Professional Summary</h2>
        <p class="summary">${personalInfo.summary}</p>
    </div>
    ` : ''}

    ${experience.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Professional Experience</h2>
        ${experience.map(exp => `
            <div class="experience-item">
                <div class="job-title">${exp.position}</div>
                <div class="company">${exp.company}</div>
                <div class="date-location">
                    📅 ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                    ${exp.location ? ` • 📍 ${exp.location}` : ''}
                </div>
                ${exp.description.length > 0 ? `
                <div class="description">
                    <ul>
                        ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${education.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Education</h2>
        ${education.map(edu => `
            <div class="education-item">
                <div class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
                <div class="institution">${edu.institution}</div>
                <div class="date-location">
                    📅 ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
                    ${edu.location ? ` • 📍 ${edu.location}` : ''}
                    ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </div>
            </div>
        `).join('')}
    </div>
    ` : ''}

    ${skills.length > 0 ? `
    <div class="section">
        <h2 class="section-title">Skills</h2>
        ${Object.entries(skillsByCategory).map(([category, categorySkills]) => `
            <div class="skills-category">
                <div class="category-name">${category}</div>
                <div class="skills-list">
                    ${categorySkills.map(skill => `
                        <span class="skill-badge">${skill.name} (${skill.level})</span>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    </div>
    ` : ''}
</body>
</html>
  `.trim();
};

export const downloadResumeHTML = (resume: Resume) => {
  const htmlContent = exportResumeAsHTML(resume);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// PDF export using html2pdf.js
export const exportResumePDF = async (resume: Resume) => {
  try {
    // Dynamic import to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default;
    
    // Generate HTML content for PDF
    const htmlContent = exportResumeAsHTML(resume);
    
    // Create a temporary element to hold the content
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.width = '210mm'; // A4 width
    element.style.minHeight = '297mm'; // A4 height
    element.style.padding = '20mm';
    element.style.boxSizing = 'border-box';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.fontSize = '12px';
    element.style.lineHeight = '1.4';
    element.style.color = '#333';
    element.style.backgroundColor = '#fff';
    
    // Temporarily add to DOM (hidden)
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    document.body.appendChild(element);
    
    // Configure PDF options
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5], // inches
      filename: `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg' as const, quality: 0.95 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'in' as const, 
        format: 'a4', 
        orientation: 'portrait' as const,
        compress: true
      }
    };
    
    // Generate and download PDF
    await html2pdf().set(options).from(element).save();
    
    // Clean up
    document.body.removeChild(element);
    
  } catch (error) {
    console.error('PDF export failed:', error);
    
    // Fallback to HTML export with instructions
    downloadResumeHTML(resume);
    
    alert(`PDF export failed. Your resume has been exported as HTML instead. 
    
To convert to PDF:
1. Open the downloaded HTML file in your browser
2. Press Ctrl+P (or Cmd+P on Mac) to print  
3. Select "Save as PDF" as the destination`);
  }
};

export const shareResumeLink = (resume: Resume): string => {
  // In a real app, this would save to a database and return a shareable link
  const resumeData = encodeURIComponent(JSON.stringify(resume));
  return `${window.location.origin}/resume/${resume.id}?data=${resumeData}`;
};