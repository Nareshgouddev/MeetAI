"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


export default function Home() {
  const { data: session, } = authClient.useSession() 
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const submit = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: () => {
          window.alert("Error signing up, please try again.");
        },
        onSuccess: () => {
          window.alert("Sign up successful!");
        },
      }
    );
  };
  const Login = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Error signing up, please try again.");
        },
        onSuccess: () => {
          window.alert("Sign up successful!");
        },
      }
    );
  };
  if(session){
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Logged in as, {session.user.name}!</h1>
        <p className="mt-2">Email: {session.user.email}</p>
        <Button onClick={()=>authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }


  return (
    <div>
    <div className="p-4 flex flex-col gap-y-4">
   <Input placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
   <Input placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
   <Input placeholder="Enter password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
   <Button onClick={submit}>Submit</Button>
    </div>
    <div className="p-4 flex flex-col gap-y-4">
   <Input placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
   <Input placeholder="Enter password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
   <Button onClick={Login}>Login</Button>
    </div>
    </div>
  );
}
