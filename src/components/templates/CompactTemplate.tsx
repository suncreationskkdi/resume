import type { ResumeData } from '../../lib/database.types';

interface TemplateProps {
  data: ResumeData;
}

export function CompactTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="bg-white p-10 max-w-[850px] mx-auto text-sm" id="resume-content">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.name}</h1>
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-6">
          <p className="text-gray-700 leading-snug">{personalInfo.summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <span className="font-bold text-gray-900">{exp.position}</span>
                    <span className="text-gray-700"> • {exp.company}</span>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-2">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-gray-700 leading-snug">
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
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-gray-900">{edu.degree}</span>
                  <span className="text-gray-700"> • {edu.school}</span>
                  {edu.gpa && <span className="text-gray-600"> • GPA: {edu.gpa}</span>}
                </div>
                <span className="text-xs text-gray-600 whitespace-nowrap ml-2">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-6">
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">Skills</h2>
            <p className="text-gray-700 leading-snug">{skills.join(', ')}</p>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">Certifications</h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-semibold text-gray-900">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer} • {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <p className="font-bold text-gray-900">{project.name}</p>
                <p className="text-gray-700 leading-snug">{project.description}</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
