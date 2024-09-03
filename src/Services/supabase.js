import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://mcgrgtszjkxegzkjoxkz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZ3JndHN6amt4ZWd6a2pveGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwNjkyOTgsImV4cCI6MjAzODY0NTI5OH0.tdtotYqN9xDiRjG7qJszVvQV9LHbPHFd1JRm3x1Ui5w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
