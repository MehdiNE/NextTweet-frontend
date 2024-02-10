"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

interface IProps {
  openSignIn: boolean;
  toggleSignInDialog: (open: boolean) => void;
}

function SignIn({ openSignIn, toggleSignInDialog }: IProps) {
  const [showForm, setShowForm] = useState(false);

  function showFormToggle() {
    setShowForm(!showForm);
  }

  return (
    <Dialog open={openSignIn} onOpenChange={toggleSignInDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in to nextTweet</DialogTitle>
          <DialogDescription>
            Enter your information and sign in!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-7 space-y-4 px-10">
          {!showForm ? (
            <>
              {" "}
              <Button variant="outline">
                <FcGoogle className="mr-2 text-lg" /> Sign in with Google
              </Button>
              <Button variant="outline">
                <FaGithub className="mr-2 text-lg" /> Sign in with GitHub
              </Button>
              <div className="relative flex items-center py-1 text-sm">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="mx-2 flex-shrink text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>
              <Input placeholder="Phone, Email or username" />
              <Button onClick={showFormToggle}>Next</Button>
              <Button variant="secondary">Forgot password?</Button>
            </>
          ) : (
            <div className="space-y-4">
              <Input disabled value="Test1234" className="h-12" />
              <Input placeholder="Password" className="h-12" />
              <div className="pt-20">
                <Button size="lg">Log in</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignIn;
