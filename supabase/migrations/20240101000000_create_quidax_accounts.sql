create table if not exists public.quidax_accounts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  email text not null,
  full_name text not null,
  quidax_id text,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.quidax_accounts enable row level security;

create policy "Users can view their own quidax account"
  on public.quidax_accounts for select
  using (auth.uid() = user_id);

create policy "Users can update their own quidax account"
  on public.quidax_accounts for update
  using (auth.uid() = user_id);