
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jjlozrrzvzoeckqmigbb.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbG96cnJ6dnpvZWNrcW1pZ2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2OTA1ODMsImV4cCI6MjA4ODI2NjU4M30.S4gc2enCZiTp08qPQdybx4lkzg51b16pXEaZdpKGJcU';

export const supabase = createClient(supabaseUrl, supabaseKey);
