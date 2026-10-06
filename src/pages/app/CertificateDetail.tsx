import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, ShieldCheck, Copy, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { getProgress, CertificateData } from '../../lib/progress';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function CertificateDetail() {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [copied, setCopied] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = getProgress();
    const found = progress.certificates.find(c => c.id === certificateId);
    if (found) {
      setCertificate(found);
    } else {
      navigate('/certificate');
    }
  }, [certificateId, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!certificateRef.current || !certificate) return;
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`CyberAware-Certificate-${certificate.courseTitle.replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const copyCode = () => {
    if (certificate) {
      navigator.clipboard.writeText(certificate.verificationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!certificate) return null;

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white pb-20">
      <div className="max-w-[1000px] mx-auto px-4 pt-8">
        
        {/* Navigation & Controls - Hidden when printing */}
        <div className="print:hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/certificate')} className="text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Certificates
          </Button>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={copyCode} className="bg-white">
              {copied ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </Button>
            <Button variant="outline" onClick={handlePrint} className="bg-white">
              <Printer className="w-4 h-4 mr-2" /> Print Certificate
            </Button>
            <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>

        {/* Certificate Wrapper - Designed for A4 Landscape Proportions approx 1.414 aspect ratio */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden print:shadow-none print:rounded-none relative mx-auto w-full aspect-[1.414/1] min-h-[600px] max-h-[800px] flex items-center justify-center">
          
          {/* Real Certificate Render Container */}
          <div 
            ref={certificateRef}
            className="w-full h-full p-12 relative flex flex-col justify-center items-center text-center bg-white"
            style={{ boxSizing: 'border-box' }}
          >
            {/* Background pattern & border */}
            <div className="absolute inset-8 border-[3px] border-double border-slate-300 rounded-lg pointer-events-none" />
            <div className="absolute inset-2 border border-slate-100 rounded-xl pointer-events-none" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
              <ShieldCheck className="w-[400px] h-[400px] text-blue-900" />
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
              
              {/* Header */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900 uppercase tracking-widest">CyberAware</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-wider mb-8 uppercase">Certificate of Completion</h1>
              
              <p className="text-slate-500 uppercase tracking-widest text-sm mb-6">This certificate is proudly presented to</p>
              
              <div className="w-full max-w-lg border-b border-slate-300 pb-2 mb-6">
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 text-center font-serif">{certificate.learnerName}</h2>
              </div>
              
              <p className="text-slate-500 uppercase tracking-widest text-sm mb-6">for successfully completing</p>
              
              <h3 className="text-2xl font-bold text-blue-900 mb-8 max-w-[80%] leading-tight">
                {certificate.courseTitle}
              </h3>
              
              <p className="text-slate-600 max-w-lg mx-auto mb-12 text-sm leading-relaxed">
                This learner has successfully completed all required learning modules and demonstrated cybersecurity awareness knowledge.
              </p>
              
              {/* Footer Stats / Signatures */}
              <div className="w-full grid grid-cols-3 gap-8 mt-auto border-t border-slate-100 pt-8 text-left">
                
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Course Completion</span>
                  <span className="font-bold text-slate-800 text-sm">{certificate.completionPercentage}%</span>
                  <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider mb-1">Lessons Completed</span>
                  <span className="font-bold text-slate-800 text-sm">{certificate.completedLessons} / {certificate.totalLessons}</span>
                </div>
                
                <div className="flex flex-col border-l border-r border-slate-100 px-8">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Date of Completion</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {new Date(certificate.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-2 uppercase tracking-wider mb-1">Certificate ID</span>
                  <span className="font-mono text-slate-800 text-sm">{certificate.certificateNumber}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Verification Code</span>
                  <span className="font-mono text-blue-700 font-bold text-sm bg-blue-50 px-2 py-1 rounded inline-block w-fit mb-2">
                    {certificate.verificationCode}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider mb-1">Platform</span>
                  <span className="font-bold text-slate-800 text-sm">CyberAware</span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
