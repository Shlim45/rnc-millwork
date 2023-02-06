-- Create a table for public projects
create table projects (
  id serial not null primary key,
  title text,
  images text[],
  alts text[],
  cover smallint,
  body text,
  updated_at timestamp with time zone
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table projects
  enable row level security;

create policy "Public projects are viewable by everyone." on projects
  for select using (true);

-- create policy "Users can insert their own profile." on projects
--   for insert with check (auth.uid() = id);

-- create policy "Users can update own profile." on projects
--   for update using (auth.uid() = id);

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('images', 'images');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Project images are publicly accessible." on storage.objects
  for select using (bucket_id = 'images');

-- create policy "Anyone can upload an avatar." on storage.objects
--   for insert with check (bucket_id = 'avatars');