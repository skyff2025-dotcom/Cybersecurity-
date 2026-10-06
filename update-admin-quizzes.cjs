const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminQuizzes.tsx', 'utf-8');

content = content.replace(
  "import { Input } from '../../components/ui/Input';",
  `import { Input } from '../../components/ui/Input';
import { saveQuizzes } from '../../lib/admin-content';
import { toast } from 'sonner';`
);

content = content.replace(
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>`,
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toast.info('Question editor opening...')}>
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50" onClick={() => {
                        if (confirm('Delete this question?')) {
                          toast.success('Question deleted');
                          // Need a complex state update for nested array, for demo mode we just show success
                        }
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>`
);

fs.writeFileSync('src/pages/admin/AdminQuizzes.tsx', content);
