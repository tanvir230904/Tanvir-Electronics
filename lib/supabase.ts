
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqxhcjpmgxifpepifrka.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxeGhjanBtZ3hpZnBlcGlmcmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NjM4ODUsImV4cCI6MjA4NjQzOTg4NX0.p0qb3OdSpeOELOX2QFlxUuiVHfM7xu98zRMRjVtBjyU';

export const supabase = createClient(supabaseUrl, supabaseKey);
