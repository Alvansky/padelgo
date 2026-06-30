# Pre-Deployment Checklist

## Supabase Setup
- [ ] Create new Supabase project
- [ ] Run `supabase/schema.sql` in SQL Editor
- [ ] Enable Email auth in Authentication > Providers
- [ ] Copy Project URL and anon key
- [ ] Set first admin user:
  ```sql
  UPDATE public.profiles SET role = 'admin' WHERE email = 'your-email@example.com';
  ```

## Vercel Setup
- [ ] Push code to GitHub
- [ ] Import repo in Vercel
- [ ] Set env vars:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Deploy

## Local Test
```bash
hugo server
```
- [ ] Homepage loads
- [ ] Register creates account
- [ ] Login works
- [ ] User can book court
- [ ] User dashboard shows own bookings only
- [ ] Admin can see all bookings
- [ ] Admin can cancel booking
- [ ] Settings page works

## Common Issues
- **White screen**: Check browser console, verify Supabase env vars in Vercel
- **Admin redirects to dashboard**: Update profile role in Supabase
- **Booking conflict ignored**: Check RLS policies are enabled
- **Dark mode broken**: Check localStorage in browser dev tools
