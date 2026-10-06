import { useState, useEffect } from 'react';
import { ShieldAlert, Search, Filter, Clock, ChevronRight, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getAlerts } from '../../lib/admin-content';
import { isAlertRead } from '../../lib/alerts';
import { SecurityAlert } from '../../data/alerts';

export function Alerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [readFilter, setReadFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  useEffect(() => {
    // Only show published alerts to learners
    const publishedAlerts = getAlerts().filter((a: any) => a.status === 'Published');
    setAlerts(publishedAlerts);
  }, []);

  const categories = ['All', ...Array.from(new Set(alerts.map(a => a.category)))];
  
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alert.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || alert.category === categoryFilter;
    const matchesSeverity = severityFilter === 'All' || alert.severity === severityFilter;
    
    const read = isAlertRead(alert.id);
    const matchesRead = readFilter === 'All' || 
                       (readFilter === 'Read' && read) || 
                       (readFilter === 'Unread' && !read);

    return matchesSearch && matchesCategory && matchesSeverity && matchesRead;
  }).sort((a, b) => {
    if (sortBy === 'Newest') {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    }
    if (sortBy === 'Oldest') {
      return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
    }
    if (sortBy === 'Highest Severity') {
      const severityScores: Record<string, number> = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
      return (severityScores[b.severity] || 0) - (severityScores[a.severity] || 0);
    }
    return 0; // Most Relevant (default fallback)
  });

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0B1F3A] text-white p-8 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10">
            <ShieldAlert className="w-4 h-4" />
            Security Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">Security Alerts</h1>
          <p className="text-blue-100 text-lg">
            Stay informed about important cybersecurity risks and learn how to stay protected.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <Card className="border-slate-200 shadow-sm sticky top-6">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      placeholder="Search alerts..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block flex items-center gap-2">
                    <Filter className="w-3 h-3" /> Filters
                  </label>
                  
                  <div className="space-y-3">
                    <div>
                      <select 
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <select 
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={severityFilter}
                        onChange={(e) => setSeverityFilter(e.target.value)}
                      >
                        <option value="All">All Severities</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={readFilter}
                        onChange={(e) => setReadFilter(e.target.value)}
                      >
                        <option value="All">All Statuses</option>
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                   <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Sort By</label>
                   <select 
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option>Newest</option>
                      <option>Oldest</option>
                      <option>Highest Severity</option>
                      <option>Most Relevant</option>
                    </select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full text-slate-500 hover:text-slate-900"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setSeverityFilter('All');
                    setReadFilter('All');
                    setSortBy('Newest');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center text-sm text-slate-500">
            <span>{filteredAlerts.length} alerts found</span>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map(alert => {
              const read = isAlertRead(alert.id);
              return (
                <Card key={alert.id} className={`border border-slate-200 shadow-sm transition-all hover:shadow-md ${read ? 'bg-slate-50' : 'bg-white'}`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="p-5 sm:w-2/3 md:w-3/4 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge variant="outline" className={`border ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </Badge>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-medium border border-slate-200">
                              {alert.category}
                            </Badge>
                            {!read && (
                              <Badge variant="default" className="bg-[#F97316] text-white border-[#F97316] hover:bg-[#F97316]">
                                NEW
                              </Badge>
                            )}
                          </div>
                          <h3 className={`text-xl font-bold mb-2 ${read ? 'text-slate-700' : 'text-[#0B1F3A]'}`}>
                            {alert.title}
                          </h3>
                          <p className="text-slate-600 mb-4 line-clamp-2">
                            {alert.summary}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(alert.publishedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {alert.readTime} min read
                          </span>
                          <span className="flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5" />
                            <span className="text-[#F97316]">{alert.sourceType}</span>
                          </span>
                        </div>
                      </div>
                      <div className="p-5 sm:w-1/3 md:w-1/4 bg-slate-50 sm:border-l border-slate-100 flex flex-col justify-center items-center gap-3 sm:rounded-r-xl">
                         {read ? (
                           <div className="flex items-center text-green-600 text-sm font-medium gap-1 mb-2">
                             <CheckCircle2 className="w-4 h-4" /> Read
                           </div>
                         ) : null}
                         <Button onClick={() => navigate(`/alerts/${alert.id}`)} className="w-full bg-[#0B1F3A] hover:bg-[#163A63] text-white">
                           Read More
                           <ChevronRight className="w-4 h-4 ml-1" />
                         </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
                <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-900 mb-1">No security alerts found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setSeverityFilter('All');
                    setReadFilter('All');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
