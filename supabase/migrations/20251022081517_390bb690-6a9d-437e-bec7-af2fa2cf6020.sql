-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  date_of_birth text,
  gender text,
  wilaya text,
  address text,
  nin text unique,
  user_type text check (user_type in ('student', 'teacher')),
  education_level text,
  institution_name text,
  highest_degree text,
  institution_affiliation text,
  bio text,
  linkedin text,
  website text,
  national_id_front_path text,
  national_id_back_path text,
  student_card_path text,
  teaching_qualification_path text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies for profiles table
create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- Create function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- Create trigger to automatically create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create storage bucket for registration documents
insert into storage.buckets (id, name, public)
values ('registration-documents', 'registration-documents', false)
on conflict (id) do nothing;

-- Create storage policies for registration documents
create policy "Users can upload their own documents"
  on storage.objects
  for insert
  with check (
    bucket_id = 'registration-documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can view their own documents"
  on storage.objects
  for select
  using (
    bucket_id = 'registration-documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own documents"
  on storage.objects
  for update
  using (
    bucket_id = 'registration-documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own documents"
  on storage.objects
  for delete
  using (
    bucket_id = 'registration-documents' and
    auth.uid()::text = (storage.foldername(name))[1]
  );