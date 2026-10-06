import { useState } from 'react';
import { AlertTriangle, Search, Filter, ShieldAlert, ShieldCheck, Activity, ArrowRight, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getThreats } from '../../lib/admin-content';

export function Threats() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');

  const categories = ['All', ...Array.from(new Set(getThreats().map(t => t.category)))];

  const filteredThreats = getThreats().filter(threat => {
    const matchesSearch = threat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          threat.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || threat.category === categoryFilter;
    const matchesSeverity = severityFilter === 'All' || threat.severity === severityFilter;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  }).sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return a.title.localeCompare(b.title);
    }
    if (sortOrder === 'Severity') {
      const severityScores = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return severityScores[b.severity] - severityScores[a.severity];
    }
    // Newest is default (using original array order for now since dates are string 'Recent')
    return 0; 
  });

  const highRiskCount = getThreats().filter(t => t.severity === 'Critical' || t.severity === 'High').length;
  const mediumRiskCount = getThreats().filter(t => t.severity === 'Medium').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      
      {/* 11. SECURITY ALERT BANNER */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-full shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-blue-900 flex items-center gap-2">
            Stay Alert <Badge variant="outline" className="bg-white border-blue-200 text-blue-700 text-[10px]">CyberAware Security Reminder</Badge>
          </h4>
          <p className="text-blue-800 text-sm mt-1">
            Cyber threats evolve quickly. Verify suspicious messages before taking action.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-indigo-600" /> Cyber Threat Center
          </h1>
          <p className="text-slate-500 mt-1">Understand today's digital threats before they become tomorrow's problems.</p>
        </div>
      </div>

      {/* 2. THREAT STATISTICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">Latest Threats</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{getThreats().length}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-red-600">High Risk</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{highRiskCount}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-amber-600">Medium Risk</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mediumRiskCount}</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-blue-600">Security Advisories</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search threats..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* 18. Responsive Filters (scrollable on mobile) */}
        <div className="flex gap-2 shrink-0 overflow-x-auto pb-2 sm:pb-0">
          <select 
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 shrink-0"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select 
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 shrink-0"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select 
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 shrink-0"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="Severity">Severity</option>
            <option value="A-Z">A-Z</option>
          </select>
        </div>
      </div>

      {/* 5. THREAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredThreats.map((threat) => (
          <Card key={threat.id} className="flex flex-col hover:shadow-md hover:border-slate-300 transition-all group">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline" className="bg-slate-50 text-slate-600 font-medium border-slate-200">
                  {threat.category}
                </Badge>
                
                {/* 4. SEVERITY FILTER VISUAL INDICATORS */}
                <Badge variant={
                  threat.severity === 'Critical' ? 'destructive' :
                  threat.severity === 'High' ? 'warning' :
                  threat.severity === 'Medium' ? 'info' : 'secondary'
                } className="flex items-center gap-1 px-2.5 py-0.5">
                  <AlertTriangle className="w-3 h-3" /> {threat.severity}
                </Badge>
              </div>
              <CardTitle className="text-xl mb-2 flex items-start gap-2">
                <span className="mt-0.5"><ShieldAlert className={`w-5 h-5 ${
                  threat.severity === 'Critical' ? 'text-red-500' :
                  threat.severity === 'High' ? 'text-orange-500' :
                  'text-amber-500'
                }`} /></span>
                {threat.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 text-slate-600">
                {threat.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 rounded-md">Status: {threat.status}</span>
                <span className="px-2 py-1 bg-slate-100 rounded-md">Published: {threat.publishedDate}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant="outline" 
                className="w-full justify-between group-hover:bg-slate-50 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors"
                onClick={() => navigate(`/threats/${threat.id}`)}
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredThreats.length === 0 && (
        <div className="text-center py-12">
          <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No threats found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
