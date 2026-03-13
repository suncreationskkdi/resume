import type { ResumeData } from '../../lib/database.types';

interface TemplateProps {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="bg-white p-12 max-w-[850px] mx-auto" id="resume-content">
      <div className="mb-10">
        <h1 className="text-5xl font-light text-gray-900 mb-3">{personalInfo.name}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-10">
          <p className="text-gray-700 leading-relaxed text-lg font-light">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-500 font-light">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 font-light">{exp.company}</p>
                <ul className="space-y-2 text-gray-700 font-light">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="pl-4 border-l-2 border-gray-200">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600 font-light">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-500 font-light">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Skills
          </h2>
          <p className="text-gray-700 font-light leading-relaxed">{skills.join(' • ')}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{project.name}</h3>
                <p className="text-gray-700 font-light mb-2">{project.description}</p>
                <p className="text-sm text-gray-500 font-light">
                  {project.technologies.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
                <p className="text-gray-600 font-light text-sm">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
