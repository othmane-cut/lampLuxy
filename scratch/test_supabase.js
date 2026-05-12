const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ssqdrlzutkjtypzrtoqx.supabase.co";
const supabaseKey = "sb_publishable_K3hv_NB3n04XgqZsmdv9ew_HG9AGlvf";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing connection to:', supabaseUrl);
  const { data, error } = await supabase.from('products').select('*').limit(1);
  
  if (error) {
    console.error('Error fetching products:', error);
    console.log('Maybe the table does not exist or RLS is blocking access.');
  } else {
    console.log('Products found:', data);
  }
}

test();
