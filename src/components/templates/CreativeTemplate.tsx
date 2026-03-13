import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Folder } from 'lucide-react';
import type { ResumeData } from '../../lib/database.types';

interface TemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, certifications, projects } = data;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-12 max-w-[850px] mx-auto" id="resume-content">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white">
          <h1 className="text-4xl font-bold mb-3">{personalInfo.name}</h1>
          {personalInfo.summary && (
            <p className="text-orange-50 leading-relaxed">{personalInfo.summary}</p>
          )}
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>

          {experience.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
              </div>
              <div className="space-y-6 ml-9">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-orange-300 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-orange-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
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
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
              </div>
              <div className="space-y-4 ml-9">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-orange-300 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-orange-600 font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-600">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 ml-9">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium border border-orange-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Folder className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
              </div>
              <div className="space-y-4 ml-9">
                {projects.map((project) => (
                  <div key={project.id} className="border-l-2 border-orange-300 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs"
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

          {certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
              </div>
              <div className="space-y-3 ml-9">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border-l-2 border-orange-300 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-700 text-sm">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
