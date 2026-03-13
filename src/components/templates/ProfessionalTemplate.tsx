import type { ResumeData } from '../../lib/database.types';

interface TemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="bg-white p-12 max-w-[850px] mx-auto" id="resume-content">
      <div className="bg-slate-800 text-white p-8 -mx-12 -mt-12 mb-8">
        <h1 className="text-4xl font-bold mb-2">{personalInfo.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-200">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-8 bg-slate-50 p-6 rounded-lg">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 pb-2 border-b border-slate-300">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-slate-700 font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-slate-600">
                    <p>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700">
                  {exp.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 pb-2 border-b border-slate-300">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-slate-700 font-semibold">{edu.school}</p>
                  {edu.gpa && <p className="text-slate-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-sm text-slate-600">
                  <p>{edu.startDate} - {edu.endDate}</p>
                  <p>{edu.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 pb-2 border-b border-slate-300">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
                  <span className="text-slate-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 pb-2 border-b border-slate-300">
              Certifications
            </h2>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="text-slate-900 font-semibold text-sm">{cert.name}</p>
                  <p className="text-slate-600 text-xs">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {projects.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4 pb-2 border-b border-slate-300">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                <p className="text-slate-700 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
