import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Search, CheckCircle2, XCircle, Award } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { getProgress, CertificateData } from '../../lib/progress';

export function CertificateVerify() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<CertificateData | null | 'NOT_FOUND'>('IDLE' as any);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toUpperCase();
    const progress = getProgress();
    
    // In a real app this would query a backend. Here we check localStorage.
    const found = progress.certificates.find(
      c => c.certificateNumber.toUpperCase() === query || c.verificationCode.toUpperCase() === query
    );

    if (found) {
      setResult(found);
    } else {
      setResult('NOT_FOUND');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pb-12">
      <Button variant="ghost" onClick={() => navigate('/certificate')} className="text-slate-500 hover:text-slate-900 -ml-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Certificates
      </Button>

      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Verify a CyberAware Certificate</h1>
        <p className="text-slate-500 mt-2 max-w-lg mx-auto">
          Enter the Certificate ID or Verification Code to confirm the authenticity and completion status of a learner's coursework.
        </p>
      </div>

      <Card className="border-slate-200 shadow-md">
        <CardContent className="p-8">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Certificate ID (e.g. CA-2026-CYB-...) or Code"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all uppercase"
                required
              />
            </div>
            <Button type="submit" size="lg" className="sm:w-auto w-full">
              Verify Certificate
            </Button>
          </form>
        </CardContent>
      </Card>

      {result === 'NOT_FOUND' && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <Card className="border-red-200 bg-red-50 text-center">
            <CardContent className="p-8">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-red-900 mb-2">Certificate not found.</h3>
              <p className="text-red-700 max-w-sm mx-auto">
                Please check the certificate ID or verification code. Ensure there are no typos and try again. Note: Local verification only checks certificates earned on this browser.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {result && result !== 'NOT_FOUND' && result !== 'IDLE' && (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <Card className="border-green-200 shadow-sm overflow-hidden">
            <div className="bg-green-50 p-6 border-b border-green-100 flex items-center justify-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-green-900">Certificate Verified</h2>
            </div>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                
                <div className="p-6 flex items-start gap-4 bg-white">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Course Name</p>
                    <p className="text-xl font-bold text-slate-900">{(result as CertificateData).courseTitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-50 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  <div className="p-6">
                    <p className="text-sm text-slate-500 mb-1">Learner Name</p>
                    <p className="font-semibold text-slate-900">{(result as CertificateData).learnerName}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-slate-500 mb-1">Status</p>
                    <div className="flex items-center gap-1.5 text-green-700 font-semibold bg-green-100 px-2 py-0.5 rounded w-fit">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 bg-white divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  <div className="p-6">
                    <p className="text-sm text-slate-500 mb-1">Completion</p>
                    <p className="font-semibold text-slate-900">{(result as CertificateData).completionPercentage}% ({(result as CertificateData).completedLessons}/${(result as CertificateData).totalLessons} Lessons)</p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-slate-500 mb-1">Issue Date</p>
                    <p className="font-semibold text-slate-900">
                      {new Date((result as CertificateData).issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-50 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  <div className="p-6">
                    <p className="text-sm text-slate-500 mb-1">Certificate ID</p>
                    <p className="font-mono text-sm font-medium text-slate-700">{(result as CertificateData).certificateNumber}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-slate-500 mb-1">Verification Code</p>
                    <p className="font-mono text-sm font-medium text-slate-700">{(result as CertificateData).verificationCode}</p>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}
