-- Run this once in Supabase > SQL Editor
create table if not exists attendance (
  student_id text not null,
  class_id   text not null,
  date       date not null,
  status     text not null check (status in ('Present', 'Absent')),
  primary key (student_id, date)
);

alter table attendance enable row level security;

-- Open policy for development. Restrict to logged-in teachers after Auth is added.
create policy "dev full access" on attendance
  for all using (true) with check (true);
