"use client";

import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import {
    // Import predefined theme
    ThemeSupa,
} from '@supabase/auth-ui-shared'

export default function Google(){
    const supabase = createClient('https://znduoxdtpsjpugmsursb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHVveGR0cHNqcHVnbXN1cnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5NDE0ODQsImV4cCI6MjAwODUxNzQ4NH0.EMkadkV31g8zPVWUdVVzGvpOkYADVoe3WTEptsKBjb4')
    const customTheme = {
        default: {
            colors: {
                brand: 'hsl(153 60.0% 53.0%)',
                brandAccent: 'hsl(154 54.8% 45.1%)',
                brandButtonText: 'white',
                // ..
            },
            },
            dark: {
            colors: {
                brandButtonText: 'white',
                defaultButtonBackground: '#2e2e2e',
                defaultButtonBackgroundHover: '#3e3e3e',
                //..
            },
            },
            evenDarker: {
            colors: {
                brandButtonText: 'white',
                defaultButtonBackground: '#1e1e1e',
                defaultButtonBackgroundHover: '#2e2e2e',
                //..
            },
            },
    }

    return (
        <Auth
            supabaseClient={supabase}
            appearance={{ 
                theme: ThemeSupa,
                variables: {
                    default: {
                        fonts: {
                            bodyFontFamily: `ui-sans-serif, sans-serif`,
                            buttonFontFamily: `ui-sans-serif, sans-serif`,
                            inputFontFamily: `ui-sans-serif, sans-serif`,
                            labelFontFamily: `ui-sans-serif, sans-serif`,
                        },
                        radii: {
                            borderRadiusButton: '12px',
                            buttonBorderRadius: '4px',
                            inputBorderRadius: '4px',
                        },
                    }
                },
            }}
            providers={['google', 'github']}
            theme="default"
            localization={{
                variables: {
                    sign_in: {
                        email_label: 'メールアドレス',
                        password_label: 'パスワード',
                        link_text: 'Googleでサインイン',
                    },
                },
            }}

            queryParams={{
                access_type: 'offline',
                prompt: 'consent',
                // redirectTo: 'https://znduoxdtpsjpugmsursb.supabase.co/auth/v1/callback'
            }}
            onlyThirdPartyProviders
        />
    )
}
