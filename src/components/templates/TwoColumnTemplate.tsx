import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../../lib/database.types';

interface TemplateProps {
  data: ResumeData;
}

export function TwoColumnTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="bg-white flex max-w-[850px] mx-auto" id="resume-content">
      <div className="w-1/3 bg-gray-900 text-white p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 break-words">{personalInfo.name}</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-300 uppercase tracking-wide">
            Contact
          </h2>
          <div className="space-y-3 text-sm">
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-gray-300 uppercase tracking-wide">
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((skill, idx) => (
                <div key={idx} className="text-sm">{skill}</div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-300 uppercase tracking-wide">
              Certifications
            </h2>
            <div className="space-y-3 text-sm">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-gray-400 text-xs">{cert.issuer}</p>
                  <p className="text-gray-400 text-xs">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3 p-8">
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Profile
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700 font-semibold">{exp.company}</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
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
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700 font-semibold">{edu.school}</p>
                  <p className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                  <p className="text-xs text-gray-600">
                    {project.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
