import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Adjust path if needed

const AuthCallback: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

        const user = data?.session?.user;
        if (!user) throw new Error('No active user session');

        // ✅ Check if profile exists
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!existingProfile && profileError?.code === 'PGRST116') {
          const username = user.user_metadata?.username || user.email?.split('@')[0] || 'user';

          const { error: insertError } = await supabase.from('profiles').insert([
            {
              id: user.id,
              username,
              full_name: user.user_metadata?.full_name || username,
              role: 'user',
            },
          ]);

          if (insertError) {
            console.error('Error inserting profile:', insertError);
          }
        }

        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setError(err?.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="p-6 text-center">
      {loading && <p className="text-gray-500">Processing...</p>}
      {!loading && success && <p className="text-green-600">Login successful! Redirecting...</p>}
      {!loading && error && (
        <>
          <h2 className="text-xl font-semibold text-red-600">Verification Failed</h2>
          <p className="text-sm text-gray-600 my-2">{error}</p>
          <button
            onClick={() => (window.location.href = '/')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg mt-4 transition"
          >
            Return to Home
          </button>
        </>
      )}
    </div>
  );
};

export default AuthCallback;
