import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // ✅ Get code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) throw new Error('Missing auth code from URL');

        // ✅ Exchange code for session
        const { data, error: authError } = await supabase.auth.exchangeCodeForSession({ code });
        if (authError) throw authError;

        const user = data.session?.user;
        if (!user) throw new Error('No active user session');

        // ✅ Check if profile exists
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // ✅ If profile doesn't exist and error is "no rows", create it
        if (!existingProfile && profileError?.code === 'PGRST116') {
          const username = user.user_metadata?.username || user.email?.split('@')[0] || 'user';
          const { error: insertError } = await supabase.from('profiles').insert([
            {
              id: user.id,
              username: username,
              email: user.email,
            },
          ]);

          if (insertError) {
            console.error('Error inserting profile:', insertError);
          }
        }

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (err) {
        console.error('Error in auth callback:', err);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-semibold text-gray-900">Processing authentication...</h2>
    </div>
  );
};

export default AuthCallback;
