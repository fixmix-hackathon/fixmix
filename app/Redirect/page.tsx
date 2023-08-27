'use client'

import React from 'react'
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";


const Page = () => {
    const supabase = createClient(
    "https://znduoxdtpsjpugmsursb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHVveGR0cHNqcHVnbXN1cnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5NDE0ODQsImV4cCI6MjAwODUxNzQ4NH0.EMkadkV31g8zPVWUdVVzGvpOkYADVoe3WTEptsKBjb4"
    );
    const [currentUser, setcurrentUser] = useState("");
    
    // ユーザーIDを取得
    useEffect(() => {
        async () => {
            console.log("テスト1");
            const data = await supabase.auth.getSession();
            console.log("テスト", data);
        if (data.data.session !== null) {
            // supabaseに用意されている現在ログインしているユーザーを取得する関数
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return // ユーザーがいない場合は終了
            // currentUserにユーザーのメールアドレスを格納
            setcurrentUser(user.id)
        }
        console.log("テスト", currentUser);
        //   setUserId(data?.data.user?.id);
    };
}, []);



    return (
        <div>page</div>
    )
}

export default Page