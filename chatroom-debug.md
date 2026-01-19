# Chatroom Message Debugging Guide

## If you can't see messages you're typing:

### 1. Check Browser Console
Open browser dev tools (F12) and check Console tab for:
- "Message sent successfully:" logs
- "Messages loaded:" logs  
- Any error messages

### 2. Verify Database Setup
Make sure you ran the SQL script:
1. Go to Supabase → SQL Editor
2. Run the `fix-chatroom-ids.sql` script
3. Check that tables were created with string IDs

### 3. Test Step by Step

**Step 1: Join Room**
- Enter nickname and click "Join Room"
- Check console for "Join room error" or success message

**Step 2: Load Messages** 
- After joining, messages should load automatically
- Check console for "Messages loaded:" log

**Step 3: Send Message**
- Type a message and click send
- Check console for "Message sent successfully:" log
- Message should appear immediately (local feedback)
- Message should also appear via real-time subscription

### 4. Common Issues

**No messages appear:**
- Database tables not created properly
- RLS policies blocking access
- Room ID mismatch

**Message doesn't send:**
- Not properly joined room
- Network connectivity issues
- Supabase connection problems

**Only your messages appear:**
- Real-time subscription not working
- Other users not in same room

### 5. Quick Fixes

1. **Refresh page** after joining room
2. **Check network connection** 
3. **Verify Supabase URL** in .env file
4. **Re-run SQL setup** if needed

### 6. Test with Console Logs

Open this in your browser console to test:
```javascript
// Test Supabase connection
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('YOUR_URL', 'YOUR_KEY')
console.log('Supabase client:', supabase)
```
