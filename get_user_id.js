
import { createClient } from '@supabase/supabase-js';

// Hardcoded for this script only, based on .env values seen previously
const supabaseUrl = 'https://vlradenqjpsfcsovqusq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscmFkZW5xanBzZmNzb3ZxdXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2ODkzNDcsImV4cCI6MjA4MzI2NTM0N30.ZRb7m228Vx-wKRY7vy1yncLNME1LBAZKx9u6jRQKbjQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getUser() {
    const { data, error } = await supabase
        .from('users')
        .select('id, full_name')
        .limit(1);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('User found:', data);
    }
}

getUser();
