import { Search, Filter, Bookmark, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { mockArticles } from '../../data/mockData';

export function Articles() {
  const featuredArticle = mockArticles[0];
  const regularArticles = mockArticles.slice(1);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security Articles</h1>
          <p className="text-slate-500 mt-1">Deep dives into cybersecurity concepts and best practices.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Search articles by title, topic, or keyword..." className="pl-9" />
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Category
          </Button>
          <Button variant="outline" className="gap-2">
            Difficulty
          </Button>
        </div>
      </div>

      {/* Featured Article */}
      <Card className="overflow-hidden border-blue-100 shadow-md">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-100 flex items-center justify-center p-12 min-h-[300px]">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
              <BookOpen className="w-16 h-16" />
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="info">{featuredArticle.categoryName}</Badge>
              <Badge variant="outline" className="gap-1"><Clock className="w-3 h-3" /> {featuredArticle.readTime} min read</Badge>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 hover:text-blue-600 transition-colors cursor-pointer">
              {featuredArticle.title}
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              {featuredArticle.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <Button>Read Article</Button>
              <Button variant="ghost" size="icon" className="text-blue-600 bg-blue-50">
                <Bookmark className="w-5 h-5 fill-current" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularArticles.map((article) => (
          <Card key={article.id} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-xs">{article.categoryName}</Badge>
                <Badge variant={article.difficulty === 'Beginner' ? 'success' : article.difficulty === 'Intermediate' ? 'warning' : 'destructive'} className="text-xs">
                  {article.difficulty}
                </Badge>
              </div>
              <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer text-lg">
                {article.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                <Bookmark className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button variant="outline" className="w-full sm:w-auto">Load More Articles</Button>
      </div>
    </div>
  );
}
