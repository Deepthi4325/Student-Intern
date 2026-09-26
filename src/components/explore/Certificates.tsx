import React, { useState } from 'react';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  X,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleCertificates } from '../../data/mockData';
import { CertificateItem } from '../../types';

export const Certificates: React.FC = () => {
  const { user, t } = useApp();
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getLinkedInShareUrl = (cert: CertificateItem) => {
    const postText = `🎉 Excited to announce that I have successfully earned the "${cert.title}" certification through Smart Intern! 🚀\n\nVerified Credential ID: ${cert.credentialId}\nIssuer: ${cert.issuer}\nKey Competencies: ${cert.skills.join(', ')}\n\nCheck out my credential: https://smartintern.app/verify/${cert.credentialId}\n\n#SmartIntern #Upskilling #Engineering #${cert.title.replace(/[^a-zA-Z0-9]/g, '')}`;
    return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(postText)}`;
  };

  const getLinkedInAddToProfileUrl = (cert: CertificateItem) => {
    return `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.title)}&organizationName=${encodeURIComponent(cert.issuer)}&issueYear=2026&issueMonth=3&certId=${encodeURIComponent(cert.credentialId)}&certUrl=${encodeURIComponent(`https://smartintern.app/verify/${cert.credentialId}`)}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-xs font-semibold text-emerald-800 shadow-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.certificates}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Verified milestone credentials recognized by placement partners. Post directly to LinkedIn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>2 Verified Credentials</span>
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {sampleCertificates.map((cert) => {
          const linkedInPostUrl = getLinkedInShareUrl(cert);
          const linkedInAddUrl = getLinkedInAddToProfileUrl(cert);

          return (
            <div
              key={cert.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">
                      {cert.title}
                    </h2>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Credential ID: {cert.credentialId}
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  Verified
                </span>
              </div>

              <div className="text-xs text-slate-600">
                Issued by <strong className="text-slate-800">{cert.issuer}</strong> on {cert.issueDate}.
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Actions with prominent LinkedIn redirect */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
                  >
                    View Certificate
                  </button>

                  {/* Direct LinkedIn Post Button */}
                  <a
                    href={linkedInPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => showToast('Redirecting to LinkedIn share composer...')}
                    className="flex items-center gap-1.5 rounded-xl bg-[#0A66C2] px-3.5 py-2.5 text-xs font-bold text-white hover:bg-[#004182] transition-colors shadow-xs"
                    title="Post this specific certification on LinkedIn"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                    <span>Post on LinkedIn</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://smartintern.app/verify/${cert.credentialId}`);
                      showToast(`Verification link copied for ID ${cert.credentialId}!`);
                    }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
                    title="Copy Verification Link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex justify-end">
                  <a
                    href={linkedInAddUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                  >
                    <span>+ Add to LinkedIn Profile licenses & certifications</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl space-y-6 border-8 border-indigo-950/10 max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Certificate Canvas Mock */}
            <div className="rounded-xl border-4 border-double border-amber-600/40 p-6 sm:p-8 text-center space-y-4 bg-gradient-to-b from-amber-50/20 to-white">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Award className="h-8 w-8" />
              </div>

              <div>
                <span className="text-[11px] font-bold tracking-widest text-amber-700 uppercase">
                  Certificate of Professional Achievement
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {selectedCert.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600">
                This certifies that
              </p>

              <div className="text-lg font-bold text-indigo-900 border-b-2 border-indigo-600 inline-block px-6 pb-1">
                {user.name}
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                has successfully demonstrated proficiency in advanced problem invariants, algorithmic complexity proofs, and production system scalability.
              </p>

              <div className="flex justify-between items-end pt-6 border-t border-slate-200 text-xs">
                <div className="text-left">
                  <div className="font-mono text-[10px] text-slate-400">ID: {selectedCert.credentialId}</div>
                  <div className="text-[11px] text-slate-600 font-semibold">{selectedCert.issueDate}</div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Authenticated Certificate</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500">
                Credential verified by <span className="font-semibold text-slate-700">{selectedCert.issuer}</span>
              </div>

              <div className="flex items-center gap-2">
                {/* LinkedIn Share CTA */}
                <a
                  href={getLinkedInShareUrl(selectedCert)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => showToast('Redirecting to LinkedIn...')}
                  className="flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2 text-xs font-bold text-white hover:bg-[#004182] transition-colors shadow-xs"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                  </svg>
                  <span>Post on LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <button
                  onClick={() => showToast('Certificate downloaded as official verification document.')}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
